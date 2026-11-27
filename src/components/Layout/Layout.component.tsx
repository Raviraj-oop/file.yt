// src/Layout.js
import React from 'react';
import Navbar from '../Navbar/Navbar.components';

function Layout() {
  return (
    <div className="d-flex">
      <div className="sidebar">
        <Navbar />
      </div>
      <div className="content flex-grow-1 p-3">
        <p>sjsjsj</p>
      </div>
    </div>
  );
}

export default Layout;
