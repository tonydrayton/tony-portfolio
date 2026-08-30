import { ExperienceSlug } from "@/lib/experience";
import { AlumnIQVisual } from "./alumniq-visual";
import { ComcastVisual } from "./comcast-visual";
import { VanguardVisual } from "./vanguard-visual";
import { CompanyVisualProps } from "./visual-frame";

export const visualsBySlug: Record<ExperienceSlug, (props: CompanyVisualProps) => JSX.Element> = {
	vanguard: VanguardVisual,
	comcast: ComcastVisual,
	alumniq: AlumnIQVisual,
};

export type { CompanyVisualProps };
