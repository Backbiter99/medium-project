import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { SignupInput } from "@backb1ter/medium-common";
import axios from "axios";
import { BACKEND_URL } from "../../config";

export const Auth = () => {
    const navigate = useNavigate();
    const [postInputs, setPostInputs] = useState<SignupInput>({
        name: "",
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);

    async function sendSignupRequest() {
        setLoading(true);
        try {
            const response = await axios.post(
                `${BACKEND_URL}/api/v1/user/signup`,
                postInputs
            );
            const jwt = await response.data.jwt;
            localStorage.setItem("jwt", jwt);
            navigate("/blogs");
        } catch (error) {
            alert("Signup failed");
        }
        setLoading(false);
    }

    return (
        <div className="h-screen flex justify-center items-center flex-col">
            <div className="text-3xl font-extrabold">Create an account</div>
            <div className="text-slate-500">
                Already have an account?
                <Link className="pl-2 underline" to="/signin">
                    Login
                </Link>
            </div>
            <LabelledInput
                label="Name"
                placeholder="your name"
                onchange={(e) => {
                    setPostInputs({ ...postInputs, name: e.target.value });
                }}
            />
            <LabelledInput
                label="Email"
                placeholder="username@email.com"
                onchange={(e) => {
                    setPostInputs({ ...postInputs, email: e.target.value });
                }}
            />
            <LabelledInput
                label="Password"
                type="password"
                placeholder="your unique password"
                onchange={(e) => {
                    setPostInputs({ ...postInputs, password: e.target.value });
                }}
            />
            <button
                onClick={sendSignupRequest}
                type="button"
                className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 mt-2 w-2/3"
            >
                {loading ? "Loading..." : "Signup"}
            </button>
        </div>
    );
};

interface LabelledInputProps {
    label: string;
    placeholder: string;
    type?: string;
    onchange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function LabelledInput({
    label,
    placeholder,
    type,
    onchange,
}: LabelledInputProps) {
    return (
        <div className="w-2/3 m-1">
            <label
                htmlFor={label}
                className="block text-sm font-semibold text-gray-900 mb-1"
            >
                {label}
            </label>
            <input
                onChange={onchange}
                type={type || "text"}
                id={label}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder={placeholder}
                required
            />
        </div>
    );
}
