import { Button } from "@chakra-ui/react";
import { ArrowUpIcon } from "@chakra-ui/icons";

export function UpButton(props: any) {
  function MoveUp(): void {
    window.scrollTo(window.scrollX, 0);
  }

  return (
    <Button {...props} onClick={MoveUp}>
      <ArrowUpIcon />
    </Button>
  );
}
