import { HStack, Center } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export function TopNavBar() {
  return (
    <nav>
      <Center m={"2rem"}>
        <HStack fontSize={"1.5rem"} gap={"2rem"}>
          <Link to={"/"}>Home</Link>
          <Link to={"/posts"}>Posts</Link>
        </HStack>
      </Center>
    </nav>
  );
}
