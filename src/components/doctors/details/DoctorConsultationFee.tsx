import { HiBanknotes, HiMapPin, HiVideoCamera, HiPhone, HiCheckCircle, HiArrowPath } from 'react-icons/hi2';
import { Doctor } from '@/types/Doctor';
import DoctorSection from './Section';
import { EmptyState } from './Panel';

interface DoctorConsultationFeeProps {
    doctor: Doctor;
}

/**
 * Three pricing options with In Person highlighted, plus follow-up pricing below.
 */
export default function DoctorConsultationFee({ doctor }: DoctorConsultationFeeProps) {
    const fee = doctor.professional?.consultationFee;
    const followUp = doctor.professional?.followUpFee;
    const currency = fee?.currency || 'BDT';

    const options = [
        {
            key: 'in_person',
            label: 'In Person Visit',
            description: 'Face-to-face consultation at the clinic',
            icon: <HiMapPin className="size-5" />,
            value: fee?.inPerson ?? null,
            featured: true,
        },
        {
            key: 'video',
            label: 'Video Consultation',
            description: 'Secure online video appointment',
            icon: <HiVideoCamera className="size-5" />,
            value: fee?.video ?? null,
            featured: false,
        },
        {
            key: 'audio',
            label: 'Audio Consultation',
            description: 'Voice-only phone consultation',
            icon: <HiPhone className="size-5" />,
            value: fee?.audio ?? null,
            featured: false,
        },
    ].filter((option) => option.value !== null);

    const followUpOptions = [
        { key: 'in_person', label: 'In Person', value: followUp?.inPerson ?? null },
        { key: 'video', label: 'Video', value: followUp?.video ?? null },
        { key: 'audio', label: 'Audio', value: followUp?.audio ?? null },
    ].filter((option) => option.value !== null);

    return (
        <DoctorSection
            title="Consultation Fee"
            subtitle={`Transparent pricing in ${currency}`}
            icon={<HiBanknotes className="size-5" />}
        >
            {options.length > 0 ? (
                <div className="min-w-0 space-y-4">
                    <div className="grid min-w-0 grid-cols-1 gap-4 md:grid-cols-3">
                        {options.map((option) => (
                            <div
                                key={option.key}
                                className={`flex min-w-0 flex-col justify-between rounded-2xl border bg-white p-5 shadow-xs transition-all duration-200 dark:bg-[#111827] ${option.featured
                                    ? 'border-[#2563EB]/40 shadow-md md:-mt-2 md:pb-6 dark:border-[#2563EB]/40'
                                    : 'border-[#E2E8F0] hover:border-[#2563EB]/40 dark:border-[#334155]'
                                    }`}
                            >
                                <div className="min-w-0">
                                    <span
                                        className={`inline-flex size-11 items-center justify-center rounded-xl transition-colors duration-200 ${option.featured
                                            ? 'bg-[#2563EB] text-white'
                                            : 'bg-[#EFF6FF] text-[#2563EB] dark:bg-[#1E3A8A]/20'
                                            }`}
                                    >
                                        {option.icon}
                                    </span>

                                    <h3 className="mt-4 break-words text-sm font-bold text-[#0F172A] transition-colors duration-200 sm:text-base dark:text-[#F8FAFC]">
                                        {option.label}
                                    </h3>
                                    <p className="mt-1 break-words text-xs text-[#64748B] transition-colors duration-200 dark:text-[#94A3B8]">
                                        {option.description}
                                    </p>
                                </div>

                                <div className="mt-5 flex flex-wrap items-baseline gap-1.5">
                                    <span className="text-2xl font-black tracking-tight text-[#0F172A] transition-colors duration-200 sm:text-3xl dark:text-[#F8FAFC]">
                                        ৳{option.value}
                                    </span>
                                    <span className="text-xs font-medium text-[#64748B] dark:text-[#94A3B8]">
                                        / session
                                    </span>
                                </div>

                                {option.featured && (
                                    <p className="mt-3 flex items-center gap-1.5 text-[11px] font-bold text-[#2563EB]">
                                        <HiCheckCircle className="size-4 shrink-0" />
                                        Most popular option
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>


                    {followUpOptions.length > 0 && (
                        <div className="min-w-0 rounded-2xl border border-[#E2E8F0] bg-[#F1F5F9] p-4 transition-colors duration-200 sm:p-5 dark:border-[#334155] dark:bg-[#1E293B]">
                            <p className="mb-3 flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-[#64748B] dark:text-[#94A3B8]">
                                <HiArrowPath className="size-4 text-[#2563EB]" />
                                Follow-up Consultation
                            </p>
                            <div className="flex flex-wrap gap-x-6 gap-y-2">
                                {followUpOptions.map((item) => (
                                    <span
                                        key={item.key}
                                        className="flex min-w-0 items-baseline gap-2 text-xs font-medium text-[#475569] dark:text-[#CBD5E1]"
                                    >
                                        {item.label}
                                        <span className="text-sm font-bold text-[#0F172A] dark:text-[#F8FAFC]">
                                            ৳{item.value}
                                        </span>
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <EmptyState message="Consultation fees will be published soon." />
            )}
        </DoctorSection>
    );
}
