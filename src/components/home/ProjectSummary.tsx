import { Center, OrbitControls, OrbitControlsProps, PerspectiveCamera } from '@react-three/drei';
import { Canvas, useThree } from '@react-three/fiber';
import { Suspense, useEffect, useRef, useState } from 'react';
import CanvasLoader from '../ui/canvas-loader';
import { MacbookProVideo, MacbookProImage } from '@/model';
import { useWindowSize } from '@/hooks';
import { MinimumWidth } from '@/lib/types';
import { Separator } from '@radix-ui/themes';
import { Button } from '../ui/button';
import { Group, Mesh, Raycaster, Vector2 } from 'three';
import { Badge } from '../ui/badge';
import { ChevronLeft, ChevronRight, CircleChevronLeft, CircleChevronRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ForwardRefComponent } from '@react-three/drei/helpers/ts-utils';
import { useGSAP } from '@gsap/react';
import { fadeInVariants } from '@/utils/transitions';
import { motion } from 'framer-motion';
import { SiAmazonwebservices, SiFlask, SiMysql, SiNextdotjs, SiNodedotjs, SiReact, SiReactHex, SiTypescript, SiTypescriptHex } from '@icons-pack/react-simple-icons';

const iconClassName = "scale-75 mr-1 rounded-sm";
const projects = [
	{
		name: 'Adopteam',
		type: 'Website',
		role: 'Frontend Developer',
		skills: [{ icon: <SiTypescript className={iconClassName} />, name: "TypeScript" }, { icon: <SiReact className={iconClassName} />, name: "React" }, { icon: <SiNextdotjs className={iconClassName} />, name: "Next.js" }, { icon: <SiFlask className={iconClassName} />, name: "Flask" }],
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
	},
	{
		name: 'Vaeleth',
		type: 'Discord Bot',
		role: 'Lead Developer',
		date: '2019 - 2022',
		description: 'A music streaming platform for Drexel University students',
		texturePath: '/vaeleth.png'
	}
]

export default function ProjectSummary() {
	const windowSize = useWindowSize();
	const isDesktop = windowSize.width >= MinimumWidth.Medium;
	const [projectIndex, setProjectIndex] = useState(0);
	const project = projects[projectIndex];
	const [enableZoom, setEnableZoom] = useState(false);
	const [userHasControl, setUserHasControl] = useState(false);
	const [transitionFinished, setTransitionFinished] = useState(false);
	const controlsRef = useRef<any>(null);
	const animationRef = useRef<gsap.core.Tween | null>(null);

	// reset OrbitControls when the project changes
	useEffect(() => {
		console.log('change')
		if (controlsRef.current) {
			const controls = controlsRef.current;
			setUserHasControl(false);
			controls.reset();
			if (animationRef.current) {
				animationRef.current.kill();
			}
		}
	}, [projectIndex]);

	// kill animation if the user wants to control
	useEffect(() => {
		console.log({ userHasControl })
		if (animationRef.current && userHasControl) {
			animationRef.current.kill();
		}
	}, [userHasControl]);

	// animate the computer to zoom in a lil
	useGSAP(() => {
		console.log('useGSAP')
		console.log(controlsRef.current);
		gsap.delayedCall(1, () => {
			if (controlsRef.current && !userHasControl && transitionFinished) {
				console.log(controlsRef.current);
				const controls = controlsRef.current;
				animationRef.current = gsap.to(controls.object.position, {
					x: 0,
					y: 0,
					z: 1.4,
					duration: 3,
					repeat: 0,
					ease: "power1.out",
					onUpdate: () => {
						controls.update();
					}
				});
			}
		});
	}, [transitionFinished, userHasControl, projectIndex]);

	const handlePointerEnter = () => setEnableZoom(true);
	const handlePointerLeave = () => setEnableZoom(false);
	const handleTransitionComplete = () => {
		setTransitionFinished(true); // Set to true when transition finishes
	};

	return (
		<motion.div
			initial="offscreen"
			whileInView="onscreen"
			viewport={{ once: true, amount: 0.5 }}
			variants={fadeInVariants}
			onAnimationComplete={handleTransitionComplete}
		>
			<div className='flex flex-col w-full md:w-[unset] md:flex-row items-center'>
				<div className='md:h-[40rem] md:w-[40rem] w-96 h-96 select-none md:mx-6'>
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
										transitionFinished={transitionFinished}
										key={projectIndex}
										onPointerEnter={handlePointerEnter}
										onPointerLeave={handlePointerLeave}
										// Set these only for mobile (touch) events
										onPointerDown={!isDesktop ? handlePointerEnter : undefined}
									// onPointerUp={!isDesktop ? handlePointerLeave : undefined}
									/> : <MacbookProImage
										scale={14}
										position={[0, -2, 0]}
										rotation={[0, 0, 0]}
										texturePath={project.texturePath}
										transitionFinished={transitionFinished}
										key={projectIndex}
										onPointerEnter={handlePointerEnter}
										onPointerLeave={handlePointerLeave}
										// Set these only for mobile (touch) events
										onPointerDown={!isDesktop ? handlePointerEnter : undefined}
									// onPointerUp={!isDesktop ? handlePointerLeave : undefined}
									/>
								}
							</Suspense>
						</Center>
						<OrbitControls
							ref={controlsRef}
							maxPolarAngle={Math.PI / 2}
							enableZoom={enableZoom}
							enablePan={false}
							enableRotate={true}
							zoomSpeed={1.2}
							onStart={() => setUserHasControl(true)}
						/>
					</Canvas>
				</div>
				<div className="flex flex-col items-center md:items-start">
					<Badge className={`${projectIndex != 0 && 'opacity-0 select-none'} my-2 `}>New</Badge>
					<p className="flex gap-2 flex-row flex-wrap items-center text-2xl">
						{project.name}
						<Separator size={"2"} orientation='vertical' />
						<span className="opacity-50 font-light">{project.type}</span>
					</p>
					<p>
						{project.role}
						<span className="opacity-50 font-light">{` (${project.date})`}</span>
					</p>

					{project.skills && (
						<div className='mt-2 flex flex-wrap gap-2 justify-center sm:items-start sm:justify-start'>
							{project.skills.map((skill, index) => (
								<Badge key={index} className="transition-all duration-300 dark:border-neutral-700" variant="outline">
									{skill.icon} {skill.name}
								</Badge>
							))}
						</div>
					)}

					<p className="text-lg my-4 w-auto max-w-96 text-center text-wrap md:text-start">{project.description}</p>


					<div className='flex flex-row justify-center items-center'>
						{!isDesktop && <Button variant='secondary' className='mx-4' onClick={() => setProjectIndex(projectIndex - 1)} disabled={projectIndex === 0}>
							<ChevronLeft className='scale-75' />
							<span className='sr-only'>Previous</span>
						</Button>}

						<Button variant="shine" className='w-fit'>More info</Button>

						{!isDesktop && <Button variant='secondary' className='mx-4' onClick={() => setProjectIndex(projectIndex + 1)} disabled={projectIndex === projects.length - 1}>
							<ChevronRight className='scale-75' />
							<span className='sr-only'>Next</span>
						</Button>}
					</div>
				</div>
			</div>
			{isDesktop && (
				<div className='mt-4 mb-8 w-full justify-center flex flex-row gap-6'>
					<Button variant='secondary' className='bg-transparent' onClick={() => setProjectIndex(projectIndex - 1)} disabled={projectIndex === 0}>
						<ChevronLeft className='scale-75' />
						<span className='sr-only'>Previous</span>
					</Button>
					<Button variant='secondary' className='bg-transparent' onClick={() => setProjectIndex(projectIndex + 1)} disabled={projectIndex === projects.length - 1}>
						<ChevronRight className='scale-75' />
						<span className='sr-only'>Next</span>
					</Button>
				</div>
			)}
		</motion.div>
	)
}
