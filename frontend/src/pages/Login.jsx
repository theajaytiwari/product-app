import { useState } from 'react'
import { TextField, Button, Box, Typography, Paper } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import API from '../api/axios'

export default function Login() {
  const [form, setForm] = useState({ username: '', password: '' })
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async () => {
    try {
      const res = await API.post('/auth/login', form)
      localStorage.setItem('token', res.data.token)
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed')
    }
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
      <Paper sx={{ p: 4, width: 380 }}>
        <Typography variant="h5" mb={3} textAlign="center">Login</Typography>
        {error && <Typography color="error" mb={2}>{error}</Typography>}
        <TextField fullWidth label="Username" name="username" value={form.username} onChange={handleChange} sx={{ mb: 2 }} />
        <TextField fullWidth label="Password" name="password" type="password" value={form.password} onChange={handleChange} sx={{ mb: 2 }} />
        <Button fullWidth variant="contained" onClick={handleSubmit}>Login</Button>
        <Typography mt={2} textAlign="center">
          Don't have an account? <span style={{ cursor: 'pointer', color: '#1976d2' }} onClick={() => navigate('/signup')}>Signup</span>
        </Typography>
      </Paper>
    </Box>
  )
}