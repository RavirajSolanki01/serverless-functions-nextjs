"use client";
import { Post } from "@/lib/data";
import moment from "moment";
import Link from "next/link";
import { useEffect, useState } from "react";

const Posts = () => {
  const [posts, setPosts] = useState<Post[]>();
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/blogs"); // Replace with your API endpoint
        const jsonData = await response.json();
        console.log(jsonData, "jsonData");
        setPosts(jsonData.posts);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        // setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="mt-2 p-2">
      <div className="mb-2">
        Want to add a new Blog? &nbsp;
        <Link href={"/add-post/add"} className="text-blue-400">
          {" "}
          Click here
        </Link>
      </div>
      <div className="flex flex-col gap-2">
        {!posts?.length ? (
          <>No posts found</>
        ) : (
          posts?.map(({ date, desc, id, title }) => (
            <div
              key={id}
              className="p-5 border-zinc-400 border-2 rounded-lg min-w-10 hover:border-white"
            >
              <Link href={`/posts/${id}`}>
                <h3 className="text-4xl">{title}</h3>
                <p
                  className="text-xl text-slate-300 overflow-hidden"
                  style={{
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: 3,
                  }}
                >
                  {desc}
                </p>
                <p>{moment(date).format("MMMM Do YYYY")}</p>
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Posts;
