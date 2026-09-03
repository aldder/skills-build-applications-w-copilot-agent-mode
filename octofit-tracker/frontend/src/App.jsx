import './App.css'
import { NavLink, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'

function App() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="container d-flex flex-wrap align-items-center justify-content-between gap-3 py-3">
          <NavLink className="brand" to="/">OctoFit <span>Tracker</span></NavLink>
          <nav className="nav nav-pills" aria-label="Primary navigation">
            {[['/', 'Overview'], ['/activities', 'Activities'], ['/leaderboard', 'Leaderboard'], ['/teams', 'Teams'], ['/users', 'Users'], ['/workouts', 'Workouts']].map(([path, label]) => (
              <NavLink key={path} className="nav-link" to={path} end={path === '/'}>{label}</NavLink>
            ))}
          </nav>
        </div>
      </header>
      <main className="container py-4">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </main>
    </div>
  )
}

function Dashboard() {
  return <section className="dashboard-intro"><p className="eyebrow">Personal fitness command center</p><h1>Train together.<br /><em>Go further.</em></h1><p className="lead">Track your movement, find your team, and keep an eye on the leaderboard.</p><NavLink className="btn btn-dark" to="/activities">View activities</NavLink></section>
}

export default App
