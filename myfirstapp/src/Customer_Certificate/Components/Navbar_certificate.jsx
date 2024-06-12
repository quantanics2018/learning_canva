import { useState } from 'react'; 
import profile_img from '../../assets/images/profile_info.jpeg';

const Navbar_certificate = () =>{
    return (
        <>
        <div className="flex bg-[#a1a1aa] flex-row text-white p-2 w-full fixed z-[54] h-[10%] justify-between">
            <div className="w-50 flex flex-row justify-start items-center">
                <img src="https://flowbite.com/docs/images/logo.svg" className="h-8 pr-2" alt="Flowbite Logo" />
                <p className='text-xl'>Strategy Custome Certificate</p>
            </div>
            <div className="w-50 flex flex-row justify-end items-center">
                <div className="relative flex flex-row gap-2">
                    <div className="font-medium dark:text-white">
                        <pre>StrategyNaveen</pre>
                        <div className='text-xs text-white-800 dark:text-white-400'>Full Stack Developer</div>
                    </div>
                    <img className="w-10 h-10 font-medium   text-center  rounded-full" src={profile_img} alt=""  data-popover-target="user-profile-popover"/>
                    
                </div>
            </div>
            
        </div>




</>

    );
}

export default Navbar_certificate;