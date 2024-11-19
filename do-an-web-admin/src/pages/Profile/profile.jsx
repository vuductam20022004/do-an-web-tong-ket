

import { Box, Typography, TextField, RadioGroup, Radio, FormControlLabel, Button, Avatar, Paper } from '@mui/material'

import AppBar from '~/components/AppBar/AppBar'
import Container from '@mui/material/Container'


import SideBar from '~/pages/Boards/BoardContent/SideBars/SideBar'
import { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import { Flip, toast } from 'react-toastify'



function ProfilePage() {
  const HEIGHT_AD = '200PX'
  const { ID } = useParams()
  const [data, setProfile] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  const [openDialog, setOpenDialog] = useState(false)
  // const [userId, setSelectedId] = useState(null)


  const handleOpenDialog = () => {
    // setSelectedId(id)
    setOpenDialog(true)
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
    // setSelectedId(null)
  }
  const handlXoaTaiKhoan = async () => {
    try {
      const response = await axios.post('http://localhost:3000/xoa-tai-khoan-admin', { ID })
      if (response.data.success) {
        toast.success(response.data.message, {
          position: 'top-right',
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          theme: 'colored',
          transition: Flip
        })
        navigate('/quan-li-user')
      }
      else {
        toast.error(response.data.message, {
          position: 'top-right',
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
      console.log('ERROR trong qua trinh xoa tai khoan', error)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('http://localhost:3000/profile-user-admin', { ID })
        // const result = await response.json()
        setProfile(response.data)
      } catch (error) {
        console.error('Lỗi lấy dữ liệu:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [ID])

  if (isLoading) {
    return <div>Loading....</div>
  }

  return (
    <Container disableGutters maxWidth={false} sx={{ height:'100vh' }}>
      <AppBar />

      <Box sx={{
        display:'flex'
      }}>
        <Box sx={{
          bgcolor: (theme) => ( theme.palette.mode === 'dark'? '#34495e' : '#1976d2'),
          height:(theme) => theme.trello.boardContentHeight,
          width:'15% ',
          p: '10px 0'
        }}>
          <SideBar />

        </Box>

        <Box sx={{
          // bgcolor: (theme) => ( theme.palette.mode === 'dark'? '#34495e' : '#1976d2'),
          height:(theme) => theme.trello.boardContentHeight,
          width:'85% ',
          p: '10px 15px',
          overflow: 'auto'
        }}>

          <Box sx={{
            // bgcolor: (theme) => ( theme.palette.mode === 'dark'? '#34495e' : '#1976d2'),
            height:(theme) => theme.trello.boardContentHeight - HEIGHT_AD,
            width:'85% ',
            p: '10px 15px',
            overflow: 'auto'
          }}>
            <Box flexGrow={1} p={4}>
              <Paper elevation={3} sx={{ padding: 4, maxWidth: 800, margin: 'auto' }}>
                <Box display="flex" alignItems="center" mb={4}>
                  <Avatar sx={{ width: 60, height: 60, mr: 2 }} src= {`/${data.imageUser}`} />
                  <Typography variant="h5">{data.fullName}</Typography>
                  <Box ml={2} p={1} bgcolor="pink" borderRadius={1}>
                    <Typography>{data.core} điểm</Typography>
                  </Box>
                </Box>

                <Box display="flex" justifyContent="space-between">
                  <TextField variant="outlined" label = 'Họ và tên' fullWidth sx={{ mb: 2, mr: 2 }} value={data.fullName} />
                  <TextField variant="outlined" label = 'Username ' fullWidth sx={{ mb: 2 }} value={data.username} />
                </Box>
                <Box display="flex" justifyContent="space-between">
                  <TextField value={data.birthYear} label = 'Năm sinh' variant="outlined" fullWidth sx={{ mb: 2, mr: 2 }} />
                  <TextField value={data.password} label = 'Password' type="password" variant="outlined" fullWidth sx={{ mb: 2 }} />
                </Box>
                <Box justifyContent="space-between">
                  <RadioGroup row>
                    <FormControlLabel value = {data.gender} control={<Radio />} label={data.gender} checked />
                  </RadioGroup>
                  <TextField value={data.email} label = 'Email' variant="outlined" fullWidth sx={{ mb: 2 }} />
                </Box>
                <Box mt={2}>
                  <Typography variant="body2" color="primary" sx={{ textDecoration: 'underline', cursor: 'pointer' }}>
                    <Link to={`/user/mon-cua-toi/${ID}`}> Xem danh sách các món đã đăng </Link>
                  </Typography>
                </Box>
                <Button variant="contained" color="primary" sx={{ mt: 4 }} onClick={handleOpenDialog}>
                  Xóa tài khoản
                </Button>
              </Paper>
            </Box>
          </Box>
        </Box>
      </Box>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Xác nhận xóa</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Bạn có chắc chắn muốn xóa vĩnh viễn tài khoản này không?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">Hủy</Button>
          <Button onClick={handlXoaTaiKhoan} color="secondary">Xóa</Button>
        </DialogActions>
      </Dialog>


    </Container>
  )
}

export default ProfilePage
