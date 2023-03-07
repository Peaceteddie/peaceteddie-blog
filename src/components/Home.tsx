import { Center, Image } from "@chakra-ui/react";
import anime from "animejs/lib/anime.es";
import { useEffect, useMemo, useRef, useState } from "react";

export default function Home() {
	const multi = 2;
	const [dotSize] = useState(40);
	const [duration] = useState(130);
	const [grid] = useState([16 * multi, 9 * multi]);

	const images = [
		"https://cdn.pixabay.com/photo/2023/01/21/13/39/night-sky-7733876_1280.jpg",
		"https://cdn.pixabay.com/photo/2023/02/13/10/30/eye-7787024_1280.jpg",
		"https://cdn.pixabay.com/photo/2023/01/23/09/26/cat-7738210_1280.jpg",
		"https://cdn.pixabay.com/photo/2022/11/21/12/24/swan-7606921_1280.jpg",
		"https://cdn.pixabay.com/photo/2021/10/01/18/53/corgi-6673343_1280.jpg",
		"https://cdn.pixabay.com/photo/2023/01/30/23/09/bird-7756768_1280.jpg",
		"https://cdn.pixabay.com/photo/2023/01/21/02/40/cat-7732877_1280.jpg",
	];

	var toShow = 0;
	var opacity = false;
	var nextIndex = 0;

	var animation: any = useRef(null);
	var numberOfElements = useMemo(() => grid[0] * grid[1], [grid]);

	var imgs = {} as HTMLCollectionOf<Element>;
	var index = anime.random(0, numberOfElements - 1);

	const GridFrom = {
		grid: grid,
		from: index,
	};

	function play() {
		if (opacity) {
			if (!UpdateImages()) return anime.remove(animation);
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
						width: anime.stagger([dotSize / 1.5, dotSize + 1], GridFrom),
						height: anime.stagger([dotSize / 1.5, dotSize + 1], GridFrom),
						opacity: anime.stagger(
							[opacity ? 0 : 1, opacity ? 1 : 0],
							GridFrom
						),
						duration: duration,
					},
					{
						width: dotSize + 1,
						height: dotSize + 1,
						opacity: opacity ? 0 : 1,
						duration: duration * (opacity ? 4 : 10),
					},
					{
						duration: duration * (opacity ? 0 : 10),
					},
				],
				delay: anime.stagger(duration / (opacity ? 2 : 1), GridFrom),
			});

		index = nextIndex;
	}

	function UpdateImages() {
		if (!imgs[0]) {
			return false;
		}

		for (let index = 0; index < imgs.length; index++) {
			(imgs[index] as HTMLElement).hidden = index !== toShow;
		}

		return true;
	}

	function UpdateImgRefs() {
		imgs = document.getElementsByClassName("clip-image");
	}

	useEffect(() => {
		if (anime.running.length > 0) return;
		// eslint-disable-next-line react-hooks/exhaustive-deps
		UpdateImgRefs();
		UpdateImages();
		play();
	});

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
						loading={"eager"}
						key={index}
						position={"absolute"}
						src={value}
						zIndex="-1"
					></Image>
				))}
				<svg
					height={"0"}
					width={"0"}
				>
					<clipPath
						id="dot"
						opacity={1}
					>
						{[...Array(numberOfElements)].map((value, index) => (
							<rect
								className="dot"
								x={dotSize * (index % grid[0])}
								y={dotSize * Math.floor(1 + index / grid[0])}
								height={1 + dotSize}
								width={1 + dotSize}
								key={index}
							/>
						))}
					</clipPath>
				</svg>
			</Center>
		</Center>
	);
}
