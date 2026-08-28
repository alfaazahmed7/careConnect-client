import { Doctor } from "@/types/Doctor";
import { serverFetch } from "../core/server";

interface GetDoctorsResponse {
    success: boolean;
    total: number;
    doctors: Doctor[];
}

export const getDoctors = async (
    queryString = ""
): Promise<GetDoctorsResponse> => {
    const data = await serverFetch<GetDoctorsResponse>(
        `/api/doctors?${queryString}`
    );

    return data;
};

// ): Promise<GetDoctorsResponse> -> This asynchronous function returns doctor records and the total match count.
// The generic type tells serverFetch what response shape we expect.