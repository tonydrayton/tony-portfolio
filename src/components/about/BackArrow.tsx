"use client";
import { tealHex } from "@/lib/utils";
import { motion } from "framer-motion"
import { ArrowLeft, ChevronLeft } from "lucide-react"
import Link from "next/link"

const BackArrow = () => {
	return (
		<motion.div
			initial={{ opacity: 0, y: 150 }}
			animate={{ opacity: 1, scale: 1, y: 0 }}
			transition={{
				duration: 2,
				ease: [0, 0.71, 0.2, 1.01]
			}}
			className="mb-10">
			<Link href="/">
				<ChevronLeft size="50" className="hover:brightness-75 dark:hover:brightness-125 hover:-translate-y-1 transition-all easein-out duration-200" style={{ color: tealHex }}>
				</ChevronLeft>
			</Link>
		</motion.div>
	)
}

export default BackArrow;
