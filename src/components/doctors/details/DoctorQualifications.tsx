import { HiAcademicCap, HiMapPin, HiCalendarDays } from 'react-icons/hi2';
import { Doctor } from '@/types/Doctor';
import DoctorSection from './Section';
import { EmptyState } from './Panel';

interface DoctorQualificationsProps {
    doctor: Doctor;
}

/**
 * Vertical education timeline with blue graduation markers and connectors.
 */
export default function DoctorQualifications({ doctor }: DoctorQualificationsProps) {
    const education = (doctor.education ?? []).filter((item) => item?.degree || item?.institution);

    return (
        <DoctorSection
            title="Qualifications"
            subtitle="Academic background and medical education"
            icon={<HiAcademicCap className="size-5" />}
        >
            {education.length > 0 ? (
                <ol className="min-w-0 space-y-4">
                    {education.map((item, index) => {
                        const yearRange =
                            item.startYear && item.endYear
                                ? `${item.startYear} – ${item.endYear}`
                                : item.endYear
                                    ? String(item.endYear)
                                    : item.startYear
                                        ? String(item.startYear)
                                        : null;

                        return (
                            <li key={`${item.degree}-${index}`} className="relative min-w-0 pl-14 sm:pl-16">
                                {index !== education.length - 1 && (
                                    <span
                                        aria-hidden="true"
                                        className="absolute left-[21px] top-12 h-[calc(100%-2rem)] w-px bg-[#E2E8F0] transition-colors duration-200 sm:left-[25px] dark:bg-[#334155]"
                                    />
                                )}

                                <span className="absolute left-0 top-0 flex size-11 items-center justify-center rounded-full border border-[#2563EB]/20 bg-[#EFF6FF] text-[#2563EB] transition-colors duration-200 sm:size-13 dark:border-[#2563EB]/30 dark:bg-[#1E3A8A]/20">
                                    <HiAcademicCap className="size-5" />
                                </span>

                                <div className="min-w-0 rounded-2xl border border-[#E2E8F0] bg-white p-4 shadow-xs transition-colors duration-200 sm:p-5 dark:border-[#334155] dark:bg-[#111827]">
                                    <div className="flex min-w-0 flex-wrap items-start justify-between gap-2">
                                        <div className="min-w-0">
                                            <h3 className="break-words text-sm font-bold text-[#0F172A] transition-colors duration-200 sm:text-base dark:text-[#F8FAFC]">
                                                {item.degree}
                                            </h3>
                                            {item.field && (
                                                <p className="mt-0.5 break-words text-xs font-semibold text-[#2563EB] sm:text-sm">
                                                    {item.field}
                                                </p>
                                            )}
                                        </div>

                                        {yearRange && (
                                            <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[#F1F5F9] px-2.5 py-1 text-[11px] font-bold text-[#64748B] transition-colors duration-200 dark:bg-[#1E293B] dark:text-[#94A3B8]">
                                                <HiCalendarDays className="size-3.5" />
                                                {yearRange}
                                            </span>
                                        )}
                                    </div>

                                    {item.institution && (
                                        <p className="mt-2 flex min-w-0 items-start gap-1.5 text-xs font-medium text-[#475569] transition-colors duration-200 sm:text-sm dark:text-[#CBD5E1]">
                                            <HiMapPin className="mt-0.5 size-3.5 shrink-0 text-[#0D9488]" />
                                            <span className="break-words">
                                                {[item.institution, item.location].filter(Boolean).join(', ')}
                                            </span>
                                        </p>
                                    )}

                                    {item.description && (
                                        <p className="mt-2 break-words text-xs leading-relaxed text-[#64748B] transition-colors duration-200 sm:text-sm dark:text-[#94A3B8]">
                                            {item.description}
                                        </p>
                                    )}
                                </div>
                            </li>
                        );
                    })}
                </ol>
            ) : (
                <EmptyState message="Education details are not available for this doctor yet." />
            )}
        </DoctorSection>
    );
}
