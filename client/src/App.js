import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import Map from './Map'

function App() {
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [data, setData] = useState(null);
  const [userID, setUserID] = useState(null)

  const register = () => {
    axios({
      method: "POST",
      data: {
        username: registerUsername,
        password: registerPassword,
      },
      withCredentials: true,
      url: "http://localhost:5000/register",
    })
      .then((res) => console.log(res))
      .catch((e) => console.error(e));
  };

  const login = () => {
    axios({
      method: "POST",
      data: {
        username: loginUsername,
        password: loginPassword,
      },
      withCredentials: true,
      url: "http://192.168.1.151:5000/login",
    })
      .then((res) => {
        if(res.data.success == "true"){
          setID(res.data.userID)
          getUser()
        }
      })
      .catch((e) => console.error(e));
  };
  const setID = (id) => {
    setUserID(id)
  }

  const getUser = () => {
    axios({
      method: "GET",
      withCredentials: true,
      url: "http://192.168.1.151:5000/getUser",
    })
      .then((res) => {
        setData(res.data.username);
      })
      .catch((e) => console.error(e));
  };
  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="App">
      {/* <div>
        <h1>Register</h1>
        <input
          placeholder="username"
          onChange={(e) => setRegisterUsername(e.target.value)}
        />
        <input
          placeholder="password"
          onChange={(e) => setRegisterPassword(e.target.value)}
        />
        <button onClick={register}>Submit</button>
      </div> */}
      {
        data ? 
        //<h1>Welcome Back {data}</h1> 
        <Map user={userID}/>
        
        :       
        <div>
          <div className="row d-flex justify-content-center p-3">
            <h1>Login</h1>
            <input
              placeholder="username"
              className="form-control w-25 m-2"
              onChange={(e) => setLoginUsername(e.target.value)}
            />
            <input
              className="form-control w-25 m-2"

              placeholder="password"
              onChange={(e) => setLoginPassword(e.target.value)}
            />

          </div>
          <button           
              className="btn btn-dark btn-lg"
              onClick={login}>Submit
            </button>
        </div>
      }
    </div>
  );
}

export default App;