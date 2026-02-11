import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PageProfile from "./pages/MainPageProfile";
import { LanguageProvider } from "./i18n/i18n";
import "./App.css"

function App() {
  return (
    <LanguageProvider>
      <Router>
        <Routes>
          <Route path="/" element={<PageProfile />} />
        </Routes>
      </Router>
    </LanguageProvider>
  );
}

export default App
