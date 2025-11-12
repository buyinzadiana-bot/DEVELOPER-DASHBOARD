import React from 'react'


type NavbarProps = {
theme: 'light' | 'dark'
setTheme: React.Dispatch<React.SetStateAction<'light' | 'dark'>>
}


const Navbar: React.FC<NavbarProps> = ({ theme, setTheme }) => {
return (
<header className="flex items-center justify-between">
<h1 className="text-2xl font-bold">Developer Dashboard</h1>
<button
onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
className="px-3 py-1 rounded-full shadow-sm border"
>
{theme === 'light' ? '🌞 Light' : '🌙 Dark'}
</button>
</header>
)
}


export default Navbar