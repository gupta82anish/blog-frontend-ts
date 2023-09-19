'use client'
import { useUserContext } from "@/contexts/user-context";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { set } from "zod";


export default function Navbar() {
    const {user, setUser } = useUserContext();
    const router = useRouter();

    useEffect(() => {
        const userString = localStorage.getItem('user');
        if (userString) {
            console.log(userString);
            setUser(JSON.parse(userString));
        } else{
            console.log('no user');
            setUser({});
            router.push('/');
        }
    }, []);

    function logout() {
        const res = fetch('/api/login', {
            method: 'DELETE'
        }).then(res => {
            if (res.ok) {
                localStorage.removeItem('user');
                setUser({});
                window.location.href = '/';
            }
        })
    }
    return (
        <nav className="bg-blue-600 p-4">
        <div className="container mx-auto flex justify-between items-center">
            {Object.keys(user).length > 0 ?
            <>
                <Link href="/posts" className="text-white text-2xl font-bold">
                    Home
                </Link>
            </> :
                <Link href="/" className="text-white text-2xl font-bold">
                    Home
                </Link>
            }
            {Object.keys(user).length > 0 ? 
            <>
                <div className="flex items-center">{user.name}</div> 
                    <button onClick={logout} className="bg-red-500 text-white py-2 px-4 rounded">Logout</button>
            </>
            :
            <button onClick={() => router.push('/signup')} className="bg-red-500 text-white py-2 px-4 rounded">Register</button>
                }
        </div>
      </nav>
    )
}