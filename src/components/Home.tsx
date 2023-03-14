import { Box, Center, Image, useColorModeValue } from "@chakra-ui/react";
import anime from "animejs/lib/anime.es";
import { useEffect, useRef, useState } from "react";

export default function Home() {
	const multi = 1;
	const divisor = 32;
	const duration = 100;
	const animation = useRef<anime.AnimeInstance | null>(null);
	const OverlayBox = useColorModeValue(
		"hsla(0, 100%, 95%, 100%)",
		"hsla(0, 100%, 95%, 10%)"
	);
	const ThemeShadow =
		"0px 5px 10px 0px black, 0px 2px 5px 0px lightgray inset, 0px -2px 5px 0px black inset";
	const ReverseShadow =
		"2px 3px 5px 0px black inset, -2px -3px 5px 0px black inset";

	const grid = [768 / divisor, 512 / divisor];
	const elementCount = grid[0] * grid[1];

	const dotHeight = (multi * 512) / grid[1];
	const dotWidth = (multi * 768) / grid[0];

	var opacity = false;
	var [images, setImages] = useState([]);
	var imgs = {} as HTMLCollectionOf<Element>;
	var index = anime.random(0, elementCount - 1);

	function UpdateImages() {
		if (!imgs[0]) {
			return UpdateImgRefs();
		}

		let toShow = anime.random(0, imgs.length - 1);
		for (let index = 0; index < imgs.length; index++) {
			(imgs[index] as HTMLElement).hidden = index !== toShow;
		}

		return true;
	}

	function UpdateImgRefs() {
		imgs = document.getElementsByClassName("clip-image");
		return imgs.length > 0;
	}

	function Play() {
		if (opacity && !UpdateImages()) return anime.remove(animation.current);

		opacity = !opacity;

		const GridFrom = {
			grid: grid,
			from: index,
		};

		index = anime.random(0, elementCount - 1);

		animation.current = anime
			.timeline({
				easing: "easeInOutQuad",
				complete: Play,
			})
			.add({
				targets: ".dot",
				keyframes: [
					{
						width: anime.stagger([dotWidth / 1.5, dotWidth + 1], GridFrom),
						height: anime.stagger([dotHeight / 1.5, dotHeight + 1], GridFrom),
						opacity: anime.stagger(
							[opacity ? 0 : 1, opacity ? 1 : 0],
							GridFrom
						),
						duration: duration,
					},
					{
						width: dotWidth + 1,
						height: dotHeight + 1,
						opacity: opacity ? 0 : 1,
						duration: duration * (opacity ? 4 : 10),
					},
					{
						duration: duration * (opacity ? 0 : 10),
					},
				],
				delay: anime.stagger(duration / (opacity ? 2 : 1), GridFrom),
			});
	}

	useEffect(() => {
		if (anime.running.length > 0) return;

		fetch("/api/images").then((value) =>
			value.json().then((json) => {
				setImages(json.images);
			})
		);

		UpdateImgRefs();
		UpdateImages();
		Play();
	});

	return (
		<Center
			height={"80vh"}
			width={"100%"}
		>
			<Center
				height="100%"
				width="100%"
			>
				<Box
					backgroundColor={OverlayBox}
					backdropBlur={"100px"}
					borderRadius={"20px"}
					boxShadow={ThemeShadow}
					height={32 + 512 * multi}
					opacity={".5"}
					width={32 + 768 * multi}
				></Box>
				<Box
					backgroundColor={OverlayBox}
					backdropBlur={"100px"}
					borderRadius={"20px"}
					boxShadow={ReverseShadow}
					height={3 + 512 * multi}
					opacity={".5"}
					position={"absolute"}
					width={3 + 768 * multi}
				></Box>
				{[...images].map((value, index) => (
					<Image
						borderRadius={"20px"}
						className={"clip-image"}
						clipPath={"url(#dot)"}
						height={512 * multi}
						hidden
						key={index}
						objectFit={"cover"}
						position={"absolute"}
						src={value}
						width={768 * multi}
					></Image>
				))}
				<svg
					height={0}
					width={0}
				>
					<clipPath
						id="dot"
						opacity={1}
					>
						{[...Array(elementCount)].map((_value, index) => (
							<rect
								key={index}
								className={"dot"}
								x={dotWidth * (index % grid[0])}
								y={dotHeight * Math.floor(index / grid[0])}
								height={1 + dotHeight}
								width={1 + dotWidth}
							/>
						))}
					</clipPath>
				</svg>
			</Center>
		</Center>
	);
}
