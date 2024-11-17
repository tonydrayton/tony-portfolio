import { Variants } from "framer-motion";

export const fadeInVariants: Variants = {
	offscreen: {
		opacity: 0,
		y: 300
	},
	onscreen: {
		opacity: 1,
		y: 0,
		transition: { ease: ["easeInOut"], duration: 2 }
	}
};
