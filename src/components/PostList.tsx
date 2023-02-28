import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Center,
  Spacer,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

function Post({ post }: any) {
  return (
    <Card>
      <CardHeader bgColor={"blackAlpha.600"}></CardHeader>
      <CardBody>
        <img src="https://via.placeholder.com/800x500" />
        {post.content}
      </CardBody>
      <CardFooter bgColor={"blackAlpha.300"}>{post.author}</CardFooter>
    </Card>
  );
}

export default function PostList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts();
  }, [posts.length]);

  async function getPosts() {
    await fetch("http://localhost:5000/posts/").then(
      (res: Response) => {
        res.json().then((items) => setPosts(items));
      },
      (reason: any) => window.alert("An error occurred: " + reason)
    );
  }

  return (
    <Center>
      <VStack rowGap={5}>
        {posts ? posts.map((post) => <Post post={post} />) : "Loading..."}
      </VStack>
    </Center>
  );
}
