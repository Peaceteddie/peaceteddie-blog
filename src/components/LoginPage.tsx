import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Center, Heading, VStack } from "@chakra-ui/layout";
import useStyles from "../styles/style_login";
import "../styles/style_login.scss";

export default function LoginPage() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const { buttonStyle, inputStyle } = useStyles();

	const navigate = useNavigate();

	async function logIn() {
		try {
			await signInWithEmailAndPassword(getAuth(), email, password);
			navigate("/");
		} catch (e: any) {
			setError(e.message);
		}
	}

	return (
		<Center>
			<VStack rowGap={5}>
				<Heading m={10}>Log In</Heading>
				{error && <p>{error}</p>}
				<input
					className="login"
					type="email"
					placeholder="Your email address"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					style={inputStyle}
				/>
				<input
					className="login"
					type="password"
					placeholder="Your password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					style={inputStyle}
				/>
				<button
					className="login"
					onClick={logIn}
					style={buttonStyle}
				>
					Log In
				</button>
			</VStack>
		</Center>
	);
}
