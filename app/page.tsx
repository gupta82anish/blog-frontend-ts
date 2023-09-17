'use client';
import Button from "../components/Button";
import LoginForm from "../components/LoginForm";

function handleClick() {
  console.log('button clicked')
}
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {/* <h1>this is the login page</h1> */}
      {/* <Button text="Proceed to Login" backgroundColor="blue" onClick={handleClick}/> */}
      {/* <Post /> */}
      <LoginForm />
    </main>
  )
}
