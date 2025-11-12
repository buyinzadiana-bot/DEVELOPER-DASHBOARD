import React, { useState } from "react";
import Navbar from "./components/Navbar";
import GitHubCard from "./components/GitHubCard";
import WeatherCard from "./components/WeatherCard";

const App: React.FC = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const githubUsername = "buyinzadiana-bot"; // your GitHub username

  // Apply theme to document root
  React.useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <div className={`min-h-screen ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
      <Navbar theme={theme} setTheme={setTheme} />
      <main className="p-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <GitHubCard username={githubUsername} />
        <WeatherCard />
      </main>
    </div>
  );
};

export default App;