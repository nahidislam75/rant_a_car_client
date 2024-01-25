import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DefaultLayout from '../components/defaultLayout';
import { getAllCars } from '../redux/actions/carActions';
import { Button, Space, Row, Col ,DatePicker } from 'antd';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom'
import moment from 'moment'

const { RangePicker } = DatePicker;
// moment = require('moment');

const Home = () => {
    const { cars } = useSelector(state => state.carsReducer)
    const { loading } = useSelector(state => state.alertsReducer)
    const [totalCars , setTotalcars] = useState([])
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllCars())
    }, [])

    useEffect(() => {

        setTotalcars(cars)
        
    }, [cars])

    function setFilter(values){
        var selectedFrom = moment(values[0] , 'MMM DD YYYY HH:mm')
        var selectedTo = moment(values[1] , 'MMM DD YYYY HH:mm')
        console.log(selectedFrom,selectedTo)

        var temp=[]

        for(var car of cars){

              if(car.bookedTimeSlots.length === 0){
                console.log(car.bookedTimeSlots.length)
                  temp.push(car)
              }
              else{

                   for(var booking of car.bookedTimeSlots) {

                       if(selectedFrom.isBetween(moment(booking.from) , moment(booking.to)) ||
                       selectedTo.isBetween(moment(booking.from) , moment(booking.to)) || 
                       moment(booking.from).isBetween(selectedFrom , selectedTo) ||
                       moment(booking.to).isBetween(selectedFrom , selectedTo)
                       )
                       {
                        console.log("hi");
                       }
                       else{
                        //    temp.push(car)
                       }

                   }

              }

        }


        setTotalcars(temp)


    }


    return (
        <DefaultLayout>
            <Row className='mt-3' justify='center'>

                <Col lg={20} sm={24} className='d-flex justify-content-left'>

                    <RangePicker showTime={{ format: 'HH:mm' }} format='MMM DD YYYY HH:mm' onChange={setFilter} />

                </Col>

            </Row>

            {loading == true && (<Spinner />)}
            <Row justify='center' gutter={16}>

                {totalCars.map(car => {
                    return <Col lg={5} sm={24} xs={24}>
                        <div className="car p-2 bs1 ">
                            <img alt='' src={car.image} className="carimg" />

                            <div className="car-content d-flex align-items-center justify-content-between">

                                <div className='text-left pl-2'>
                                    <p>{car.name}</p>
                                    <p> Rent Per Hour {car.rentPerHour} /-</p>
                                </div>

                                <div>
                                    <button className="btn1 mr-2"><Link to={`/booking/${car._id}`}>Book Now</Link></button>
                                </div>

                            </div>
                        </div>
                    </Col>
                })}

            </Row>
        </DefaultLayout>
    );
}

export default Home;
