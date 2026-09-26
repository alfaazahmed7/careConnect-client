import { getDoctorBySlug } from '@/services/doctor.services';
import React from 'react';

interface PageProps {
    params: Promise<{ id: string }>;
}

const DoctorDetailsPage = async ({ params }: PageProps) => {
    const resolvedParams = await params;
    const doctorSlug = resolvedParams.id;

    const doctor = await getDoctorBySlug(doctorSlug);

    return (
        <div className='pt-28 lg:pt-32'>
            <h4>This is doctor details page bitch!</h4>
        </div>
    );
};

export default DoctorDetailsPage;