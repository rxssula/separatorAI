import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import AudioSeparation from "./pages/AudioSeparation";
import VocalRemover from "./pages/VocalRemover";
import UserProfile from "./pages/UserProfile";

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <div className="p-4">
        <Routes>
          <Route path="/" element={<AudioSeparation />} />
          <Route path="/vocal-remover" element={<VocalRemover />} />
          <Route path="/user-profile" element={<UserProfile />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
