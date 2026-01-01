import { Link } from "react-router-dom";
import { Avatar } from "./BlogCard";

export const Appbar = () => {
  return (
    <div className='border-b border-slate-200 flex justify-between px-10 py-4'>
      <Link
        to={"/blogs"}
        className='flex flex-col justify-center cursor-pointer'
      >
        Medium
      </Link>
      <div>
        <Link to={"/publish"}>
          <button
            type='button'
            className='text-white bg-green-700 border rounded-full px-6 py-2 mx-6
          hover:bg-green-900 cursor-pointer'
          >
            New
          </button>
        </Link>
        <Avatar size={"big"} name='harkirat' />
      </div>
    </div>
  );
};
