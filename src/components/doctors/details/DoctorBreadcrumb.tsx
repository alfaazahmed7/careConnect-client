import Link from 'next/link';
import { HiChevronRight } from 'react-icons/hi2';
import { Doctor } from '@/types/Doctor';

interface DoctorBreadcrumbProps {
    doctor: Doctor;
}

/**
 * Breadcrumb: Home / Doctors / <Specialty> / <Doctor Name>
 * Specialty and doctor name are both derived from the doctor object.
 */
export default function DoctorBreadcrumb({ doctor }: DoctorBreadcrumbProps) {
    const primarySpecialty =
        doctor.professional?.specialties?.find((item) => item.isPrimary)?.name ||
        doctor.professional?.specialties?.[0]?.name;

    const specialtyHref = primarySpecialty
        ? `/doctors?specialty=${encodeURIComponent(primarySpecialty)}`
        : '/doctors';

    const crumbs = [
        { label: 'Home', href: '/' },
        { label: 'Doctors', href: '/doctors' },
        primarySpecialty ? { label: primarySpecialty, href: specialtyHref } : null,
    ].filter(Boolean) as { label: string; href: string }[];

    return (
        <nav aria-label="Breadcrumb" className="min-w-0">
            <ol className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1.5 text-xs font-medium">
                {crumbs.map((crumb) => (
                    <li key={crumb.href} className="flex min-w-0 items-center gap-2">
                        <Link
                            href={crumb.href}
                            className="break-words text-[#64748B] transition-colors duration-200 hover:text-[#2563EB] dark:text-[#94A3B8] dark:hover:text-[#2563EB]"
                        >
                            {crumb.label}
                        </Link>
                        <HiChevronRight className="size-3 shrink-0 text-[#94A3B8]" />
                    </li>
                ))}
                <li className="min-w-0">
                    <span
                        aria-current="page"
                        className="break-words font-bold text-[#0F172A] transition-colors duration-200 dark:text-[#F8FAFC]"
                    >
                        {doctor.profile?.fullName}
                    </span>
                </li>
            </ol>
        </nav>
    );
}
