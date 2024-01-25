import logo from './logo.svg';
import './App.css';
import { Route, BrowserRouter, Redirect, Routes, Navigate, Router  } from 'react-router-dom';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import BookingCar from './pages/BookingCar';
import UserBookings from './pages/userBooking';
import AddCar from './pages/AddCar';
import AdminHome from './pages/AdminHome';
import EditCar from './pages/EditCar';

function App() {
  // const router = createBrowserRouter([
  //   {
  //     path:'/',
  //     children: [
  //       {
  //       path:'login',
  //       element: <Login></Login>
  //       },
  //       {
  //         path:'home',
  //         element:<ProtectedRoute><Home></Home></ProtectedRoute> 
  //       },
  //       {
  //         path:'register',
  //         element: <Register></Register>
  //       },
  //       {
  //         path:'bookingCar',
  //         element: <BookingCar></BookingCar>
  //       }
  //     ]
  //   },

  // ])
  return (
    <div className="App">
      {/* <RouterProvider router={router}></RouterProvider> */}
      <BrowserRouter>
             {/* <Routes> */}
             <ProtectedRoute path='/' exact component={Home} />
             <Route path='/login' exact component={Login} />
             <Route path='/register' exact component={Register} />
             <ProtectedRoute path='/booking/:carid' exact component={BookingCar} />
             <ProtectedRoute path='/userbookings' exact component={UserBookings} />
             <ProtectedRoute path='/addcar' exact component={AddCar} />
             <ProtectedRoute path='/editcar/:carid' exact component={EditCar} />
             <ProtectedRoute path='/admin' exact component={AdminHome} />
             {/* </Routes> */}
         </BrowserRouter> 
    </div>
  );
}

export default App;

export function ProtectedRoute(props)
{


    if(localStorage.getItem('user'))
    {
      return <Route {...props}/>
    }
    else{
      return <Redirect to='/login'/>
    }

}
