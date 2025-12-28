MCP City Service

This project is a small TypeScript MCP server that exposes two main capabilities:
- Query an external population API for the number of people in a city.
- Retrieve short descriptions for cities (a small RAG store) using fuzzy search.

Environment variables:
- `POP_API_URL` — base URL of the external population API. Example: https://api.example.com
- `PORT` — port for the MCP server (default 4000)


Install and run:

```powershell
cd path\to\MCPV1
npm install
# optional: run the mock population API for local testing
node mock-pop-api.js

# in another terminal run the MCP server in dev mode
npm run dev
```

Example requests:

GET /mcp/population?city=Seattle
GET /mcp/description?city=Seattle
