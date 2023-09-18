'use client'
import Link from "next/link";


export default function Navbar() {

    function logout() {
        const res = fetch('/api/login', {
            method: 'DELETE'
        }).then(res => {
            if (res.ok) {
                localStorage.removeItem('user');
                window.location.href = '/';
            }
        })
    }
    return (
        <nav className="bg-blue-600 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="text-white text-2xl font-bold">
            Home
          </Link>
          <button onClick={logout}
          className="bg-red-500 text-white py-2 px-4 rounded">Logout</button>
        </div>
      </nav>
    )
}