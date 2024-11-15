import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Image from 'next/image';
import React from 'react';

interface InfiniteCarouselProps {
	logos: string[];
}

const InfiniteCarousel = ({ logos }: { logos: StaticImport[] }) => {
	const doubledLogos = [...logos, ...logos];

	return (
		<div className="overflow-hidden py-4 relative w-full">
			<div className="flex animate-marquee space-x-8">
				{doubledLogos.map((logo, index) => (
					<div key={index} className="flex-shrink-0 w-20 h-20">
						<Image src={logo} alt={`Logo ${index}`} className="object-contain w-full h-full" />
					</div>
				))}
			</div>
		</div>
	);
};

export default InfiniteCarousel;
