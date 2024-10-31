import { useState, useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../config";

export interface Blog {
  id: string;
  title: string;
  content: string;
  authorId: string;
  author: {
    name: string | null;
  };
  publishDate?: Date | null;
}

export const useBlogs = () => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const token = localStorage.getItem("jwt");
        const res = await axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
          headers: token ? { Authorization: token } : {},
        });
        setBlogs(res.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return { loading, blogs };
};

interface BlogId {
  id: string;
}

export const useBlog = ({ id }: BlogId) => {
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState<Blog>();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const token = localStorage.getItem("jwt");
        const res = await axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
          headers: token ? { Authorization: token } : {},
        });
        setBlog(res.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [id]);

  return { loading, blog };
};
