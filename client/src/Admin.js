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

    /*
        fileChangeHandler: Accept any csv files.
        Future Implementations
        - Allow for different file type like json
    */
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

    /*
        upload: Upload the csv file to the server. The server will retrieve the information which
        will be parsed to the database server.
    */
    const upload = () => {
        // Check if a valid file have been selected
        // Give user a warning if a valid file has not been selected
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
        updateDatabase: sends a request to the server to insert the new records of people on bail to the database.
    */
    const updatePOBDatabase = () => {
        // Reset the people on bail table
        axios({
            method: "POST",
            withCredentials: true,
            url: "/resetDatebase",
          })
            .then((res) => console.log(res))
            .catch((e) => console.error(e));

        // Send a request for each record in the file receive from the user.
        // Future Implementations
        // Use fast-csv instead of sending one by one
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
                url: "/updatePOBDatebase",
              })
                .then((res) => console.log(res))
                .catch((e) => console.error(e));
        }
    }

    /*
        registerUser: Change to the registration page
    */
    const registerUser = () => {
        setRegisterPage(true);
        console.log("Register Page");
    }

    /*
        registerUser: Change to the admin page
    */
    const backRegisterUser = () => {
        setRegisterPage(false);
        console.log("Admin Page");
    }

    /*
        adminChange: Check if the value of the isAdmin checkbox has been changed
        If so update accordingly
    */
    const adminChange = event => {
        setRegisterAdmin(current => !current);
    };

    /*
        register: A new user is added, send a request to insert the record to the user database
    */
    const register = () => {
        // if 
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

    // Wait for the file to be process before sending the request to insert the new POB records
    useEffect(() => {
        if(updateDb) {
            updatePOBDatabase();
            setUpdateDb(false);
        }
    }, [parsedData]);

    // Update the registerAdmin state when the isAdmin checkbox is clicked
    useEffect(() => {console.log(registerAdmin)}, [registerAdmin]);

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
                        value={setRegisterAdmin}
                        onChange={adminChange}
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