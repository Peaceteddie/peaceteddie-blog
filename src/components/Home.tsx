import { Center, Flex, useColorModeValue } from "@chakra-ui/react";
import anime from "animejs/lib/anime.es";
import { useEffect, useMemo, useRef, useState } from "react";

export default function Home() {
	const [dotMargin] = useState(10);
	const [duration] = useState(200);
	const [dotSize] = useState(10);
	const [grid] = useState([60, 10]);
	const dotColor = useColorModeValue("black", "white");

	var animation: any = useRef(null);
	var numberOfElements = useMemo(() => grid[0] * grid[1], [grid]);
	var index = anime.random(0, numberOfElements - 1);

	var nextIndex = 0;
	function play() {
		nextIndex = anime.random(0, numberOfElements - 1);

		animation.current = anime
			.timeline({
				easing: "easeInOutQuad",
				complete: play,
			})
			.add({
				targets: ".dot",
				keyframes: [
					{
						translateX: anime.stagger("-1px", {
							grid: grid,
							from: index,
							axis: "x",
						}),
						translateY: anime.stagger("-1px", {
							grid: grid,
							from: index,
							axis: "y",
						}),
						duration: duration,
					},
					{
						translateX: anime.stagger("1px", {
							grid: grid,
							from: index,
							axis: "x",
						}),
						translateY: anime.stagger("1px", {
							grid: grid,
							from: index,
							axis: "y",
						}),
						scale: anime.stagger([3, 1], { grid: grid, from: index }),
						duration: duration,
					},
					{
						translateX: 0,
						translateY: 0,
						scale: 1,
						duration: duration,
					},
				],
				delay: anime.stagger(duration / 2, { grid: grid, from: index }),
			});

		index = nextIndex;
	}

	useEffect(() => {
		if (anime.running.length > 0) return;
		play();
	}, [null]);

	return (
		<Center
			height="80vh"
			width="100%"
		>
			<Center
				flexWrap={"wrap"}
				width={(dotMargin + dotMargin + dotSize) * grid[0] + "px"}
			>
				{[...Array(numberOfElements)].map((value, index) => (
					<Flex
						className="dot"
						key={index}
						bgColor={dotColor}
						borderRadius={"50%"}
						height={dotSize + "px"}
						margin={dotMargin + "px"}
						padding={"0"}
						position={"relative"}
						width={dotSize + "px"}
					></Flex>
				))}
			</Center>
		</Center>
	);
}
