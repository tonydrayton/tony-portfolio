"use client";
import './page.css';
import Nav from "@/components/Nav";
import Home from "@/components/home";
import { useGLTF } from "@react-three/drei";

export default function Page() {
	// stopped using this temporarily. keeping it here for reference.
	// useGLTF.preload('/assets/models/macbook_pro_13_inch_2020/scene.gltf');

	return (
		<>
			<Nav />
			<Home />
		</>
	);
}
