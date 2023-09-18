'use client';

import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";
// type ButtonProps = {
//     text?: string;
//     backgroundColor?: string;
//     fontSize?: number;
//     functionality?: string;
//     id?: number;
// }

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    text?: string;
    backgroundColor?: string;
    fontSize?: number;
    functionality?: string;
    postId?: number;
}



export default function Button({ text, backgroundColor, fontSize, functionality, postId, className }: ButtonProps) {
  const router = useRouter()

  return (
    <button className={twMerge(`bg-blue-400 text-white rounded px-4 py-2`, className)}
    onClick={() => router.push(`/posts/${postId}/edit`)}>
        {text}
    </button>
  )
}