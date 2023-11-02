import Navbar from '@/components/Navbar'
import {ContactForm} from '@/components/contact-form'
import React from 'react'
//checking if the user is admin to chage the text or see a comletly diffrent view
const Contact = () => {
  return (
    <div>
        <Navbar/>

        <div className="w-3/6 mx-auto bg-red-200"><ContactForm/></div>


    </div>
  )
}

export default Contact