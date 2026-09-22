import { Doctor } from "@/types/Doctor";

const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

interface GetDoctorsResponse {
    success: boolean;
    total: number;
    doctors: Doctor[];
}

export const getDoctors = async (
    queryString = ""
): Promise<GetDoctorsResponse> => {
    if (!baseUrl) {
        throw new Error("NEXT_PUBLIC_SERVER_URL is not configured.");
    }

    const url = `${baseUrl}/api/doctors${queryString ? `?${queryString}` : ""}`;

    try {
        const res = await fetch(url);

        if (!res.ok) {
            let message = `Request failed with status ${res.status}`;

            try {
                const errorData = await res.json();
                message = errorData?.message || errorData?.error || message;
            } catch {
                // Ignore JSON parsing error and use default message.
            }

            throw new Error(message);
        }

        const data: GetDoctorsResponse = await res.json();

        if (!data.success || !Array.isArray(data.doctors)) {
            throw new Error("Invalid response format received from server.");
        }

        return data;
    } catch (error) {
        console.error("Failed to fetch doctors:", error);

        throw new Error(
            error instanceof Error
                ? error.message
                : "Something went wrong while fetching doctors."
        );
    }
};

// ): Promise<GetDoctorsResponse> -> This asynchronous function returns doctor records and the total match count.
// The generic type tells serverFetch what response shape we expect.