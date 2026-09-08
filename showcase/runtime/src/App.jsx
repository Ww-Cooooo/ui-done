import { lazy, Suspense } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import ExperienceFrame from "./ExperienceFrame";
import ProjectExperience from "./ProjectExperiences";
import { getPageConfig } from "./data";
import { useReducedMotion } from "./useReducedMotion";

const GalleryPage = lazy(() => import("./GalleryPage"));
const MotionLab = lazy(() => import("./MotionLab"));

export default function App({ pageId }) {
  const page = getPageConfig(pageId);
  const reduced = useReducedMotion();

  if (page.id === "gallery") {
    return (
      <Suspense fallback={<div className="motion-lab-loading" role="status"><LoadingOutlined spin /><span>正在加载示例展厅…</span></div>}>
        <GalleryPage page={page} reduced={reduced} />
      </Suspense>
    );
  }

  return (
    <ExperienceFrame page={page} reduced={reduced}>
      <main>
        {page.id === "motion-lab" ? (
          <Suspense fallback={<div className="motion-lab-loading" role="status"><LoadingOutlined spin /><span>正在准备动效试验台…</span></div>}>
            <MotionLab page={page} reduced={reduced} />
          </Suspense>
        ) : <ProjectExperience page={page} />}
      </main>
    </ExperienceFrame>
  );
}
