import uniportlogo from '../assets/images/uniport_logo.png';
import nacoslogo from '../assets/images/nacos logo.png';
import { useEffect, useState } from 'react';
import { useAppContext } from '../context/useAppContext';
function Navbar() {
    const {cgpa} = useAppContext();
    const [navScroll, setNavScrolled] = useState<boolean>(false);

    function handleNavScrolled(){
        if(window.scrollY > 100){
            setNavScrolled(true);
        }else{
            setNavScrolled(false)
        }
    }

    useEffect(()=>{
        window.addEventListener('scroll', handleNavScrolled)

        return()=>{
            window.removeEventListener('scroll', handleNavScrolled)
        }
    }, [])
    return ( 
        <>
            <nav className={`bg-white text-[#138601] w-full duration-150 ease-linear ${navScroll && 'sticky right-0 top-0'}`}>
                <div className="max-cont flex items-center justify-between">
                    <div className='flex items-center'>
                        <img src={nacoslogo} alt="uniportlogo" className='w-[40px] md:w-[80px]'/>
                        <img src={uniportlogo} alt="uniportlogo" className='w-[40px] md:w-[80px]'/>
                        <div className='flex flex-col'>
                            <span className='text-xs md:text-xl font-semibold whitespace-pre'>NACOS RIVERS STATE</span>
                            <span className='text-xs md:text-xl font-semibold whitespace-pre'>UNIPORT CHAPTER</span>
                        </div>
                    </div>
                    <div className='flex items-center gap-1  md:gap-3 text-lg md:text-3xl font-semibold'>
                        <span>CGPA:</span>
                        <span>{cgpa.toFixed(2) ?? '-'}</span>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Navbar;