import React, { Component } from 'react'
import {db, auth } from '../firebaseconfig';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class MainPage extends Component {
    constructor(props){
        super(props)
        this.state = {
            email : "",
            useruid : ""
        }
    }
    componentWillMount(){
        auth.onAuthStateChanged((user)=>{
            if(user){
                // console.log(true)
                db.ref().child(user.uid).child("personal Information").on("value",(snap)=>{
                    var data = snap.val()
                    this.setState({
                        email : data.email,
                        useruid : user.uid
                    })
                })
            }
        })
    }
    render() {
        // console.log(this.props)
        return (
            <div id="mainDiv">
                <h1>Main DashBoard </h1>
                <h5>Sign In As : ({this.state.email})</h5>
                <div className="input-group mb-3 select" >
                <Link disabled = {this.state.useruid ? false : true} id="customer" to = "/Form"> <button id="customer" style={{
                    width: "100%",
                    height: '15vh',
                }} type="button" className="btn btn-secondary"  onClick={this.props.changePage} disabled = {this.state.useruid ? false : true}>Add Enties</button></Link>
                </div>
                <div className="input-group mb-3 select" >
                <Link id="customer" disabled = {this.state.useruid ? false : true} to="/viewCustomers">
                    <button type="button" className="btn btn-secondary" id="customer" style={{
                    width: "100%",
                    height: '15vh',
                }} onClick={this.props.data} disabled = {this.state.useruid ? false : true}>Customers</button></Link>
                </div>
                <div className="input-group mb-3 select" >
                <Link id="customer" to = "/" ><button type="button" className="btn btn-secondary" id="customer" style={{
                    width: "100%",
                    height: '15vh',
                }} onClick = {this.props.signOut} disabled = {this.state.useruid ? false : true}>sign out</button></Link>
                </div>
            </div>

        )
    }
}
export default MainPage