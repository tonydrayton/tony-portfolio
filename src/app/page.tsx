"use client";
import './page.css';
import Nav from "@/components/Nav";
import Home from "@/components/home";
import { useGLTF } from "@react-three/drei";

export default function Page() {
	useGLTF.preload('/assets/models/macbook_pro_13_inch_2020/scene.gltf');

	return (
		<>
			<div>
				<Nav />
				{/* <Image src={scenery} alt="blur background" className="rotate-180 -z-10 absolute inset-0 dark:brightness-50 -hue-rotate-90  opacity-60 dark:opacity-100 pointer-events-none" style={{ maskImage: 'linear-gradient(to top, black, transparent)' }} /> */}
			</div>


			<Home />
		</>
	);
}
