import Fuse from "fuse.js";
import cities from "../data/cities.json";

const fuse = new Fuse(cities, { keys: ["name", "description"], threshold: 0.4 });

export async function getCityDescription(query: string): Promise<string> {
    const res = fuse.search(query, { limit: 1 });
    if (res.length === 0) {
        return "No description found.";
    }
    return res[0].item.description;
}
