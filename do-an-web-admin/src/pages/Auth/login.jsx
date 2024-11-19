import { useState } from 'react'
import {
  Box,
  Typography,
  TextField,
  Button,
  Link,
  Paper,
  Grid,
  RadioGroup,
  Radio,
  FormControlLabel
} from '@mui/material'

import { Flip, toast } from 'react-toastify'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function AuthPage() {
  return (

    <Box
      item
      xs={12}
      md={6}
      sx={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundImage: 'url("src/image/BackgroundLogin/backGroundLogin.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundBlendMode: 'darken',
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
      }}
    >
      <Paper
        elevation={6}
        sx={{
          padding: 4,
          borderRadius: '16px',
          maxWidth: 400,
          width: '100%',
          bgcolor: '#33FF00',
          justifyContent: 'center',
          color:'black'

        }}
      >
        <LoginForm />
      </Paper>
    </Box>
  )
}

function LoginForm() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  const handleLogin = async () => {
    try {

      const response = await axios.post('http://localhost:3000/login-admin', { username, password })
      if (response.data.success) {
        toast.success('Đăng Nhập Thành Công!', {
          position: 'top-right',
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          theme: 'colored',
          transition: Flip
        })
        localStorage.setItem('token', response.data.token)//Lưu token vào localStorage của Client
        navigate('/board', { replace:true })

      } else {
        toast.error(response.data.message, {
          position: 'top-center',
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          theme: 'colored',
          transition: Flip
        })
      }
    } catch (error) {
      console.error('Login error:', error)
      alert('An error occurred during login.')
    }
  }
  return (
    <>

      <Typography variant="h5" sx={{ textAlign: 'center', mb: 3 }}>
        Đăng nhập với quyền Admin
      </Typography>

      {/* Username Field */}
      <TextField label="UserName" variant="outlined" fullWidth margin="normal" value={username}
        onChange={(e) => setUsername(e.target.value)} />

      {/* Password Field */}
      <TextField label="Password" variant="outlined" fullWidth type="password" margin="normal" value={password}
        onChange={(e) => setPassword(e.target.value)}/>

      {/* Login Button */}
      <Button
        variant="contained"
        color="primary"
        fullWidth
        sx={{
          mt: 2,
          background:'#33CC00',
          '&:hover': { bgcolor: '' }
        }}
        onClick={handleLogin}
      >
        Đăng nhập
      </Button>

    </>
  )
}
export default AuthPage
