import { geist } from '@/lib/fonts/fonts';
import { ReactNode } from 'react';

interface DoctorSectionProps {
    title: string;
    subtitle?: string;
    icon?: ReactNode;
    children: ReactNode;
    className?: string;
}

/**
 * Consistent section shell for the Doctor Details page.
 * Handles heading typography, spacing rhythm and dark mode scaffolding.
 */
export default function DoctorSection({
    title,
    subtitle,
    icon,
    children,
    className = '',
}: DoctorSectionProps) {
    return (
        <section className={`min-w-0 ${className}`}>
            <div className="mb-5 flex min-w-0 items-start gap-3 sm:mb-6">
                {icon && (
                    <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-xl bg-[#EFF6FF] text-[#2563EB] dark:bg-[#1E3A8A]/20 sm:size-10">
                        {icon}
                    </span>
                )}
                <div className="min-w-0">
                    <h2
                        className={`break-words text-xl font-black tracking-tight text-[#0F172A] transition-colors duration-200 sm:text-2xl ${geist.className} dark:text-[#F8FAFC]`}
                    >
                        {title}
                    </h2>
                    {subtitle && (
                        <p className="mt-1 break-words text-xs font-medium text-[#64748B] transition-colors duration-200 sm:text-sm dark:text-[#94A3B8]">
                            {subtitle}
                        </p>
                    )}
                </div>
            </div>

            {children}
        </section>
    );
}
