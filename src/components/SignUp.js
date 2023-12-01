import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = (props) => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = credentials;
    const response = await fetch("https://inotebook-6pk4.onrender.com/api/auth/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      //save the auth token and redirct
      localStorage.setItem("token", json.authtoken);
      navigate("/");
      props.showAlert("Account created successfully", "success");
    } else {
      props.showAlert("Invalid Details", "danger");
    }
  };
  // eslint-disable-next-line
  const onchange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    // <div className="conatiner">
    //   <h2 className="text-center">Signup Form</h2>
    //   <form onSubmit={handleSubmit}>
    //     <div className="mb-3">
    //       <label htmlFor="name" className="form-label">
    //         Enter Name
    //       </label>
    //       <input
    //         type="text"
    //         className="form-control"
    //         id="name"
    //         name="name"
    //         onChange={onchange}
    //       />
    //     </div>

    //     <div className="mb-3">
    //       <label htmlFor="email" className="form-label">
    //         Email address
    //       </label>
    //       <input
    //         type="email"
    //         className="form-control"
    //         id="email"
    //         aria-describedby="emailHelp"
    //         name="email"
    //         onChange={onchange}
    //       />
    //     </div>
    //     <div className="mb-3">
    //       <label htmlFor="password" className="form-label">
    //         Password
    //       </label>
    //       <input
    //         type="password"
    //         className="form-control"
    //         id="password"
    //         name="password"
    //         onChange={onchange}
    //         required
    //         minLength={5}
    //       />
    //     </div>

    //     <div className="mb-3">
    //       <label htmlFor="cpassword" className="form-label">
    //         Confirm Password
    //       </label>
    //       <input
    //         type="password"
    //         className="form-control"
    //         id="cpassword"
    //         name="cpassword"
    //         onChange={onchange}
    //         required
    //         minLength={5}
    //       />
    //     </div>
    //     <div className="text-center">
    //       <button type="submit" className="btn btn-primary">
    //         Signup
    //       </button>
    //     </div>
    //   </form>
    // </div>
    <form onSubmit={handleSubmit}>
    <div className="wrapper">
    <div className="login_box">
      <div className="login-header">
        <span>Sign Up</span>
      </div>

   
      <div className="input_box">
        <input type="text" id="name" className="input-field" name="name"  onChange={onchange} required />
        <label htmlFor="name" className="label" >Enter Name</label>
        <i className="bx bx-user icon"></i>
      </div>

      <div className="input_box">
        <input type="email" id="email" className="input-field" name="email"  onChange={onchange} required />
        <label htmlFor="email" className="label" >Email Address</label>
        <i className="bx bx-user icon"></i>
      </div>
  
      <div className="input_box">
        <input type="password" id="password" className="input-field"   minLength={5} onChange={onchange}  name="password" required />
        <label htmlFor="pass" className="label" >Password</label>
        <i className="bx bx-lock-alt icon"></i>
      </div>

      <div className="input_box">
        <input type="password" id="cpassword" className="input-field"   minLength={5} onChange={onchange}  name="cpassword" required />
        <label htmlFor="cpassword" className="label" >Confirm Password</label>
        <i className="bx bx-lock-alt icon"></i>
      </div>
  
    
  
      <div className="input_box">
        <input type="submit" className="input-submit" value="Sign Up" />
      </div>
  
    </div>
  </div>
  </form>
  );
};

export default SignUp;
