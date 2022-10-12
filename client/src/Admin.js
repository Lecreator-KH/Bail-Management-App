import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import "./Admin.css";
import axios from "axios";

function Admin() {
    const allowedExtensions = ["csv"];
    const [file, setFile] = useState("");
    const [parsedData, setParsedData] = useState([]);
    const [updateDb, setUpdateDb] = useState(false);
    const [registerPage, setRegisterPage] = useState(false);
    const [registerUsername, setRegisterUsername] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [registerAdmin, setRegisterAdmin] = useState(false);

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

        setUpdateDb(true);
    };
    /*
        updateDatabase: 
    */
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

    const registerUser = () => {
        setRegisterPage(true);
        console.log("Register Page");
    }

    const backRegisterUser = () => {
        setRegisterPage(false);
        console.log("Admin Page");
    }

    const register = () => {
        axios({
            method: "POST",
            data: {
                username: registerUsername,
                password: registerPassword,
                admin: registerAdmin,
            },
            withCredentials: true,
            url: "/register",
        })
            .then((res) => console.log(res))
            .catch((e) => console.error(e));
    };

    useEffect(() => {
        if(updateDb) {
            updateDatabase();
            setUpdateDb(false);
        }
    }, [parsedData]);

    if (registerPage)
    {
        return (
            <div className="Register">
                <div className="row d-flex justify-content-center p-3">
                    <h1>Register</h1>
                    <input
                        placeholder="username"
                        className="form-control w-25 m-2"
                        onChange={(e) => setRegisterUsername(e.target.value)}
                    />
                    <input
                        placeholder="password"
                        className="form-control w-25 m-2"
                        onChange={(e) => setRegisterPassword(e.target.value)}
                    />
                    <label for="isAdmin"> Admin </label>
                    <input
                        type="checkbox"
                        name="isAdmin"
                    />
                </div>
                <button className="btn btn-dark btn-lg" onClick={register}>Submit</button>
                <button type="button" onClick={backRegisterUser}> Go back</button>
            </div>
        )
    }
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
                    <button type="button" onClick={registerUser}> Register New User</button>
                </div>
            </div>
        </div>
    );
}

export default Admin;