// Account

export interface DoctorAccount {
    email: string;
    phone: string | null;
    emailVerified: boolean;
    phoneVerified: boolean;
    accountStatus: "active" | "suspended" | "blocked" | "deleted";
    lastLoginAt: string | null;
    createdAt: string;
    updatedAt: string;
}

// Location

export interface DoctorLocation {
    country: string | null;
    division: string | null;
    city: string | null;
    area: string | null;
    address: string | null;
    postalCode: string | null;
    coordinates: {
        latitude: number | null;
        longitude: number | null;
    };
}

// Profile

export interface DoctorProfile {
    firstName: string;
    lastName: string;
    fullName: string;
    title: string;
    gender: "male" | "female" | "other" | null;
    dateOfBirth: string | null;
    profileImage: string | null;
    coverImage: string | null;
    professionalTitle: string | null;
    shortBio: string | null;
    about: string | null;
    languages: string[];
    genderPreference: "male" | "female" | "any";
    location: DoctorLocation | null;
}

// Professional

export interface DoctorSpecialty {
    name: string;
    isPrimary: boolean;
}

export interface DoctorLicense {
    licenseNumber: string | null;
    issuingAuthority: string | null;
    country: string | null;
    issueDate: string | null;
    expiryDate: string | null;
    status: "pending" | "verified" | "rejected" | "expired";
}

export interface DoctorExperience {
    years: number;
    startedPracticing: number | null;
}

export interface DoctorConsultationFee {
    currency: string;
    inPerson: number | null;
    video: number | null;
    audio: number | null;
}

export interface DoctorProfessional {
    specialties: DoctorSpecialty[];
    subSpecialties: string[];

    license: DoctorLicense;

    experience: DoctorExperience;

    consultationTypes: (
        | "in_person"
        | "video"
        | "audio"
    )[];

    consultationFee: DoctorConsultationFee;

    followUpFee: DoctorConsultationFee;
}

// Education

export interface DoctorEducation {
    degree: string;
    field: string | null;
    institution: string;
    location: string | null;
    startYear: number | null;
    endYear: number | null;
    description: string | null;
}

// Certification

export interface DoctorCertification {
    name: string;
    issuingOrganization: string | null;
    issueDate: string | null;
    expiryDate: string | null;
    credentialId: string | null;
    verificationStatus: "pending" | "verified" | "rejected";
    documentUrl: string | null;
}

// Experience History

export interface DoctorExperienceHistory {
    position: string;
    organization: string;
    location: string | null;
    startDate: string | null;
    endDate: string | null;
    current: boolean;
    description: string | null;
}

// Hospital Affiliation

export interface DoctorHospitalAffiliation {
    name: string;
    department: string | null;
    position: string | null;
    address: string | null;
    phone: string | null;
}

// Service

export interface DoctorService {
    name: string;
    description: string | null;
    durationMinutes: number;
    fee: number | null;
    currency: string;
}

// Availability

export interface DoctorTimeSlot {
    start: string;
    end: string;
}

export interface DoctorDaySchedule {
    available: boolean;
    slots: DoctorTimeSlot[];
}

export interface DoctorWeeklySchedule {
    sunday: DoctorDaySchedule;
    monday: DoctorDaySchedule;
    tuesday: DoctorDaySchedule;
    wednesday: DoctorDaySchedule;
    thursday: DoctorDaySchedule;
    friday: DoctorDaySchedule;
    saturday: DoctorDaySchedule;
}

export interface DoctorAvailability {
    timezone: string;
    weeklySchedule: DoctorWeeklySchedule;
    appointmentDurationMinutes: number;
    bufferBetweenAppointmentsMinutes: number;
    advanceBookingDays: number;
    minimumCancellationNoticeHours: number;
}

// Verification

export interface DoctorVerificationDocument {
    type:
    | "medical_license"
    | "national_id"
    | "degree_certificate";

    documentUrl: string;

    status: "pending" | "approved" | "rejected";
}

export interface DoctorVerification {
    status:
    | "not_started"
    | "incomplete"
    | "submitted"
    | "under_review"
    | "verified"
    | "rejected";

    verifiedAt: string | null;
    verifiedBy: string | null;
    documents: DoctorVerificationDocument[];
}

// Rating

export interface DoctorRating {
    average: number;
    totalReviews: number;

    distribution: {
        "1": number;
        "2": number;
        "3": number;
        "4": number;
        "5": number;
    };
}

// Statistics

export interface DoctorStatistics {
    totalAppointments: number;
    completedAppointments: number;
    cancelledAppointments: number;
    noShowAppointments: number;
    totalPatients: number;
    returningPatients: number;
    averageConsultationDuration: number;
    profileViews: number;
}

// Preferences

export interface DoctorPreferences {
    acceptingNewPatients: boolean;
    acceptsEmergencyAppointments: boolean;
    autoConfirmAppointments: boolean;
    allowPatientMessages: boolean;
    showPhoneNumber: boolean;
    showEmail: boolean;
}

// Notifications

export interface DoctorNotifications {
    email: boolean;
    sms: boolean;
    push: boolean;
    appointmentReminders: boolean;
    newMessageNotifications: boolean;
    paymentNotifications: boolean;
    reviewNotifications: boolean;
}

// Payment

export interface DoctorPayment {
    currency: string;
    paymentMethods: ("card" | "mobile_banking")[];
    stripeAccountId: string | null;
    payoutEnabled: boolean;
}

// SEO

export interface DoctorSEO {
    slug: string;
    metaTitle: string | null;
    metaDescription: string | null;
}

// Badge

export interface DoctorBadge {
    type: string;
    label: string;
}

// Main Doctor Type

export interface Doctor {
    _id: string;
    userId: string;
    role: "doctor";
    account: DoctorAccount;
    profile: DoctorProfile;
    professional: DoctorProfessional;
    education: DoctorEducation[];
    certifications: DoctorCertification[];
    experienceHistory: DoctorExperienceHistory[];
    hospitalAffiliations: DoctorHospitalAffiliation[];
    services: DoctorService[];
    availability: DoctorAvailability;
    verification: DoctorVerification;
    rating: DoctorRating;
    statistics: DoctorStatistics;
    preferences: DoctorPreferences;
    notifications: DoctorNotifications;
    payment: DoctorPayment;
    seo: DoctorSEO;
    badges: DoctorBadge[];
    status: "active" | "inactive" | "pending" | "suspended";
    createdAt: string;
    updatedAt: string;
}