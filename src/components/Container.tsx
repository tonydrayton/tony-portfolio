import { cn } from "@/lib/utils";
import { Viewport } from "next";
import Head from "next/head";
import { CSSProperties, Fragment, ReactNode, useEffect, useState } from "react";

const Container = ({
    children,
    className,
    style,
}: {
    children: ReactNode
    className?: string,
    style?: CSSProperties
}) => {
    return (
        <>
            <div className={cn("flex justify-center items-center w-full h-svh", className)} style={style}>
                {children}
            </div>
        </>
    );
};

export default Container;