import { checkSession, getPost } from "@/app/_services/api"
import Button from "@/components/Button"
import { TBlogPostSchema } from "@/lib/types"
import { remark } from "remark"
import html from "remark-html"
import emoji from "remark-emoji"
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
        const { title, description, content, author, authorDetails } = await getPost(id)    
        // console.log('From page', id)
        // console.log(content)
        const matterResult = matter(content)
        // console.log(matterResult)
        const processedData = await remark().use(emoji, { padSpaceAfter: true}).use(html).process(matterResult.content);
        const contentHTML = processedData.toString()

        // console.log(contentHTML)
        return (
            <main className="p-8 bg-white text-black max-w-screen-lg mx-auto">
                <div className="mb-8">
                    <h1 className="text-4xl font-extrabold mb-4">{title}</h1>
                    <p className="text-lg font-medium mb-4">{description}</p>
                    <span className="text-sm text-gray-500">Written by {authorDetails?.name}</span>
                </div>
                <div className="prose prose-lg mx-auto mb-8" dangerouslySetInnerHTML={{ __html: contentHTML }} />

                <div className="flex justify-between">
                    <Button text="Edit" functionality={"edit"} postId={id} className="bg-green-500 text-white px-4 py-2 rounded" author={author} />
                    <Button text="Delete" functionality={"delete"} postId={id} className="bg-red-500 text-white px-4 py-2 rounded" author={author} />
                </div>
            </main>
        );
    } else {
        console.log('Not logged in');
        redirect('/');
    }
    // const { title, description, content, author } = await getPost(id)
}