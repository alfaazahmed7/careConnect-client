import { HiSparkles, HiCheckBadge } from 'react-icons/hi2';
import { Doctor } from '@/types/Doctor';
import DoctorSection from './Section';
import { EmptyState } from './Panel';

interface DoctorSpecializationsProps {
    doctor: Doctor;
}

/**
 * Premium chip grid for primary specialties and sub-specialties.
 */
export default function DoctorSpecializations({ doctor }: DoctorSpecializationsProps) {
    const primary = (doctor.professional?.specialties ?? []).filter((item) => item?.name);
    const subSpecialties = (doctor.professional?.subSpecialties ?? []).filter(Boolean);

    const hasData = primary.length > 0 || subSpecialties.length > 0;

    return (
        <DoctorSection
            title="Specializations"
            subtitle="Clinical focus areas and expertise"
            icon={<HiSparkles className="size-5" />}
        >
            {hasData ? (
                <div className="min-w-0 space-y-6">
                    {primary.length > 0 && (
                        <div>
                            <p className="mb-2.5 text-[11px] font-bold uppercase tracking-wider text-[#64748B] dark:text-[#94A3B8]">
                                Primary Specialties
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {primary.map((item) => (
                                    <span
                                        key={item.name}
                                        className="inline-flex max-w-full items-center gap-1.5 rounded-full border border-[#2563EB]/20 bg-[#EFF6FF] px-3.5 py-2 text-xs font-bold text-[#2563EB] transition-colors duration-200 hover:bg-[#2563EB] hover:text-white sm:text-sm dark:border-[#2563EB]/30 dark:bg-[#1E3A8A]/20"
                                    >
                                        <HiCheckBadge className="size-4 shrink-0" />
                                        <span className="break-words">{item.name}</span>
                                        {item.isPrimary && (
                                            <span className="rounded-full bg-white/70 px-1.5 py-0.5 text-[9px] font-black uppercase tracking-wide dark:bg-[#0F172A]/40">
                                                Primary
                                            </span>
                                        )}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {subSpecialties.length > 0 && (
                        <div>
                            <p className="mb-2.5 text-[11px] font-bold uppercase tracking-wider text-[#64748B] dark:text-[#94A3B8]">
                                Sub-Specialties
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {subSpecialties.map((name) => (
                                    <span
                                        key={name}
                                        className="max-w-full break-words rounded-full border border-[#E2E8F0] bg-white px-3.5 py-2 text-xs font-semibold text-[#475569] transition-colors duration-200 hover:border-[#2563EB] hover:bg-[#2563EB] hover:text-white sm:text-sm dark:border-[#334155] dark:bg-[#111827] dark:text-[#CBD5E1]"
                                    >
                                        {name}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <EmptyState message="Specialization details are not available yet." />
            )}
        </DoctorSection>
    );
}
