import React from 'react'
import { cn } from '@/lib/utils'

export const tuple = <T extends string[]>(...args: T) => args
const normalTypes = tuple('default', 'secondary', 'success', 'warning', 'error');
type NormalTypes = typeof normalTypes[number];

export type LoadingTypes = NormalTypes

interface Props {
	type?: LoadingTypes
	color?: string
	className?: string
	spaceRatio?: number
}

const defaultProps = {
	type: 'default' as LoadingTypes,
	className: '',
	spaceRatio: 1,
}

type NativeAttrs = Omit<React.HTMLAttributes<any>, keyof Props>
export type LoadingProps = Props & NativeAttrs

const getColorClasses = (type: LoadingTypes, customColor?: string) => {
	if (customColor) {
		return '' // Will use inline style for custom colors
	}

	const colorClasses: { [key in LoadingTypes]: string } = {
		default: 'bg-gray-400 dark:bg-gray-500',
		secondary: 'bg-gray-600 dark:bg-gray-400', 
		success: 'bg-green-500',
		warning: 'bg-yellow-500',
		error: 'bg-red-500',
	}

	return colorClasses[type]
}

const LoadingDots: React.FC<React.PropsWithChildren<LoadingProps>> = ({
	children,
	type = 'default',
	color,
	className = '',
	spaceRatio = 1,
	...props
}) => {
	const colorClasses = getColorClasses(type, color)
	const gapClass = spaceRatio === 1 ? 'gap-1' : spaceRatio > 1 ? 'gap-2' : 'gap-0.5'

	return (
		<div 
			className={cn("inline-flex items-center relative min-h-4", className)} 
			{...props}
		>
			<style>{`
				@keyframes loading-blink {
					0%, 100% { opacity: 0.2; }
					20% { opacity: 1; }
				}
				.loading-dot {
					animation: loading-blink 1.4s infinite both;
				}
				.loading-dot-1 { animation-delay: 0s; }
				.loading-dot-2 { animation-delay: 0.2s; }
				.loading-dot-3 { animation-delay: 0.4s; }
			`}</style>
			<div className="flex justify-center items-center">
				{children && (
					<label className="mr-2 text-gray-500 dark:text-gray-400 text-sm leading-none">
						{children}
					</label>
				)}
				<div className={cn("flex items-center", gapClass)}>
					<div 
						className={cn("w-1 h-1 rounded-full loading-dot loading-dot-1", colorClasses)}
						style={{ backgroundColor: color }}
					/>
					<div 
						className={cn("w-1 h-1 rounded-full loading-dot loading-dot-2", colorClasses)}
						style={{ backgroundColor: color }}
					/>
					<div 
						className={cn("w-1 h-1 rounded-full loading-dot loading-dot-3", colorClasses)}
						style={{ backgroundColor: color }}
					/>
				</div>
			</div>
		</div>
	)
}

LoadingDots.defaultProps = defaultProps
LoadingDots.displayName = 'LoadingDots'

export { LoadingDots }
