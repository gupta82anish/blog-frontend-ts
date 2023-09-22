import PostTile from "@/components/PostTile"
import { checkSession, getPosts } from "../_services/api"
import { TBlogPostSchema } from "@/lib/types"
import { redirect } from "next/navigation"

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function Home() {

  const loggedIn = await checkSession()
  if(loggedIn === true){
    const response = await getPosts(1, 10)
    const responseData = await response.json()
  return (
    <>
    { responseData.response.length === 0 ? <h1 className="text-2xl flex flex-row items-center justify-center font-semibold m-auto text-black">No posts to display</h1> : 
      <main className="flex flex-row flex-wrap items-start justify-around p-4 h-screen">
      {responseData.response.map((post: TBlogPostSchema) => (
        <PostTile key={post?.id} postId={post?.id} title={post?.title} description={post?.description} 
        authorDetails={post?.authorDetails} created_at={post?.created_at as string} className="mb-4"/>
      ))}
    </main>
    }
    </>
  )
      } else {
        redirect('/')
      }
}
