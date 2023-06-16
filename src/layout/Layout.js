import React from "react";
import "../assets/main.css";
function Layout({ children }) {
  return (
    <>
      <main className='w-full h-screen flex flex-wrap justify-center items-center border'>
        {children}
      </main>
    </>
  );
}

export default Layout;
