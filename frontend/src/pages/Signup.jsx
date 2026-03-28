import { useState } from 'react'
import { TextField, Button, Box, Typography, Paper } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import API from '../api/axios'

export default function Signup() {
  const [form, setForm] = useState({ username: '', password: '' })
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async () => {
    try {
      await API.post('/auth/signup', form)
      navigate('/login')
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed')
    }
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
      <Paper sx={{ p: 4, width: 380 }}>
        <Typography variant="h5" mb={3} textAlign="center">Sign Up</Typography>
        {error && <Typography color="error" mb={2}>{error}</Typography>}
        <TextField fullWidth label="Username" name="username" value={form.username} onChange={handleChange} sx={{ mb: 2 }} />
        <TextField fullWidth label="Password" name="password" type="password" value={form.password} onChange={handleChange} sx={{ mb: 2 }} />
        <Button fullWidth variant="contained" onClick={handleSubmit}>Sign Up</Button>
        <Typography mt={2} textAlign="center">
          Already have an account? <span style={{ cursor: 'pointer', color: '#1976d2' }} onClick={() => navigate('/login')}>Login</span>
        </Typography>
      </Paper>
    </Box>
  )
}