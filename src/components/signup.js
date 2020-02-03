import React, { Component } from 'react'
import { auth } from '../firebaseconfig';
import { db } from '../firebaseconfig';
// import '../all.css';
import { BrowserRouter as Router, Route, Link, Redirect, withRouter } from "react-router-dom";

class Signup extends Component {
    constructor(props) {
        super(props)
        this.state = {
            obj: null,
            value: false,
            conformPassword: "",
            show: false,
        }
    }
    signUp = (event) => {
        event.preventDefault();
        var email = document.getElementById('signUpEmail').value;
        var password = document.getElementById('signUpPassword').value;
        var number = document.getElementById('number').value;
        var fname = document.getElementById('fname').value;
        var lname = document.getElementById('lname').value;
        // this.setState({
        var obj = {
            fname: fname,
            lname: lname,
            email: email,
            // password: password,
            number: number
        }
        // })
        if (number.length === 11) {

            auth.createUserWithEmailAndPassword(email, password)
                .then((res) => {
                    db.ref().child(res.user.uid).child('personal Information').set(obj)
                    auth.signOut().then(() => {
                        console.log(this.props)
                        this.props.SignIN()
                        this.props.history.push('/')
                        // return(
                        //     <Redirect to = "/"/>
                        // )
                    })
                })
                .catch(function (error) {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    alert(errorMessage);
                    // ...
                });
            document.getElementById('number').value = ""
            document.getElementById('fname').value = ""
            document.getElementById('lname').value = ""
            document.getElementById('signUpEmail').value = "";
            document.getElementById('signUpPassword').value = "";
            document.getElementById('conformPassword').value = "";
        } else {
            alert('plzz check number character')
        }

    }
    password = (ev) => {
        var pass = document.getElementById('signUpPassword').value;
        var confopass = document.getElementById('conformPassword').value;
        if (ev.target.name === "conformPassword") {
            this.setState({
                conformPassword: ev.target.value
            })
        }
        if (confopass === pass) {
            console.log(confopass, pass)
            this.setState({
                value: true,

            })
        } else {
            this.setState({
                value: false
            })
        }
    }
    showpass = () => {
        var input = document.getElementById('signUpPassword')
        if (input.type === "text") {
            this.setState({
                show: false,
            })
        }
        if (input.type === "password") {
            this.setState({
                show: true,
            })
        }
    }
    render() {
        return (
            <div className="Form" id="form">
                <h1>Sign Up</h1><br /><br />
                <form id="signupForm" onSubmit={(ev) => {
                    this.signUp(ev)

                }}>

                    <div className="form-row form-group">
                        <div className="col">
                            <input required type="text" id="fname" className="form-control" placeholder="First name" />
                        </div>
                        <div className="col">
                            <input required type="text" id="lname" className="form-control" placeholder="Last name" />
                        </div>
                    </div>

                    <div className="form-group">
                        <input required type="email" id="signUpEmail" className="form-control" aria-describedby="emailHelp" placeholder="Enter email" />
                    </div>
                    <div className="form-group">
                        <input required type="number" id="number" className="form-control" placeholder="Enter Number" />
                    </div>
                    <div className="form-group">
                        <input required type={`${this.state.show ? "text" : "password"}`} placeholder="Password" id="signUpPassword" className="form-control" />
                        <span id="showPAss">{this.state.show ? <i className="fas fa-eye-slash icon" onClick={() => this.showpass()}></i> : <i className="fas fa-eye icon" onClick={() => this.showpass()}></i>}</span>
                    </div>
                    <div className="form-group">
                        <input required name="conformPassword" type="password" onChange={(ev) => this.password(ev)} placeholder="Conform Password" id="conformPassword" className={`form-control ${this.state.value ? "is-valid" : this.state.conformPassword === "" ? null : "is-invalid"}`} />
                    </div>
                    <button className="btn btn-primary  btn-block">Submit</button><br />
                    <Link to="/"><button className="btn btn-secondary  btn-block" onClick={this.props.SignIN}>Sign In</button></Link><br /><br />
                </form>
            </div>
        )
    }
}
export default withRouter(Signup)