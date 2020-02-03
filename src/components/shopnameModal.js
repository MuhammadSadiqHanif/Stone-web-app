import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import React from 'react';
import { db, auth } from '../firebaseconfig';
import Select from 'react-select'
import { BrowserRouter as Router, Route, Link , Redirect,withRouter } from "react-router-dom";



class MyVerticallyCenteredModal2 extends React.Component {
    constructor() {
        super()
        this.state = {
            data: null,
            value: "",
            inputValue : "",
            isSearchable : false
        }
    }
    data = () => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                db.ref().child(user.uid).child("shopNames").on('value', (snap) => {
                    if (snap.val()) {

                        var data = Object.keys(snap.val())
                        this.setState({
                            data: data
                        }, () => {
                            // console.log(this.state.data)
                        })
                        var obj = [];
                        console.log(this.state.data)
                        if (this.state.data) {
                
                            this.state.data.map((value, index) => {
                                return obj.push({ value: value, label: value })
                            })
                            if (obj !== []) {
                
                                this.setState({
                                    value: obj
                                }, () => {
                                    console.log(this.state.value)
                                })
                            }
                        }
                    }
                })
            }
        })
    }
    
    componentWillMount() {
        this.data()
       this.props.history.push('/')
    }

    render() {
        return (
            <Modal
                show={this.props.show}
                //  onHide={() => {
                //     if (!this.props.selectedShopname) {
                //         // this.props.handleClose()
                //         // console.log(true,this.props.selectedShopname)
                        
                //     // }
                //     // //  else {
                //         // this.props.gotoMain()
                //         return(

                //             <Redirect to = "/MainPage"/>
                //             )
                //     //     console.log(false,this.props.selectedShopname)
                //     }
                // }}
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Select Shop Name
          </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="input-group row-fluid " >
                        {/* <div className="input-group-prepend ">
                            <span className="input-group-text font" >Shop Name</span>
                        </div>
                        <input type="text" list="Sname" className="form-control" id="shopname" onChange={(ev) => this.props.getValue(ev)} required /> */}

                        <Select
                            className="selectinput"
                            onFocus = {()=>{this.setState({
                                isSearchable : true
                            })}}
                            onChange={(ev) => (this.props.getValue(ev))}
                            options={this.state.value ? this.state.value : ""}
                            isSearchable = {this.state.isSearchable}
                            isClearable = {true}
                            isDisabled = {this.state.value ? false : true}
                            style={{ "width": "50%" }}
                        />

                        {/* </Select> */}
                        {/* <datalist id="Sname">
                        </datalist> */}
                        <span className="input-group-text" id="name" onClick={() => {
                            this.props.handleShow()
                            // document.getElementById('shopname').value = ""
                        }}><i className="fas fa-plus addicon2" ></i></span>

                    </div>
                </Modal.Body>
                <Modal.Footer>
                <Link to = "/Form"> <Button disabled={this.props.selectedShopname ? false : true} variant='secondary' name={this.props.shopname} onClick={(ev) => {
                        this.props.handleClose(ev)
                    }}>Go..</Button></Link>
                    <Link to = "/MainPage"><Button variant='secondary' name={this.props.shopname} onClick={(ev) => {
                        this.props.handleClose(ev)
                    }} >Back</Button></Link>
                </Modal.Footer>
                {/* <div id="addbtn2">
                    <button type="button" className="btn btn-secondary btn-circle2 btn-xl2" onClick={this.props.gotoMain}><i className="fas fa-arrow-left addicon"></i>
                    </button>
                </div> */}


            </Modal>
        );
    }
}

export default withRouter(MyVerticallyCenteredModal2)