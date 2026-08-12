import {Routes, Route, Navigate} from 'react-router'
import Cookies from 'js-cookie'
import Login from './components/Login'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './components/Home'
import Search from './components/Search'
import Popular from './components/Popular'
import MovieItemDetails from './components/MovieItemDetails'
import NotFound from './components/NotFound'
import Account from './components/Account'

import './App.css'
const jwtToken = Cookies.get('jwt_token')
const App = () => {
  return (
    <Routes>
      {/* Login */}
      <Route
        path="/login"
        element={jwtToken ? <Navigate to="/" replace /> : <Login />}
      />

      {/* Home */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />

      {/* Popular */}
      <Route
        path="/popular"
        element={
          <ProtectedRoute>
            <Popular />
          </ProtectedRoute>
        }
      />

      {/* Search */}
      <Route
        path="/search"
        element={
          <ProtectedRoute>
            <Search />
          </ProtectedRoute>
        }
      />

      {/* Movie Details */}
      <Route
        path="/movies/:id"
        element={
          <ProtectedRoute>
            <MovieItemDetails />
          </ProtectedRoute>
        }
      />

      {/* Account */}
      <Route
        path="/account"
        element={
          <ProtectedRoute>
            <Account />
          </ProtectedRoute>
        }
      />

      {/* Not Found */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App
