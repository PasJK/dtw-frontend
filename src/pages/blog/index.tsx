import React from "react";
import { Blog } from "@/components/Blog";

interface BlogPost {
    author: string;
    category: string;
    title: string;
    excerpt: string;
    commentCount: number;
}

export default function BlogPage() {
    const posts: BlogPost[] = [
        {
            author: "Wittawat",
            category: "History",
            title: "The Beginning of the End of the World",
            excerpt:
                "The afterlife sitcom The Good Place comes to its culmination, the show's two protagonists, Eleanor and Chidi, contemplate their future...",
            commentCount: 32,
        },
    ];

    return (
        <div className="max-w-4xl mx-auto p-4 space-y-6">
            {posts.map(post => (
                <Blog
                    key={`${post.author}-${post.title}`}
                    author={post.author}
                    category={post.category}
                    title={post.title}
                    excerpt={post.excerpt}
                    commentCount={post.commentCount}
                />
            ))}
        </div>
    );
}
