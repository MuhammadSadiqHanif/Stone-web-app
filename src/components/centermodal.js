import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import React from 'react';
import { db, auth } from '../firebaseconfig';
import { BrowserRouter as Router, Route, Link,withRouter } from "react-router-dom";
class MyVerticallyCenteredModal extends React.Component {
    totalprice = () => {

        var total = 0;
        if (this.props.dataList) {
            console.log(this.props.dataList)
            this.props.dataList.map((value) => {
                return (
                    value ?
                        total += Number(value.totalprice)
                        : null
                )

            })
        }
        return total

    }
    date2 = () => {
        var fulldate = new Date()
        var date = fulldate.getDate();
        if (date <= 9) {
            date = "0" + fulldate.getDate()
        } else {
            date = fulldate.getDate()
        }
        var month = fulldate.getMonth() + 1;
        if (month <= 9) {
            month = `0${fulldate.getMonth() + 1}`
        } else {
            var month = fulldate.getMonth() + 1;
        }

        var year = fulldate.getFullYear();
        var miliscnd = fulldate.getMilliseconds();
        var time = fulldate.getMinutes() + fulldate.getHours()
        var merge = `${date}${month}${year}${time}${miliscnd}`
        return merge
    }

    date = () => {
        var fulldate = new Date()
        var date = fulldate.getDate();
        if (date <= 9) {
            date = "0" + fulldate.getDate()
        } else {
            date = fulldate.getDate()
        }
        var month = fulldate.getMonth() + 1;
        if (month <= 9) {
            month = `0${fulldate.getMonth() + 1}`
        } else {
            var month = fulldate.getMonth() + 1;
        }

        var year = fulldate.getFullYear();
        var merge = `${date}${month}${year}`
        return merge
    }

    khataClose = (ev) => {
        var name = ev.target.name;
        console.log(name)
        if (this.totalprice()) {
            var obj = {
                balance: {
                    // newdate : this.date2(),
                    totalprice: this.totalprice(),
                    date: this.date()
                }
            }
            console.log(obj)
            auth.onAuthStateChanged((user) => {
                if (user) {

                    db.ref().child(user.uid).child('khataBalance').child(name).set(obj).then(() => {
                        this.setState({
                            balance: obj
                        })
                        db.ref().child(user.uid).child('data').child(name).on('value', (snap) => {
                            if (snap.val()) {

                                var data = Object.values(snap.val())
                                this.setState({
                                    values: data
                                })
                            }
                        })
                        db.ref().child(user.uid).child('khata').child(name).child(this.date2()).set(this.state.values).then(() => {

                            // document.getElementById('table1').style.display = 'none'
                            // document.getElementById('table').style.display = 'inline-block'
                            db.ref().child(user.uid).child('data').child(name).remove().then(()=>{
                                console.log(obj,this.props.shopname,user.uid)
                                db.ref().child(user.uid).child('data').child(this.props.shopname).child(obj.balance.date).set(obj)
                                this.props.history.push('/viewCustomers')
                            })
                        })


                    })
                }
            })
        }
    }

    render() {
        return (
            <Modal
                show={this.props.show} onHide={this.props.handleClose}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body>
                    <h4>Do You Want To Khata Close</h4>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='danger' onClick={this.props.handleClose}>No</Button>
                    <Button variant='secondary' name={this.props.shopname} onClick={(ev) => {
                        this.khataClose(ev)
                        // this.props.tablechange()
                        this.props.handleClose(ev)

                    }}>Yes</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default withRouter(MyVerticallyCenteredModal)