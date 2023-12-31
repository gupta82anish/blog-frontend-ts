'use client'
import { TBlogPostSchema, blogPostSchema } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { revalidatePath } from "next/cache";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

type EditBlogPostProps = {
    title: string;
    description: string;
    content: string;
    postId: number;
}

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default function EditBlogPost({title, description, content, postId}: EditBlogPostProps) {

    // const { user, setUser } = useUserContext();
    const [ success, setSuccess ] = useState(true);
    const router = useRouter();
    const { register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setError } = useForm<TBlogPostSchema>({
            defaultValues: {
                title: title,
                description: description,
                content: content
            },
        resolver: zodResolver(blogPostSchema)
    });

    const onSubmit = async (data: TBlogPostSchema) => {
        const response = await fetch('/api/posts', {
            method: 'PATCH',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'post-id': postId.toString()
            },
            cache: 'no-store'
        });
        const responseData = await response.json();
        if(!responseData.success){
            setSuccess(false);
        } else {
            router.push(`/posts/${postId}`)
        }
        // reset();
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center gap-y-4 p-4 h-full w-auto">
            {!success ?
                <span className="text-red-500 text-sm">Could not edit the post. Please try again</span>
                : null}
            <input {...register("title")} 
                type="text"
                placeholder="Title"
                className="w-full text-black px-4 py-2 rounded border focus:border-blue-500 focus:outline-none"/>
                {errors.title && (
                    <span className="text-red-500">{errors.title.message}</span>
                )}
            <input {...register("description")} 
                type="text"
                placeholder="Description" 
                className="w-full text-black px-4 py-2 rounded border focus:border-blue-500 focus:outline-noned" />
                {errors.description && (
                    <span className="text-red-500">{errors.description.message}</span>
                )}
            <textarea {...register("content")}
                placeholder="Content || You can use Markdown formatting" className="w-full h-32 text-black px-4 py-2 rounded border focus:border-blue-500 focus:outline-none"/>
            {errors.content && (
                <span className="text-red-500">{errors.content.message}</span>
            )}
            <button disabled={isSubmitting} type="submit" className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-500 py-2 rounded text-white">Submit Edit</button>
        </form>
    );
}
