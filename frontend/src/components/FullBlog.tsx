import { Blog } from "../hooks";
import { Appbar } from "./Appbar";
import { Avatar } from "./BlogCard";

export const FullBlog = ({ blog }: { blog: Blog }) => {
  return (
    <div>
      <Appbar />
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="col-span-2 p-4 bg-white ">
            <div className="text-4xl font-extrabold mb-1">{blog.title}</div>
            <div className="text-slate-500 mb-2">Posted on date blah blah</div>
            <div className="text-slate-700">{blog.content}</div>
          </div>
          <div className="col-span-1 p-4 bg-white ">
            <div className="font-medium">Author</div>
            <div className="flex justify-center items-center">
              <div className="mx-2">
                <Avatar name={blog.author?.name || "Anonymous"} size="big" />
              </div>

              <div>
                <div className="text-xl font-bold mb-2">
                  {blog.author?.name || "Anonymous"}
                </div>
                <div className="text-slate-500">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Itaque laboriosam provident, consequuntur ipsa optio corrupti.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
