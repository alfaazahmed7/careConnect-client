import {
    HiBuildingOffice2,
    HiMapPin,
    HiPhone,
    HiGlobeAlt,
    HiHome,
    HiMap,
    HiSquares2X2,
} from 'react-icons/hi2';
import { Doctor } from '@/types/Doctor';
import DoctorSection from './Section';
import { EmptyState, Panel } from './Panel';

interface DoctorClinicInfoProps {
    doctor: Doctor;
}

/**
 * Two-column clinic information: details card + static map placeholder.
 */
export default function DoctorClinicInfo({ doctor }: DoctorClinicInfoProps) {
    const affiliations = (doctor.hospitalAffiliations ?? []).filter((item) => item?.name);
    const location = doctor.profile?.location;
    const primary = affiliations[0];

    const clinicRows = [
        primary && {
            key: 'hospital',
            icon: <HiBuildingOffice2 className="size-4" />,
            label: 'Hospital',
            value: primary.name,
        },
        primary?.department && {
            key: 'department',
            icon: <HiSquares2X2 className="size-4" />,
            label: 'Department',
            value: primary.department,
        },
        primary?.position && {
            key: 'position',
            icon: <HiHome className="size-4" />,
            label: 'Position',
            value: primary.position,
        },
        (primary?.address || location?.address) && {
            key: 'address',
            icon: <HiMapPin className="size-4" />,
            label: 'Address',
            value: primary?.address || location?.address,
        },
        (primary?.phone || (doctor.preferences?.showPhoneNumber ? doctor.account?.phone : null)) && {
            key: 'phone',
            icon: <HiPhone className="size-4" />,
            label: 'Phone',
            value: primary?.phone || doctor.account?.phone,
        },
        location?.city && {
            key: 'city',
            icon: <HiMapPin className="size-4" />,
            label: 'City',
            value: location.city,
        },
        location?.country && {
            key: 'country',
            icon: <HiGlobeAlt className="size-4" />,
            label: 'Country',
            value: location.country,
        },
    ].filter(Boolean) as { key: string; icon: React.ReactNode; label: string; value: string }[];

    const coordinates = location?.coordinates;
    const hasCoordinates =
        coordinates?.latitude !== null &&
        coordinates?.latitude !== undefined &&
        coordinates?.longitude !== null &&
        coordinates?.longitude !== undefined;

    return (
        <DoctorSection
            title="Clinic Information"
            subtitle="Where patients are seen"
            icon={<HiBuildingOffice2 className="size-5" />}
        >
            {clinicRows.length > 0 || location ? (
                <div className="grid min-w-0 grid-cols-1 gap-4 lg:grid-cols-2">
                    <Panel className="p-5 sm:p-6">
                        {clinicRows.length > 0 ? (
                            <ul className="space-y-4">
                                {clinicRows.map((row) => (
                                    <li key={row.key} className="flex min-w-0 items-start gap-3">
                                        <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-xl bg-[#EFF6FF] text-[#2563EB] transition-colors duration-200 dark:bg-[#1E3A8A]/20">
                                            {row.icon}
                                        </span>
                                        <div className="min-w-0">
                                            <p className="text-[11px] font-bold uppercase tracking-wider text-[#64748B] dark:text-[#94A3B8]">
                                                {row.label}
                                            </p>
                                            <p className="mt-0.5 break-words text-sm font-semibold text-[#0F172A] transition-colors duration-200 dark:text-[#F8FAFC]">
                                                {row.value}
                                            </p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-sm font-medium text-[#64748B] dark:text-[#94A3B8]">
                                Clinic details are not available for this doctor.
                            </p>
                        )}
                    </Panel>


                    {/* Static map placeholder */}
                    <Panel className="relative min-h-[240px] overflow-hidden p-5 sm:p-6">
                        <div
                            aria-hidden="true"
                            className="absolute inset-0 bg-[#EFF6FF] transition-colors duration-200 dark:bg-[#1E293B]/60"
                            style={{
                                backgroundImage:
                                    'radial-gradient(circle at 20% 25%, rgba(37,99,235,0.14) 0, transparent 42%), radial-gradient(circle at 78% 70%, rgba(13,148,136,0.14) 0, transparent 45%)',
                            }}
                        />
                        <div
                            aria-hidden="true"
                            className="absolute inset-0 opacity-[0.35] dark:opacity-20"
                            style={{
                                backgroundImage:
                                    'linear-gradient(to right, #E2E8F0 1px, transparent 1px), linear-gradient(to bottom, #E2E8F0 1px, transparent 1px)',
                                backgroundSize: '36px 36px',
                            }}
                        />

                        <div className="relative flex h-full min-h-[200px] flex-col justify-between gap-6">
                            <div className="flex min-w-0 items-start justify-between gap-3">
                                <div className="min-w-0">
                                    <p className="text-[11px] font-bold uppercase tracking-wider text-[#64748B] dark:text-[#94A3B8]">
                                        Clinic Location
                                    </p>
                                    <p className="mt-1 break-words text-base font-black text-[#0F172A] transition-colors duration-200 dark:text-[#F8FAFC]">
                                        {primary?.name || location?.city || 'Location unavailable'}
                                    </p>
                                </div>

                                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white text-[#2563EB] shadow-sm transition-colors duration-200 dark:bg-[#111827]">
                                    <HiMap className="size-5" />
                                </span>
                            </div>

                            <div className="flex min-w-0 flex-wrap gap-3">
                                {location?.area && (
                                    <span className="min-w-0 rounded-xl border border-[#E2E8F0] bg-white/80 px-3 py-2 backdrop-blur-sm transition-colors duration-200 dark:border-[#334155] dark:bg-[#111827]/80">
                                        <span className="block text-[10px] font-bold uppercase tracking-wider text-[#64748B] dark:text-[#94A3B8]">
                                            Area
                                        </span>
                                        <span className="break-words text-xs font-bold text-[#0F172A] dark:text-[#F8FAFC]">
                                            {location.area}
                                        </span>
                                    </span>
                                )}

                                {location?.postalCode && (
                                    <span className="min-w-0 rounded-xl border border-[#E2E8F0] bg-white/80 px-3 py-2 backdrop-blur-sm transition-colors duration-200 dark:border-[#334155] dark:bg-[#111827]/80">
                                        <span className="block text-[10px] font-bold uppercase tracking-wider text-[#64748B] dark:text-[#94A3B8]">
                                            Postal Code
                                        </span>
                                        <span className="break-words text-xs font-bold text-[#0F172A] dark:text-[#F8FAFC]">
                                            {location.postalCode}
                                        </span>
                                    </span>
                                )}

                                {hasCoordinates && (
                                    <span className="min-w-0 rounded-xl border border-[#E2E8F0] bg-white/80 px-3 py-2 backdrop-blur-sm transition-colors duration-200 dark:border-[#334155] dark:bg-[#111827]/80">
                                        <span className="block text-[10px] font-bold uppercase tracking-wider text-[#64748B] dark:text-[#94A3B8]">
                                            Coordinates
                                        </span>
                                        <span className="break-words text-xs font-bold text-[#0F172A] dark:text-[#F8FAFC]">
                                            {coordinates.latitude?.toFixed(4)}, {coordinates.longitude?.toFixed(4)}
                                        </span>
                                    </span>
                                )}
                            </div>
                        </div>
                    </Panel>
                </div>
            ) : (
                <EmptyState message="Clinic information is not available yet." />
            )}
        </DoctorSection>
    );
}
