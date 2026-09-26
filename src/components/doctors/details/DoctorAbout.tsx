import { HiLanguage, HiHeart, HiShieldCheck, HiChatBubbleLeftRight, HiPhone } from 'react-icons/hi2';
import { Doctor } from '@/types/Doctor';
import DoctorSection from './Section';
import { EmptyState, Panel } from './Panel';

interface DoctorAboutProps {
    doctor: Doctor;
}

/**
 * Biography card with languages and consultation preferences.
 */
export default function DoctorAbout({ doctor }: DoctorAboutProps) {
    const { profile, preferences } = doctor;
    const bio = profile.about || profile.shortBio;
    const languages = (profile.languages ?? []).filter(Boolean);

    const preferenceItems = [
        preferences?.acceptingNewPatients && {
            key: 'accepting',
            icon: <HiHeart className="size-4" />,
            label: 'Accepting new patients',
        },
        preferences?.acceptsEmergencyAppointments && {
            key: 'emergency',
            icon: <HiShieldCheck className="size-4" />,
            label: 'Accepts emergency appointments',
        },
        preferences?.allowPatientMessages && {
            key: 'messages',
            icon: <HiChatBubbleLeftRight className="size-4" />,
            label: 'Open to patient messages',
        },
        preferences?.autoConfirmAppointments && {
            key: 'auto',
            icon: <HiPhone className="size-4" />,
            label: 'Instant appointment confirmation',
        },
    ].filter(Boolean) as { key: string; icon: React.ReactNode; label: string }[];

    return (
        <DoctorSection
            title={`About ${profile.fullName}`}
            subtitle={profile.professionalTitle || undefined}
        >
            {bio || languages.length > 0 || preferenceItems.length > 0 ? (
                <Panel className="p-5 sm:p-7">
                    {bio && (
                        <p className="whitespace-pre-line break-words text-sm leading-relaxed text-[#475569] transition-colors duration-200 sm:text-base dark:text-[#CBD5E1]">
                            {bio}
                        </p>
                    )}

                    {languages.length > 0 && (
                        <div className="mt-6">
                            <p className="mb-2.5 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#64748B] dark:text-[#94A3B8]">
                                <HiLanguage className="size-4" />
                                Languages Spoken
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {languages.map((language) => (
                                    <span
                                        key={language}
                                        className="rounded-full border border-[#E2E8F0] bg-[#F1F5F9] px-3 py-1 text-xs font-semibold text-[#475569] transition-colors duration-200 dark:border-[#334155] dark:bg-[#1E293B] dark:text-[#CBD5E1]"
                                    >
                                        {language}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {preferenceItems.length > 0 && (
                        <div className="mt-6 border-t border-[#E2E8F0] pt-5 transition-colors duration-200 dark:border-[#334155]">
                            <p className="mb-3 text-[11px] font-bold uppercase tracking-wider text-[#64748B] dark:text-[#94A3B8]">
                                Consultation Preferences
                            </p>
                            <ul className="grid min-w-0 grid-cols-1 gap-2.5 sm:grid-cols-2">
                                {preferenceItems.map((item) => (
                                    <li
                                        key={item.key}
                                        className="flex min-w-0 items-center gap-2.5 rounded-xl bg-[#F8FAFC] px-3 py-2.5 text-xs font-semibold text-[#475569] transition-colors duration-200 sm:text-sm dark:bg-[#1E293B]/50 dark:text-[#CBD5E1]"
                                    >
                                        <span className="shrink-0 text-[#2563EB]">{item.icon}</span>
                                        <span className="break-words">{item.label}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </Panel>
            ) : (
                <EmptyState message="Biography will be updated soon." />
            )}
        </DoctorSection>
    );
}
