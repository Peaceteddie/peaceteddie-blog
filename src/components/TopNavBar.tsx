import { Center, HStack } from "@chakra-ui/react";
import { getAuth, signOut } from "firebase/auth";
import { Link } from "react-router-dom";
import useUser from "../hooks/useUser";

export function TopNavBar() {
	const { user, isLoading } = useUser();

	const Logout = () =>
		signOut(getAuth())
			.then((value) => {})
			.catch((error) => {});

	return (
		<nav>
			<Center m={"2rem"}>
				<HStack
					fontSize={"1.5rem"}
					gap={"2rem"}
				>
					<Link to={"/"}>Home</Link>
					<Link to={"/posts"}>Posts</Link>
					{user ? <Link to={"/create"}>Add post</Link> : null}
					{user ? <button onClick={Logout}>Log out</button> : null}
				</HStack>
			</Center>
		</nav>
	);
}
