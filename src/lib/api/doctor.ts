import { Doctor } from "@/types/Doctor";
import { serverFetch } from "../core/server";

interface GetDoctorsResponse {
    success: boolean;
    total: number;
    doctors: Doctor[];
}

export const getDoctors = async (
    queryString = ""
): Promise<Doctor[]> => {
    const data = await serverFetch<GetDoctorsResponse>(
        `/api/doctors?${queryString}`
    );

    return data.doctors;
};

// ): Promise<Doctor[]> -> This asynchronous function returns a Promise that eventually contains an array of Doctor.
// The <Doctor[]> tells serverFetch what type of data we expect.