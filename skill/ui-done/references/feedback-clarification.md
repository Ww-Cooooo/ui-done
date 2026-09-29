# Clarify Feedback Before Choosing a Revision

Load this guide only when feedback or an uncertainty discovered during frontend work leaves materially different plausible revisions. It covers remarks such as “not premium enough,” “feels AI-generated,” “the animation is wrong,” or “still not what I meant.” Those phrases are signals to investigate, not automatic questionnaire keywords. This guide works from the user's brief and available artifact without the UI Done development conversation or any other installed Skill.

## Route once, then keep designing

When `clear-feedback` is available, read and use it for the clarification conversation. Use the handoff below to bring its result back into UI Done. When it is absent, use this guide directly; no installation, nested Skill discovery, network request, special question tool, or host-specific command is required. Do not claim the companion ran when only this fallback was used. With both available, use one conversation and one set of answers, not two passes of the same questions.

UI Done continues to own frontend selection, design, implementation, and verification. Clarification does not waive its required capabilities, authorize a rewrite or deployment, or guarantee that every host automatically loads a Skill it has never exposed. Once UI Done is active, this route applies during review and revision as well as at prompt intake.

## Decide whether an answer is actually needed

Inspect the available artifact, affected action, confirmed requirements, and references first. Keep three things separate: an observable defect, the user's reported feeling, and your hypothesis about its cause. If the artifact or dynamic state is unavailable, say what cannot be inspected rather than invent observations.

- **Specific instruction or reproducible fault:** act within the existing authorization. Covered text, a mislabeled selected tab, or a button that cannot save needs investigation or correction, not a taste interview.
- **Several interpretations with different consequences:** load this route and identify the missing preference that distinguishes them. For example, “not smooth” could mean dropped frames, abrupt state changes, excessive scrolling inertia, or an unwanted visual style. Diagnose measurable failures; ask about the remaining preference rather than guessing it.
- **Enough context for a low-cost, reversible comparison:** explain the hypothesis and make a focused sample within scope. Do not require a perfect verbal specification before showing anything.
- **Mixed feedback:** fix confirmed defects where authorized while clarifying the uncertain direction. A taste question should not block unrelated corrections, and a technical fix should not be presented as resolving the taste complaint.

Do not ask again for a preference already answered. If a new answer conflicts with a prior constraint, identify the conflict before treating either as permission to change the product.

## Ask about what the user can recognize

Briefly explain the visible difference that makes the answer useful, then ask the smallest useful set of questions. Continue in focused rounds if necessary; there is no fixed questionnaire length or demand to reach total certainty.

Anchor questions to the current screen, an actual action, or a small comparison. Use ordinary language, not library names, easing constants, or a request for the user to design the layout. Let the user combine answers, reject all suggestions, say “I cannot describe it,” or provide an example. Suggested choices are hypotheses, not a closed menu of styles.

If words do not resolve the distinction, offer a small visual or interactive comparison using the same content and task. Explain what differs and avoid a deliberately weak option that makes your preferred design win. For a motion complaint, a static screenshot alone is not a useful comparison; show the relevant transition when tools and authorization allow it. If the user prefers that you decide rather than interview them, state the assumption and proceed with a reversible candidate instead of repeatedly asking the same question.

## Turn answers into action, then stop asking

In the existing task context, retain a short revision brief: the target experience in ordinary language, what the user rejects or wants to retain, your recommended change and its rationale, unresolved assumptions, and the concrete scene/action that will reveal improvement. No new report, permanent preference file, or formal approval round is required.

For example, “more premium” may become: “Keep precise playback immediate. When opening a note, make the selected subject and its note remain visibly connected through the space change; remove redundant action choices. The user rejects page-wide entrances and slower seeking.” These preferences are hypothetical: record them only if the user's answers support them, not as defaults assigned to anyone asking for polish. This is enough to design a scoped candidate, not a universal template or permission to change storage semantics.

Stop asking when the remaining uncertainty would not materially change that next step. Preserve these answers through an authorized handoff or continuation, without turning a one-project preference into a rule for every user. If the revision is rejected again, compare what actually changed with the new feedback and ask about the remaining distinction; do not restart the questionnaire or answer “but every required library is present.” A clarified brief remains a hypothesis to test with the next result, not proof of user acceptance.

## Worked examples

### “动画还是没有高级感” — the animation still lacks polish

Suppose a review workspace has a panel fade-in and a smooth transcript list. Those facts do not establish what the user dislikes. A useful opening is: “我看到现在主要是表单淡入和列表滚动。你更不满意的是操作时几乎感觉不到变化，变化生硬不连贯，还是页面本身不好看、加动画也没用？可以同时选，也可以说都不是。”

If the answer is “每个部分各动各的，像拼起来的,” focus the next candidate on the relationship across selection, contextual editing, and completion, using the [motion sequence method](motion-scroll-and-3d.md#design-a-sequence-not-a-tween-quota). Do not merely lengthen every animation. If the answer is “整个布局都不想要,” establish what functionality must survive and use the [redesign method](page-composition.md#repair-a-rejected-layout-family), not another layer of polish. If a favorite reference is provided, ask or infer from the stated comparison which quality transfers; it does not authorize copying its entire product or adding unrelated effects.

### “这个标题被挡住了，移开图标” — an explicit defect

The requested correction is already clear. Inspect the overlap, repair the responsible layout in scope, and check the affected state. Do not launch the interview just because the same user previously said “AI-generated.”

### “产品页太普通了” — the product page feels generic

Suppose the page works, but it could advertise almost any product after changing the name. Distinctive typography, a subject-led composition, and a more theatrical interaction are different possible revisions. Ask which existing moment or reference captures the desired impression, offering a concrete comparison if the user cannot name it. If the answer is “想让人先看清商品细节，不是看一堆宣传卡片,” organize the next sample around the real product and its details; do not infer that the user also wants dark colors, 3D, or a pinned scrolling sequence.

### A public showcase is rejected repeatedly

Passing playback and saving tests does not establish a convincing public demonstration. If it is still unclear whether the rejection concerns the first impression, interaction flow, or visual identity, ask about that difference before another full build. Demonstrate the proposed direction with a representative sequence before extending it; do not compensate for uncertainty by adding more panels, effects, approvals, or a large benchmark suite. Keep the current result labeled as a candidate rather than presenting it as the accepted showcase.
