import { redirect } from "next/navigation";
import LoginForm from "../components/LoginForm";
import { cookies } from "next/headers";

async function checkSession() {
  const cookiesList = cookies()
  const hasCookie = cookiesList.has('loggedIn')
  return hasCookie
}

export default async function Home() {
  const hasCookie = await checkSession()
  if (hasCookie) {
    redirect('/posts')
  } else {
  return (
    <main className="flex flex-col items-center justify-center p-4 h-screen ">
      <div className="container mx-auto max-w-md bg-white p-8 rounded-lg shadow-md space-y-4">
        <h1 className="text-2xl font-semibold mb-4 text-black">Login</h1>
        <LoginForm hasCookie={hasCookie}/>
      </div>
    </main>
    )
  }
}