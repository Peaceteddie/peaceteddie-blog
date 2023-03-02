import { useColorModeValue } from "@chakra-ui/react";
export default function useStyles() {
	var inputColor = useColorModeValue("gray", "white");
	var gradient = useColorModeValue(
		"transparent -30%, darkgray 300%",
		"darkgray -130%, transparent 130%"
	);

	const inputStyle = {
		color: `${inputColor}`,
	};

	const buttonStyle = {
		background: `linear-gradient(${gradient})`,
	};

	return { inputStyle, buttonStyle };
}
