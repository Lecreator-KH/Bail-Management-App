import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

function Admin() {
    useEffect(() => {
        // getUser();
      }, []);
    
    return (
        <div>
            <div className="AdminContainer">
                <div className="Upload">

                </div>
                <div className="Register">
                    <button type="button"> Register New User</button>
                </div>
            </div>
        </div>
    );
}

export default Admin;