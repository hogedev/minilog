import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import EntryPage from "./pages/EntryPage";
import { useSiteSettings } from "./hooks/useSiteSettings";

function App() {
  const { siteName } = useSiteSettings();

  useEffect(() => {
    document.title = siteName;
  }, [siteName]);

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-[var(--c-text-strong)]">
          {siteName}
        </h1>
      </header>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/entries/:id" element={<EntryPage />} />
      </Routes>
    </div>
  );
}

export default App;
