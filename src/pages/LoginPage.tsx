import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default function LoginPage() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

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
		<>
			<h1>Log In</h1>
			{error && <p>{error}</p>}
			<input
				type="email"
				placeholder="Your email address"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
			/>
			<input
				type="password"
				placeholder="Your password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
			/>
			<button onClick={logIn}>Log In</button>
			<Link to="/register">Create Account</Link>
		</>
	);
}
