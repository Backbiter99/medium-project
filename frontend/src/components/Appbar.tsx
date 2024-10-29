import { Link } from "react-router-dom";
import { AvatarDropdown } from "./BlogCard";

export const Appbar = () => {
  return (
    <div className="flex justify-between items-center p-3 border-b">
      <Link className="text-xl font-medium" to={`/blogs`}>
        Medium
      </Link>
      <div>
        <Link className="mr-4" to={`/publish`}>
          <button
            type="button"
            className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 "
          >
            New
          </button>
        </Link>
        <AvatarDropdown name="Username" />
      </div>
    </div>
  );
};
