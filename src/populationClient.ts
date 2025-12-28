import axios from "axios";

const BASE = process.env.POP_API_URL || "http://localhost:3000";

export async function getPopulation(city: string): Promise<{ city: string; population: number }> {
    const url = `${BASE.replace(/\/$/, "")}/people`;
    const resp = await axios.get(url, { params: { city } });
    if (resp.status !== 200) {
        throw new Error(`People API error: ${resp.status}`);
    }
    const data = resp.data;
    return { city, population: Number(data.population ?? 0) };
}
