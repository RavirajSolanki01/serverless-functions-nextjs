import moment from "moment";

export type Post = {
  id: string;
  title: string;
  desc: string;
  date: string;
};

let posts: Post[] = [
  {
    id: "1",
    title: "Example title",
    date: moment(Date()).toISOString(),
    desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Hic, quibusdam. Corrupti labore dignissimos deserunt provident sequi ab amet soluta ipsam illo porro. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Hic, quibusdam. Corrupti labore dignissimos deserunt provident sequi ab amet soluta ipsam illo porro. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Hic, quibusdam. Corrupti labore dignissimos deserunt provident sequi ab amet soluta ipsam illo porro.",
  },
];
export const getPosts = () => posts;

export const addPost = (post: Post) => {
  posts.push(post);
};

export const deletePost = (id: string) => {
  posts = posts.filter((post) => post.id !== id);
};

export const updatePost = (id: string, title: string, desc: string) => {
  const post = posts.find((post) => post.id === id);
  if (post) {
    post.title = title;
    post.desc = desc;
  } else {
    throw new Error("NO POST FOUND");
  }
};
export const getById = (id: string) => {
  return posts.find((post) => post.id === id);
};
