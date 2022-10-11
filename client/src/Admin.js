import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import "./Admin.css";
import axios from "axios";

function Admin() {
    const allowedExtensions = ["csv"];
    const [file, setFile] = useState("");
    const [parsedData, setParsedData] = useState([]);

    const fileChangeHandler = (e) => {
         
        // Check if user has entered the file
        if (e.target.files.length) {
            const inputFile = e.target.files[0];
             
            // Check the file extensions to make sure it is a csv file
            const fileExtension = inputFile?.type.split("/")[1];
            if (!allowedExtensions.includes(fileExtension)) {
                console.log("Please input a csv file");
                return;
            }
 
            setFile(inputFile);
        }
    };

    const upload = () => {
        // console.log("Test");
        if (!file) {
            console.log("Enter a valid file");
            return
        }
        
        const reader = new FileReader();
        
        reader.onload = async ({ target }) => {
            const csv = Papa.parse(target.result, { header: true });
            setParsedData(csv);
        };
        reader.readAsText(file);
        console.log(parsedData);

    };

    useEffect(() => {
        // getUser();
      }, []);
    
    return (
        <div>
            <div className="AdminContainer">
                <div className="Upload">
                    <label> Update database &nbsp;&nbsp;</label>
                    <input
                        type="file"
                        name="file"
                        id="file"
                        accept=".csv"
                        onChange={fileChangeHandler}
                    />
                    <button type="button" onClick={upload}> Update database</button>
                </div>
                <div className="Register">
                    <button type="button"> Register New User</button>
                </div>
            </div>
        </div>
    );
}

export default Admin;