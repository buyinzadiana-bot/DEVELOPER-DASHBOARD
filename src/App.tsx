import React from "react";
import Navbar from "./components/Navbar";
import GitHubCard from "./components/GitHubCard";
import WeatherCard from "./components/WeatherCard";

const App: React.FC = () => {
  const githubUsername = "buyinzadiana-bot"; // <-- your GitHub username

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <Navbar />
      <main className="p-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <GitHubCard username={githubUsername} />
        <WeatherCard />
      </main>
    </div>
  );
};

export default App;
