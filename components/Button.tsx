'use client';

import { useUserContext } from "@/contexts/user-context";
import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";


type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    text?: string;
    backgroundColor?: string;
    fontSize?: number;
    functionality?: string;
    postId?: number;
    author?: number;
}



export default function Button({ text, backgroundColor, fontSize, functionality, postId, className, author }: ButtonProps) {
  const router = useRouter()
  const { user, setUser } = useUserContext();
  const deletePost = async () => {
    const response = await fetch(`/api/posts`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'post-id': `${postId}`,
        },
      });
      const resData = await response.json();
      if(resData.success){
        router.push('/posts');
      }
  }
  if(functionality === 'edit'){
  return (
    <>
    { author === user.id ? 
      <button className={twMerge(`bg-blue-400 text-white rounded px-4 py-2`, className)}
      onClick={() => router.push(`/posts/${postId}/edit`)}>
          {text}
      </button> : null
    }
    </>
  )
  } else if(functionality === 'delete'){
    return (
      <>
      { author === user.id ? 
        <button className={twMerge(`bg-blue-400 text-white rounded px-4 py-2`, className)}
        onClick={deletePost}>
            {text}
        </button> : null
      }
      </>
    )
  }
}