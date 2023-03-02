import { HStack, Center } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import useUser from "../hooks/useUser";

export function TopNavBar() {
	const { user, isLoading } = useUser();
	function Logout() {}

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
