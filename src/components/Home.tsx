import { Center, Image } from "@chakra-ui/react";
import anime from "animejs/lib/anime.es";
import { useEffect, useMemo, useRef, useState } from "react";

export default function Home() {
	const multi = 2;
	const [dotMargin] = useState(10);
	const [duration] = useState(100);
	const [dotSize] = useState(10);
	const [grid] = useState([16 * multi, 9 * multi]);

	var animation: any = useRef(null);
	var numberOfElements = useMemo(() => grid[0] * grid[1], [grid]);
	var index = anime.random(0, numberOfElements - 1);

	const images = [
		"https://cdn.pixabay.com/photo/2023/01/21/13/39/night-sky-7733876_960_720.jpg",
		"https://cdn.pixabay.com/photo/2023/02/13/10/30/eye-7787024_1280.jpg",
		"https://cdn.pixabay.com/photo/2023/01/23/09/26/cat-7738210_1280.jpg",
	];

	var toShow = 0;
	var opacity = false;
	var nextIndex = 0;
	var imgs: NodeListOf<Element>;

	function play() {
		if (opacity) {
			UpdateImages();
		}

		opacity = !opacity;
		toShow = anime.random(0, images.length - 1);
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
						height: anime.stagger(
							[dotMargin + dotSize, (dotMargin + dotSize) / 2],
							{
								grid: grid,
								from: index,
							}
						),
						width: anime.stagger(
							[dotMargin + dotSize, (dotMargin + dotSize) / 2],
							{
								grid: grid,
								from: index,
							}
						),
						/* r: anime.stagger(
							[dotMargin + dotSize, (dotMargin + dotSize) / 2],
							{
								grid: grid,
								from: index,
							}
						), */
						opacity: anime.stagger([opacity ? 0 : 1, opacity ? 1 : 0], {
							grid: grid,
							from: index,
						}),
						duration: duration,
					},
					{
						//r: (dotMargin + dotSize) / 2,
						height: dotMargin + dotSize,
						width: dotMargin + dotSize,
						opacity: opacity ? 0 : 1,
						duration: duration,
					},
				],
				delay: anime.stagger(duration / 2, { grid: grid, from: index }),
			});

		index = nextIndex;
	}

	function UpdateImages() {
		imgs.forEach((x, key) => {
			if (key === toShow) {
				(x as HTMLElement).hidden = false;
			} else {
				(x as HTMLElement).hidden = true;
			}
		});
	}

	useEffect(() => {
		if (anime.running.length > 0) return;

		imgs = document.querySelectorAll(".clip-image");
		UpdateImages();
		play();
	}, [null]);

	return (
		<Center
			height="80vh"
			width="100%"
		>
			<Center
				alignContent={"center"}
				alignItems={"center"}
				alignSelf={"center"}
				justifyContent={"center"}
				justifyItems={"center"}
				justifySelf={"center"}
				height="100%"
				width="100%"
			>
				{[...images].map((value, index) => (
					<Image
						className="clip-image"
						clipPath={"url(#dot)"}
						left="25%"
						loading={"eager"}
						key={index}
						position={"absolute"}
						src={value}
						zIndex="-1"
					></Image>
				))}
				<svg
					height={(dotMargin * 2 + dotSize) * grid[0]}
					width={(dotMargin * 2 + dotSize) * grid[1]}
					viewBox={`0 0 ${dotSize} ${dotSize}`}
				>
					<clipPath
						id="dot"
						opacity={1}
					>
						{[...Array(numberOfElements)].map((value, index) => (
							<rect
								className="dot"
								x={
									dotMargin +
									dotSize +
									(dotMargin * 2 + dotSize) * (index % grid[0])
								}
								y={
									dotMargin +
									dotSize +
									(dotMargin * 2 + dotSize) * Math.floor(1 + index / grid[0])
								}
								key={index}
								height={dotMargin + dotSize}
								width={dotMargin + dotSize}
								/* r={(dotMargin + dotSize) / 2} */
							/>
						))}
					</clipPath>
				</svg>
			</Center>
		</Center>
	);
}
