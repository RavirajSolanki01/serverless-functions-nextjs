import { addPost, getPosts } from "@/lib/data";
import moment from "moment";
import { NextResponse } from "next/server";

export const GET = async (req: Request, res: Response) => {
  try {
    const posts = getPosts();
    return NextResponse.json(
      { message: "OK", posts },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error", error },
      {
        status: 500,
      }
    );
  }
};

export const POST = async (req: Request) => {
  const { title, desc } = await req.json();

  try {
    const post = {
      title,
      desc,
      date: moment(Date()).toISOString(),
      id: Date.now().toString(),
    };
    addPost(post);
    return NextResponse.json(
      { message: "OK", post },
      {
        status: 201,
      }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error", error },
      {
        status: 500,
      }
    );
  }
};
