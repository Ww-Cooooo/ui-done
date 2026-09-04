import { createRoot } from "react-dom/client";
import App from "./App";
import "./runtime.css";
import "./project-experiences.css";
import "./work-experiences.css";

const rootNode = document.getElementById("root");
const pageId = document.body.dataset.page || "gallery";

if (!rootNode) throw new Error("UI Done showcase root is missing");

createRoot(rootNode).render(<App pageId={pageId} />);
