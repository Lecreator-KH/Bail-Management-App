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

    // async function processFile(){
    //     if (!file) {
    //         console.log("Enter a valid file");
    //         return
    //     }

    //     const reader = new FileReader();

    //     let promise = new Promise((resolve)=>{
    //         resolve(
    //         reader.onload = async ({ target }) => {
    //             const csv = Papa.parse(target.result, { header: false });
    //             const tempData = csv?.data;
    //             setParsedData(tempData);
    //         },
    //         reader.readAsText(file))
    //         console.log(parsedData);
    //     })
    //     let result = await promise;
    // }

    const upload = () => {
        if (!file) {
            console.log("Enter a valid file");
            return
        }
        
        const reader = new FileReader();
        
        reader.onload = async ({ target }) => {
            const csv = Papa.parse(target.result, { header: false });
            const tempData = csv?.data;
            setParsedData(tempData);
        };
        reader.readAsText(file);
    };
    
    const updateDatabase = () => {
        axios({
            method: "POST",
            withCredentials: true,
            url: "/resetDatebase",
          })
            .then((res) => console.log(res))
            .catch((e) => console.error(e));
        
        for(let counter = 1; counter < parsedData.length; counter++){
            axios({
                method: "POST",
                data: {
                    id: parseInt(parsedData[counter][0]),
                    name: parsedData[counter][1],
                    offence: parsedData[counter][2],
                    longitude: parsedData[counter][3],
                    latitude: parsedData[counter][4],
                    photoLink: parsedData[counter][5],
                    groupMember: parsedData[counter][6],
                    isActive: parsedData[counter][7],
                },
                withCredentials: true,
                url: "/updateDatebase",
              })
                .then((res) => console.log(res))
                .catch((e) => console.error(e));
        }
    }

    useEffect(() => {
        updateDatabase();
      }, [parsedData]);
    
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