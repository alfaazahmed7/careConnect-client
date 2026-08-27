function Skeleton({ className = '' }: { className?: string }) {
    return <div className={`animate-pulse rounded-md bg-[#E2E8F0] dark:bg-[#334155] ${className}`} />;
}

function DoctorCardSkeleton() {
    return (
        <div className="flex min-h-[300px] flex-col justify-between rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-xs dark:border-[#334155] dark:bg-[#111827]">
            <div>
                <div className="flex items-start gap-4">
                    <Skeleton className="h-20 w-20 shrink-0 rounded-xl sm:h-24 sm:w-24" />

                    <div className="min-w-0 flex-1 space-y-2">
                        <div className="flex items-center justify-between gap-3">
                            <Skeleton className="h-5 w-32 sm:w-40" />
                            <Skeleton className="h-6 w-16 rounded-full" />
                        </div>
                        <Skeleton className="h-4 w-28" />
                        <Skeleton className="h-3 w-36" />
                        <div className="flex flex-wrap gap-3 pt-2">
                            <Skeleton className="h-3 w-16" />
                            <Skeleton className="h-3 w-24" />
                        </div>
                    </div>
                </div>

                <div className="mt-4 flex gap-2">
                    <Skeleton className="h-6 w-20 rounded-md" />
                    <Skeleton className="h-6 w-24 rounded-md" />
                    <Skeleton className="hidden h-6 w-16 rounded-md sm:block" />
                </div>

                <div className="mt-4 border-t border-[#E2E8F0] pt-3 dark:border-[#334155]">
                    <Skeleton className="h-3 w-36" />
                </div>
            </div>

            <div className="mt-5 flex items-center justify-between gap-3 border-t border-[#E2E8F0] pt-4 dark:border-[#334155]">
                <div className="space-y-2">
                    <Skeleton className="h-3 w-24" />
                    <Skeleton className="h-5 w-20" />
                </div>
                <div className="flex gap-2">
                    <Skeleton className="h-9 w-20 rounded-xl" />
                    <Skeleton className="h-9 w-16 rounded-xl" />
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
                <Skeleton className="h-3 w-10" />
            </div>
            <div className="divide-y divide-[#E2E8F0] dark:divide-[#334155]/60">
                {[
                    { heading: 'w-24', item: 'w-20' },
                    { heading: 'w-20', item: 'w-24' },
                    { heading: 'w-16', item: 'w-20' },
                ].map(({ heading, item }, index) => (
                    <div key={index} className="space-y-4 p-4">
                        <div className="flex items-center justify-between">
                            <Skeleton className={`h-4 ${heading}`} />
                            <Skeleton className="h-4 w-4 rounded-full" />
                        </div>
                        {index === 0 && (
                            <div className="space-y-3">
                                {['w-[72%]', 'w-[88%]', 'w-[64%]', 'w-[92%]', 'w-[78%]'].map((itemWidth) => (
                                    <Skeleton key={itemWidth} className={`h-4 ${itemWidth}`} />
                                ))}
                            </div>
                        )}
                        {index > 0 && <Skeleton className={`h-4 ${item}`} />}
                    </div>
                ))}
            </div>
        </aside>
    );
}

export default function DoctorsLoading() {
    return (
        <div className="min-h-screen bg-[#F8FAFC] py-8 dark:bg-[#0F172A]">
            <div className="mx-auto max-w-7xl space-y-6 px-4 sm:px-6 lg:px-8">
                <div className="flex items-center gap-2">
                    <Skeleton className="h-3 w-8" />
                    <Skeleton className="h-3 w-3 rounded-full" />
                    <Skeleton className="h-3 w-20" />
                </div>

                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div className="space-y-2">
                        <Skeleton className="h-9 w-56 sm:h-10 sm:w-64" />
                        <Skeleton className="h-4 w-72 max-w-full" />
                    </div>
                    <Skeleton className="h-8 w-48 self-start rounded-full sm:self-auto" />
                </div>

                <div className="min-w-0 space-y-6">
                    <div className="w-full rounded-2xl border border-[#E2E8F0] bg-white p-2 shadow-xs dark:border-[#334155] dark:bg-[#111827] md:rounded-full">
                        <div className="flex min-w-0 flex-col items-center gap-2 md:flex-row">
                            <div className="flex min-w-0 w-full flex-1 items-center gap-3 px-4 py-2.5">
                                <Skeleton className="h-5 w-5 shrink-0 rounded-full" />
                                <Skeleton className="h-3 w-full max-w-[290px]" />
                            </div>
                            <div className="hidden h-8 w-px bg-[#E2E8F0] md:block dark:bg-[#334155]" />
                            <div className="flex min-w-0 w-full flex-1 items-center gap-3 px-4 py-2.5">
                                <Skeleton className="h-5 w-5 shrink-0 rounded-full" />
                                <Skeleton className="h-3 w-32" />
                            </div>
                            <div className="flex w-full min-w-0 items-center gap-2 px-1 md:w-auto">
                                <Skeleton className="h-12 w-12 shrink-0 rounded-full lg:hidden" />
                                <Skeleton className="h-12 min-w-0 flex-1 rounded-full md:w-24 md:flex-none" />
                            </div>
                        </div>
                    </div>

                    <div className="grid min-w-0 grid-cols-1 items-start gap-8 lg:grid-cols-12">
                        <FilterSkeleton />

                        <main className="min-w-0 space-y-6 lg:col-span-9">
                            <div className="flex items-center justify-between gap-4">
                                <Skeleton className="h-4 w-28" />
                                <Skeleton className="h-9 w-32 rounded-full" />
                            </div>
                            <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
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
