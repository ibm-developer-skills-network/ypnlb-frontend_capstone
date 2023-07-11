import React, { useState } from 'react';


import "./SignUp.css";
import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from '../../config';

const SignUp = () => {
    const [role, setRole] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone,setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    // const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    
    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };
    
    // const toggleConfirmPasswordVisibility = () => {
    //     setConfirmPasswordVisible(!confirmPasswordVisible);
    // };
    const updateSignupRoleText = (value) => {
        setRole(value);
    };

    let signupRoleText = '';

    if (role === 'doctor') {
        signupRoleText = 'Signup as a Doctor';
    } else if (role === 'patient') {
        signupRoleText = 'Signup as a Patient';
    }
    const navigate = useNavigate();


    const register = async (e) => {
        e.preventDefault();
    
        // API Call
        const response = await fetch(`${API_URL}/api/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password,
                phone: phone,
                role: role,
            }),
            });
            const json = await response.json();
            if (json.authtoken) {
                sessionStorage.setItem("auth-token", json.authtoken);
                sessionStorage.setItem("name", name);
                // phone and email
                sessionStorage.setItem("phone", phone);
                sessionStorage.setItem("email", email);
                // Redirect to home page
                navigate("/");
                window.location.reload()
            } else {
            if (json.errors) {
                for (const error of json.errors) {
                    console.error(error.msg);
                }
            } else {
                console.error(json.error);
            }
        }
    };

    return (
        <div className="container" style={{marginTop:'5%'}}>
            <div className="signup-grid">
                <div className="signup-text">
                    <h1>Signup</h1>
                    {signupRoleText && <div className="signup-role">{signupRoleText}</div>}
                </div>
                <div className="signup-text1">
                    Already a member? <span ><Link to="/login" style={{color:'#2190FF'}}> Login In</Link></span>
                </div>
                <div className="signup-form">
                <form method="POST" onSubmit={register}>
                    <div className="form-group">
                        <label htmlFor="role">Signup Role</label>
                        <select name="role" id="role" className="form-control" onChange={(e) => updateSignupRoleText(e.target.value)}>
                            <option value="">Select Role</option>
                            <option value="doctor" onChange={(e) => setName(e.target.value)}>Doctor</option>
                            <option value="patient" onChange={(e) => setName(e.target.value)}>Patient</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="name">UserName</label>
                        <input value={name} type="text" onChange={(e) => setName(e.target.value)} name="name" id="name" className="form-control" placeholder="Enter your name" aria-describedby="helpId" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone">Phone</label>
                        <input value={phone} onChange={(e) => setPhone(e.target.value)} type="tel" name="phone" id="phone" className="form-control" placeholder="Enter your phone number" aria-describedby="helpId" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="email" className="form-control" placeholder="Enter your email" aria-describedby="helpId" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input value={password} onChange={(e) => setPassword(e.target.value)} type={passwordVisible ? 'text' : 'password'} name="password" id="password" className="form-control" placeholder="Enter your password" aria-describedby="helpId" />
                        <div className="password-visibility" onClick={togglePasswordVisibility}>
                            <i class={passwordVisible ? 'fa fa-eye' : 'fa fa-eye-slash'}></i>
                        </div>  
                    </div>

                    {/* <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input type={confirmPasswordVisible ? 'text' : 'password'} name="confirmPassword" id="confirmPassword" className="form-control" placeholder="Enter your confirm password" aria-describedby="helpId" />
                        <div className="password-visibility" onClick={toggleConfirmPasswordVisibility}>
                            <i class={confirmPasswordVisible ? 'fa fa-eye' : 'fa fa-eye-slash'}></i>
                        </div>
                    </div> */}
                    
                    
                    <div className="btn-group">
                        <button type="submit" className="btn btn-primary mb-2 mr-1 waves-effect waves-light">Submit</button>
                        <button type="reset" className="btn btn-danger mb-2 waves-effect waves-light">Reset</button>
                    </div>
                </form>
                </div>
            </div>
        </div>
    );
}

export default SignUp