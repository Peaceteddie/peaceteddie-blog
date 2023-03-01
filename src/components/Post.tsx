import { Card, CardBody, CardFooter, CardHeader } from "@chakra-ui/react";

export function Post({ post }: any) {
	let sBlur = "1px";
	let sLength = "-2px";
	let sStretch = "-1px";

	let bRadius = "8px";
	let bShadow = `0 ${sLength} ${sBlur} black inset, 0 ${sLength} ${sBlur} ${sStretch} white`;

	function created() {
		let date = new Date(post.created).toUTCString();
		return "Created: " + (date === "Invalid Date" ? "Long time ago" : date);
	}

	return (
		<Card
			rowGap={".1rem"}
			minHeight={"20rem"}
			minWidth={"35rem"}
			borderRadius={bRadius}
		>
			<CardHeader
				bgColor={"teal.600"}
				borderRadius={bRadius}
				boxShadow={bShadow}
			>
				{post.author}
			</CardHeader>
			<CardBody
				bgColor={"teal.700"}
				borderRadius={bRadius}
				boxShadow={bShadow}
			>
				{post.content}
			</CardBody>
			<CardFooter
				bgColor={"teal.800"}
				borderRadius={bRadius}
				boxShadow={bShadow}
			>
				{created()}
			</CardFooter>
		</Card>
	);
}
