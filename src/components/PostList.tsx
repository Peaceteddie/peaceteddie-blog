import { Center, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Post } from "./Post";

export default function PostList() {
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		getPosts();
	}, []);

	function getPosts() {
		fetch("/posts")
			.then((res: Response) => {
				res.json().then((items) => setPosts(items));
			})
			.catch((error) => {
				console.log(error.message);
			});
	}

	return (
		<Center>
			<VStack
				marginBlock={"5rem"}
				rowGap={"5rem"}
			>
				{posts.map((post) => (
					<Post
						post={post}
						key={post["_id"]}
					/>
				))}
			</VStack>
		</Center>
	);
}
