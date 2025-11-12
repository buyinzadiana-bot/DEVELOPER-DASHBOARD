import React from "react";

interface NavbarProps {
  theme: "light" | "dark";
  setTheme: React.Dispatch<React.SetStateAction<"light" | "dark">>;
}

const Navbar: React.FC<NavbarProps> = ({ theme, setTheme }) => {
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <header className="flex items-center justify-between p-4 shadow-md bg-white dark:bg-gray-800">
      <h1 className="text-xl font-bold">Developer Dashboard</h1>
      <button
        onClick={toggleTheme}
        className="px-4 py-2 rounded-xl bg-gray-200 dark:bg-gray-700 hover:opacity-80 transition"
      >
        {theme === "light" ? "🌞 Light Mode" : "🌙 Dark Mode"}
      </button>
    </header>
  );
};

export default Navbar;
