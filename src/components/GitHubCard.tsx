import React, { useEffect, useState } from "react";

interface GitHubCardProps {
  username: string;
}

const GitHubCard: React.FC<GitHubCardProps> = ({ username }) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`https://api.github.com/users/${username}`)
      .then((res) => res.json())
      .then((json) => {
        if (json.message === "Not Found") throw new Error("User not found");
        setData(json);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [username]);

  if (loading) return <div className="p-4">Loading GitHub data...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="p-6 rounded-2xl shadow-md bg-white dark:bg-gray-800">
      <div className="flex items-center space-x-4">
        <img
          src={data.avatar_url}
          alt={data.login}
          className="w-16 h-16 rounded-full"
        />
        <div>
          <h2 className="text-lg font-bold">{data.name || data.login}</h2>
          <p className="text-sm text-gray-500">@{data.login}</p>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2 text-center">
        <div>
          <p className="font-bold">{data.public_repos}</p>
          <p className="text-sm text-gray-500">Repos</p>
        </div>
        <div>
          <p className="font-bold">{data.followers}</p>
          <p className="text-sm text-gray-500">Followers</p>
        </div>
        <div>
          <p className="font-bold">{data.following}</p>
          <p className="text-sm text-gray-500">Following</p>
        </div>
      </div>
    </div>
  );
};

export default GitHubCard;
