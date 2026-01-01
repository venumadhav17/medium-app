import type { SigninInput, SignupInput } from "@kvm17/mediumapp-common";
import { useState, type ChangeEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../pages/config";

// trpc -> type safety project
export const Auth = ({ type }: { type: "signup" | "signin" }) => {
  const navigate = useNavigate();
  // const [postInputs, setPostInputs] = useState<SignupInput>({
  //   name: "",
  //   username: "",
  //   password: ""
  // });
  const [postInputs, setPostInputs] = useState<SignupInput | SigninInput>(
    () =>
      type === "signup"
        ? { name: "", username: "", password: "" } // Signup
        : { username: "", password: "" } // Signin
  );

  async function sendRequest() {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`,
        postInputs
      );
      const jwt = response.data;
      localStorage.setItem("token", jwt);
      navigate("/blogs");
    } catch (error) {
      alert(error);
    }
  }

  return (
    <div className='h-screen justify-center flex flex-col'>
      <div className='flex justify-center'>
        <div>
          <div className='px-10'>
            <div className='text-3xl font-extrabold'>Create an account</div>

            <div className='text-slate-500 text-center mt-2'>
              {type === "signin"
                ? "Don't have an account?"
                : "Already have an account?"}
              <Link
                className='pl-2 underline'
                to={type === "signin" ? "/signup" : "/signin"}
              >
                {type === "signin" ? "Sign up" : "Sign in"}
              </Link>
            </div>
          </div>
          <div className='pt-4'>
            {type === "signup" ? (
              <LabelledInput
                label='Name'
                placeholder='Enter your username'
                onChange={(e) => {
                  setPostInputs((c) => ({
                    ...c,
                    name: e.target.value
                  }));
                }}
              />
            ) : null}
            <LabelledInput
              label='Username'
              placeholder='m@example.com'
              onChange={(e) => {
                setPostInputs({
                  ...postInputs,
                  username: e.target.value
                });
              }}
            />
            <LabelledInput
              label='Password'
              type='password'
              placeholder='123456'
              onChange={(e) => {
                setPostInputs({
                  ...postInputs,
                  password: e.target.value
                });
              }}
            />
            <button
              onClick={sendRequest}
              className='mt-8 bg-black hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md w-full'
            >
              {type === "signup" ? "Sign up" : "Sign in"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface LabelledInputType {
  label: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

function LabelledInput({
  label,
  placeholder,
  onChange,
  type
}: LabelledInputType) {
  return (
    <div>
      <div>
        <label className='block mb-2.5 text-sm text-black font-semibold pt-2'>
          {label}
        </label>
        <input
          onChange={onChange}
          type={type || "text"}
          id='first_name'
          className='bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body'
          placeholder={placeholder}
          required
        />
      </div>
    </div>
  );
}
