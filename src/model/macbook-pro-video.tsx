/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Author: timblewee (https://sketchfab.com/timblewee)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/macbook-pro-13-inch-2020-efab224280fd4c3993c808107f7c0b38
Title: Macbook Pro 13 inch 2020
*/

import * as THREE from 'three'
import React, { use, useEffect, useRef } from 'react'
import { useGLTF, useAnimations, useTexture, useVideoTexture } from '@react-three/drei'
import { GLTF } from 'three-stdlib'
import { MACBOOK_ANIMATION_DURATION } from '@/utils/constants'

type GLTFResult = GLTF & {
	nodes: {
		Object_4: THREE.Mesh
		Object_5: THREE.Mesh
		Object_6: THREE.Mesh
		Object_7: THREE.Mesh
		Object_8: THREE.Mesh
		Object_9: THREE.Mesh
		Object_12: THREE.Mesh
		Object_14: THREE.Mesh
		Object_16: THREE.Mesh
		Object_18: THREE.Mesh
		Object_19: THREE.Mesh
		Object_20: THREE.Mesh
		Object_21: THREE.Mesh
		Object_23: THREE.Mesh
		Object_24: THREE.Mesh
		Object_25: THREE.Mesh
		Object_27: THREE.Mesh
		Object_29: THREE.Mesh
		Object_30: THREE.Mesh
		Object_32: THREE.Mesh
	}
	materials: {
		Black_Glass: THREE.MeshStandardMaterial
		Black_Plastic: THREE.MeshStandardMaterial
		Glass: THREE.MeshStandardMaterial
		['Material.002']: THREE.MeshStandardMaterial
		Space_Grey: THREE.MeshStandardMaterial
		['Space_Grey.001']: THREE.MeshStandardMaterial
		Camera_Light: THREE.MeshStandardMaterial
		Caps_Lock_Light: THREE.MeshStandardMaterial
		['Material.001']: THREE.MeshStandardMaterial
		['Keys.001']: THREE.MeshStandardMaterial
		Keys: THREE.MeshStandardMaterial
		['Touch_Bar_Shot_2021-04-02_at_18.13.28']: THREE.MeshStandardMaterial
	}
}

type ActionName = 'Animation'
type GLTFActions = Record<ActionName, THREE.AnimationAction>
interface MacbookProProps extends React.ComponentProps<'group'> {
	texturePath: string;
	transitionFinished: boolean;
}

export const MacbookProVideo = (props: MacbookProProps) => {
	const group = useRef<THREE.Group>(null);
	const { texturePath, transitionFinished } = props;
	const { nodes, materials, animations } = useGLTF('/assets/models/macbook_pro_13_inch_2020/scene.gltf') as GLTFResult
	const { actions } = useAnimations(animations, group);
	const texture = useVideoTexture(texturePath);
	// if(texturePath) {
	// 	texturePath.endsWith('.mp4') ? texture = useVideoTexture(texturePath) : texture = useTexture(texturePath);
	// }

	useEffect(() => {
		console.log('Component mounted');
		const animation = actions['Animation']

		if (animation && transitionFinished) {
			const clip = animation.getClip();
			console.log(clip.duration)
			if(clip.duration > MACBOOK_ANIMATION_DURATION) clip.duration = clip.duration / 5;
			animation.timeScale = 5;
			animation.setLoop(THREE.LoopOnce, 1)
			animation.play()
			console.log('playing')
			animation.clampWhenFinished = true // stop animation
		}
		return () => {
			console.log('Component unmounted');
		};
	}, [transitionFinished, actions]);

	return (
		<group ref={group} {...props} dispose={null}>
			<group name="Sketchfab_Scene">
				<group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]}>
					<group name="root">
						<group name="GLTF_SceneRootNode" rotation={[Math.PI / 2, 0, 0]}>
							<group name="Bevels_2" position={[0, 0.008, -0.104]} scale={0.275}>
								<mesh
									name="Object_4"
									castShadow
									receiveShadow
									geometry={nodes.Object_4.geometry}
									material={materials.Black_Glass}
								/>
								<mesh
									name="Object_5"
									castShadow
									receiveShadow
									geometry={nodes.Object_5.geometry}
									material={materials.Black_Plastic}
								/>
								<mesh
									name="Object_6"
									castShadow
									receiveShadow
									geometry={nodes.Object_6.geometry}
									material={materials.Glass}
								/>
								<mesh
									name="Object_7"
									position={[0, -0.01, 0.0]}
									castShadow={false}
									receiveShadow={false}
									geometry={nodes.Object_7.geometry}
									material={materials['Material.002']}
									renderOrder={1} // Adjust this based on scene layering

								>
									{texture && <meshBasicMaterial map={texture} depthWrite={false} toneMapped={false} />}
								</mesh>
								<mesh
									name="Object_8"
									castShadow
									receiveShadow
									geometry={nodes.Object_8.geometry}
									material={materials.Space_Grey}
								/>
								<mesh
									name="Object_9"
									castShadow
									receiveShadow
									geometry={nodes.Object_9.geometry}
									material={materials['Space_Grey.001']}
								/>
								<group
									name="Empty_1"
									position={[0, 0.001, 0]}
									rotation={[-Math.PI, 0, 0]}
									scale={[-0.039, 0.039, 0.039]}>
									<group
										name="Camera_Light_0"
										position={[0, 0.077, -0.044]}
										rotation={[-1.192, 0, 0]}
										scale={[-25.381, 25.381, 25.381]}>
										<mesh
											name="Object_12"
											castShadow
											receiveShadow
											geometry={nodes.Object_12.geometry}
											material={materials.Camera_Light}
										/>
									</group>
								</group>
							</group>
							<group name="Caps_Lock_Light_3" position={[0, -0.014, 0]} scale={0.275}>
								<mesh
									name="Object_14"
									castShadow
									receiveShadow
									geometry={nodes.Object_14.geometry}
									material={materials.Caps_Lock_Light}
								/>
							</group>
							<group
								name="Macbook_Pro_4"
								position={[0, 0.008, -0.104]}
								rotation={[1.949, 0, 0]}
								scale={0.275}>
								<mesh
									name="Object_16"
									castShadow
									receiveShadow
									geometry={nodes.Object_16.geometry}
									material={materials['Material.001']}
								/>
							</group>
							<group name="Main_Body_5" position={[0, -0.014, 0]} scale={0.275}>
								<mesh
									name="Object_18"
									castShadow
									receiveShadow
									geometry={nodes.Object_18.geometry}
									material={materials.Space_Grey}
								/>
								<mesh
									name="Object_19"
									castShadow
									receiveShadow
									geometry={nodes.Object_19.geometry}
									material={materials.Black_Plastic}
								/>
								<mesh
									name="Object_20"
									castShadow
									receiveShadow
									geometry={nodes.Object_20.geometry}
									material={materials.Black_Plastic}
								/>
								<mesh
									name="Object_21"
									castShadow
									receiveShadow
									geometry={nodes.Object_21.geometry}
									material={materials['Keys.001']}
								/>
							</group>
							<group name="Touch_Bar_6" position={[0, -0.014, 0]} scale={0.275}>
								<mesh
									name="Object_23"
									castShadow
									receiveShadow
									geometry={nodes.Object_23.geometry}
									material={materials.Black_Plastic}
								/>
								<mesh
									name="Object_24"
									castShadow
									receiveShadow
									geometry={nodes.Object_24.geometry}
									material={materials.Black_Glass}
								/>
								<mesh
									name="Object_25"
									castShadow
									receiveShadow
									geometry={nodes.Object_25.geometry}
									material={materials.Keys}
								/>
							</group>
							<group name="Touch_Bar_Shot_7" position={[0, -0.014, 0]} scale={0.275}>
								<mesh
									name="Object_27"
									castShadow
									receiveShadow
									geometry={nodes.Object_27.geometry}
									material={materials['Touch_Bar_Shot_2021-04-02_at_18.13.28']}
								/>
							</group>
							<group name="Keyboard_8" position={[0, -0.014, 0]} scale={0.275}>
								<mesh
									name="Object_29"
									castShadow
									receiveShadow
									geometry={nodes.Object_29.geometry}
									material={materials.Black_Plastic}
								/>
								<mesh
									name="Object_30"
									castShadow
									receiveShadow
									geometry={nodes.Object_30.geometry}
									material={materials.Keys}
								/>
							</group>
							<group name="Cube_9" position={[0, -0.014, 0]}>
								<mesh
									name="Object_32"
									castShadow
									receiveShadow
									geometry={nodes.Object_32.geometry}
									material={materials.Black_Plastic}
								/>
							</group>
							<group
								name="Circle001_12"
								position={[0.203, 0.008, -0.104]}
								rotation={[0.011, -0.75, 1.274]}
							/>
						</group>
					</group>
				</group>
			</group>
		</group>
	)
}

useGLTF.preload('/assets/models/macbook_pro_13_inch_2020/scene.gltf');