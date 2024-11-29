import { create } from "zustand";

interface ResumeStoreState {
	resume: string;
	setResume: (resume: string) => void;
}

export const useResumeStore = create<ResumeStoreState>((set) => ({
	resume: '/assets/resumes/Tony_Drayton_10_25_24.pdf',
	setResume: (resume: string) => set({ resume }),
}));
