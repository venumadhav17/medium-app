import axios from "axios";
import { Appbar } from "../components/Appbar";
import { BACKEND_URL } from "./config";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Publish = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  return (
    <div className=''>
      <Appbar />
      <div className='px-20 py-10'>
        <label className='block mb-2 text-4xl font-bold text-heading text-slate-400 mt-6'>
          Your Text
        </label>
        <textarea
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          className='pt-4 pl-1 text-xl font-normal bg-neutral-secondary-medium w-full placeholder:text-body outline-none'
          placeholder='Title'
        ></textarea>
        <TextEditor
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
        <button
          onClick={async () => {
            const response = await axios.post(
              `${BACKEND_URL}/api/v1/blog`,
              {
                title,
                content: description
              },
              {
                headers: {
                  Authorization: localStorage.getItem("token")
                }
              }
            );
            navigate(`/blog/${response.data.id}`);
          }}
          type='submit'
          className='mt-4 inline-flex items-center px-5 py-2.5 text-sm font-medium text-center bg-blue-700 text-white rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800'
        >
          Publish Post
        </button>
      </div>
    </div>
  );
};

function TextEditor({
  onChange
}: {
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}) {
  return (
    <div>
      <div className='w-full'>
        <div className='flex items-center justify-between'>
          <div className='my-0 bg-white rounded-b-lg w-full'>
            <textarea
              onChange={onChange}
              id='editor'
              rows={8}
              className='focus:outline-none block w-full px-0 text-sm text-gray-800 bg-white border-none pl-2'
              placeholder='Write an article...'
              required
            />
          </div>
        </div>
      </div>
    </div>
  );
}
