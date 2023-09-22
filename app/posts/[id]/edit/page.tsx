import { checkSession, getPost } from "@/app/_services/api"
import EditBlogPost from "@/components/EditBlogPost"
import ErrorPage from "@/components/ErrorPage";
import { TBlogPostSchema } from "@/lib/types"
import { redirect } from "next/navigation";

// export async function generateStaticParams(){
//     const responseIds = await getAllPostsIds()
//     console.log(responseIds)
//     return responseIds
// }

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function Post({ params }: { params : { id: number } }){
    const loggedIn = await checkSession();
    if(loggedIn === true){
        const { id } = params

        const response = await getPost(id)
        if('code' in response && response.code === 404){
            return <ErrorPage />
        } else {
            const { title, description, content, author, authorDetails } = response as TBlogPostSchema

        // const { title, description, content, author } = await getPost(id)
        console.log('From page', id)
        return (
            <main className="flex flex-col items-start justify-start p-4 h-screen">
            <div className="container max-w-none bg-white p-8 rounded-lg shadow-md space-y-4">
                <h1 className="text-2xl font-semibold mb-4 text-black">Edit post</h1>
                <EditBlogPost title={title} description={description} content={content} postId={id} />
            </div>
        </main>
        )
        }
    } else {
        console.log('Not logged in')
        redirect('/')
    }
}