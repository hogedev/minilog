import { useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import IndexPage from "./pages/IndexPage";
import UserPage from "./pages/UserPage";
import EntryPage from "./pages/EntryPage";
import { useSiteSettings } from "./hooks/useSiteSettings";

const ADMIN_URL = import.meta.env.VITE_ADMIN_URL || "/admin";

function App() {
  const { siteName } = useSiteSettings();

  useEffect(() => {
    document.title = siteName;
  }, [siteName]);

  return (
    <div className="max-w-2xl md:max-w-3xl mx-auto px-4 py-8">
      <header className="mb-8 flex items-center justify-between">
        <Link
          to="/"
          className="text-2xl font-bold text-[var(--c-text-strong)] no-underline"
        >
          {siteName}
        </Link>
        <a
          href={ADMIN_URL}
          className="text-sm text-[var(--c-text-muted)] hover:text-[var(--c-text)] transition-colors"
        >
          ログイン
        </a>
      </header>
      <Routes>
        <Route index element={<IndexPage />} />
        <Route path="/:username" element={<UserPage />} />
        <Route path="/entries/:id" element={<EntryPage />} />
        <Route path="/:username/:id" element={<EntryPage />} />
      </Routes>
    </div>
  );
}

export default App;
