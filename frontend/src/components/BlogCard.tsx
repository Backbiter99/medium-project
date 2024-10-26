import { Link } from "react-router-dom";

interface BlogCardProps {
  authorName: string;
  title: string;
  content: string;
  publishDate: string;
  id: string;
}

export const BlogCard = ({
  id,
  authorName,
  title,
  content,
  publishDate,
}: BlogCardProps) => {
  return (
    <Link to={`/blog/${id}`} className="w-full max-w-xl">
      <div className="w-full max-w-xl p-4 bg-white shadow-md rounded-lg cursor-pointer">
        <div className="flex items-center mb-4">
          <Avatar name={authorName} />
          <Circle />
          <div className="text-sm font-normal">{authorName}</div>
          <Circle />
          <div className="text-sm font-thin text-gray-500">{publishDate}</div>
        </div>
        <div className="font-bold text-lg mb-2">{title}</div>
        <div className="font-light text-gray-700">{content}</div>
      </div>
    </Link>
  );
};

export function Avatar({
  name,
  size,
}: {
  name: string;
  size?: "small" | "big";
}) {
  return (
    <div
      className={`relative inline-flex items-center justify-center overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 mr-2 ${
        size === "small" ? "w-6 h-6" : "w-10 h-10"
      }`}
    >
      <span className="font-medium text-gray-600 dark:text-gray-300">
        {name[0]}
      </span>
    </div>
  );
}

function Circle() {
  return (
    <div className="relative inline-flex items-center justify-center w-1 h-1 overflow-hidden bg-gray-300 rounded-full mx-2"></div>
  );
}
