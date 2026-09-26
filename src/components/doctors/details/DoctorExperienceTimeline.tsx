import { HiBriefcase, HiMapPin, HiCalendarDays } from 'react-icons/hi2';
import { Doctor } from '@/types/Doctor';
import DoctorSection from './Section';
import { EmptyState } from './Panel';

interface DoctorExperienceTimelineProps {
    doctor: Doctor;
}

const formatDate = (value: string | null) => {
    if (!value) return null;
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
};

/**
 * Professional career timeline. Current positions get a soft blue border.
 */
export default function DoctorExperienceTimeline({ doctor }: DoctorExperienceTimelineProps) {
    const history = (doctor.experienceHistory ?? []).filter(
        (item) => item?.position || item?.organization
    );

    return (
        <DoctorSection
            title="Professional Experience"
            subtitle="Career history and clinical positions"
            icon={<HiBriefcase className="size-5" />}
        >
            {history.length > 0 ? (
                <ol className="min-w-0 space-y-4">
                    {history.map((item, index) => {
                        const start = formatDate(item.startDate);
                        const end = item.current ? 'Present' : formatDate(item.endDate);
                        const duration = start ? `${start} – ${end ?? 'Present'}` : end;

                        return (
                            <li key={`${item.position}-${index}`} className="relative min-w-0 pl-6 sm:pl-8">
                                <span
                                    aria-hidden="true"
                                    className={`absolute left-[5px] top-4 h-full w-px transition-colors duration-200 ${index === history.length - 1
                                        ? 'bg-transparent'
                                        : item.current
                                            ? 'bg-[#2563EB]/30'
                                            : 'bg-[#E2E8F0] dark:bg-[#334155]'
                                        }`}
                                />
                                <span
                                    aria-hidden="true"
                                    className={`absolute left-0 top-6 size-2.5 rounded-full ring-4 transition-colors duration-200 ${item.current
                                        ? 'bg-[#2563EB] ring-[#EFF6FF] dark:ring-[#1E3A8A]/40'
                                        : 'bg-[#CBD5E1] ring-[#F8FAFC] dark:bg-[#475569] dark:ring-[#0F172A]'
                                        }`}
                                />

                                <div
                                    className={`min-w-0 rounded-2xl border bg-white p-4 shadow-xs transition-colors duration-200 sm:p-5 dark:bg-[#111827] ${item.current
                                        ? 'border-[#2563EB]/30 dark:border-[#2563EB]/40'
                                        : 'border-[#E2E8F0] dark:border-[#334155]'
                                        }`}
                                >
                                    <div className="flex min-w-0 flex-wrap items-start justify-between gap-2">
                                        <div className="min-w-0">
                                            <h3 className="break-words text-sm font-bold text-[#0F172A] transition-colors duration-200 sm:text-base dark:text-[#F8FAFC]">
                                                {item.position}
                                            </h3>
                                            {item.organization && (
                                                <p className="mt-0.5 break-words text-xs font-semibold text-[#2563EB] sm:text-sm">
                                                    {item.organization}
                                                </p>
                                            )}
                                        </div>

                                        {item.current && (
                                            <span className="shrink-0 rounded-full bg-[#2563EB]/10 px-2.5 py-1 text-[11px] font-bold text-[#2563EB]">
                                                Current
                                            </span>
                                        )}
                                    </div>

                                    <div className="mt-2.5 flex min-w-0 flex-wrap items-center gap-x-4 gap-y-1.5 text-xs font-medium text-[#64748B] transition-colors duration-200 dark:text-[#94A3B8]">
                                        {duration && (
                                            <span className="flex items-center gap-1.5">
                                                <HiCalendarDays className="size-3.5 text-[#0D9488]" />
                                                {duration}
                                            </span>
                                        )}
                                        {item.location && (
                                            <span className="flex min-w-0 items-center gap-1.5">
                                                <HiMapPin className="size-3.5 shrink-0 text-[#0D9488]" />
                                                <span className="break-words">{item.location}</span>
                                            </span>
                                        )}
                                    </div>


                                    {item.description && (
                                        <p className="mt-2.5 break-words text-xs leading-relaxed text-[#64748B] transition-colors duration-200 sm:text-sm dark:text-[#94A3B8]">
                                            {item.description}
                                        </p>
                                    )}
                                </div>
                            </li>
                        );
                    })}
                </ol>
            ) : (
                <EmptyState message="Professional experience details are coming soon." />
            )}
        </DoctorSection>
    );
}
