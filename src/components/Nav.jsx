import React from "react";
import './nav.scss';
import DateTime from "./DateTime";

const Nav = () => {
    return (
       <nav>
        <div className="left">
            <div className="nav-icon">
                <img src="/nav-icon/apple.svg" alt="Apple" />
            </div>

            <div className="nav-item">
                <p>Sanskar Chaurasia</p>
            </div>

            <div className="nav-item">
                <p>File</p>
            </div>

            <div className="nav-item">
                <p>Window</p>
            </div>

            <div className="nav-item">
                <p>Terminal</p>
            </div>

            <div className="nav-item">
                <p>Browser</p>
            </div>

        </div>
        <div className="right">
            <div className="nav-icon">
                <img src="/nav-icon/wifi.svg" alt="WiFi" />
            </div>

            <div className="nav-item">
                <DateTime />
            </div>
        </div>
       </nav>
            
    )
}

export default Nav;