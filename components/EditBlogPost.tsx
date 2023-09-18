'use client'
import { useUserContext } from "@/contexts/user-context";
import { TBlogPostSchema, blogPostSchema } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

type EditBlogPostProps = {
    title: string;
    description: string;
    content: string;
}

export default function EditBlogPost({title, description, content}: EditBlogPostProps) {

    const { user, setUser } = useUserContext();

    const { register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
        setError } = useForm<TBlogPostSchema>({
        resolver: zodResolver(blogPostSchema)
    });

    const onSubmit = async (data: TBlogPostSchema) => {
        const response = await fetch('/api/posts', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const responseData = await response.json();
        console.log(responseData);
        reset();
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center max-w-2xl gap-y-2">
            <input {...register("title")} 
                type="text"
                placeholder="Title"
                className="text-black px-4 py-2 rounded"/>
                {errors.title && (
                    <span className="text-red-500">{errors.title.message}</span>
                )}
            <input {...register("description")} 
                type="text"
                placeholder="Description" 
                className="text-black px-4 py-2 rounded" />
                {errors.description && (
                    <span className="text-red-500">{errors.description.message}</span>
                )}
            <textarea {...register("content")}
                placeholder="Content || You can use Markdown formatting" className="w-full text-black px-4 py-2 rounded border"/>
            {errors.content && (
                <span className="text-red-500">{errors.content.message}</span>
            )}
            <button disabled={isSubmitting} type="submit" className="bg-blue-500 disabled:bg-gray-500 py-2 rounded">Create Post</button>
        </form>
    );
}
