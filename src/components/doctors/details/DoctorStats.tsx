import { HiUserGroup, HiCheckBadge, HiBriefcase, HiEye } from 'react-icons/hi2';
import { Doctor } from '@/types/Doctor';
import { Panel } from './Panel';

interface DoctorStatsProps {
    doctor: Doctor;
}

const formatNumber = (value: number) =>
    value >= 1000 ? `${(value / 1000).toFixed(value % 1000 === 0 ? 0 : 1)}k` : String(value);

/**
 * Quick information stat cards directly under the hero.
 */
export default function DoctorStats({ doctor }: DoctorStatsProps) {
    const { statistics, professional } = doctor;

    const stats = [
        {
            key: 'patients',
            label: 'Patients Treated',
            value: statistics?.totalPatients ?? 0,
            icon: <HiUserGroup className="size-4 sm:size-5" />,
            tone: 'text-[#2563EB] bg-[#EFF6FF] dark:bg-[#1E3A8A]/20',
        },
        {
            key: 'appointments',
            label: 'Appointments Completed',
            value: statistics?.completedAppointments ?? 0,
            icon: <HiCheckBadge className="size-4 sm:size-5" />,
            tone: 'text-[#16A34A] bg-[#16A34A]/10',
        },
        {
            key: 'experience',
            label: 'Years Experience',
            value: professional?.experience?.years ?? 0,
            icon: <HiBriefcase className="size-4 sm:size-5" />,
            tone: 'text-[#0D9488] bg-[#0D9488]/10',
        },
        {
            key: 'views',
            label: 'Profile Views',
            value: statistics?.profileViews ?? 0,
            icon: <HiEye className="size-4 sm:size-5" />,
            tone: 'text-amber-600 bg-amber-500/10 dark:text-amber-400',
        },
    ].filter((stat) => stat.value > 0);

    if (stats.length === 0) return null;

    return (
        <section className="grid min-w-0 grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {stats.map((stat) => (
                <Panel
                    key={stat.key}
                    className="p-4 transition-all duration-200 hover:-translate-y-1 hover:shadow-md sm:p-5"
                >
                    <span
                        className={`inline-flex size-9 items-center justify-center rounded-xl sm:size-10 ${stat.tone}`}
                    >
                        {stat.icon}
                    </span>
                    <p className="mt-3 break-words text-xl font-black tracking-tight text-[#0F172A] transition-colors duration-200 sm:text-2xl dark:text-[#F8FAFC]">
                        {formatNumber(stat.value)}
                    </p>
                    <p className="mt-0.5 break-words text-[11px] font-medium text-[#64748B] transition-colors duration-200 sm:text-xs dark:text-[#94A3B8]">
                        {stat.label}
                    </p>
                </Panel>
            ))}
        </section>
    );
}
