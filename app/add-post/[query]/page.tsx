"use client";

import { Post } from "@/lib/data";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Example() {
  const router = useRouter();
  const { query } = useParams();
  const [post, setPost] = useState<Post>({
    date: "",
    desc: "",
    id: "",
    title: "",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (query !== "add") {
      console.log(query);

      const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: post.title, desc: post.desc }),
      };
      try {
        fetch(`/api/blogs/${query}`, requestOptions)
          .then((response) => response.json())
          .then((data) => console.log(data))
          .then(() => router.push("/posts"));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    } else {
      const formData = new FormData(e.currentTarget);
      const username = formData.get("username");
      const desc = formData.get("desc");

      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: username, desc: desc }),
      };
      try {
        fetch("/api/blogs", requestOptions)
          .then((response) => response.json())
          .then((data) => console.log(data))
          .then(() => router.push("/posts"));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`/api/blogs/${query}`); // Replace with your API endpoint
        const jsonData = await response.json();
        console.log(jsonData, "jsonDataquery");
        setPost(jsonData.post);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        // setLoading(false);
      }
    }
    if (query !== "add") {
      fetchData();
    }
  }, []);
  console.log(post);
  

  return (
    <div className="flex justify-center p-2 w-full">
      <form className="w-[60%]" onSubmit={handleSubmit}>
        <div className="space-y-12">
          <div className="border-b border-gray-50 pb-12">
            <p className="mt-1 text-sm leading-6">
              You can write a new blog and save.
            </p>

            <div className="mt-10 grid grid-cols-3 gap-x-6 gap-y-8 ">
              <div className="col-span-6 sm:col-span-11">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium leading-6 "
                >
                  Title
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 w-full">
                    <input
                      onChange={(e) =>
                        setPost((p) => ({ ...p, title: e.target.value }))
                      }
                      type="text"
                      name="username"
                      id="title"
                      autoComplete="username"
                      className="block  w-full flex-1 border-0 bg-transparent py-1.5 pl-1 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="Title goes here"
                      value={post?.title}
                    />
                  </div>
                </div>
              </div>

              <div className="col-span-6 sm:col-span-11">
                <label
                  htmlFor="desc"
                  className="block text-sm font-medium leading-6 "
                >
                  Description
                </label>
                <div className="mt-2 ">
                  <textarea
                    onChange={(e) =>
                      setPost((p) => ({ ...p, desc: e.target.value }))
                    }
                    value={post?.desc}
                    id="desc"
                    name="desc"
                    rows={3}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300   sm:text-sm sm:leading-6"
                    placeholder="i.g. lorem"
                  />
                </div>
                <p className="mt-3 text-sm leading-6 text-gray-300">
                  Write a few sentences about your blog.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
