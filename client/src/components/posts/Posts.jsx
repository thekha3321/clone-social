import Post from "../post/Post";
import "./posts.scss";
import { makeRequest } from "../../axios";
import { useEffect, useState } from "react";

const Posts = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState([]);
  const [error, setError] = useState([]);
  const getPosts = async () => {
    await makeRequest
    .get("/posts")
    .then((response) => {
      setData(response.data);
    })
    .catch((error) => {
      setError("Lỗi:", error);
    });
  }
  useEffect(()=> {
    getPosts();
  }, [])
  return (
    <div className="posts">
      {data.map((post) => <Post post={post} key={post.id} />)}
    </div>
  );
};

export default Posts;
