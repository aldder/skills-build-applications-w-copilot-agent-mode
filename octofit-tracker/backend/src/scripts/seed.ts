import mongoose from 'mongoose';
import { Activity, Leaderboard, Team, User, Workout } from '../models.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await Promise.all([
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Team.deleteMany({}),
      User.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.create([
      { name: 'Avery Chen', email: 'avery.chen@example.com', avatarUrl: 'https://i.pravatar.cc/150?img=32' },
      { name: 'Jordan Rivera', email: 'jordan.rivera@example.com', avatarUrl: 'https://i.pravatar.cc/150?img=12' },
      { name: 'Morgan Patel', email: 'morgan.patel@example.com', avatarUrl: 'https://i.pravatar.cc/150?img=47' },
      { name: 'Sam Wilson', email: 'sam.wilson@example.com', avatarUrl: 'https://i.pravatar.cc/150?img=5' },
      { name: 'Taylor Brooks', email: 'taylor.brooks@example.com', avatarUrl: 'https://i.pravatar.cc/150?img=44' },
    ]);

    await Team.create([
      { name: 'Harbor Striders', members: [users[0]._id, users[1]._id, users[3]._id] },
      { name: 'Summit Circuit', members: [users[2]._id, users[4]._id] },
    ]);

    await Activity.create([
      { user: users[0]._id, type: 'Morning run', durationMinutes: 42, caloriesBurned: 465, completedAt: new Date('2026-08-31T06:45:00Z') },
      { user: users[1]._id, type: 'Strength training', durationMinutes: 55, caloriesBurned: 390, completedAt: new Date('2026-08-31T17:30:00Z') },
      { user: users[2]._id, type: 'Cycling', durationMinutes: 68, caloriesBurned: 610, completedAt: new Date('2026-09-01T07:15:00Z') },
      { user: users[3]._id, type: 'Yoga', durationMinutes: 35, caloriesBurned: 145, completedAt: new Date('2026-09-01T18:00:00Z') },
      { user: users[4]._id, type: 'HIIT', durationMinutes: 28, caloriesBurned: 320, completedAt: new Date('2026-09-02T06:30:00Z') },
      { user: users[0]._id, type: 'Swimming', durationMinutes: 38, caloriesBurned: 410, completedAt: new Date('2026-09-02T19:00:00Z') },
      { user: users[2]._id, type: 'Trail run', durationMinutes: 50, caloriesBurned: 540, completedAt: new Date('2026-09-03T06:20:00Z') },
    ]);

    await Leaderboard.create([
      { user: users[2]._id, points: 1240, period: 'weekly' },
      { user: users[0]._id, points: 1180, period: 'weekly' },
      { user: users[4]._id, points: 1025, period: 'weekly' },
      { user: users[1]._id, points: 960, period: 'weekly' },
      { user: users[3]._id, points: 745, period: 'weekly' },
    ]);

    await Workout.create([
      { title: 'Lakeside 5K Builder', description: 'Steady intervals to build an efficient 5K pace.', durationMinutes: 40, difficulty: 'intermediate' },
      { title: 'Mobility Reset', description: 'A full-body mobility routine for recovery days.', durationMinutes: 20, difficulty: 'beginner' },
      { title: 'Power Circuit', description: 'Compound lifts and short rests for total-body strength.', durationMinutes: 45, difficulty: 'advanced' },
      { title: 'Sunrise Flow', description: 'Gentle yoga flow to improve balance and flexibility.', durationMinutes: 30, difficulty: 'beginner' },
      { title: 'Tempo Ride', description: 'A structured cycling workout with tempo intervals.', durationMinutes: 60, difficulty: 'intermediate' },
    ]);

    console.log('Database seeding complete');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
  }
}

seedDatabase();
