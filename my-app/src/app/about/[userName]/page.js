"use client"
import React from 'react'

import { useParams } from 'next/navigation';

const page = async({params}) => {
    const user = (await params).username 
    // console.log(user);
    
  return (
    <div>this is dynamic routing [username] </div>
  )
}

export default page