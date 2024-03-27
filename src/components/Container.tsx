"use client"
import { cn } from "@/lib/utils";
import { Viewport } from "next";
import Head from "next/head";
import { CSSProperties, Fragment, ReactNode, useEffect, useState } from "react";

const Container = ({
    children,
    className,
    style,
    dynamicViewport
}: {
    children: ReactNode
    className?: string,
    style?: CSSProperties
    dynamicViewport: boolean
}) => {
    const [viewport, setViewport] = useState<Viewport>({ themeColor: "#12a594" });

    useEffect(() => {
        if (dynamicViewport) {
            const updateViewport = () => {
                if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                    setViewport({ themeColor: "#2a2a2a" });
                } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
                    setViewport({ themeColor: "#f3f3f3" });
                } else {
                    setViewport({ themeColor: "#12a594" });
                }
            };

            updateViewport();

            window.matchMedia('(prefers-color-scheme: dark)').addListener(updateViewport);
            window.matchMedia('(prefers-color-scheme: light)').addListener(updateViewport);

            return () => {
                window.matchMedia('(prefers-color-scheme: dark)').removeListener(updateViewport);
                window.matchMedia('(prefers-color-scheme: light)').removeListener(updateViewport);
            };
        }
    }, []);

    console.log(viewport)
    return (
        <>
            {viewport && (
            <Head>
                <meta name="theme-color" content={viewport.themeColor ? viewport.themeColor.toString() : undefined} />
            </Head>
            )}
            <div className={cn("flex justify-center items-center w-full h-svh", className)} style={style}>
                {children}
            </div>
        </>
    );
};

export default Container;