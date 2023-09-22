import Link from "next/link";
import React from "react";
import { twMerge } from "tailwind-merge";

type PostTileProps = React.HTMLAttributes<HTMLDivElement> & {
    postId?: number;
    title?: string;
    description?: string;
    author?: string | null;
    authorDetails?: any;
    created_at: string;
    updated_at?: string;
}



export default function PostTile({ postId, title, description, authorDetails, created_at, className }: PostTileProps) {
    const dateObj: Date = new Date(created_at);
    const dateString = dateObj.toLocaleDateString();
    return (
        <Link href={`/posts/${postId}`} className="basis-80 flex-grow-0 flex-shrink-0 cursor-pointer hover:shadow-lg transition duration-300 flex border rounded-lg overflow-hidden shadow-md bg-white h-[300px]">
          {/* <div > */}
            <div className="bg-blue-500 w-1"></div>
            <div className="p-6 flex flex-col justify-between w-full h-full">
              <div>
                <span className="text-md text-gray-500 block mb-2 truncate">{dateString}</span>
                <div className="text-2xl md:text-3xl font-semibold mb-2 truncate whitespace-normal">{title}</div>
                <p className="text-lg text-gray-700 mb-2">{description}</p>
              </div>
              <span className="text-md text-gray-500 self-end truncate">Author: {authorDetails.name}</span>
            </div>
          {/* </div> */}
        </Link>
      );

}