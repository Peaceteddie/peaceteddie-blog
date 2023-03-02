import {
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	Flex,
	useColorModeValue,
} from "@chakra-ui/react";
import ReactMarkdown from "react-markdown";

export function Post({ post }: any) {
	const textColor = useColorModeValue("white", "white");

	function created() {
		let date = new Date(post.created);
		return (
			"Created: " +
			(date.toString() === "Invalid Date"
				? "Long time ago"
				: date.toLocaleDateString())
		);
	}

	return (
		<Card
			color={textColor}
			minWidth={"35rem"}
			padding={2}
		>
			<CardHeader
				bgColor={"teal.600"}
				borderTopRadius={".3rem"}
				boxShadow={"0 1px white inset"}
				color={textColor}
			>
				<h2>{post.language}</h2>
			</CardHeader>
			<CardBody
				bgColor={"teal.700"}
				color={textColor}
				paddingBlock={"2rem"}
			>
				<ReactMarkdown>{post.content}</ReactMarkdown>
			</CardBody>
			<CardFooter
				bgColor={"teal.800"}
				borderBottomRadius={".3rem"}
				boxShadow={"0 -1px black inset"}
				color={textColor}
			>
				<Flex grow={1}>{created()}</Flex>
				<Flex
					grow={1}
					justify={"end"}
				>
					{post.author}
				</Flex>
			</CardFooter>
		</Card>
	);
}
