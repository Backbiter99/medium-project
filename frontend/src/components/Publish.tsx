import axios from "axios";
import { Appbar } from "./Appbar";
import { BACKEND_URL } from "../../config";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Publish = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  return (
    <div>
      <Appbar />
      <div className="container mx-auto">
        <div className="max-w-2xl w-full mx-auto bg-white p-3">
          <input
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 font-bold"
            placeholder="Title"
          />
        </div>
      </div>
      <div className="container mx-auto">
        <div className="max-w-2xl w-full mx-auto bg-white p-3">
          <TextArea onChange={(e) => setDescription(e.target.value)} />
        </div>
      </div>
      <div className="container mx-auto">
        <div className="max-w-2xl w-full mx-auto bg-white px-3">
          <button
            onClick={async () => {
              const res = await axios.post(
                `${BACKEND_URL}/api/v1/blog`,
                {
                  title,
                  content: description,
                },
                { headers: { Authorization: localStorage.getItem("jwt") } }
              );
              navigate(`/blog/${res.data.id}`);
            }}
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none my-1"
          >
            Publish
          </button>
        </div>
      </div>
    </div>
  );
};

function TextArea({
  onChange,
}: {
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}) {
  return (
    <div>
      <textarea
        onChange={onChange}
        className="block p-4 w-full h-64 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
        placeholder="Write your thoughts here..."
      ></textarea>
    </div>
  );
}
