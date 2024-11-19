import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import CssBaseline from '@mui/material/CssBaseline'
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'


import theme from './theme'
import AuthPage from '~/pages/Auth/login.jsx'

// import AppRoutes from './pages/Routing/routing'

import BoardContent from '~/pages/Boards/BoardContent/BoardContent' // Đường dẫn tới BoardContent
import AddNewRecipe from '~/pages/add-new-mon/them_mon_moi'
import RecipeDetail from '~/pages/chi_tiet_mon_an/chi_tiet_mon_an_admin.jsx'
import Board from '~/pages/Boards/_id.jsx'
import MonCuaToi from '~/pages/monCuaToi/monCuaToi.jsx'
import MonDaLuu from '~/pages/monDaLuu/monDaLuu.jsx'
import ProfilePage from '~/pages/Profile/profile.jsx'
import Search from '~/pages/search/search.jsx'
import SearchDanhMuc from './pages/search/searchDanhMuc.jsx'
import QLBinhLuanBaiDang from '~/pages/quanLiBaiDangvaBinhLuan/quanLiBaiDangvaBinhLuan.jsx'
import QuanLiUser from '~/pages/quanLiUser/quan_li_user.jsx'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


ReactDOM.createRoot(document.getElementById('root')).render(

  <React.StrictMode>
    <CssVarsProvider theme={theme}>
      <CssBaseline />

      {/* <AuthPage /> */}
      <Router>
        <Routes>
          <Route path='/' element = {<AuthPage />}/>
          <Route path="/board" element={<Board />} />
          <Route path="/quan-li-binh-luan-bai-dang" element={<QLBinhLuanBaiDang />} />
          <Route path="/chitietmonan/:ID" element={< RecipeDetail />} />
          <Route path="/quan-li-user" element={< QuanLiUser />} />
          <Route path="/search2" element = {<Search /> } />
          <Route path="/:ID" element = {<ProfilePage /> } />
          <Route path="/user/mon-cua-toi/:ID" element = {< MonCuaToi /> } />
          <Route path="/searchDanhMuc" element = {<SearchDanhMuc /> } />
          {/* <Route path="/them_mon_moi" element={<AddNewRecipe />} />
          <Route path="/chitietmonan/:ID" element={< RecipeDetail />} />
          <Route path="/mon-cua-toi" element = {< MonCuaToi /> } />
          <Route path="/mon-da-luu" element = {< MonDaLuu /> } />
          <Route path="/trang-ca-nhan" element = {< ProfilePage /> } />
          <Route path="/search" element = {<Search /> } />
          <Route path="/searchDanhMuc" element = {<SearchDanhMuc /> } /> */}

        </Routes>
      </Router>
      <ToastContainer />

    </CssVarsProvider>
  </React.StrictMode>

)
