import { useState } from "react";
import { NavLink } from "react-router-dom";
import { HiOutlineMenu } from "react-icons/hi";
import { RiCloseLine } from "react-icons/ri";

import { logo } from "../assets";
import { links } from "../assets/constants";
import { useIsLoggedIn } from "../hooks/useIsLoggedIn";
import { HiLogout } from "react-icons/hi";

const NavLinks = ({ handleClick, isLoggedin }) => {
  const handleLogout = () => {
    localStorage.clear()
    window.location.reload()
  }


  return <div className="mt-10">
    {links.map((item) => {
      if (!item.authCheck){
        return <NavLink
          key={item.name}
          to={item.to}
          className="flex flex-row justify-start items-center my-8 text-sm font-medium text-gray-500 hover:text-white"
          onClick={() => handleClick && handleClick()}
        >
          <item.icon className="w-6 h-6 mr-2" />
          {item.name}
        </NavLink>
      }
      if(item.authCheck && !isLoggedin){
        return <NavLink
          key={item.name}
          to={item.to}
          className="flex flex-row justify-start items-center my-8 text-sm font-medium text-gray-500 hover:text-white"
          onClick={() => handleClick && handleClick()}
        >
          <item.icon className="w-6 h-6 mr-2" />
          {item.name}
        </NavLink>
      }
    }
    )}
    {isLoggedin ? <div 
    className="flex flex-row justify-start items-center my-8 text-sm font-medium text-gray-500 hover:text-white cursor-pointer"
    onClick={() => handleLogout()}
    >
      <HiLogout className="w-6 h-6 mr-2" />
      Log out
    </div> : null}
  </div>
};

const Sidebar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isLoggedin = useIsLoggedIn()
  return (
    <>
      <div className="md:flex hidden flex-col w-[240px] py-10 px-4 bg-[#1a1a1a]">
        <img src={logo} alt="logo" className="w-full h-14 object-contain" />
        <h2 className="font-bold text-xl text-white text-center mt-2">We Gro Music</h2>
        <NavLinks isLoggedin={isLoggedin}/>
      </div>

      <div className="absolute md:hidden blcok top-6 right-3">
        {mobileMenuOpen ? (
          <RiCloseLine className="w-6 h-6 text-white mr-2" onClick={() => setMobileMenuOpen(false)} />
        ) : <HiOutlineMenu className="w-6 h-6 text-white mr-2" onClick={() => setMobileMenuOpen(true)} />}
      </div>

      <div className={`absolute top-0 h-screen w-2/3 bg-gradient-to-tl from-white/10 to-[#483d8b] backdrop-blur-lg z-10 p-6 md:hidden smooth-transition ${mobileMenuOpen ? 'left-0' : '-left-full'}`} >
        <img src={logo} alt="logo" className="w-full h-14 object-contain" />
        <h2 className="font-bold text-xl text-white text-center mt-2">We Gro Music</h2>
        <NavLinks handleClick={() => setMobileMenuOpen(false)} isLoggedin={isLoggedin}/>
      </div>
    </>
  );
};

export default Sidebar;
