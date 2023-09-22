'use client'
import { useUserContext } from "@/contexts/user-context";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { set } from "zod";
import { usePathname } from "next/navigation";

export default function Navbar() {
    const {user, setUser } = useUserContext();
    const router = useRouter();
    const pathname = usePathname();
    useEffect(() => {
        const userString = localStorage.getItem('user');
        if (userString && userString !== 'undefined') {
            // console.log(userString);
            setUser(JSON.parse(userString));
        } else{
            console.log('no user');
            setUser({});
            if(pathname !== '/signup'){
                router.push('/');
            }
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
        <nav className="fixed top-0 w-full bg-blue-600 p-4">
            <div className="container mx-auto flex justify-between items-center">
                {Object.keys(user).length > 0 ?
                <>
                    <Link href="/posts" className="text-white text-2xl font-bold">
                        Home
                    </Link>
                    <div className="flex items-center text-white">Logged in as: {user.name}</div>
                    <button className="bg-orange-500 text-white py-2 px-4 rounded" onClick={() => router.push('/posts/createpost')}>Create Post</button>
                    <button onClick={logout} className="bg-red-500 text-white py-2 px-4 rounded">Logout</button>
                </> 
                :
                <>
                    <Link href="/" className="text-white text-2xl font-bold">
                        Home
                    </Link>
                    {pathname !== '/signup' ?
                    <button onClick={() => router.push('/signup')} className="bg-red-500 text-white py-2 px-4 rounded">Register</button>
                    :
                    <button onClick={() => router.push('/')} className="bg-red-500 text-white py-2 px-4 rounded">Login</button>
                    }
                </>
                }
            </div>
        </nav>
    )
}