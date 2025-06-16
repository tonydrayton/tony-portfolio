// Made by @luisdralves on Github to add support to tooltips on mobile devices
// https://github.com/shadcn-ui/ui/issues/2402#issuecomment-1930895113
'use client';

import { PropsWithChildren, createContext, useContext, useEffect, useState } from 'react';
import { Tooltip, TooltipTrigger, TooltipContent } from './tooltip';
import { Popover, PopoverTrigger, PopoverContent } from './popover';
import { TooltipContentProps, TooltipProps, TooltipTriggerProps } from '@radix-ui/react-tooltip';
import { PopoverContentProps, PopoverProps, PopoverTriggerProps } from '@radix-ui/react-popover';
import { cn } from '@/lib/utils';
import * as HoverCardPrimitive from "@radix-ui/react-hover-card"


const TouchContext = createContext<boolean | undefined>(undefined);
const useTouch = () => useContext(TouchContext);

export const TouchProvider = (props: PropsWithChildren) => {
	const [isTouch, setTouch] = useState<boolean>();

	useEffect(() => {
		setTouch(window.matchMedia('(pointer: coarse)').matches);
	}, []);

	return <TouchContext.Provider value={isTouch} {...props} />;
};

export const HybridTooltip = (props: TooltipProps & PopoverProps) => {
	const isTouch = useTouch();

	return isTouch ? <Popover {...props} /> : <Tooltip {...props} />;
};

export const HybridTooltipTrigger = (props: TooltipTriggerProps & PopoverTriggerProps) => {
	const isTouch = useTouch();

	return isTouch ? <PopoverTrigger {...props} /> : <TooltipTrigger {...props} />;
};

export function HybridTooltipContent({
  className,
  ...props
}: React.ComponentProps<typeof HoverCardPrimitive.Content>) {
  const isTouch = useTouch();

  return isTouch ? <PopoverContent className={cn('bg-neutral-50/90 dark:bg-neutral-900/90 backdrop-blur-sm ml-4 sm:ml-0', className)} {...props} /> : <TooltipContent className={cn(
	  'bg-neutral-50/90 dark:bg-neutral-900/90 backdrop-blur-sm text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-64 origin-(--radix-hover-card-content-transform-origin) rounded-md p-4 outline-hidden border-border ml-4 sm:ml-0 shadow-[inset_0_-1px_#ebedf020,inset_0_0_0_1px_#eae4e4,_0_4px_8px_#e9edf2] dark:shadow-[inset_0_-1px_#10171e,inset_0_0_0_1px_hsl(204.98deg,33.59%,74.79%,.15),_0_4px_8px_#00000052]',
	  className
  )} {...props} />;
}
