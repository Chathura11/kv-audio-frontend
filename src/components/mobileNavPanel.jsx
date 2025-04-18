import { IoMdClose } from "react-icons/io";
import { useEffect, useState } from "react";
import { CiHome, CiImageOn, CiMail, CiShoppingTag, CiCalendar } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

export default function MobileNavPanel(props) {
    const isOpen = props.isOpen;
    const setOpen = props.setOpen;

    const [visible, setVisible] = useState(false);
    const [animate, setAnimate] = useState(false);

    const navigate = useNavigate();

    function Goto(route) {
        navigate(route);
        setOpen(false);
    }

    useEffect(() => {
        if (isOpen) {
            setVisible(true);
            setTimeout(() => setAnimate(true), 10);  // Start slide-in
        } else {
            setAnimate(false);  // Start slide-out
            setTimeout(() => setVisible(false), 300);  // Wait for animation to finish
        }
    }, [isOpen]);

    return (
        <>
            {visible && (
                <div className={`fixed top-0 left-0 w-full h-screen z-50 flex 
                    ${animate ? 'bg-[#00000075]' : 'bg-transparent'} 
                    transition-colors duration-300 ease-in-out`}>
                    <div
                        className={`h-full bg-white w-[300px] transform 
                        ${animate ? 'translate-x-0' : '-translate-x-full'}
                        transition-transform duration-300 ease-in-out shadow-lg`}
                    >
                        <div className="bg-accent w-full h-[70px] flex justify-center items-center relative">
                            <img src="/logo.jpg" alt='logo' className='w-[60px] h-[60px] object-cover border-[1px] absolute left-1 rounded-full ' />
                            <IoMdClose
                                className="absolute right-3 text-3xl cursor-pointer hover:text-red-500 transition-colors"
                                onClick={() => setOpen(false)}
                            />
                        </div>

                        <div className="p-3 space-y-2">
                            <div onClick={() => Goto('/')} className='flex items-center gap-3 text-[18px] text-gray-700 hover:bg-accent hover:text-white p-2 rounded-lg cursor-pointer transition'>
                                <CiHome className="text-2xl" /> Home
                            </div>
                            <div onClick={() => Goto('/gallery')} className='flex items-center gap-3 text-[18px] text-gray-700 hover:bg-accent hover:text-white p-2 rounded-lg cursor-pointer transition'>
                                <CiImageOn className="text-2xl" /> Gallery
                            </div>
                            <div onClick={() => Goto('/contact')} className='flex items-center gap-3 text-[18px] text-gray-700 hover:bg-accent hover:text-white p-2 rounded-lg cursor-pointer transition'>
                                <CiMail className="text-2xl" /> Contact
                            </div>
                            <div onClick={() => Goto('/item')} className='flex items-center gap-3 text-[18px] text-gray-700 hover:bg-accent hover:text-white p-2 rounded-lg cursor-pointer transition'>
                                <CiShoppingTag className="text-2xl" /> Item
                            </div>
                            <div onClick={() => Goto('/booking')} className='flex items-center gap-3 text-[18px] text-gray-700 hover:bg-accent hover:text-white p-2 rounded-lg cursor-pointer transition'>
                                <CiCalendar className="text-2xl" /> Booking
                            </div>
                        </div>

                    </div>
                </div>
            )}
        </>
    );
}
