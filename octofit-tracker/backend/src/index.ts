import express from 'express';
import './config/database.js';
import { Activity, Leaderboard, Team, User, Workout } from './models.js';

const app = express();
const port = 8000;
const codespaceName = process.env.CODESPACE_NAME;
const apiUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';

app.use(express.json());

app.get('/api/health', (_request, response) => {
    response.json({ status: 'ok', apiUrl });
});

app.get('/api/users', async (_request, response, next) => {
    try {
        response.json(await User.find().sort({ name: 1 }));
    } catch (error) {
        next(error);
    }
});

app.get('/api/teams/', async (_request, response, next) => {
    try {
        response.json(await Team.find().populate('members').sort({ name: 1 }));
    } catch (error) {
        next(error);
    }
});

app.get('/api/activities', async (_request, response, next) => {
    try {
        response.json(await Activity.find().populate('user').sort({ completedAt: -1 }));
    } catch (error) {
        next(error);
    }
});

app.get('/api/leaderboard/', async (_request, response, next) => {
    try {
        response.json(await Leaderboard.find().populate('user').sort({ points: -1 }));
    } catch (error) {
        next(error);
    }
});

app.get('/api/workouts/', async (_request, response, next) => {
    try {
        response.json(await Workout.find().sort({ title: 1 }));
    } catch (error) {
        next(error);
    }
});

app.use((error: Error, _request: express.Request, response: express.Response, _next: express.NextFunction) => {
    console.error(error);
    response.status(500).json({ error: 'Unable to complete the request.' });
});

app.listen(port, '0.0.0.0', () => {
    console.log(`OctoFit API listening on ${apiUrl}`);
});