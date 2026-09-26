import { HiClipboardDocumentCheck, HiClock, HiArrowRight } from 'react-icons/hi2';
import { Doctor } from '@/types/Doctor';
import DoctorSection from './Section';
import { EmptyState } from './Panel';

interface DoctorServicesProps {
    doctor: Doctor;
}

/**
 * Service cards: icon, title, description, duration and price.
 */
export default function DoctorServices({ doctor }: DoctorServicesProps) {
    const services = (doctor.services ?? []).filter((service) => service?.name);

    return (
        <DoctorSection
            title="Services Offered"
            subtitle="Treatments and procedures provided"
            icon={<HiClipboardDocumentCheck className="size-5" />}
        >
            {services.length > 0 ? (
                <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    {services.map((service, index) => (
                        <article
                            key={`${service.name}-${index}`}
                            className="group flex min-w-0 flex-col justify-between rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-xs transition-all duration-300 hover:border-[#2563EB] hover:shadow-lg dark:border-[#334155] dark:bg-[#111827] dark:hover:border-[#2563EB]"
                        >
                            <div className="min-w-0">
                                <span className="inline-flex size-11 items-center justify-center rounded-xl bg-[#EFF6FF] text-[#2563EB] transition-colors duration-200 dark:bg-[#1E3A8A]/20">
                                    <HiClipboardDocumentCheck className="size-5" />
                                </span>

                                <h3 className="mt-4 break-words text-sm font-bold text-[#0F172A] transition-colors duration-200 group-hover:text-[#2563EB] sm:text-base dark:text-[#F8FAFC]">
                                    {service.name}
                                </h3>

                                {service.description && (
                                    <p className="mt-1.5 break-words text-xs leading-relaxed text-[#64748B] transition-colors duration-200 sm:text-sm dark:text-[#94A3B8]">
                                        {service.description}
                                    </p>
                                )}
                            </div>

                            <div className="mt-5 flex min-w-0 items-center justify-between gap-3 border-t border-[#E2E8F0] pt-4 transition-colors duration-200 dark:border-[#334155]">
                                <span className="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-1 text-xs font-medium text-[#64748B] dark:text-[#94A3B8]">
                                    {service.durationMinutes > 0 && (
                                        <span className="flex items-center gap-1.5">
                                            <HiClock className="size-3.5 text-[#0D9488]" />
                                            {service.durationMinutes} min
                                        </span>
                                    )}
                                    {service.fee !== null && service.fee !== undefined && (
                                        <span className="font-bold text-[#0F172A] dark:text-[#F8FAFC]">
                                            ৳{service.fee}
                                        </span>
                                    )}
                                </span>

                                <HiArrowRight className="size-4 shrink-0 translate-x-0 text-[#2563EB] opacity-0 transition-all duration-200 group-hover:translate-x-1 group-hover:opacity-100" />
                            </div>
                        </article>
                    ))}
                </div>
            ) : (
                <EmptyState message="No services have been listed for this doctor yet." />
            )}
        </DoctorSection>
    );
}
