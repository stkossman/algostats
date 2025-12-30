# Algostats Hub

**AlgoStats Hub** is a backend service (API) that aggregates user statistics from popular algorithmic problem-solving platforms: **Codewars** and **LeetCode**.

The goal of this project is to provide a single, unified interface (JSON) for retrieving developer progress data, which can then be displayed on a frontend (portfolios, dashboards, etc.).

## Tech Stack
* **Runtime:** Node.js
* **Framework:** Express.js
* **Language:** TypeScript (ES Modules)
* **HTTP Client:** Axios
* **Linter/Formatter:** Biome

## API Endpoints

### 1. Codewars
Retrieve detailed user statistics.

* **URL:** `/api/cw/:username`
* **Method:** `GET`
* **Success Response (200):**

```json
{
{
  "username": "kossman",
  "name": "Andrii Stavskyi",
  "honor": 351,
  "clan": "Ostroh Academy",
  "leaderboardPosition": 224547,
  "overallRank": {
    "name": "5 kyu",
    "score": 355,
    "color": "yellow"
  },
  "languages": [
    {
      "language": "ruby",
      "rank": "5 kyu",
      "score": 309,
      "color": "yellow"
    },
    {
      "language": "javascript",
      "rank": "7 kyu",
      "score": 32,
      "color": "white"
    },
    {
      "language": "typescript",
      "rank": "7 kyu",
      "score": 44,
      "color": "white"
    }
  ],
  "totalCompleted": 51
}
```

## Roadmap

- [x] Setup: Project initialization (Express, TS, Biome).
- [x] Codewars: Codewars REST API integration.
- [ ] LeetCode: LeetCode GraphQL API integration.
- [ ] Github: Github API integration.
- [ ] Aggregation: Endpoint for combined statistics from both platforms.
- [ ] Frontend: Client-side development.
