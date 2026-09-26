import { HiCalendarDays, HiClock, HiBolt, HiShieldCheck } from 'react-icons/hi2';
import { Doctor } from '@/types/Doctor';
import DoctorSection from './Section';
import { EmptyState, Panel } from './Panel';

interface DoctorAvailabilityProps {
    doctor: Doctor;
}

const DAYS = [
    { key: 'sunday', label: 'Sunday', short: 'Sun' },
    { key: 'monday', label: 'Monday', short: 'Mon' },
    { key: 'tuesday', label: 'Tuesday', short: 'Tue' },
    { key: 'wednesday', label: 'Wednesday', short: 'Wed' },
    { key: 'thursday', label: 'Thursday', short: 'Thu' },
    { key: 'friday', label: 'Friday', short: 'Fri' },
    { key: 'saturday', label: 'Saturday', short: 'Sat' },
] as const;

/**
 * Weekly schedule calendar with availability badges and time slot pills.
 */
export default function DoctorAvailability({ doctor }: DoctorAvailabilityProps) {
    const availability = doctor.availability;
    const schedule = availability?.weeklySchedule;

    const infoCards = [
        availability?.appointmentDurationMinutes
            ? {
                key: 'duration',
                icon: <HiClock className="size-4" />,
                label: 'Appointment Duration',
                value: `${availability.appointmentDurationMinutes} min`,
            }
            : null,
        availability?.bufferBetweenAppointmentsMinutes
            ? {
                key: 'buffer',
                icon: <HiBolt className="size-4" />,
                label: 'Buffer Time',
                value: `${availability.bufferBetweenAppointmentsMinutes} min`,
            }
            : null,
        availability?.advanceBookingDays
            ? {
                key: 'advance',
                icon: <HiCalendarDays className="size-4" />,
                label: 'Advance Booking',
                value: `${availability.advanceBookingDays} days`,
            }
            : null,
        availability?.minimumCancellationNoticeHours
            ? {
                key: 'cancel',
                icon: <HiShieldCheck className="size-4" />,
                label: 'Cancellation Notice',
                value: `${availability.minimumCancellationNoticeHours} hrs`,
            }
            : null,
    ].filter(Boolean) as { key: string; icon: React.ReactNode; label: string; value: string }[];

    return (
        <DoctorSection
            title="Weekly Availability"
            subtitle={availability?.timezone ? `Times shown in ${availability.timezone}` : 'Weekly consultation schedule'}
            icon={<HiCalendarDays className="size-5" />}
        >
            {schedule ? (
                <div className="min-w-0 space-y-4">
                    {infoCards.length > 0 && (
                        <div className="grid min-w-0 grid-cols-2 gap-3 lg:grid-cols-4">
                            {infoCards.map((info) => (
                                <div
                                    key={info.key}
                                    className="min-w-0 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-3 transition-colors duration-200 sm:p-4 dark:border-[#334155] dark:bg-[#1E293B]/50"
                                >
                                    <span className="flex items-center gap-1.5 text-[11px] font-semibold text-[#64748B] dark:text-[#94A3B8]">
                                        <span className="text-[#2563EB]">{info.icon}</span>
                                        <span className="break-words">{info.label}</span>
                                    </span>
                                    <p className="mt-1 text-sm font-bold text-[#0F172A] transition-colors duration-200 dark:text-[#F8FAFC]">
                                        {info.value}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}

                    <Panel className="overflow-hidden">
                        <ul className="divide-y divide-[#E2E8F0] transition-colors duration-200 dark:divide-[#334155]">
                            {DAYS.map((day) => {
                                const daySchedule = schedule[day.key];
                                const isAvailable = Boolean(daySchedule?.available && daySchedule.slots?.length);

                                return (
                                    <li
                                        key={day.key}
                                        className="flex min-w-0 flex-col gap-3 p-4 transition-colors duration-200 sm:flex-row sm:items-start sm:gap-5 sm:p-5"
                                    >
                                        <div className="flex min-w-0 items-center justify-between gap-3 sm:w-40 sm:shrink-0 sm:flex-col sm:items-start sm:gap-1.5">
                                            <span className="text-sm font-bold text-[#0F172A] transition-colors duration-200 dark:text-[#F8FAFC]">
                                                <span className="sm:hidden">{day.short}</span>
                                                <span className="hidden sm:inline">{day.label}</span>
                                            </span>
                                            <span
                                                className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${isAvailable
                                                    ? 'bg-[#16A34A]/10 text-[#16A34A]'
                                                    : 'bg-[#F1F5F9] text-[#64748B] dark:bg-[#1E293B] dark:text-[#94A3B8]'
                                                    }`}
                                            >
                                                {isAvailable ? 'Available' : 'Closed'}
                                            </span>
                                        </div>

                                        <div className="flex min-w-0 flex-1 flex-wrap gap-2">
                                            {isAvailable ? (
                                                daySchedule.slots.map((slot, index) => (
                                                    <span
                                                        key={`${slot.start}-${slot.end}-${index}`}
                                                        className="rounded-full border border-[#2563EB]/20 bg-[#EFF6FF] px-3 py-1.5 text-xs font-semibold text-[#2563EB] transition-colors duration-200 hover:bg-[#2563EB] hover:text-white dark:border-[#2563EB]/30 dark:bg-[#1E3A8A]/20"
                                                    >
                                                        {slot.start} to {slot.end}
                                                    </span>
                                                ))
                                            ) : (
                                                <span className="text-xs font-medium text-[#64748B] dark:text-[#94A3B8]">
                                                    No consultation slots on this day
                                                </span>
                                            )}
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    </Panel>
                </div>
            ) : (
                <EmptyState message="Weekly availability has not been published yet." />
            )}
        </DoctorSection>
    );
}