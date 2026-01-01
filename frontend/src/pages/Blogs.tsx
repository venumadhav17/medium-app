import { Appbar } from "../components/Appbar";
import { BlogCard } from "../components/BlogCard";
import { BlogSkeleton } from "../components/BlogSkeleton";
import { useBlogs } from "../hooks";

export const Blogs = () => {
  const { loading, blogs } = useBlogs();

  if (loading) {
    return (
      <div className='flex flex-col justify-content items-center'>
        <Appbar />
        <div>
          <BlogSkeleton />
          <BlogSkeleton />
          <BlogSkeleton />
          <BlogSkeleton />
          <BlogSkeleton />
          <BlogSkeleton />
          <BlogSkeleton />
        </div>
      </div>
    );
  }
  return (
    <div>
      <Appbar />
      <div className='flex justify-center pl-20'>
        <div>
          {blogs.map((blog) => (
            <BlogCard
              id={blog.id}
              authorName={blog.author.name || "Anonymous"}
              title={blog.title}
              content={blog.content}
              publishedDate={"2nd Feb 2024"}
            />
          ))}

          {/* <BlogCard
            authorName={"Harkirat"}
            title={
              "How an ugly single page website makes $5000 a month without affiliate marketing"
            }
            content={
              "How an ugly single page website makes $5000 a month without affiliate marketing"
            }
            publishedDate={"2nd Feb 2024"}
          />
          <BlogCard
            authorName={"Harkirat"}
            title={
              "How an ugly single page website makes $5000 a month without affiliate marketing"
            }
            content={
              "How an ugly single page website makes $5000 a month without affiliate marketing"
            }
            publishedDate={"2nd Feb 2024"}
          /> */}
        </div>
      </div>
    </div>
  );
};
