import { ReactNode } from 'react';

interface PanelProps {
    children: ReactNode;
    className?: string;
}

/**
 * Shared surface card: white / dark surface, thin border, rounded-2xl.
 * Matches the CareConnect card language used across the project.
 */
export function Panel({ children, className = '' }: PanelProps) {
    return (
        <div
            className={`min-w-0 rounded-2xl border border-[#E2E8F0] bg-white shadow-xs transition-colors duration-200 dark:border-[#334155] dark:bg-[#111827] ${className}`}
        >
            {children}
        </div>
    );
}

interface EmptyStateProps {
    message: string;
    className?: string;
}

/**
 * Elegant fallback shown when an optional section has no data.
 */
export function EmptyState({ message, className = '' }: EmptyStateProps) {
    return (
        <div
            className={`min-w-0 rounded-2xl border border-dashed border-[#E2E8F0] bg-[#F8FAFC] p-6 text-center text-sm font-medium text-[#64748B] transition-colors duration-200 sm:p-8 dark:border-[#334155] dark:bg-[#1E293B]/40 dark:text-[#94A3B8] ${className}`}
        >
            {message}
        </div>
    );
}

export default Panel;
