import { Center, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Post } from "./Post";

export default function PostList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts();
  }, []);

  function getPosts() {
    fetch("http://localhost:5000/posts/").then(
      (res: Response) => {
        res.json().then((items) => setPosts(items));
      },
      (reason: any) => window.alert("An error occurred: " + reason)
    );
  }

  return (
    <Center>
      <VStack rowGap={5}>
        {posts.map((post) => (
          <Post post={post} />
        ))}
      </VStack>
    </Center>
  );
}
