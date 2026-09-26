import { Suspense } from 'react';
import { Doctor } from '@/types/Doctor';
import DoctorBreadcrumb from './DoctorBreadcrumb';
import DoctorHero from './DoctorHero';
import StickyBookingCard from './StickyBookingCard';
import DoctorStats from './DoctorStats';
import DoctorAbout from './DoctorAbout';
import DoctorQualifications from './DoctorQualifications';
import DoctorExperienceTimeline from './DoctorExperienceTimeline';
import DoctorSpecializations from './DoctorSpecializations';
import DoctorServices from './DoctorServices';
import DoctorConsultationFee from './DoctorConsultationFee';
import DoctorAvailability from './DoctorAvailability';
import DoctorClinicInfo from './DoctorClinicInfo';
import DoctorReviews from './DoctorReviews';
import DoctorFaq from './DoctorFaq';
import RelatedDoctors from './RelatedDoctors';

interface DoctorDetailsProps {
    doctor: Doctor;
}

/**
 * Full Doctor Details layout.
 * Hero (2 columns on lg) -> content sections -> related doctors.
 * All sections are data-driven and collapse gracefully when fields are missing.
 */
export default function DoctorDetails({ doctor }: DoctorDetailsProps) {
    return (
        <div className="min-w-0 space-y-12 sm:space-y-16 lg:space-y-20">
            <DoctorBreadcrumb doctor={doctor} />

            {/* Hero + sticky booking card */}
            <div className="grid min-w-0 grid-cols-1 items-start gap-6 lg:grid-cols-12 lg:gap-8">
                <div className="min-w-0 lg:col-span-8 xl:col-span-8">
                    <DoctorHero doctor={doctor} />
                </div>
                <div className="min-w-0 lg:col-span-4 xl:col-span-4">
                    <StickyBookingCard doctor={doctor} />
                </div>
            </div>

            <DoctorStats doctor={doctor} />
            <DoctorAbout doctor={doctor} />
            <DoctorQualifications doctor={doctor} />
            <DoctorExperienceTimeline doctor={doctor} />
            <DoctorSpecializations doctor={doctor} />
            <DoctorServices doctor={doctor} />
            <DoctorConsultationFee doctor={doctor} />
            <DoctorAvailability doctor={doctor} />
            <DoctorClinicInfo doctor={doctor} />
            <DoctorReviews doctor={doctor} />
            <DoctorFaq doctor={doctor} />

            <Suspense fallback={null}>
                <RelatedDoctors doctor={doctor} />
            </Suspense>
        </div>
    );
}
