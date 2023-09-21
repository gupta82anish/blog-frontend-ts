import AddBlogPost from "@/components/AddBlogPost";

export default function CreatePost() {
    return (
        <main className="flex flex-col items-start justify-start p-4 h-screen">
            <div className="container max-w-none bg-white p-8 rounded-lg shadow-md space-y-4">
                <h1 className="text-2xl font-semibold mb-4 text-black">Create post</h1>
                <AddBlogPost />
            </div>
        </main>
    );
}
