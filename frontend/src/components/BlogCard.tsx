import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import axios from "axios";
import { BACKEND_URL } from "../../config";
import { LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

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
          <Avatar name={authorName} size="small" />
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

export function AvatarDropdown({ name }: { name: string }) {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      // Call the /signout endpoint
      console.log("Calling /api/v1/user/signout...");
      await axios.post(`${BACKEND_URL}/api/v1/user/signout`, {
        headers: {
          Authorization: `${localStorage.getItem("jwt")}`,
        },
      });

      console.log("Removing JWT from localStorage...");
      localStorage.removeItem("jwt");

      // Navigate to the login page
      console.log("Navigating to login page...");
      navigate("/signin");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="rounded-full p-1 hover:bg-gray-100 dark:hover:bg-gray-700 transition">
          <Avatar name={name} />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-48 bg-white dark:bg-gray-800 shadow-md rounded-md mt-2 py-2 border border-gray-200 dark:border-gray-700">
        <DropdownMenuItem
          onSelect={handleLogout}
          className="flex items-center gap-2 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition rounded-md cursor-pointer"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

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
