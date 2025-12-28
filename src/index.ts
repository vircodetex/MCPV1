import express from "express";
import dotenv from "dotenv";
import { getPopulation } from "./populationClient";
import { getCityDescription } from "./ragStore";
import { normalizeCity } from "./utils";

dotenv.config();

const app = express();
const port = process.env.PORT ? Number(process.env.PORT) : 4000;

app.get("/mcp/population", async (req, res) => {
    const cityRaw = String(req.query.city || "");
    const city = normalizeCity(cityRaw);
    if (!city) return res.status(400).json({ error: "city query param required" });
    try {
        const result = await getPopulation(city);
        res.json(result);
    } catch (err: any) {
        res.status(500).json({ error: err.message || String(err) });
    }
});

app.get("/mcp/description", async (req, res) => {
    const cityRaw = String(req.query.city || "");
    const city = normalizeCity(cityRaw);
    if (!city) return res.status(400).json({ error: "city query param required" });
    try {
        const desc = await getCityDescription(city);
        res.json({ city, description: desc });
    } catch (err: any) {
        res.status(500).json({ error: err.message || String(err) });
    }
});

app.get("/mcp/capabilities", (_req, res) => {
    res.json({
        capabilities: [
            {
                service: "MCP",
                version: process.env.npm_package_version || "unknown",
                endpoints: [
                    {
                        path: "/mcp/population",
                        method: "GET",
                        query: { city: "string (required)" },
                        description: "Returns population info for a normalized city"
                    },
                    {
                        path: "/mcp/description",
                        method: "GET",
                        query: { city: "string (required)" },
                        description: "Returns a textual description for a normalized city"
                    }
                ]
            }
        ]
    });
});

app.listen(port, () => {
    console.log(`MCP server listening on port ${port}`);
});
