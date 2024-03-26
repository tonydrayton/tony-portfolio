"use client";
import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"
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
                <ArrowLeft size="50" className="hover:brightness-125 transition-all easein-out duration-200" style={{ color: "#0ad8b6" }}>
                </ArrowLeft>
            </Link>
        </motion.div>
    )
}

export default BackArrow;