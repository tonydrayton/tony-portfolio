import { Center, OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Canvas, useThree } from '@react-three/fiber';
import { Suspense, useEffect, useRef, useState } from 'react';
import CanvasLoader from '../ui/canvas-loader';
import { MacbookPro, MacbookProVideo } from '@/model';
import { useWindowSize } from '@/hooks';
import { MinimumWidth } from '@/lib/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Separator } from '@radix-ui/themes';
import { Leva, useControls } from 'leva';
import { Button } from '../ui/button';
import { Group, Mesh, Raycaster, Vector2 } from 'three';
import { Badge } from '../ui/badge';
import { CircleChevronLeft, CircleChevronRight } from 'lucide-react';
import { MacbookProImage } from '@/model/macbook-pro-img';

const projects = [
	{
		name: 'Adopteam',
		type: 'Website',
		role: 'Frontend Developer',
		date: '2024',
		description: 'Dedicated to finding loving homes for children in need through the power of AI',
		texturePath: '/videos/adopteam_demo.mp4'
	},
	{
		name: 'Music at Drexel',
		type: 'Website',
		role: 'Fullstack Developer',
		date: '2023',
		description: 'A music streaming platform for Drexel University students',
		texturePath: '/musicatdrexel/aboutpage.png'
	}
]

export default function ProjectSummary() {
	const windowSize = useWindowSize();
	// const controls = useControls('test', {
	// 	rotationX: {
	// 		value: 0,
	// 		min: -10,
	// 		max: 10
	// 	},
	// 	rotationY: {
	// 		value: 0,
	// 		min: -10,
	// 		max: 10
	// 	},
	// 	rotationZ: {
	// 		value: 0,
	// 		min: -10,
	// 		max: 10
	// 	}
	// });
	const isDesktop = windowSize.width >= MinimumWidth.Medium;
	const [projectIndex, setProjectIndex] = useState(0);
	const project = projects[projectIndex];
	const [enableZoom, setEnableZoom] = useState(false);

	const handlePointerEnter = () => setEnableZoom(true);
	const handlePointerLeave = () => setEnableZoom(false);

	return (
		<>
			<div className='flex flex-col w-full md:w-[unset] md:flex-row items-center'>
				<div className='md:h-[40rem] md:w-[40rem] w-full h-96 select-none'>
					<Canvas>
						<ambientLight intensity={1} />
						<directionalLight position={[10, 10, 5]} intensity={3} />
						<PerspectiveCamera makeDefault position={[0, 0, 5]} fov={75} />
						<Center>
							<Suspense fallback={<CanvasLoader />}>
								{project.texturePath.endsWith('.mp4') ?
									<MacbookProVideo
										scale={14}
										position={[0, -2, 0]}
										rotation={[0, 0, 0]}
										texturePath={project.texturePath}
										key={projectIndex}
										onPointerEnter={handlePointerEnter}
										onPointerLeave={handlePointerLeave}
										onPointerDown={handlePointerEnter}
										onPointerUp={handlePointerLeave}
									/> : <MacbookProImage
										scale={14}
										position={[0, -2, 0]}
										rotation={[0, 0, 0]}
										texturePath={project.texturePath}
										key={projectIndex}
										onPointerEnter={handlePointerEnter}
										onPointerLeave={handlePointerLeave}
										onPointerDown={handlePointerEnter}
										onPointerUp={handlePointerLeave}
									/>
								}
							</Suspense>
						</Center>
						<OrbitControls maxPolarAngle={Math.PI / 2} enableZoom={enableZoom} enablePan={false} enableRotate={true} zoomSpeed={1} />
					</Canvas>
				</div>
				<div className="flex flex-col items-center md:items-start">
					<Badge className={`${projectIndex != 0 && 'opacity-0'} my-2 `}>New</Badge>
					<p
						className="flex gap-2 flex-row items-center text-2xl"
					>
						{project.name}
						<Separator size={"2"} orientation='vertical' />
						<span className="opacity-50 font-light">{project.type}</span>
					</p>
					<p>
						{project.role}
						<span className="opacity-50 font-light">{` (2024)`}</span>
					</p>
					<p className="text-lg my-4 w-auto max-w-96 text-center md:text-start">{project.description}</p>
					<div>
						{!isDesktop && <Button variant='secondary' className='mx-4' onClick={() => setProjectIndex(projectIndex - 1)} disabled={projectIndex === 0}>
							<CircleChevronLeft />
						</Button>}

						<Button variant="secondary" className='w-fit'>More info</Button>

						{!isDesktop && <Button variant='secondary' className='mx-4' onClick={() => setProjectIndex(projectIndex + 1)} disabled={projectIndex === projects.length - 1}>
							<CircleChevronRight />
						</Button>}
					</div>
				</div>
				{/* <Card className='mt-4 dark:bg-white/10 dark:border-neutral-500'>
				<CardHeader>
					<CardTitle>fd</CardTitle>
					<CardDescription></CardDescription>
				</CardHeader>
				<CardContent>
					dd
				</CardContent>
				<CardFooter>
					ddd
				</CardFooter>
			</Card> */}

			</div>
			{isDesktop && (
				<div className='mt-4 mb-8 w-full justify-center flex flex-row gap-6'>
					<Button variant='secondary' onClick={() => setProjectIndex(projectIndex - 1)} disabled={projectIndex === 0}>
						<CircleChevronLeft />
					</Button>
					<Button variant='secondary' onClick={() => setProjectIndex(projectIndex + 1)} disabled={projectIndex === projects.length - 1}>
						<CircleChevronRight />
					</Button>
				</div>
			)}
		</>
	)
}
