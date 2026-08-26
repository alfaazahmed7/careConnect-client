import { getDoctors } from '@/lib/api/doctor';
import DoctorSearchClient from '@/components/doctors/DoctorSearchClient';
import { HiShieldCheck, HiChevronRight } from 'react-icons/hi2';
import Link from 'next/link';

export default async function DoctorsPage({
    searchParams,
}: {
    searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
    const params = await searchParams;
    const queryString = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
        if (typeof value === "string") {
            queryString.set(key, value);
        }
    });

    const doctors = await getDoctors(queryString.toString());

    return (
        <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0F172A] py-8 transition-colors duration-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">

                {/* Breadcrumbs Navigation */}
                <nav className="flex items-center gap-2 text-xs font-medium text-[#64748B] dark:text-[#94A3B8]">
                    <Link href="/" className="hover:text-[#2563EB] transition-colors">
                        Home
                    </Link>
                    <HiChevronRight className="w-3 h-3 text-[#94A3B8]" />
                    <span className="text-[#0F172A] dark:text-[#F8FAFC] font-semibold">Find Doctors</span>
                </nav>

                {/* Page Title & Subtitle */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl sm:text-4xl font-black text-[#0F172A] dark:text-[#F8FAFC] tracking-tight">
                            Find Your Doctor
                        </h1>
                        <p className="text-sm text-[#64748B] dark:text-[#94A3B8] mt-1 font-medium">
                            Search, filter, and connect with verified healthcare professionals.
                        </p>
                    </div>

                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-[#111827] border border-[#E2E8F0] dark:border-[#334155] text-xs font-semibold text-[#0D9488] shadow-xs self-start sm:self-auto">
                        <HiShieldCheck className="w-4 h-4 text-[#0D9488]" />
                        <span>{doctors.length} verified doctors available</span>
                    </div>
                </div>

                {/* Client Search Shell */}
                <DoctorSearchClient initialDoctors={doctors} />

            </div>
        </div>
    );
}