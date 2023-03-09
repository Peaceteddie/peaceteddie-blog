import {
	Button,
	Center,
	Divider,
	Flex,
	FormLabel,
	Hide,
	Input,
	InputGroup,
	Select,
	Show,
	Text,
	Textarea,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { useNavigate } from "react-router-dom";
import useUser from "../hooks/useUser";

export default function CreatePost() {
	const { user } = useUser();
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [language, setLanguage] = useState("");
	const [error, setError] = useState("");
	const [lastError, setLastError] = useState("");
	const [color, setColor] = useState("gray.900");
	const [delay, setDelay] = useState("0s");
	const navigate = useNavigate();

	useEffect(() => {
		if (!error) return;
		setDelay("0s");
		setLastError(error);
		setColor("red.900");
		const timeout = setTimeout(() => {
			clearTimeout(timeout);
			setColor("gray.900");
			setDelay("500ms");
			setError("");
		}, 200);
	}, [error]);

	if (!user) return null;

	var author = user?.email?.split("@")[0] || "";
	author = author.charAt(0).toUpperCase() + author?.slice(1);

	const languages = ["Python", "React"];

	async function checkUser() {
		const token = user && (await user.getIdToken());
		const headers = token ? { authtoken: token } : {};
		return headers;
	}

	async function onSubmit() {
		axios
			.post(
				"/posts/add",
				{
					author,
					content,
					language,
					title,
				},
				{ headers: await checkUser() }
			)
			.then((value) =>
				value.status === 200
					? navigate("/posts")
					: setError("Post failed: " + value.statusText)
			)
			.catch((err) => {
				setError("Post failed: " + err.message);
			});
	}

	return (
		<Center
			blockSize={{ lg: "2xl", base: "4xl" }}
			flexDirection={{ lg: "row", base: "column" }}
			gap={"1rem"}
			marginBlock={"5rem"}
			paddingInline={"5rem"}
		>
			<InputGroup
				bgColor={color}
				display="flex"
				flexDirection={"column"}
				height={{ base: "50%", lg: "100%" }}
				justifyContent={"space-between"}
				padding={"1rem"}
				rowGap={{ lg: "1rem", base: ".5rem" }}
				transition={"all ease " + delay}
				width={{ lg: "50%", base: "100%" }}
			>
				<Text
					align={"center"}
					fontWeight="semibold"
				>
					Author: {author}
				</Text>
				<Text align={"center"}>{lastError}</Text>
				<FormLabel>
					Title:
					<Input
						onChange={(e) => setTitle(e.target.value)}
						type="text"
						value={title}
					/>
				</FormLabel>
				<FormLabel>
					Language:
					<Select
						onChange={(e) => setLanguage(e.target.value)}
						value={language}
					>
						<option value=""></option>
						{[...languages].map((value) => (
							<option
								key={value}
								value={value}
							>
								{value}
							</option>
						))}
					</Select>
				</FormLabel>
				<Flex
					direction={"column"}
					flexGrow={1}
				>
					<FormLabel flexGrow={1}>
						Post:
						<Textarea
							height={"90%"}
							onChange={(e) => setContent(e.target.value)}
							resize={"none"}
							value={content}
						/>
					</FormLabel>
				</Flex>
				<Button onClick={onSubmit}>Add Post</Button>
			</InputGroup>
			<Show above={"lg"}>
				<Divider orientation={"vertical"} />
			</Show>
			<Hide above={"lg"}>
				<Divider
					orientation={"horizontal"}
					width="100%"
				/>
			</Hide>
			<Flex
				bgColor={"rgba(255,255,255,0.1)"}
				border={".5rem"}
				borderStyle={"solid"}
				borderColor={"rgba(255,255,255,0.1)"}
				flexDirection={"column"}
				height={{ base: "50%", lg: "100%" }}
				overflow={"auto"}
				padding={"2rem"}
				width={{ lg: "50%", base: "100%" }}
			>
				<h1>{language}</h1>
				<Divider
					marginBottom={"1rem"}
					marginTop={".2rem"}
				/>
				<h2>{title}</h2>
				<Divider
					marginBottom={"1rem"}
					marginTop={".2rem"}
				/>
				<ReactMarkdown>{content}</ReactMarkdown>
			</Flex>
		</Center>
	);
}
