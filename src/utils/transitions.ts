import { Variants } from "framer-motion";

export const fadeInVariants: Variants = {
	offscreen: {
		opacity: 0,
		visibility: "hidden"
	},
	onscreen: {
		visibility: "visible",
		opacity: 1,
		transition: { ease: ["easeInOut"], duration: 1 }
	}
};
