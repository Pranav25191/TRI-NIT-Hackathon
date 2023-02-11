import React from 'react';
import "../input.css";
import iitgoalogo from "../images/logo.png";
import { Link } from 'react-router-dom';
function NavBar(props) {
    return (
        <nav className='flex justify-start items-center h-20 box shadow-md  px-8 gap-8 bg-slate-100 w-full '>
            <div className=' h-full flex justify-center items-center gap-2'>
                <img src={iitgoalogo} alt={"not found"} className=' shadow-lg bg-black' style={{width:"70px",height:"70px",borderRadius:"50%"}}>
                </img>
                <div className='flex justify-center items-center'>
                    <p className='text-xl text-black'>Cluster-K</p>
                </div>
            </div>
            <div className='w-[fit-content] h-full flex justify-center items-center gap-4 ml-auto'>
            </div>
        </nav>
    );
}

export default NavBar;