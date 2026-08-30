import { ExperienceSlug } from "@/lib/experience";
import {
	AccessibilityCard,
	AnimatedDBCard,
	ConfigFixCard,
	E2EMigrationCard,
	EventsCard,
	MailCard,
	OnboardDeviceCard,
	PresentationCard,
	SourceOfTruthCard,
	TestsCard,
	UpdateFunctionsCard,
	VolatilityBannerCard,
} from "../home/feature-cards";

/**
 * Kept out of the experience data module so that module stays free of component
 * references and can be read from a server component for metadata.
 */
export const featureCardsBySlug: Record<ExperienceSlug, (() => JSX.Element)[]> = {
	vanguard: [SourceOfTruthCard, AccessibilityCard, VolatilityBannerCard, E2EMigrationCard],
	comcast: [AnimatedDBCard, OnboardDeviceCard, ConfigFixCard, PresentationCard],
	alumniq: [MailCard, EventsCard, UpdateFunctionsCard, TestsCard],
};
