import SignupForm from "@/components/SignupForm";

export default function SignupPage() {
  return (
    <main className="flex flex-col items-center justify-center p-4 h-screen ">
      <div className="container mx-auto max-w-md bg-white p-8 rounded-lg shadow-md space-y-4">
        <h1 className="text-2xl font-semibold mb-4 text-black">Signup</h1>
        <SignupForm />
      </div>
    </main>
  );
}