import React from "react";
import Home from "./pages/Home/Home";
import './App.css';
import './i18n';

const App: React.FC = () => {
  return (
    <div className="app">
      <Home />
    </div>
  );
}

export default App;
