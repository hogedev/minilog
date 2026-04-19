import { useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import EntryPage from "./pages/EntryPage";
import { useSiteSettings } from "./hooks/useSiteSettings";

function App() {
  const { siteName } = useSiteSettings();

  useEffect(() => {
    document.title = siteName;
  }, [siteName]);

  return (
    <div className="max-w-2xl md:max-w-3xl mx-auto px-4 py-8">
      <header className="mb-8">
        <Link
          to="/"
          className="text-2xl font-bold text-[var(--c-text-strong)] no-underline"
        >
          {siteName}
        </Link>
      </header>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/:username" element={<HomePage />} />
        <Route path="/entries/:id" element={<EntryPage />} />
        <Route path="/:username/:id" element={<EntryPage />} />
      </Routes>
    </div>
  );
}

export default App;
