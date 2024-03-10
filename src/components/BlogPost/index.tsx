import React from 'react'

interface BlogPostProps {
  title: string
  url: string
  coverAlt: string
  cover: string
  description: string
}

const BlogPost = ({
  title,
  url,
  coverAlt,
  cover,
  description,
}: BlogPostProps) => {
  return (
    <li className="blog-post rounded-xl border shadow-sm shadow-red-200">
      <a href={url}>
        <img
          className="w-full object-cover rounded-xl"
          src={cover}
          width="200"
          alt={coverAlt}
        />
        <div className="p-5">
          <h5 className="font-semibold">{title}</h5>
          <p className="text-gray-300 text-xs pt-3">{description}</p>
        </div>
      </a>
    </li>
  )
}

export default BlogPost
