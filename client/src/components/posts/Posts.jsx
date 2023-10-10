import Post from "../post/Post";
import "./posts.scss";
import { makeRequest } from "../../axios";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const Posts = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState([]);
  const [error, setError] = useState([]);
  const getPosts = async () => {
    await makeRequest
    .get("/posts")
    .then((response) => {
      setData(response.data.reverse());
    })
    .catch((error) => {
      setError(error);
    });
  }
  useEffect(()=> {
    getPosts();
    
  }, [])
  // const { isLoading, error, data } = useQuery({
  //   queryKey: ['posts'],
  //   queryFn: () =>
  //     axios.get('http://localhost:8800/api/posts').then(
  //       (res) => res.json(),
  //     ),
  // })
  // console.log(`data :${data}`);
  // console.log(`error :${error}`);
  return (
    <div className="posts">
      {data.map((post) => <Post post={post} key={post.id} />)}
    </div>
  );
};

export default Posts;
