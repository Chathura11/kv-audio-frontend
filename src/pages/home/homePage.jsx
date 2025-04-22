import React from 'react'
import Header from '../../components/header'
import { Route, Routes } from 'react-router-dom'
import Home from './home';
import Contact from './contact'
import Gallery from './gallery';
import Item from './item';
import Error from './error'
import ProductOverView from './productOverview'
import BookingPage from './bookingPage';
import InquiryPage from './inquiryPage';
import UserProfile from '../profile/userProfile';
import UserOrders from '../profile/userOrders';
import UserEdit from '../profile/userEdit';

function homePage() {
  return (
    <>
        <Header/>
        <div className='h-[calc(100vh-100px)] bg-primary'>
            <Routes path="/*">
                
                <Route path='/contact' element={<Contact/>}/>
                <Route path='/gallery' element={<Gallery/>}/>
                <Route path='/item' element={<Item/>}/>
                <Route path='/booking' element={<BookingPage/>}></Route>
                <Route path='/user-profile' element={<UserProfile/>}></Route>
                <Route path='/user-edit' element={<UserEdit/>}></Route>
                <Route path='/user-orders' element={<UserOrders/>}></Route>
                <Route path='/inquiry' element={<InquiryPage/>}></Route>
                <Route path='/product/:key' element={<ProductOverView/>}/>
                <Route path='/' element={<Home/>}/>
                <Route path='/*' element={<Error/>}/>
            </Routes>
        </div>
    </>
  )
}

export default homePage
