import { useBlogs } from "../hooks";
import { Appbar } from "../components/Appbar";
import { BlogCard } from "../components/BlogCard";
import { BlogSkeleton } from "../components/BlogSkeleton";

export const Blogs = () => {
  const { loading, blogs } = useBlogs();

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

  return (
    <div>
      <Appbar />
      <div className="flex flex-col items-center my-4">
        {blogs?.length ? (
          blogs.map((blog, index) => (
            <div
              key={index}
              className="w-full max-w-2xl py-4 flex flex-col items-center"
            >
              <BlogCard
                id={blog.id}
                authorName={blog.author.name ?? "Unknown"}
                title={blog.title}
                content={blog.content}
                publishDate={
                  blog.publishDate
                    ? new Date(blog.publishDate).toLocaleDateString()
                    : "Unknown"
                }
              />
            </div>
          ))
        ) : (
          <div>No blogs found.</div>
        )}
      </div>
    </div>
  );
};
