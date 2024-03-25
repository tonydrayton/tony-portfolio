import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import { ReactNode } from "react";

const MailTo = ({ 
mailto, 
className,
children
}: {
    mailto: string,
    className?: string,
    children: ReactNode
}) => {
    return (
        <button
            onClick={(e) => {
                window.location.href = mailto;
                e.preventDefault();
            }}
            className={cn(className)}
        >
            {children}
        </button>
    );
};

export default MailTo;