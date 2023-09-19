import { checkSession, getPost } from "@/app/_services/api"
import EditBlogPost from "@/components/EditBlogPost"
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
        const { title, description, content, author } = await getPost(id)
        console.log('From page', id)
        return (
            <EditBlogPost title={title} description={description} content={content} postId={id} />
        )
    } else {
        console.log('Not logged in')
        redirect('/')
    }
}