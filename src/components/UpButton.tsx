import { Button } from "@chakra-ui/react";
import { ArrowUpIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

export function UpButton(props: any) {
	const navigate = useNavigate();
	function MoveUp(e: MouseEvent): void {
		e.ctrlKey
			? navigate("/login")
			: window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
	}

	return (
		<Button
			{...props}
			onClick={MoveUp}
		>
			<ArrowUpIcon />
		</Button>
	);
}
