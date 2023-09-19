import { checkSession, getPost } from "@/app/_services/api"
import Button from "@/components/Button"
import { TBlogPostSchema } from "@/lib/types"
import { remark } from "remark"
import html from "remark-html"
// import matter from "gray-matter"
import matter  from "gray-matter"
import { redirect } from "next/navigation"
// export async function generateStaticParams(){
//     const responseIds = await getAllPostsIds()
//     console.log(responseIds)
//     return responseIds
// }

export default async function Post({ params }: { params : { id: number } }){

    const loggedIn = await checkSession();
    if(loggedIn === true){
        const { id } = params
        const { title, description, content, author } = await getPost(id)    
        // console.log('From page', id)
        // console.log(content)
        const matterResult = matter(content)
        // console.log(matterResult)
        const processedData = await remark().use(html).process(matterResult.content);
        const contentHTML = processedData.toString()

        // console.log(contentHTML)
        return (
            <main className="p-5 bg-white text-black">
                <div className="flex flex-row justify-around items-baseline">
                    <h1 className="max-w-9xl px-4 my-12 font-extrabold text-3xl">{title}</h1>
                    <p className="font-semibold items-center">{description}</p>
                    <Button text="Edit" functionality={"edit"} postId={id} className="self-end bg-green-500"/>
                </div>
                <div className="prose prose-lg max-w-full mx-auto" dangerouslySetInnerHTML={{ __html: contentHTML }} />
                
            </main>
        )
    } else {
        console.log('Not logged in')
        redirect('/')
    }
    // const { title, description, content, author } = await getPost(id)
}