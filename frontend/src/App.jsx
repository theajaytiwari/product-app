import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import ProductList from './pages/ProductList'
import ProductForm from './pages/ProductForm'
import Navbar from './components/Navbar'

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token')
  return token ? children : <Navigate to="/login" />
}

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<PrivateRoute><ProductList /></PrivateRoute>} />
        <Route path="/add-product" element={<PrivateRoute><ProductForm /></PrivateRoute>} />
        <Route path="/edit-product/:id" element={<PrivateRoute><ProductForm /></PrivateRoute>} />
      </Routes>
    </Router>
  )
}

export default App