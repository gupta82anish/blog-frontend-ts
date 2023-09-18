import Link from "next/link";
import React from "react";
import { twMerge } from "tailwind-merge";

type PostTileProps = React.HTMLAttributes<HTMLDivElement> & {
    postId?: number;
    title?: string;
    description?: string;
    author?: string | null;
    created_at?: string;
    updated_at?: string;
}



export default function PostTile({ postId, title, description, className }: PostTileProps) {

    return (
        <Link href={`/posts/${postId}`} >
            <div className={twMerge("p-4 border rounded-lg cursor-pointer transition-colors duration-300 hover:bg-gray-100 hover:shadow-lg hover:text-blue-500", className)}>
                <h2 className="text-xl md:text-2xl font-semibold mb-2 ">{title}</h2>
                <p className="text-gray-600">{description}</p>
            </div>
        </Link>
    )

}