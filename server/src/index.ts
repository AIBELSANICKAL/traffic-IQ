import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const port = process.env.PORT || 3001;

// Allow CORS from frontend URL
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
}));
app.use(express.json());

// Track new events
app.post('/api/track', async (req, res) => {
  try {
    const { event_type, page_path, referrer } = req.body;

    if (!event_type || !page_path) {
      return res.status(400).json({ error: 'event_type and page_path are required' });
    }

    const event = await prisma.event.create({
      data: {
        event_type,
        page_path,
        referrer: referrer || null,
      },
    });

    res.status(201).json(event);
  } catch (error) {
    console.error('Error tracking event:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Analytics Dashboard endpoints
app.get('/api/analytics', async (req, res) => {
  try {
    // 1. Get total events for the last 7 days grouped by day
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const recentEvents = await prisma.event.findMany({
      where: {
        timestamp: {
          gte: sevenDaysAgo,
        },
      },
      orderBy: {
        timestamp: 'desc',
      },
      take: 100, // For the recent events table
    });

    // Grouping by day (client can do this, but we'll do it simply here)
    const dailyViewsMap: Record<string, number> = {};
    
    // Initialize last 7 days
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      dailyViewsMap[dateStr] = 0;
    }

    // Process events for chart (page views only)
    const allEventsForChart = await prisma.event.findMany({
      where: {
        timestamp: {
          gte: sevenDaysAgo,
        },
        event_type: 'page_view',
      },
    });

    allEventsForChart.forEach(event => {
      const dateStr = event.timestamp.toISOString().split('T')[0];
      if (dailyViewsMap[dateStr] !== undefined) {
        dailyViewsMap[dateStr]++;
      }
    });

    const chartData = Object.keys(dailyViewsMap).map(date => ({
      date,
      views: dailyViewsMap[date],
    })).sort((a, b) => a.date.localeCompare(b.date));

    res.json({
      chartData,
      recentEvents,
    });
  } catch (error) {
    console.error('Error fetching analytics:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
