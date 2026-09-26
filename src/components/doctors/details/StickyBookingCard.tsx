'use client';

import Link from 'next/link';
import {
    HiCalendarDays,
    HiClock,
    HiCurrencyBangladeshi,
    HiMapPin,
    HiVideoCamera,
    HiPhone,
    HiCheckCircle,
    HiBolt,
} from 'react-icons/hi2';
import { Doctor } from '@/types/Doctor';
import { Panel } from './Panel';

const CONSULTATION_META: Record<string, { label: string; icon: React.ReactNode }> = {
    in_person: { label: 'In Person', icon: <HiMapPin className="size-4" /> },
    video: { label: 'Video', icon: <HiVideoCamera className="size-4" /> },
    audio: { label: 'Audio', icon: <HiPhone className="size-4" /> },
};

const DAY_KEYS = [
    'sunday',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
] as const;

const DAY_LABELS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

interface StickyBookingCardProps {
    doctor: Doctor;
}

/**
 * Premium sticky booking card. Static (no heavy animation) and sticky on lg+,
 * becomes a normal full-width card on tablet/mobile.
 */
export default function StickyBookingCard({ doctor }: StickyBookingCardProps) {
    const { consultationFee, consultationTypes } = doctor.professional;
    const currency = consultationFee?.currency || 'BDT';
    const availableTypes = (consultationTypes ?? []).filter((type) => CONSULTATION_META[type]);

    const fees = [
        { key: 'in_person', label: 'In Person', icon: <HiMapPin className="size-4" />, value: consultationFee?.inPerson ?? null },
        { key: 'video', label: 'Video', icon: <HiVideoCamera className="size-4" />, value: consultationFee?.video ?? null },
        { key: 'audio', label: 'Audio', icon: <HiPhone className="size-4" />, value: consultationFee?.audio ?? null },
    ].filter((fee) => availableTypes.includes(fee.key as 'in_person' | 'video' | 'audio') && fee.value !== null);

    const primaryFee =
        consultationFee?.video ?? consultationFee?.inPerson ?? consultationFee?.audio ?? null;

    const todayIndex = new Date().getDay();
    const today = doctor.availability?.weeklySchedule?.[DAY_KEYS[todayIndex]];
    const nextSlot = today?.available ? today.slots?.[0] : undefined;

    const nextAvailable = nextSlot
        ? `Today, ${nextSlot.start} – ${nextSlot.end}`
        : (() => {
            for (let offset = 1; offset < 7; offset += 1) {
                const index = (todayIndex + offset) % 7;
                const schedule = doctor.availability?.weeklySchedule?.[DAY_KEYS[index]];
                if (schedule?.available && schedule.slots?.length) {
                    return `${DAY_LABELS[index]}, ${schedule.slots[0].start} – ${schedule.slots[0].end}`;
                }
            }
        })();

    return (
        <Panel className="p-5 shadow-xl shadow-slate-200/60 dark:shadow-none sm:p-6 lg:sticky lg:top-28">
            <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-wider text-[#64748B] transition-colors duration-200 dark:text-[#94A3B8]">
                        Consultation Fee
                    </p>
                    {primaryFee !== null ? (
                        <p className="mt-1 flex flex-wrap items-baseline gap-1.5 text-[#0F172A] transition-colors duration-200 dark:text-[#F8FAFC]">
                            <span className="text-3xl font-black tracking-tight sm:text-4xl">
                                ৳{primaryFee}
                            </span>
                            <span className="text-xs font-medium text-[#64748B] dark:text-[#94A3B8]">
                                / visit
                            </span>
                        </p>
                    ) : (
                        <p className="mt-1 text-sm font-semibold text-[#64748B] dark:text-[#94A3B8]">
                            Fee available on request
                        </p>
                    )}
                </div>

                {doctor.rating?.average > 0 && (
                    <span className="shrink-0 rounded-full bg-amber-500/10 px-2.5 py-1 text-xs font-bold text-amber-600 dark:text-amber-400">
                        <span className="mr-1">★</span>
                        {doctor.rating.average.toFixed(1)}
                    </span>
                )}
            </div>

            {fees.length > 0 && (
                <ul className="mt-4 space-y-2 border-t border-[#E2E8F0] pt-4 transition-colors duration-200 dark:border-[#334155]">
                    {fees.map((fee) => (
                        <li
                            key={fee.key}
                            className="flex min-w-0 items-center justify-between gap-3 text-sm"
                        >
                            <span className="flex min-w-0 items-center gap-2 font-medium text-[#475569] transition-colors duration-200 dark:text-[#CBD5E1]">
                                <span className="text-[#2563EB]">{fee.icon}</span>
                                {fee.label}
                            </span>
                            <span className="shrink-0 font-bold text-[#0F172A] transition-colors duration-200 dark:text-[#F8FAFC]">
                                ৳{fee.value}
                            </span>
                        </li>
                    ))}
                </ul>
            )}

            <div className="mt-4 space-y-2.5 border-t border-[#E2E8F0] pt-4 transition-colors duration-200 dark:border-[#334155]">
                <div className="flex min-w-0 items-center justify-between gap-3 text-xs">
                    <span className="flex items-center gap-2 font-medium text-[#64748B] dark:text-[#94A3B8]">
                        <HiClock className="size-4 text-[#2563EB]" />
                        Appointment Duration
                    </span>
                    <span className="shrink-0 font-bold text-[#0F172A] dark:text-[#F8FAFC]">
                        {doctor.availability?.appointmentDurationMinutes
                            ? `${doctor.availability.appointmentDurationMinutes} min`
                            : '—'}
                    </span>
                </div>

                <div className="flex min-w-0 items-center justify-between gap-3 text-xs">
                    <span className="flex items-center gap-2 font-medium text-[#64748B] dark:text-[#94A3B8]">
                        <HiCalendarDays className="size-4 text-[#2563EB]" />
                        Book In Advance
                    </span>
                    <span className="shrink-0 font-bold text-[#0F172A] dark:text-[#F8FAFC]">
                        {doctor.availability?.advanceBookingDays
                            ? `${doctor.availability.advanceBookingDays} days`
                            : '—'}
                    </span>
                </div>
            </div>

            {nextAvailable && (
                <div className="mt-4 rounded-xl border border-[#2563EB]/20 bg-[#EFF6FF] p-3 transition-colors duration-200 dark:border-[#2563EB]/30 dark:bg-[#1E3A8A]/20">
                    <div className="flex items-center gap-2 text-xs font-semibold text-[#2563EB]">
                        <HiBolt className="size-4 shrink-0" />
                        Next Available Slot
                    </div>
                    <p className="mt-1 break-words text-sm font-bold text-[#0F172A] transition-colors duration-200 dark:text-[#F8FAFC]">
                        {nextAvailable}
                    </p>
                </div>
            )}

            <Link
                href={`/doctors/${doctor.seo?.slug || doctor._id}/book`}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#2563EB] px-5 py-3.5 text-sm font-bold text-white shadow-xs transition-all duration-200 hover:bg-[#1D4ED8] hover:shadow-md active:scale-[0.99]"
            >
                <HiCalendarDays className="size-5" />
                Book Appointment
            </Link>

            {doctor.preferences?.allowPatientMessages && (
                <Link
                    href={`/doctors/${doctor.seo?.slug || doctor._id}/message`}
                    className="mt-2.5 flex w-full items-center justify-center gap-2 rounded-xl border border-[#E2E8F0] px-5 py-3 text-sm font-semibold text-[#0F172A] transition-colors duration-200 hover:bg-[#F1F5F9] dark:border-[#334155] dark:text-[#F8FAFC] dark:hover:bg-[#1E293B]"
                >
                    Message Doctor
                </Link>
            )}

            {doctor.preferences?.acceptingNewPatients && (
                <p className="mt-4 flex items-center justify-center gap-1.5 text-xs font-semibold text-[#16A34A]">
                    <HiCheckCircle className="size-4 shrink-0" />
                    Accepting new patients
                </p>
            )}

            <p className="mt-4 flex items-center justify-center gap-1.5 text-[11px] font-medium text-[#64748B] dark:text-[#94A3B8]">
                <HiCurrencyBangladeshi className="size-3.5" />
                Secure payment in {currency}
            </p>
        </Panel>
    );
}

