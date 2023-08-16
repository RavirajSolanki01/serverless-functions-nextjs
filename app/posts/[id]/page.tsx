"use client";
import { Post } from "@/lib/data";
import moment from "moment";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const PostId = () => {
  const { id } = useParams();
  const router = useRouter();
  const [posts, setPosts] = useState<Post | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`/api/blogs/${id}`); // Replace with your API endpoint
        const jsonData = await response.json();
        setPosts(jsonData.post);
      } catch (error) {
        console.error("Error fetching data:", error);
      } 
    }
    fetchData();
  }, []);

  const handleEdit = () => {
    router.push(`/add-post/${id}`);
  };

  const handleDelete = () => {
    try {
      fetch(`/api/blogs/${id}`, { method: "DELETE" })
        .then((response) => response.json())
        .then(() => router.push("/posts"));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="p-10">
      <h3 className="text-4xl">{posts?.title}</h3>
      <br />
      <p className="text-xl text-slate-300 overflow-hidden">{posts?.desc}</p>
      <br />
      <br />
      <p>{moment(posts?.date).format("MMMM Do YYYY")}</p>
      <div className="flex gap-2">
        <button
          onClick={handleEdit}
          className="rounded-md bg-yellow-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default PostId;
