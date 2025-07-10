import { cn } from "@/lib/utils";

export default function MacCursor({ className }: { className?: string }) {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" className={cn("w-4 drop-shadow-[0_1px_1px_rgba(0,0,0,0.4)]", className)} viewBox="0 0 12 20">
			<g className="origin-top-left transition duration-150 scale-90">
				<path d="M0.200195 0.900391V16.9004L3.43164 13.7422L5.7002 19.0996L9.2998 17.5996L7.18652 12.5H11.7998L0.200195 0.900391Z" className="fill-white"></path>
				<path d="M1.2002 14.5V3.30078L9.40039 11.5H5.70605L7.97168 16.8965L6.12695 17.6699L3.75879 12.0273L1.2002 14.5Z" className="fill-black"></path> 
			</g>
		</svg> 
	)
}
