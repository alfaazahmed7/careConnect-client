import DoctorSearchClient from '@/components/doctors/DoctorSearchClient';
import { getDoctors } from '@/lib/api/doctor';
import { HiShieldCheck } from 'react-icons/hi2';

export default async function DoctorsPage() {
    const doctors = await getDoctors();

    return (
        <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0F172A] py-8 transition-colors duration-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">

                {/* Page Title & Subtitle */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E2E8F0] dark:border-[#334155] pb-6">
                    <div>
                        <h1 className="text-3xl font-extrabold text-[#0F172A] dark:text-[#F8FAFC] tracking-tight">
                            Find Your Doctor
                        </h1>
                        <p className="text-sm text-[#64748B] dark:text-[#94A3B8] mt-1">
                            Search, filter, and connect with verified healthcare professionals.
                        </p>
                    </div>

                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-[#111827] border border-[#E2E8F0] dark:border-[#334155] text-xs font-semibold text-[#16A34A] shadow-sm self-start sm:self-auto">
                        <HiShieldCheck className="w-4 h-4 text-[#16A34A]" />
                        <span>{doctors.length} verified doctors available</span>
                    </div>
                </div>

                {/* Client Component Handling Search, Filters, and Grid Display */}
                <DoctorSearchClient initialDoctors={doctors} />

            </div>
        </div>
    );
}