function Skeleton({ className = '' }: { className?: string }) {
    return <div className={`animate-pulse rounded-md bg-[#E2E8F0] dark:bg-[#334155] ${className}`} />;
}

function DoctorCardSkeleton() {
    return (
        <div className="flex flex-col justify-between rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-xs dark:border-[#334155] dark:bg-[#111827]">
            <div>
                <div className="flex items-start gap-4">
                    <Skeleton className="h-20 w-20 shrink-0 rounded-xl sm:h-24 sm:w-24" />

                    <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-2">
                            <Skeleton className="h-7 w-32 sm:w-40" />
                            <Skeleton className="h-[26px] w-16 shrink-0 rounded-full" />
                        </div>

                        <Skeleton className="mt-0.5 h-5 w-28" />

                        <Skeleton className="mt-0.5 h-5 w-36" />

                        <div className="mt-3 flex flex-wrap items-center gap-3">
                            <Skeleton className="h-4 w-16" />
                            <Skeleton className="h-4 w-24" />
                        </div>
                    </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-1.5">
                    <Skeleton className="h-[29px] w-20 rounded-md" />
                    <Skeleton className="h-[29px] w-24 rounded-md" />
                    <Skeleton className="hidden h-[29px] w-16 rounded-md sm:block" />
                </div>

                <div className="mt-4 flex items-center gap-2 border-t border-[#E2E8F0] pt-3 text-xs text-[#16A34A] font-medium dark:border-[#334155]/60">
                    <Skeleton className="h-4 w-4 shrink-0 rounded-full" />
                    <Skeleton className="h-4 w-36" />
                </div>
            </div>

            <div className="mt-5 flex items-center justify-between gap-3 border-t border-[#E2E8F0] pt-4 dark:border-[#334155]">
                <div>
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="mt-1 h-7 w-20" />
                </div>
                <div className="flex items-center gap-2">
                    <Skeleton className="h-[34px] w-20 rounded-xl" />
                    <Skeleton className="h-[34px] w-16 rounded-xl" />
                </div>
            </div>
        </div>
    );
}

function FilterSkeleton() {
    return (
        <aside className="hidden overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white shadow-xs dark:border-[#334155] dark:bg-[#111827] lg:col-span-3 lg:block">
            <div className="flex items-center justify-between border-b border-[#E2E8F0] bg-[#F8FAFC] p-4 dark:border-[#334155] dark:bg-[#1E293B]/50">
                <Skeleton className="h-5 w-20" />
                <Skeleton className="h-4 w-10" />
            </div>
            <div className="divide-y divide-[#E2E8F0] dark:divide-[#334155]/60">
                {/* Specialty Section */}
                <div className="p-4">
                    <div className="flex w-full items-center justify-between">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-4 w-4" />
                    </div>
                    <div className="mt-3 max-h-44 overflow-hidden pr-1.5">
                        <div className="space-y-1">
                            {['w-[72%]', 'w-[88%]', 'w-[64%]', 'w-[92%]', 'w-[78%]'].map((itemWidth) => (
                                <div key={itemWidth} className="flex items-center gap-2 py-1 px-2">
                                    <Skeleton className="h-3.5 w-3.5 shrink-0 rounded" />
                                    <Skeleton className={`h-4 ${itemWidth}`} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Minimum Rating Section */}
                <div className="p-4">
                    <div className="flex w-full items-center justify-between">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-4 w-4" />
                    </div>
                    <div className="mt-3 space-y-1">
                        {['w-20', 'w-24', 'w-16'].map((itemWidth) => (
                            <div key={itemWidth} className="flex items-center gap-2 py-1 px-2">
                                <Skeleton className="h-3.5 w-3.5 shrink-0 rounded-full" />
                                <Skeleton className={`h-4 ${itemWidth}`} />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Consultation Type Section */}
                <div className="p-4">
                    <div className="flex w-full items-center justify-between">
                        <Skeleton className="h-4 w-36" />
                        <Skeleton className="h-4 w-4" />
                    </div>
                    <div className="mt-3 space-y-1">
                        {['w-16', 'w-24', 'w-20'].map((itemWidth) => (
                            <div key={itemWidth} className="flex items-center gap-2 py-1 px-2">
                                <Skeleton className="h-3.5 w-3.5 shrink-0 rounded-full" />
                                <Skeleton className={`h-4 ${itemWidth}`} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </aside>
    );
}

export default function DoctorsLoading() {
    return (
        <div className="min-h-screen bg-[#F8FAFC] pb-8 pt-28 transition-colors duration-200 dark:bg-[#0F172A] lg:pt-32">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">

                {/* Breadcrumbs Navigation */}
                <div className="flex items-center gap-2 text-xs font-medium text-[#64748B] dark:text-[#94A3B8]">
                    <Skeleton className="h-4 w-9" />
                    <Skeleton className="h-3 w-3" />
                    <Skeleton className="h-4 w-20" />
                </div>

                {/* Page Title & Subtitle */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <Skeleton className="h-10 w-56 sm:w-64" />
                        <Skeleton className="mt-1 h-5 w-72 max-w-full" />
                    </div>
                    <Skeleton className="h-8 w-48 self-start rounded-full sm:self-auto" />
                </div>

                {/* Client Search Shell */}
                <div className="min-w-0 space-y-6">
                    <div className="w-full max-w-full rounded-2xl border border-[#E2E8F0] bg-white p-2 shadow-xs transition-all duration-200 dark:border-[#334155] dark:bg-[#111827] md:rounded-full">
                        <div className="flex min-w-0 flex-col items-center gap-2 md:flex-row">
                            <div className="flex min-w-0 w-full flex-1 items-center gap-3 px-4 py-2.5">
                                <Skeleton className="h-5 w-5 shrink-0 rounded-full" />
                                <Skeleton className="h-5 w-[290px] max-w-full" />
                            </div>
                            <div className="hidden md:block w-px h-8 bg-[#E2E8F0] dark:bg-[#334155]" />
                            <div className="flex min-w-0 w-full flex-1 items-center gap-3 px-4 py-2.5">
                                <Skeleton className="h-5 w-5 shrink-0 rounded-full" />
                                <Skeleton className="h-5 w-32" />
                            </div>
                            <div className="flex w-full min-w-0 items-center gap-2 px-1 md:w-auto">
                                <Skeleton className="h-12 w-12 shrink-0 rounded-full lg:hidden" />
                                <Skeleton className="h-12 min-w-0 flex-1 rounded-full px-7 py-3 md:w-auto md:flex-none" />
                            </div>
                        </div>
                    </div>

                    <div className="grid min-w-0 grid-cols-1 items-start gap-8 lg:grid-cols-12">
                        <FilterSkeleton />

                        <main className="min-w-0 space-y-6 lg:col-span-9">
                            <div className="flex items-center justify-between gap-4">
                                <div>
                                    <Skeleton className="h-5 w-28" />
                                </div>
                                <Skeleton className="h-9 w-44 shrink-0 rounded-full" />
                            </div>
                            <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
                                <DoctorCardSkeleton />
                                <DoctorCardSkeleton />
                                <DoctorCardSkeleton />
                                <DoctorCardSkeleton />
                            </div>
                        </main>
                    </div>
                </div>
            </div>
        </div>
    );
}
