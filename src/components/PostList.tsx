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
			.catch(() => {
				let items: any = [
					{
						author: "Peaceteddie",
						content: "Another sunny day in paradise",
					},
					{
						author: "Gandalf",
						content: "You shall not pass",
					},
					{
						author: "Frodo",
						content: "I Shall Not Tell Lies",
					},
				];
				setPosts(items);
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
