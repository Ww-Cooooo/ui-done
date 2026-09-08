"""Focused regressions for the built showcase. No reports or screenshots by default.

Reuses the queue/layout and endpoint checks from the local GSAP investigations,
with visible motion samples, live preference changes, and route-loading checks.
Requires Python Playwright and its Chromium browser; does not install anything.
"""

import argparse
from contextlib import contextmanager, nullcontext
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
import json
from pathlib import Path
from threading import Thread
from urllib.parse import urlsplit

from playwright.sync_api import expect, sync_playwright


ROOT = Path(__file__).resolve().parents[1]
VIEWPORTS = {"desktop": (1440, 900), "tablet": (768, 1024), "phone": (390, 844)}
INJECTED_FAILURE = "UI Done deliberate chart render failure"


class QuietHandler(SimpleHTTPRequestHandler):
    def log_message(self, *_args):
        pass


@contextmanager
def local_preview():
    server = ThreadingHTTPServer(("127.0.0.1", 0), partial(QuietHandler, directory=str(ROOT)))
    thread = Thread(target=server.serve_forever, daemon=True)
    thread.start()
    try:
        yield f"http://127.0.0.1:{server.server_port}"
    finally:
        server.shutdown()
        server.server_close()
        thread.join()


def visit(page, base, route):
    response = page.goto(f"{base.rstrip('/')}/showcase/{route}/", wait_until="networkidle")
    assert response and response.ok, f"{route}: entry failed"
    page.evaluate("document.fonts.ready")


def preference(page, reduced):
    page.emulate_media(reduced_motion="reduce" if reduced else "no-preference")
    # Let the media-query event and the resulting React commit reach the screen.
    page.evaluate("() => new Promise(done => requestAnimationFrame(() => requestAnimationFrame(done)))")


def segmented(page, label):
    page.locator(".ant-segmented-item-label").filter(has_text=label).click()


def capture(page, output, name, selector):
    if output:
        page.locator(selector).screenshot(path=output / f"{name}.png")


def check_state(page, base, output):
    visit(page, base, "velocity-works")
    resources = page.evaluate("performance.getEntriesByType('resource').map(item => item.name)")
    assert any("/gsap-" in url for url in resources), "Redesigned training route did not load its GSAP owner"
    note = page.get_by_role("textbox", name="教练结论")
    text = "切换动态偏好后保留的本地复盘记录"
    note.fill(text)
    original_input = note.element_handle()
    for reduced in (True, False):
        preference(page, reduced)
        expect(note).to_have_value(text)
        assert original_input.evaluate("node => node.isConnected"), "Preference change remounted the input"
    page.get_by_role("button", name="保存复盘").click()
    expect(note).to_have_value(text)
    expect(page.locator(".training-current-heading")).to_contain_text("已复盘")
    expect(page.locator(".training-result")).to_contain_text("RUN-241 已完成复盘")
    capture(page, output, "work-state", ".training-review")
    visit(page, base, "corner-goods")
    resources = page.evaluate("performance.getEntriesByType('resource').map(item => item.name)")
    assert not any("/gsap-" in url for url in resources), "Unchanged receipt route unexpectedly loaded GSAP"
    return {"input_retained": True, "review_saved": True, "gsap_is_route_scoped": True}


def preview_position(page):
    return page.evaluate("""() => {
      const node = document.querySelector('.motion-preview-marker');
      const rect = node.getBoundingClientRect();
      const svg = node.ownerSVGElement.getBoundingClientRect();
      const end = document.querySelector('.motion-preview-terminal').getBoundingClientRect();
      const style = getComputedStyle(node);
      return {
        x: (rect.left + rect.width / 2 - svg.left) / svg.width,
        y: (rect.top + rect.height / 2 - svg.top) / svg.height,
        endX: rect.left + rect.width / 2 - end.left - end.width / 2,
        endY: rect.top + rect.height / 2 - end.top - end.height / 2,
        visible: style.visibility === 'visible' && Number(style.opacity) > 0.9
          && rect.bottom > 0 && rect.top < innerHeight && rect.right > 0 && rect.left < innerWidth
      };
    }""")


def wait_preview_phase(page, lower, upper):
    page.wait_for_function("""bounds => {
      const path = document.querySelector('.motion-preview-path');
      const marker = document.querySelector('.motion-preview-marker');
      const ratio = parseFloat(getComputedStyle(path).strokeDashoffset) / path.getTotalLength();
      const style = getComputedStyle(marker);
      return style.visibility === 'visible' && Number(style.opacity) > 0.9
        && ratio > bounds[0] && ratio < bounds[1];
    }""", arg=[lower, upper])


def check_gallery(page, base, output):
    visit(page, base, "gallery")
    expect(page.locator("[data-gallery-work]")).to_have_count(12)
    for label, count in (("工作型 7", 7), ("表达型 4", 4), ("动效实验 1", 1)):
        segmented(page, label)
        expect(page.locator("[data-gallery-work]")).to_have_count(count)
    card = page.locator('[data-gallery-work="motion-lab"]')
    card.scroll_into_view_if_needed()
    points = []
    for lower, upper in ((0.6, 0.99), (0.15, 0.45)):
        wait_preview_phase(page, lower, upper)
        points.append(preview_position(page))
    travel = ((points[1]["x"] - points[0]["x"]) ** 2 + (points[1]["y"] - points[0]["y"]) ** 2) ** 0.5
    assert all(point["visible"] for point in points) and travel > 0.05, f"No visible path travel: {points}"
    page.wait_for_function("Math.abs(parseFloat(getComputedStyle(document.querySelector('.motion-preview-path')).strokeDashoffset)) < 0.01")
    end = preview_position(page)
    assert abs(end["endX"]) <= 1.5 and abs(end["endY"]) <= 1.5, f"Preview endpoint drift: {end}"
    for reduced in (True, False):
        preference(page, reduced)
        expect(page.locator(".ant-segmented-item-selected")).to_contain_text("动效实验")
        expect(page.locator("[data-gallery-work]")).to_have_count(1)
    resources = page.evaluate("performance.getEntriesByType('resource').map(item => item.name)")
    assert sum("/ui-done-app.js" in url for url in resources) == 1, "Gallery imported the versioned bootstrap twice"
    assert any("/gsap-" in url for url in resources), "Gallery did not load its GSAP preview"
    assert not any("/spatial-" in url for url in resources), "Gallery unexpectedly loaded 3D"
    assert page.evaluate("document.documentElement.scrollWidth <= innerWidth + 1"), "Gallery overflow"
    # Prove the restored normal timeline actually starts before waiting for its end.
    wait_preview_phase(page, 0.15, 0.95)
    page.wait_for_function("""() => {
      const marker = document.querySelector('.motion-preview-marker').getBoundingClientRect();
      const end = document.querySelector('.motion-preview-terminal').getBoundingClientRect();
      const cellsDone = [...document.querySelectorAll('.motion-preview-cell')].every(node => {
        const style = getComputedStyle(node);
        return Number(style.opacity) === 1 && (style.transform === 'none' || new DOMMatrixReadOnly(style.transform).isIdentity);
      });
      return cellsDone && Math.abs(marker.left + marker.width / 2 - end.left - end.width / 2) < 0.05
        && Math.abs(marker.top + marker.height / 2 - end.top - end.height / 2) < 0.05;
    }""")
    coverage = page.evaluate("""() => {
      const path = document.querySelector('.motion-preview-path');
      return [.2, .5, .7, .85, .98].map(fraction => path.isPointInStroke(path.getPointAtLength(path.getTotalLength() * fraction)));
    }""")
    assert all(coverage), f"Finished path has undrawn segments after SVG scaling: {coverage}"
    capture(page, output, "gallery-preview", '[data-gallery-work="motion-lab"]')
    return {"visible_travel": round(travel, 3), "endpoint": end, "filter_retained": True}


def queue_bounds(page):
    return page.evaluate("""() => {
      const track = document.querySelector('.queue-track').getBoundingClientRect();
      const next = document.querySelector('#scroll').getBoundingClientRect();
      const bottom = Math.max(...[...document.querySelectorAll('[data-queue-task]')].map(node => node.getBoundingClientRect().bottom));
      return {height: track.height, nextTop: next.top, scroll: scrollY, overlap: Math.max(0, bottom - next.top)};
    }""")


def assert_queue_stable(before, after):
    for key in ("height", "nextTop", "scroll"):
        assert abs(before[key] - after[key]) <= 1, f"Queue moved {key}: {before} -> {after}"
    assert after["overlap"] <= 1, f"Queue covered the following section: {after}"


def check_lab(page, base, output):
    visit(page, base, "motion-lab")
    button = page.locator('[data-task-id="fonts"] button')
    button.scroll_into_view_if_needed()
    before = queue_bounds(page)
    button.click()
    page.wait_for_timeout(260)  # Sample the middle of the 720 ms Flip, not just its end.
    assert_queue_stable(before, queue_bounds(page))
    page.wait_for_timeout(700)
    expect(page.locator("[data-queue-task]").first).to_have_attribute("data-task-id", "fonts")
    before = queue_bounds(page)
    page.locator('[data-task-id="motion"] button').dispatch_event("click")
    page.wait_for_timeout(110)
    page.locator('[data-task-id="mobile"] button').dispatch_event("click")
    page.wait_for_timeout(260)
    assert_queue_stable(before, queue_bounds(page))
    # Switch while the last animation is still running.
    for reduced in (True, False):
        preference(page, reduced)
        expect(page.locator("[data-queue-task]").first).to_have_attribute("data-task-id", "mobile")
    capture(page, output, "queue", "#queue")
    page.locator("#scroll").scroll_into_view_if_needed()
    progress = []
    for fraction in (0.3, 0.82):
        page.locator("#scroll").evaluate("(node, fraction) => scrollTo(0, node.offsetTop + node.offsetHeight * fraction)", fraction)
        page.wait_for_timeout(800)  # ScrollTrigger's scrub settles over 650 ms.
        progress.append(int(page.locator(".assembly-status strong").inner_text().rstrip("%")))
    assert 0 < progress[0] < progress[1], f"Scroll assembly did not progress: {progress}"
    page.locator("#path").scroll_into_view_if_needed()
    segmented(page, "回弹")
    page.wait_for_timeout(520)
    phase = int(page.locator(".path-stage-head strong").inner_text().rstrip("%"))
    assert 0 < phase < 100, f"Path did not expose an intermediate phase: {phase}"
    page.wait_for_timeout(1840)
    offset = page.evaluate("""() => {
      const path = document.querySelector('.path-live');
      const point = path.getPointAtLength(path.getTotalLength());
      const end = new DOMPoint(point.x, point.y).matrixTransform(path.getScreenCTM());
      const circle = document.querySelector('.path-terminal').getBoundingClientRect();
      return {x: circle.left + circle.width / 2 - end.x, y: circle.top + circle.height / 2 - end.y};
    }""")
    assert abs(offset["x"]) <= 0.5 and abs(offset["y"]) <= 0.5, f"Path terminal pulse drift: {offset}"
    expect(page.locator(".path-stage-head strong")).to_have_text("100%")
    preference(page, True)
    expect(page.locator(".path-controls .ant-segmented-item-selected")).to_have_text("回弹")
    expect(page.get_by_role("button", name="重新播放")).to_be_disabled()
    expect(page.locator(".assembly-status strong")).to_have_text("100%")
    preference(page, False)
    expect(page.get_by_role("button", name="重新播放")).to_be_enabled()
    capture(page, output, "path", "#path")
    return {"queue_stable": True, "order_retained": True, "assembly_progress": progress, "terminal": offset}


def check_chart(page, base, output):
    visit(page, base, "motion-lab")
    page.locator("#path").scroll_into_view_if_needed()
    # Fail the actual installed chart's render method, only in this isolated browser.
    page.evaluate("""async message => {
      const url = performance.getEntriesByType('resource').map(item => item.name).find(url => url.includes('/antv-'));
      const module = await import(url);
      const Chart = Object.values(module).find(value => typeof value === 'function' && value.prototype?.render && value.prototype?.options);
      if (!Chart) throw new Error('Cannot identify the installed Chart for failure injection');
      const render = Chart.prototype.render;
      window.restoreChartRender = () => { Chart.prototype.render = render; delete window.restoreChartRender; };
      Chart.prototype.render = () => Promise.reject(new Error(message));
    }""", INJECTED_FAILURE)
    segmented(page, "回弹")
    expect(page.get_by_text("曲线暂时无法绘制", exact=True)).to_be_visible()
    expect(page.locator(".easing-data-table")).to_be_visible()
    expect(page.locator(".easing-data-table tbody tr")).to_have_count(9)
    expect(page.get_by_role("button", name="重新播放")).to_be_enabled()
    capture(page, output, "chart-fallback", ".easing-data-panel")
    page.evaluate("window.restoreChartRender()")
    segmented(page, "弹性")
    expect(page.locator(".easing-chart-host")).to_be_visible()
    expect(page.get_by_text("曲线暂时无法绘制", exact=True)).to_have_count(0)
    page.wait_for_function("document.querySelector('.easing-chart-host canvas')?.width > 0")
    return {"failure_visible": True, "samples_retained": 9, "next_selection_recovers": True}


def check_reduced(page, base, output):
    preference(page, True)
    visit(page, base, "motion-lab")
    expect(page.locator(".assembly-status strong")).to_have_text("100%")
    expect(page.locator(".path-stage-head strong")).to_have_text("100%")
    expect(page.get_by_role("button", name="重新播放")).to_be_disabled()
    page.locator('[data-task-id="fonts"] button').click()
    expect(page.locator("[data-queue-task]").first).to_have_attribute("data-task-id", "fonts")
    assert page.locator("#scroll").evaluate("node => node.getBoundingClientRect().height") < 1400, "Reduced motion retained the narrative spacer"
    capture(page, output, "initial-reduced", "#queue")
    preference(page, False)
    expect(page.locator("[data-queue-task]").first).to_have_attribute("data-task-id", "fonts")
    return {"initial_completion": True, "queue_usable": True, "order_retained": True}


def main():
    cases = {"state": check_state, "gallery": check_gallery, "lab": check_lab, "chart": check_chart, "reduced": check_reduced}
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--base", help="Existing local server origin; otherwise serve this checkout temporarily.")
    parser.add_argument("--case", action="append", choices=cases, help="Run only the named affected case; repeat as needed.")
    parser.add_argument("--viewport", choices=VIEWPORTS, default="desktop")
    parser.add_argument("--screenshots", type=Path, help="Optional new screenshot directory; no files are written otherwise.")
    args = parser.parse_args()
    if args.screenshots:
        args.screenshots.mkdir(parents=True, exist_ok=False)
    server = nullcontext(args.base) if args.base else local_preview()
    with server as base, sync_playwright() as playwright:
        browser = playwright.chromium.launch(headless=True)
        width, height = VIEWPORTS[args.viewport]
        context = browser.new_context(viewport={"width": width, "height": height}, reduced_motion="no-preference")
        origin = urlsplit(base).netloc
        context.route("**/*", lambda route: route.continue_() if urlsplit(route.request.url).netloc == origin else route.abort())
        page = context.new_page()
        page.set_default_timeout(10000)
        errors = []
        expected_errors = []
        page.on("pageerror", lambda error: errors.append(error.stack))
        page.on("requestfailed", lambda request: errors.append(f"{request.url}: {request.failure}"))
        page.on("console", lambda message: (expected_errors if INJECTED_FAILURE in message.text else errors).append(message.text) if message.type == "error" else None)
        results = {}
        try:
            for name in args.case or cases:
                results[name] = cases[name](page, base, args.screenshots)
                assert not errors, f"{name}: unexpected browser errors: {errors}"
                print(f"PASS {args.viewport}: {name}", flush=True)
            if "chart" in results:
                assert len(expected_errors) == 1, f"Expected one diagnostic for the injected failure: {expected_errors}"
            print(json.dumps({"browser": browser.version, "viewport": args.viewport, "results": results}, ensure_ascii=False, indent=2))
        finally:
            browser.close()


if __name__ == "__main__":
    main()
