import React, { useEffect, useState } from 'react'
import { Routes, Route } from "react-router-dom";

import Header from './Components/layout/Header'
import Footer from './Components/layout/Footer'
import Home from './components/Home'
import ProductDetails from './components/product/ProductDetails'
import Login from './components/user/Login';
import Register from './components/user/Register';
import Profile from './components/user/Profile'
import ProtectedRoute from './components/route/ProtectedRoute'
import UpdateProfile from './components/user/UpdateProfile';
import UpdatePassword from './components/user/UpdatePassword'
import ForgotPassword from './components/user/ForgotPassword'
import NewPassword from './components/user/NewPassword'

import Cart from './Components/cart/Cart'
import Shipping from './Components/cart/Shipping'
import ConfirmOrder from './Components/cart/ConfirmOrder'
import Payment from './Components/cart/Payment'
import OrderSuccess from './Components/cart/OrderSuccess'
import ListOrders from './components/order/ListOrders'
import OrderDetails from './components/order/OrderDetails'

import Dashboard from './Components/admin/Dashboard'
import ProductsList from './Components/admin/ProductsList'
import NewProduct from './Components/admin/NewProduct'
import UpdateProduct from './Components/admin/UpdateProduct'
import OrdersList from './Components/admin/OrdersList'
import ProcessOrder from './Components/admin/ProcessOrder'
import UsersList from './Components/admin/UsersList'
import UpdateUser from './Components/admin/UpdateUser'
import ProductReviews from './Components/admin/ProductReviews'

import { loadUser } from './actions/userActions'
import { useSelector } from 'react-redux'
import store from './store'

function App() {
  useEffect(() => {
    store.dispatch(loadUser())
  }, [])
  const { user, isAuthenticated, loading } = useSelector(state => state.auth)
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} exact="true" />
        <Route path="/product/:id" element={<ProductDetails />} exact="true" />
        <Route path="/search/:keyword" element={<Home />} exact="true" />
        <Route path="/login" element={<Login />} exact="true" />
        <Route path="/register" element={<Register />} exact="true" />
        <Route path="/password/forgot" element={<ForgotPassword />} exact="true" />
        <Route path="/password/reset/:token" element={<NewPassword />} exact="true" />
        <Route path="/cart" element={<Cart />} exact="true" />

        <Route path="/me" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
          exact="true"
        />
        <Route
          path="/me/update"
          element={
            <ProtectedRoute>
              <UpdateProfile />
            </ProtectedRoute>
          }
          exact="true"
        />
        <Route path="/password/update"
          element={
            <ProtectedRoute >
              <UpdatePassword />
            </ProtectedRoute>} exact="true" />

        <Route path="/shipping"
          element={
            <ProtectedRoute >
              <Shipping />
            </ProtectedRoute>} exact="true" />

        <Route path="/confirm"
          element={
            <ProtectedRoute >
              <ConfirmOrder />
            </ProtectedRoute>} />
        <Route path="/payment"
          element={
            <ProtectedRoute >
              <Payment />
            </ProtectedRoute>} />

        <Route path="/success"
          element={
            <ProtectedRoute >
              <OrderSuccess />
            </ProtectedRoute>} />
        <Route path="/orders/me"
          element={
            <ProtectedRoute >
              <ListOrders />
            </ProtectedRoute>} />
        <Route path="/order/:id"
          element={

            <ProtectedRoute >

              <OrderDetails />

            </ProtectedRoute>} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute isAdmin={true}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/products"
          element={
            <ProtectedRoute isAdmin={true}>
              <ProductsList />
            </ProtectedRoute>
          }
        />
        <Route

          path="/admin/product"

          element={

            <ProtectedRoute isAdmin={true} >

              <NewProduct />

            </ProtectedRoute>

          }

        />
        <Route
          path="/admin/product/:id"
          element={
            <ProtectedRoute isAdmin={true} >
              <UpdateProduct />
            </ProtectedRoute>

          }

        />
        <Route
          path="/admin/orders"
          element={
            <ProtectedRoute isAdmin={true} >
              <OrdersList />
            </ProtectedRoute>

          }

        />
        <Route

          path="/admin/order/:id"

          element={

            <ProtectedRoute isAdmin={true} >

              <ProcessOrder />

            </ProtectedRoute>} />
        <Route

          path="/admin/users"

          element={

            <ProtectedRoute isAdmin={true} >

              <UsersList />

            </ProtectedRoute>} />
        <Route

          path="/admin/user/:id"

          element={

            <ProtectedRoute isAdmin={true} >

              <UpdateUser />

            </ProtectedRoute>} />

        <Route
          path="/admin/reviews"
          element={
            <ProtectedRoute isAdmin={true} >
              <ProductReviews />
            </ProtectedRoute>

          }

        />
      </Routes>
      {!loading && (!isAuthenticated || user.role !== 'admin') && (
        <Footer />
      )}
    </div>
  );
}

export default App;