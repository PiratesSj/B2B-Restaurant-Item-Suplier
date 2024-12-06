"use client";
import React, { useState } from "react";
import { FaShoppingCart, FaHeart, FaBell, FaUser, FaTimes } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Link from "next/link";
import "../styles/global.css"

function Navbar({ isLoggedIn }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeButton, setActiveButton] = useState("shop"); // Default active button
  const [cartQuantity, setCartQuantity] = useState(4); // Example cart quantity
  const [hasNotifications, setHasNotifications] = useState(true); // Example notification state
  const router = useRouter();

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  const handleButtonClick = (button) => {
    setActiveButton(button);
  };

  const handleLogin = () => {
    router.push("/login");
  };
  const openCart = () => {
    router.push("/main/cart");
  };
  const openFavorite = () => {
    router.push("/main/favorities");
  };
  const openNotification = () => {
    router.push("/main/notifications");
  };


  return (
    <div className="fixed top-0 left-0 right-0 bg-white shadow-md z-10">
      {/* Navbar for All Devices */}
      <div className="flex justify-between items-center px-6 py-4">
        {/* Left: Brand Logo or Name */}
        <div className="">
        <Link href={"/"}>
        <img src="https://i.imgur.com/nCjPRTB.png" alt="Hyperpure logo" className="h-9 md:h-10 lg:h-10 max-w-full h-auto transition-transform duration-300 ease-in-out transform hover:scale-110" />
        </Link> 
        
                            
          </div>

        {/* If user is not logged in */}
        {!isLoggedIn ? (
          <button
            onClick={handleLogin}
            className="text-white bg-red-500 px-4 py-2 rounded hover:bg-red-600"
          >
            Login
          </button>
        ) : (
          // If user is logged in, show navigation buttons
          <div className="hidden lg:flex space-x-8">
            <button
              onClick={() => handleButtonClick("shop")}
              className={`flex items-center space-x-2 ${
                activeButton === "shop" ? "text-red-500" : "text-gray-700"
              } hover:text-red-500`}
            >
              <FaShoppingCart className="text-xl" />
              <span>Shop</span>
            </button>

            <button
              onClick={() => {handleButtonClick("favorite");openFavorite()}}
              className={`flex items-center space-x-2 ${
                activeButton === "favorite" ? "text-red-500" : "text-gray-700"
              } hover:text-red-500`}
            >
              <FaHeart className="text-xl" />
              <span>Favorite</span>
            </button>

            <button
              onClick={() =>{handleButtonClick("notification");openNotification()} }
              className={`relative flex items-center space-x-2 ${
                activeButton === "notification" ? "text-red-500" : "text-gray-700"
              } hover:text-red-500`}
            >
              <FaBell className="text-xl" />
              {hasNotifications && (
                <span className="absolute top-0 right-0 bg-red-500 w-2 h-2 rounded-full"></span>
              )}
              <span>Notify</span>
            </button>

            <button
              onClick={() => {handleButtonClick("cart"); openCart()}}
              className={`relative flex items-center space-x-2 ${
                activeButton === "cart" ? "text-red-500" : "text-gray-700"
              } hover:text-red-500`}
            >
              <FaShoppingCart className="text-xl" />
              {cartQuantity > 0 && (
                <span className="absolute top-0 right-0 bg-black text-white text-xs rounded-full px-1">
                  {cartQuantity}
                </span>
              )}
              <span>Cart</span>
            </button>

            <button
              onClick={toggleMenu}
              className={`flex items-center space-x-2 ${
                activeButton === "user" ? "text-red-500" : "text-gray-700"
              } hover:text-red-500`}
            >
              <FaUser className="text-xl" />
              <span>Menu</span>
            </button>
          </div>
        )}
      </div>

      {/* Bottom Navbar for Smaller Screens */}
      {isLoggedIn && (
        <div className="fixed bottom-0 left-0 right-0 bg-white shadow-inner flex justify-around items-center px-4 py-2 lg:hidden">
          <button
            onClick={() => handleButtonClick("shop")}
            className={`flex flex-col items-center ${
              activeButton === "shop" ? "text-red-500" : "text-gray-700"
            } hover:text-red-500`}
          >
            <FaShoppingCart className="text-xl" />
            <span className="text-xs">Shop</span>
          </button>

          <button
            onClick={() => {handleButtonClick("favorite");openFavorite()}}
            className={`flex flex-col items-center ${
              activeButton === "favorite" ? "text-red-500" : "text-gray-700"
            } hover:text-red-500`}
          >
            <FaHeart className="text-xl" />
            <span className="text-xs">Favorite</span>
          </button>

          <button
            onClick={() => {handleButtonClick("notification");openNotification();}}
            className={`relative flex flex-col items-center ${
              activeButton === "notification" ? "text-red-500" : "text-gray-700"
            } hover:text-red-500`}
          >
            <FaBell className="text-xl" />
            {hasNotifications && (
              <span className="absolute top-0 right-2 bg-red-500 w-2 h-2 rounded-full"></span>
            )}
            <span className="text-xs">Notify</span>
          </button>

          <button
            onClick={() => {handleButtonClick("cart");openCart()}}
            className={`relative flex flex-col items-center ${
              activeButton === "cart" ? "text-red-500" : "text-gray-700"
            } hover:text-red-500`}
          >
            <FaShoppingCart className="text-xl" />
            {cartQuantity > 0 && (
              <span className="absolute top-0 right-2 bg-black text-white text-xs rounded-full px-1">
                {cartQuantity}
              </span>
            )}
            <span className="text-xs">Cart</span>
          </button>

          <button
            onClick={toggleMenu}
            className={`flex flex-col items-center ${
              activeButton === "user" ? "text-red-500" : "text-gray-700"
            } hover:text-red-500`}
          >
            <FaUser className="text-xl" />
            <span className="text-xs">Menu</span>
          </button>
        </div>
      )}

      {/* Full-Screen Menu */}
      {menuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-20 flex justify-center items-center">
          <div className="relative bg-white w-4/5 h-4/5 rounded-lg shadow-lg overflow-hidden">
            <button
              className="absolute top-4 right-4 text-gray-700"
              onClick={toggleMenu}
            >
              <FaTimes className="text-2xl hover:text-red-500" />
            </button>
            <div className="p-6">
              <h2 className="text-xl font-bold mb-6">Menu</h2>
              <ul className="space-y-4">
                <li className="text-gray-700 cursor-pointer hover:text-red-500">
                  Outlet Information (editable)
                </li>
                <li className="text-gray-700 cursor-pointer hover:text-red-500">
                  Payment Settlement
                </li>
                <li className="text-gray-700 cursor-pointer hover:text-red-500">
                  Order History (current and previous)
                </li>
                <li className="text-gray-700 cursor-pointer hover:text-red-500">
                  Logout
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;