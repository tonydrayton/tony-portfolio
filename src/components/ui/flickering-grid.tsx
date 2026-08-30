"use client";

import { cn } from "@/lib/utils";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

interface FlickeringGridProps extends React.HTMLAttributes<HTMLDivElement> {
	squareSize?: number;
	gridGap?: number;
	flickerChance?: number;
	color?: string;
	width?: number;
	height?: number;
	className?: string;
	maxOpacity?: number;
	/**
	 * Pauses the flicker loop without unmounting. Several of these on one page
	 * with the loop always running is real compositing work, so callers should
	 * drive this from hover/in-view state.
	 */
	animate?: boolean;
}

export function FlickeringGrid({
	squareSize = 4,
	gridGap = 6,
	flickerChance = 0.3,
	color = "rgb(0, 0, 0)",
	width,
	height,
	className,
	maxOpacity = 0.2,
	animate = true,
	...props
}: FlickeringGridProps) {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const containerRef = useRef<HTMLDivElement>(null);
	const [isInView, setIsInView] = useState(false);
	const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });

	/* Round-trips the colour through a 1x1 canvas so any CSS colour works. */
	const rgbaPrefix = useMemo(() => {
		if (typeof window === "undefined") return "rgba(0, 0, 0,";

		const canvas = document.createElement("canvas");
		canvas.width = canvas.height = 1;
		const ctx = canvas.getContext("2d");
		if (!ctx) return "rgba(255, 0, 0,";

		ctx.fillStyle = color;
		ctx.fillRect(0, 0, 1, 1);
		const [r, g, b] = Array.from(ctx.getImageData(0, 0, 1, 1).data);
		return `rgba(${r}, ${g}, ${b},`;
	}, [color]);

	const setupCanvas = useCallback(
		(canvas: HTMLCanvasElement, w: number, h: number) => {
			/*
			 * Capped: a phone at dpr 3 means a 9x backing store for a purely
			 * decorative texture, and every square is filled at that scale.
			 */
			const dpr = Math.min(window.devicePixelRatio || 1, 2);
			canvas.width = w * dpr;
			canvas.height = h * dpr;
			canvas.style.width = `${w}px`;
			canvas.style.height = `${h}px`;

			const cols = Math.floor(w / (squareSize + gridGap));
			const rows = Math.floor(h / (squareSize + gridGap));
			const squares = new Float32Array(cols * rows);
			for (let i = 0; i < squares.length; i++) {
				squares[i] = Math.random() * maxOpacity;
			}

			return { cols, rows, squares, dpr };
		},
		[squareSize, gridGap, maxOpacity]
	);

	useEffect(() => {
		const canvas = canvasRef.current;
		const container = containerRef.current;
		if (!canvas || !container) return;

		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		let animationFrame = 0;
		let lastTime = 0;
		let grid = setupCanvas(canvas, canvasSize.width, canvasSize.height);

		const updateSquares = (deltaTime: number) => {
			for (let i = 0; i < grid.squares.length; i++) {
				if (Math.random() < flickerChance * deltaTime) {
					grid.squares[i] = Math.random() * maxOpacity;
				}
			}
		};

		const draw = () => {
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			for (let i = 0; i < grid.cols; i++) {
				for (let j = 0; j < grid.rows; j++) {
					const opacity = grid.squares[i * grid.rows + j];
					ctx.fillStyle = `${rgbaPrefix}${opacity})`;
					ctx.fillRect(
						i * (squareSize + gridGap) * grid.dpr,
						j * (squareSize + gridGap) * grid.dpr,
						squareSize * grid.dpr,
						squareSize * grid.dpr
					);
				}
			}
		};

		/* A flicker does not need 60fps, and halving the redraws halves the cost. */
		const frameInterval = 1000 / 30;

		const loop = (time: number) => {
			animationFrame = requestAnimationFrame(loop);
			if (time - lastTime < frameInterval) return;

			const deltaTime = (time - lastTime) / 1000;
			lastTime = time;

			updateSquares(deltaTime);
			draw();
		};

		if (canvasSize.width > 0 && canvasSize.height > 0) {
			draw();
			/* Paused instances draw one static frame instead of spinning at frame rate. */
			if (isInView && animate) animationFrame = requestAnimationFrame(loop);
		}

		const resizeObserver = new ResizeObserver(() => {
			const newWidth = width || container.clientWidth;
			const newHeight = height || container.clientHeight;
			grid = setupCanvas(canvas, newWidth, newHeight);
			setCanvasSize(previous =>
				previous.width === newWidth && previous.height === newHeight
					? previous
					: { width: newWidth, height: newHeight }
			);
		});
		resizeObserver.observe(container);

		return () => {
			cancelAnimationFrame(animationFrame);
			resizeObserver.disconnect();
		};
	}, [setupCanvas, rgbaPrefix, flickerChance, maxOpacity, squareSize, gridGap, width, height, isInView, animate, canvasSize.width, canvasSize.height]);

	useEffect(() => {
		const container = containerRef.current;
		if (!container) return;

		const intersectionObserver = new IntersectionObserver(
			([entry]) => setIsInView(entry.isIntersecting),
			{ threshold: 0 }
		);
		intersectionObserver.observe(container);

		const initialWidth = width || container.clientWidth;
		const initialHeight = height || container.clientHeight;
		setCanvasSize(previous =>
			previous.width === initialWidth && previous.height === initialHeight
				? previous
				: { width: initialWidth, height: initialHeight }
		);

		return () => intersectionObserver.disconnect();
	}, [width, height]);

	return (
		<div ref={containerRef} className={cn("h-full w-full", className)} {...props}>
			<canvas ref={canvasRef} className="pointer-events-none" aria-hidden="true" />
		</div>
	);
}
