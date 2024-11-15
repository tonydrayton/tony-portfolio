import React from 'react';

interface TimelineEntryProps {
	date: string;
	title: string;
	description: string;
}

const TimelineEntry: React.FC<TimelineEntryProps & { side: 'left' | 'right' }> = ({
	date,
	title,
	description,
	side,
}) => {
	const isLeft = side === 'left';

	return (
		<div className={`mb-8 flex ${isLeft ? 'justify-end' : 'justify-start'} items-center w-full`}>
			<div className={`w-1/2 ${isLeft ? 'text-right' : 'text-left'}`}>
				<div className="bg-black/10 dark:bg-white/10 w-96 p-4 rounded-md shadow-md">
					<p className="text-sm text-gray-500">{date}</p>
					<h3 className="text-lg font-semibold">{title}</h3>
					<p className="text-wrap">{description}</p>
				</div>
			</div>
			<div className="w-8 h-8 rounded-full bg-blue-500 shadow-lg glow-dot mx-4"></div>
		</div>
	);
};

interface TimelineProps {
	entries: TimelineEntryProps[];
}

const Timeline: React.FC<TimelineProps> = ({ entries }) => {
	return (
		<div className="relative container mx-auto my-8">
			<div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-black/10 dark:bg-white/10 h-full"></div>
			{entries.map((entry, index) => (
				<TimelineEntry
					key={index}
					side={index % 2 === 0 ? 'left' : 'right'}
					date={entry.date}
					title={entry.title}
					description={entry.description}
				/>
			))}
		</div>
	);
};

export default Timeline;
