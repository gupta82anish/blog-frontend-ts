import { getAllPostsIds, getPost } from "@/app/_services/api"
import EditBlogPost from "@/components/EditBlogPost"
import { TBlogPostSchema } from "@/lib/types"

// export async function generateStaticParams(){
//     const responseIds = await getAllPostsIds()
//     console.log(responseIds)
//     return responseIds
// }



export default async function Post({ params }: { params : { id: number } }){
    const { id } = params
    const { title, description, content, author } = await getPost(id)
    console.log('From page', id)
    return (
        <EditBlogPost title={title} description={description} content={content} />
    )
}