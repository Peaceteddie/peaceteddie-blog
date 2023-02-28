import { Card, CardBody, CardFooter, CardHeader } from "@chakra-ui/react";

export function Post({ post }: any) {
  return (
    <Card>
      <CardHeader bgColor={"blackAlpha.600"}></CardHeader>
      <CardBody>
        <img src="https://via.placeholder.com/800x500" loading="lazy" height={"500"} width={"800"} />
        {post.content}
      </CardBody>
      <CardFooter bgColor={"blackAlpha.300"}>{post.author}</CardFooter>
    </Card>
  );
}
