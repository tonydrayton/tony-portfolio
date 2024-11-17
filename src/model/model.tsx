import { Float, useAnimations, useGLTF, useTexture, useVideoTexture } from '@react-three/drei';
import { useEffect, useRef } from 'react';
import { Group, Mesh } from 'three';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';


export default function Model({
	path,
	texturePath,
	...props
}: {
	path: string
	texturePath: string
}) {
	const group = useRef<Group>(null);
	const { nodes, materials, animations } = useGLTF(path);
	const { actions } = useAnimations(animations, group);

	const imageTexture = useTexture(texturePath);
	const videoTexture = useVideoTexture(texturePath);
	const texture = texturePath.split('.').pop() === 'mp4' ? videoTexture : imageTexture;

	useEffect(() => {
		if (texture) {
			texture.flipY = false;
		}
	}, [texture]);

	useGSAP(() => {
		if (group.current) {
			gsap.from(group.current?.rotation, {
				y: Math.PI * 2,
				duration: 1,
				ease: 'power3.out'
			})
		}
	}, [texture]);

	return (
		<group ref={group} {...props} dispose={null}>
			<group name="Scene">
				<mesh
					name='monitor-screen'
					geometry={(nodes['monitor-screen'] as Mesh).geometry}
					material={(nodes['monitor-screen'] as Mesh).material}
					position={[0.127, 1.831, 0.511]}
					rotation={[1.571, -0.005, 0.031]}
					scale={[0.661, 0.608, 0.401]}
				>
					<meshBasicMaterial map={texture} toneMapped={false} />
				</mesh>
			</group>
		</group>
	)
}
