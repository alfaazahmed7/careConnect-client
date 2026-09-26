function Skeleton({ className = '' }: { className?: string }) {
    return <div className={`animate-pulse rounded-md bg-[#E2E8F0] dark:bg-[#334155] ${className}`} />;
}

function Panel({ children, className = '' }: { children: React.ReactNode; className?: string }) {
    return (
        <div
            className={`min-w-0 rounded-2xl border border-[#E2E8F0] bg-white shadow-xs dark:border-[#334155] dark:bg-[#111827] ${className}`}
        >
            {children}
        </div>
    );
}

function HeroSkeleton() {
    return (
        <div className="min-w-0 space-y-5">
            <div className="relative">
                <Skeleton className="h-[150px] w-full rounded-2xl sm:h-[200px] lg:h-[240px]" />
                <div className="relative -mt-14 flex items-end gap-4 px-4 sm:-mt-16 sm:px-6">
                    <Skeleton className="size-24 shrink-0 !rounded-full border-4 border-white sm:size-32 dark:border-[#111827]" />
                    <Skeleton className="mb-2 h-7 w-32 rounded-full" />
                </div>
            </div>

            <div className="space-y-3 px-4 sm:px-6">
                <Skeleton className="h-9 w-3/4 max-w-md" />
                <Skeleton className="h-5 w-1/2 max-w-xs" />
                <div className="flex flex-wrap gap-4 pt-1">
                    <Skeleton className="h-4 w-28" />
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-4 w-24" />
                </div>
                <div className="flex flex-wrap gap-2 pt-1">
                    <Skeleton className="h-7 w-28 rounded-full" />
                    <Skeleton className="h-7 w-24 rounded-full" />
                    <Skeleton className="h-7 w-32 rounded-full" />
                </div>
                <div className="flex flex-col gap-3 pt-2 sm:flex-row">
                    <Skeleton className="h-12 w-full rounded-xl sm:w-56" />
                    <Skeleton className="h-12 w-full rounded-xl sm:w-48" />
                </div>
            </div>
        </div>
    );
}

function BookingCardSkeleton() {
    return (
        <Panel className="p-5 sm:p-6">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="mt-3 h-10 w-36" />
            <div className="mt-4 space-y-3 border-t border-[#E2E8F0] pt-4 dark:border-[#334155]">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-2/3" />
            </div>
            <Skeleton className="mt-4 h-16 w-full rounded-xl" />
            <Skeleton className="mt-5 h-12 w-full rounded-xl" />
            <Skeleton className="mt-2.5 h-11 w-full rounded-xl" />
        </Panel>
    );
}

export default function DoctorDetailsLoading() {
    return (
        <div className="min-h-screen bg-[#F8FAFC] pt-28 pb-20 transition-colors duration-200 lg:pt-32 dark:bg-[#0F172A]">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="min-w-0 space-y-12 sm:space-y-16 lg:space-y-20">
                    {/* Breadcrumb */}
                    <div className="flex items-center gap-2">
                        <Skeleton className="h-4 w-12" />
                        <Skeleton className="h-4 w-16" />
                        <Skeleton className="h-4 w-24" />
                    </div>

                    {/* Hero + sticky booking card */}
                    <div className="grid min-w-0 grid-cols-1 items-start gap-6 lg:grid-cols-12 lg:gap-8">
                        <div className="min-w-0 lg:col-span-8">
                            <HeroSkeleton />
                        </div>
                        <div className="min-w-0 lg:col-span-4">
                            <BookingCardSkeleton />
                        </div>
                    </div>

                    {/* Stats row */}
                    <div className="grid min-w-0 grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
                        {Array.from({ length: 4 }).map((_, index) => (
                            <Panel key={index} className="p-4 sm:p-5">
                                <Skeleton className="size-10 rounded-xl" />
                                <Skeleton className="mt-3 h-7 w-20" />
                                <Skeleton className="mt-2 h-3.5 w-24" />
                            </Panel>
                        ))}
                    </div>

                    {/* About + section blocks */}
                    {Array.from({ length: 3 }).map((_, index) => (
                        <div key={index} className="min-w-0 space-y-5">
                            <div className="flex items-center gap-3">
                                <Skeleton className="size-10 rounded-xl" />
                                <Skeleton className="h-6 w-48" />
                            </div>
                            <Panel className="space-y-3 p-5 sm:p-7">
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-11/12" />
                                <Skeleton className="h-4 w-4/5" />
                                <Skeleton className="h-4 w-2/3" />
                            </Panel>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
