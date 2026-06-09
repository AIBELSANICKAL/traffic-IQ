# TrafficIQ 📊

TrafficIQ is a custom, full-stack web analytics dashboard designed to track and visualize website traffic events in real-time. 

## 🚀 Tech Stack

*   **Frontend:** Next.js (React), Tailwind CSS, Recharts
*   **Backend:** Node.js, Express.js
*   **Database:** PostgreSQL (using `pg` or Prisma)
*   **Deployment:** Vercel (Frontend), Render/Railway (Backend), Supabase/Neon (Database)

## 📁 Project Structure

```text
trafficiq/
├── client/                # Next.js frontend application
│   ├── components/        # React components (Charts, Tables)
│   ├── pages/             # App routing and views
│   └── package.json
├── server/                # Express backend API
│   ├── routes/            # API endpoints (/api/track, /api/analytics)
│   ├── db/                # PostgreSQL connection and queries
│   └── package.json
└── README.md
