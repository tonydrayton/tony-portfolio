"use client";
import { motion } from "framer-motion"
import ProfileCard from "./ProfileCard"
import TabCard from "./TabCard"

const HomePage = () => {
    return (
        <motion.div
            initial={{ opacity: 1, y: 150 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
                duration: 1,
                ease: [0, 0.71, 0.2, 1.01]
            }}
            className="iphone-landscape:flex iphone-landscape:gap-5 iphone-landscape:items-center">
            <ProfileCard />
            <TabCard />
        </motion.div>
    )
}

export default HomePage;