import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PageProfile from "./pages/MainPageProfile";
import "./App.css"

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<PageProfile />} />
        </Routes>
      </Router>
    </>
  );
}

export default App
