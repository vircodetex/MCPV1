import express from "express";
import { getPopulation } from "./populationClient";
import { getCityDescription } from "./ragStore";
import { normalizeCity } from "./utils";

console.log(`process.env.NODE_ENV 1 =  ${process.env.NODE_ENV}`);
console.log(`process.env.PORT 1 =  ${process.env.PORT}`);
if (process.env.NODE_ENV === "production") {
    delete process.env.PORT;
}

if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

console.log(`process.env.NODE_ENV 2 =  ${process.env.NODE_ENV}`);
console.log(`process.env.PORT 2 =  ${process.env.PORT}`);
if (process.env.NODE_ENV === "production") {
    delete process.env.PORT;
}

const app = express();

console.log(`process.env.NODE_ENV 3 =  ${process.env.NODE_ENV}`);
console.log(`process.env.PORT 3 =  ${process.env.PORT}`);
if (process.env.NODE_ENV === "production") {
    delete process.env.PORT;
}

const port = process.env.PORT || 3000;

console.log(`MCP server 0 listening on port ${port}`);

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
