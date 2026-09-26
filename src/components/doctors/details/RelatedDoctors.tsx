import Link from 'next/link';
import { HiUserGroup, HiArrowRight } from 'react-icons/hi2';
import { Doctor } from '@/types/Doctor';
import { getDoctors } from '@/services/doctor.services';
import DoctorCard from '../DoctorCard';
import DoctorSection from './Section';

interface RelatedDoctorsProps {
    doctor: Doctor;
}

/**
 * Related doctors in the same specialty. Reuses the existing DoctorCard
 * component and the existing getDoctors service (no new fetching logic).
 */
export default async function RelatedDoctors({ doctor }: RelatedDoctorsProps) {
    const primarySpecialty =
        doctor.professional?.specialties?.find((item) => item.isPrimary)?.name ||
        doctor.professional?.specialties?.[0]?.name;

    if (!primarySpecialty) return null;

    const query = new URLSearchParams({
        specialty: primarySpecialty,
        limit: '4',
        page: '1',
    });

    let related: Doctor[] = [];

    try {
        const result = await getDoctors(query.toString());
        related = (result.doctors ?? [])
            .filter((item) => item._id !== doctor._id)
            .slice(0, 4);
    } catch {
        return null;
    }

    if (related.length === 0) return null;

    return (
        <DoctorSection
            title={`More ${primarySpecialty} Specialists`}
            subtitle="Similar verified doctors you can consult"
            icon={<HiUserGroup className="size-5" />}
        >
            <div className="min-w-0 space-y-4">
                <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    {related.map((item) => (
                        <DoctorCard key={item._id} doctor={item} />
                    ))}
                </div>

                <div className="flex justify-center pt-2">
                    <Link
                        href={`/doctors?specialty=${encodeURIComponent(primarySpecialty)}`}
                        className="inline-flex items-center gap-2 rounded-full border border-[#E2E8F0] px-5 py-2.5 text-sm font-semibold text-[#0F172A] transition-colors duration-200 hover:border-[#2563EB] hover:bg-[#EFF6FF] hover:text-[#2563EB] dark:border-[#334155] dark:text-[#F8FAFC] dark:hover:bg-[#1E3A8A]/20"
                    >
                        Browse all {primarySpecialty} doctors
                        <HiArrowRight className="size-4" />
                    </Link>
                </div>
            </div>
        </DoctorSection>
    );
}
