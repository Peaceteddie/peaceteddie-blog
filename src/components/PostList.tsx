import { Center, ListItem, UnorderedList } from "@chakra-ui/react";

function PostList() {
  return (
    <Center>
      <UnorderedList>
        {[
          [...Array(10)].map((value, index) => (
            <ListItem key={index}>{index} Hello World</ListItem>
          )),
        ]}
      </UnorderedList>
    </Center>
  );
}

export default PostList;
