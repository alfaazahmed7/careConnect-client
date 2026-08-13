const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

export const serverFetch = async <T>(path: string): Promise<T> => {
    const res = await fetch(`${baseUrl}${path}`);

    if (!res.ok) {
        throw new Error(`Request failed: ${res.status}`);
    }

    return res.json() as T;
}

// Promise<T> -> Any async function always returns a Promise.
// return res.json() as T -> "The JSON data inside the Promise is type T."