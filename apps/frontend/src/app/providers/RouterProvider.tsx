import {
  Routes,
  Route,
  Navigate,
  HashRouter,
} from "react-router-dom";
import { HomePage } from "@/pages/home";
import { TopicPage } from "@/pages/topic";
import { RecordPage } from "@/pages/record";
import { ResultsPage } from "@/pages/results";

export const RouterProvider = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/topic" element={<TopicPage />} />
        <Route path="/record" element={<RecordPage />} />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  );
};
