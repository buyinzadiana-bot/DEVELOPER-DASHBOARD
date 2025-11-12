import React, { useEffect, useState } from 'react'
type GitHubUser = {
avatar_url: string
login: string
name?: string
html_url: string
public_repos: number
followers: number
following: number
}


const GitHubCard: React.FC<GitHubCardProps> = ({ username }) => {
const [data, setData] = useState<GitHubUser | null>(null)
const [loading, setLoading] = useState(false)
const [error, setError] = useState<string | null>(null)


useEffect(() => {
if (!username) return
setLoading(true)
setError(null)


fetch(`https://api.github.com/users/${username}`)
.then(async (res) => {
if (!res.ok) {
const text = await res.text()
throw new Error(`${res.status} ${res.statusText} - ${text}`)
}
return res.json()
})
.then((json: GitHubUser) => setData(json))
.catch(() => setError('Could not fetch GitHub profile.'))
.finally(() => setLoading(false))
}, [username])


return (
<div className="p-6 rounded-2xl shadow-md bg-white/60 dark:bg-gray-800/60 backdrop-blur">
<h2 className="text-lg font-semibold mb-4">GitHub Profile</h2>
{loading && <p>Loading GitHub data...</p>}
{error && <p className="text-red-500">{error}</p>}
{data && (
<div className="flex items-center gap-6">
<img src={data.avatar_url} alt="avatar" className="w-20 h-20 rounded-full" />
<div>
<h3 className="font-bold text-lg">{data.name || data.login}</h3>
<p className="text-sm text-gray-600 dark:text-gray-300">@{data.login}</p>
<div className="mt-3 flex gap-4 text-sm">
<div className="text-center">
<div className="font-medium">{data.public_repos}</div>
<div className="text-xs text-gray-500">Repos</div>
</div>
<div className="text-center">
<div className="font-medium">{data.followers}</div>
<div className="text-xs text-gray-500">Followers</div>
</div>
<div className="text-center">
<div className="font-medium">{data.following}</div>
<div className="text-xs text-gray-500">Following</div>
</div>
</div>
<a href={data.html_url} target="_blank" rel="noreferrer" className="inline-block mt-4 text-sm underline">
View on GitHub
</a>
</div>
</div>
)}
</div>
)
}


export default GitHubCard
