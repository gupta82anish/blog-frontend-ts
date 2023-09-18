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
      <main className="flex flex-col items-center justify-between p-24">
        {/* <h1>this is the login page</h1> */}
        {/* <Button text="Proceed to Login" backgroundColor="blue" onClick={handleClick}/> */}
        {/* <Post /> */}
        <LoginForm />
      </main>
    )
  }
}