'use client';
import React from 'react';
import type { ComponentProps, ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { FileCheckIcon, GithubIcon, LinkedinIcon, MailIcon } from 'lucide-react';
import Logo from '@/components/logo';
import AnimatedShinyText from '@/components/ui/animated-shiny-text';
import { RESUME_URL } from '@/lib/constants';

interface FooterLink {
    title: string;
    href: string;
    icon?: React.ComponentType<{ className?: string }>;
}

interface FooterSection {
    label: string;
    links: FooterLink[];
}

const footerLinks: FooterSection[] = [
    {
        label: 'Links',
        links: [
            { title: 'Github', href: 'https://github.com/tonydrayton', icon: GithubIcon },
            { title: 'LinkedIn', href: 'https://linkedin.com/in/tony-drayton', icon: LinkedinIcon },
            { title: 'Resume', href: RESUME_URL, icon: FileCheckIcon },
            { title: 'Email', href: 'mailto:tonydrytn@gmail.com', icon: MailIcon }
        ],
    },
];

export function Footer() {
    return (
        <footer className="md:rounded-t-6xl relative w-full max-w-6xl mx-auto flex flex-col items-center justify-center rounded-t-4xl border-t bg-[radial-gradient(35%_128px_at_50%_0%,theme(backgroundColor.white/8%),transparent)] px-6 py-12 lg:py-16" id="contact">
            <div className="bg-foreground/20 absolute top-0 right-1/2 left-1/2 h-px w-1/3 -translate-x-1/2 -translate-y-1/2 rounded-full blur" />

            <div className="grid w-full gap-2 sm:gap-8 xl:grid-cols-3 xl:gap-8">
                <AnimatedContainer className="">
                    <Logo size={40} />
                    <p className="text-muted-foreground mt-4 text-sm">
                        © {new Date().getFullYear()} Tony Drayton
                    </p>
                    <p className='text-muted-foreground mt-0.5 text-sm'>All rights reserved.</p>
                    <AnimatedShinyText className='mt-0.5 sm:mt-6 text-sm text-left mx-0' shimmerWidth={30}>Built with love.</AnimatedShinyText>
                </AnimatedContainer>

                <div className="mt-2 sm:mt-0 grid grid-cols-2 gap-8 md:grid-cols-4 xl:col-span-2 xl:mt-0">
                    {footerLinks.map((section, index) => (
                        <AnimatedContainer key={section.label} delay={0.1 + index * 0.1}>
                            <div className="mb-10 md:mb-0">
                                <h3 className="text-xs">{section.label}</h3>
                                <ul className="text-muted-foreground mt-4 space-y-2 text-sm">
                                    {section.links.map((link) => (
                                        <li key={link.title}>
                                            <a
                                                href={link.href}
                                                className="hover:text-foreground inline-flex items-center transition-all duration-300"
                                            >
                                                {link.icon && <link.icon className="me-1 size-4" />}
                                                {link.title}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </AnimatedContainer>
                    ))}
                </div>
            </div>
        </footer>
    );
};

type ViewAnimationProps = {
    delay?: number;
    className?: ComponentProps<typeof motion.div>['className'];
    children: ReactNode;
};

function AnimatedContainer({ className, delay = 0.1, children }: ViewAnimationProps) {
    const shouldReduceMotion = useReducedMotion();

    if (shouldReduceMotion) {
        return children;
    }

    return (
        <motion.div
            initial={{ filter: 'blur(4px)', translateY: -8, opacity: 0 }}
            whileInView={{ filter: 'blur(0px)', translateY: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay, duration: 0.8 }}
            className={className}
        >
            {children}
        </motion.div>
    );
};
