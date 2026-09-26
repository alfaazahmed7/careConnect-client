import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getDoctorBySlug } from '@/services/doctor.services';
import DoctorDetails from '@/components/doctors/details/DoctorDetails';

interface PageProps {
    params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { id } = await params;

    try {
        const { doctor } = await getDoctorBySlug(id);

        return {
            title: doctor.seo?.metaTitle || `${doctor.profile.fullName} | CareConnect`,
            description:
                doctor.seo?.metaDescription ||
                doctor.profile.shortBio ||
                `Book an appointment with ${doctor.profile.fullName} on CareConnect.`,
        };
    } catch {
        return { title: 'Doctor Not Found | CareConnect' };
    }
}

export default async function DoctorDetailsPage({ params }: PageProps) {
    const resolvedParams = await params;
    const doctorSlug = resolvedParams.id;

    let doctor;

    try {
        const response = await getDoctorBySlug(doctorSlug);
        doctor = response.doctor;
    } catch {
        notFound();
    }

    if (!doctor) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-[#F8FAFC] pt-28 pb-20 transition-colors duration-200 lg:pt-32 dark:bg-[#0F172A]">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <DoctorDetails doctor={doctor} />
            </div>
        </div>
    );
}
