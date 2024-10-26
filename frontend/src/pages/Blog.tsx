import { useParams } from "react-router-dom";
import { useBlog } from "../hooks";
import { FullBlog } from "../components/FullBlog";
import { BlogSkeleton } from "../components/BlogSkeleton";
import { Appbar } from "../components/Appbar";

export const Blog = () => {
  let { id } = useParams<{ id: string }>();

  const { loading, blog } = useBlog({ id: id || "" });

  if (loading) {
    return (
      <div>
        <Appbar />
        <BlogSkeleton />
        <BlogSkeleton />
        <BlogSkeleton />
      </div>
    );
  }

  if (!blog) {
    return <div>Blog not found</div>;
  }

  return (
    <div>
      {/* <div>{blog.title}</div>
      <div>{blog.content}</div>
      <div>{`${id}`}</div> */}

      <FullBlog blog={blog} />
    </div>
  );
};
