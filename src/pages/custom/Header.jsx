import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from "@/components/ui/button"

const Header = () => {
  return (
    <div className='p-2 shadow-sm flex justify-between items-center px-5 py-5'>
        <Link to="/">
            <p className="font-bold text-3xl text-emerald-800">Trip Planner</p>
        </Link>
        <div className="">
            <Button className="cursor-pointer">Sign In</Button>
        </div>
    </div>
  )
}

export default Header