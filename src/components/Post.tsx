import { Card, CardBody, CardFooter, CardHeader } from "@chakra-ui/react";

export function Post({ post }: any) {
  function created() {
    let date = new Date(post.created).toUTCString();
    return "Created: " + (date == "Invalid Date" ? "Long time ago" : date);
  }

  return (
    <Card>
      <CardHeader bgColor={"blackAlpha.600"}>{created()}</CardHeader>
      <CardBody>
        <img
          src="https://via.placeholder.com/800x500"
          loading="lazy"
          height={"500"}
          width={"800"}
        />
        {post.content}
      </CardBody>
      <CardFooter bgColor={"blackAlpha.300"}>{post.author}</CardFooter>
    </Card>
  );
}
