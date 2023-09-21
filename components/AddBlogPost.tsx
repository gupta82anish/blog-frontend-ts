'use client'
import { useUserContext } from "@/contexts/user-context";
import { TBlogPostSchema, blogPostSchema } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
export default function AddBlogPost() {

    const { user, setUser } = useUserContext();
    const router = useRouter();
    const { register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
        setError } = useForm<TBlogPostSchema>({
        resolver: zodResolver(blogPostSchema)
    });

    const onSubmit = async (data: TBlogPostSchema) => {
      console.log('ON SUBMIT')
        const response = await fetch('/api/createpost', {
            method: 'POST',
            body: JSON.stringify({...data, id: user.id}),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const responseData = await response.json();
        console.log(responseData.response.id);
        router.push(`/posts/${responseData.response.id}`)
        // reset();
    }
      
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center gap-y-4 p-4 h-full w-auto">
          <input 
            {...register("title")} 
            type="text"
            placeholder="Title"
            className="w-full text-black px-4 py-2 rounded border focus:border-blue-500 focus:outline-none"
          />
          {errors.title && (
            <span className="text-red-500 text-sm">{errors.title.message}</span>
          )}

          <input 
            {...register("description")} 
            type="text"
            placeholder="Description" 
            className="w-full text-black px-4 py-2 rounded border focus:border-blue-500 focus:outline-none"
          />
          {errors.description && (
            <span className="text-red-500 text-sm">{errors.description.message}</span>
          )}

          <textarea 
            {...register("content")}
            placeholder="Content || You can use Markdown formatting" 
            className="w-full h-32 text-black px-4 py-2 rounded border focus:border-blue-500 focus:outline-none"
          />
          {errors.content && (
            <span className="text-red-500 text-sm">{errors.content.message}</span>
          )}

          <button 
            disabled={isSubmitting} 
            type="submit" 
            className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-500 py-2 rounded text-white">
            Create Post
          </button>
      </form>
    );
}
