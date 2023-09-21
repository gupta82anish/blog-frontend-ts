import PostTile from "@/components/PostTile"
import { checkSession, getPosts } from "../_services/api"
import { TBlogPostSchema } from "@/lib/types"
import { redirect } from "next/navigation"

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function Home() {

  const loggedIn = await checkSession()
  console.log(loggedIn)
  if(loggedIn === true){
    const response = await getPosts(1, 10)
    console.log(response)
    // TODO: Add check for response length, incase there are no posts to display show a message
  return (
    <main className="flex flex-row flex-wrap items-start justify-around p-4 h-screen">
      {response.map((post: TBlogPostSchema) => (
        <PostTile key={post?.id} postId={post?.id} title={post?.title} description={post?.description} 
        authorDetails={post?.authorDetails} created_at={post?.created_at as string} className="mb-4"/>
      ))}
    </main>
  )
      } else {
        redirect('/')
      }
}
