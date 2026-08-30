import { ExperienceDetail } from "@/components/experience/experience-detail";
import { experiences, getExperience } from "@/lib/experience";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type ExperiencePageProps = {
	params: { slug: string };
};

export function generateStaticParams() {
	return experiences.map(experience => ({ slug: experience.slug }));
}

export function generateMetadata({ params }: ExperiencePageProps): Metadata {
	const experience = getExperience(params.slug);
	if (!experience) return {};

	const title = `${experience.title} @ ${experience.workplace.name}`;
	const description = experience.tagline;

	return {
		title,
		description,
		openGraph: { title, description },
		twitter: { title, description },
	};
}

export default function ExperiencePage({ params }: ExperiencePageProps) {
	const experience = getExperience(params.slug);
	if (!experience) notFound();

	return <ExperienceDetail slug={experience.slug} />;
}
