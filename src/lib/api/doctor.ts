import { Doctor } from "@/types/Doctor";
import { serverFetch } from "../core/server";

export const getDoctors = async (
    queryString: string = ""
): Promise<Doctor[]> => {
    return serverFetch<Doctor[]>(`/api/doctors?${queryString}`);
};

// ): Promise<Doctor[]> -> This asynchronous function returns a Promise that eventually contains an array of Doctor.
// The <Doctor[]> tells serverFetch what type of data we expect.