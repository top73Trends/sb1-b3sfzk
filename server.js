import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import { createServer } from 'vite';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const SECRET_KEY = 'your_secret_key';

const users = [
  { id: 1, email: 'admin@example.com', password: 'password', role: 'admin' },
  { id: 2, email: 'client@example.com', password: 'password', role: 'client' },
  { id: 3, email: 'user@example.com', password: 'password', role: 'user' },
];

const dashboardData = {
  admin: {
    totalUsers: 100,
    activeCampaigns: 25,
    revenue: 50000,
  },
  client: {
    websiteTraffic: 10000,
    socialEngagement: 5000,
    conversionRate: 2.5,
  },
  user: {
    tasksCompleted: 15,
    upcomingDeadlines: 5,
    teamPerformance: 85,
  },
};

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);

  if (user) {
    const token = jwt.sign({ userId: user.id, role: user.role }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token, role: user.role });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

app.get('/api/dashboard/:role', authenticateToken, (req, res) => {
  const { role } = req.params;
  const data = dashboardData[role];

  if (data) {
    res.json(data);
  } else {
    res.status(404).json({ message: 'Dashboard data not found' });
  }
});

// Vite integration
const vite = await createServer({
  server: { middlewareMode: true },
  appType: 'spa',
});

app.use(vite.middlewares);

// Serve static files
app.use(express.static(path.join(__dirname, 'dist')));

// Handle React routing, return all requests to React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});