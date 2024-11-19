import { List, ListItem, ListItemIcon, ListItemText, Avatar, Typography, Box } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import ChatBubbleIcon from '@mui/icons-material/ChatBubble'


import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import CloseIcon from '@mui/icons-material/Close'
import { useState } from 'react'
import HomeIcon from '@mui/icons-material/Home'
import AddIcon from '@mui/icons-material/Add'
import PersonIcon from '@mui/icons-material/Person'
import { useNavigate, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
//  import {} from '~/pages/Boards/BoardContent/add-new-mon/them_mon_moi'


// Biểu tượng và tên thương hiệu ở trên cùng
const BrandLogo = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const handleLogo = () => {
    navigate('/board')
  }
  return (
    <ListItem onClick={ handleLogo }>
      <ListItemIcon>
        <Avatar src="src/image/Logo/logo.jpg" alt="Logo" sx={{ width: 80, height: 80, mr: 2, cursor:'pointer' }} />
      </ListItemIcon>
      <Typography variant="h9" color='white'>Ngoan Xinh Yêu Bếp</Typography>
    </ListItem>
  )
}



const SideBar = () => {

  const navigate = useNavigate()

  const handleClickThemDanhMuc = () => {
    // navigate('/them_mon_moi')
  }

  const handleClickQUanLiTaiKhoanUser = () => {
    navigate('/quan-li-user')
  }
  const handleTrangChu = () => {
    navigate('/board')
  }
  const handleQuanLiBaiDangBinhLuan = () => {
    navigate('/quan-li-binh-luan-bai-dang')
    window.location.reload()
  }

  const [searchValue, setSearchValue] = useState('')

  //làm chức năng search dùng useEffect khi có sự thay đổi của searchValue
  const handleTimKiem = () => {
    // navigate(`/search?query=${encodeURIComponent(searchValue)}`)
  }
  return (
    <Box>
      <List>
        {/* Logo và tên thương hiệu */}
        <BrandLogo />

        {/* Menu items */}

        <ListItem button onClick={handleTrangChu}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Trang chủ" />
        </ListItem>

        <ListItem button onClick={handleClickThemDanhMuc}>
          <ListItemIcon>
            <AddIcon />
          </ListItemIcon>
          <ListItemText primary="Thêm danh mục"/>
        </ListItem>

        <ListItem button onClick={handleQuanLiBaiDangBinhLuan}>
          <ListItemIcon>
            <ChatBubbleIcon />
          </ListItemIcon>
          <ListItemText primary="Quản lí bài đăng và bình luận" />
        </ListItem>
        
        <ListItem button onClick={handleClickQUanLiTaiKhoanUser}>
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary="Quản lí tài khoản user" />
        </ListItem>
        
      </List>
    </Box>
  )
}

export default SideBar
