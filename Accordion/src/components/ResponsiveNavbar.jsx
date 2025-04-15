import { useState } from 'react';
import './ResponsiveNavbar.css'
import { GiHamburgerMenu } from "react-icons/gi";

export const ResponsiveNavbar = ()=>{
    const [showMenu,setShowMenu] = useState(false);

    const handleClick = ()=>{
        setShowMenu(!showMenu);
    }
    return(
        <>
            {/* Navbar Section */}
            <header>
                <div className='container grid'>
                    <div className='logo'>
                        <h1>Logo</h1>
                    </div>

                    <div className={`${showMenu ? 'menu-mobile' : 'menu-web'} list-items`}>
                        <ul>
                            <li>
                                <a href="#">Home</a>
                            </li>
                            <li>
                                <a href="#">About</a>
                            </li>
                            <li>
                                <a href="#">Contact</a>
                            </li>
                            <li>
                                <a href="#">Services</a>
                            </li>
                        </ul>
                    </div>
                    <div className='icon'>
                        <button className='menuBtn' onClick={handleClick}>
                            <GiHamburgerMenu size='32px'/>
                        </button>
                    </div>
                </div>
            </header>
        </>
    )
}
