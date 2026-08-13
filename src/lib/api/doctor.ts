import { Doctor } from "@/types/Doctor";
import { serverFetch } from "../core/server";

export const getDoctors = async (): Promise<Doctor[]> => {
    return serverFetch<Doctor[]>('/api/doctors');
}