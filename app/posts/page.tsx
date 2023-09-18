import PostTile from "@/components/PostTile"
import { checkSession, getPosts } from "../_services/api"
import { TBlogPostSchema } from "@/lib/types"
import { redirect } from "next/navigation"
export default async function Home() {

  const loggedIn = await checkSession()
  console.log(loggedIn)
  if(loggedIn === true){
    const response = await getPosts(1, 10)
  return (
    <main className="container mx-auto p-4">
      {response.map((post: TBlogPostSchema) => (
        <PostTile key={post?.id} postId={post?.id} title={post?.title} description={post?.description} className="mb-4"/>
      ))}
    </main>
  )
      } else {
        redirect('/')
      }
}
