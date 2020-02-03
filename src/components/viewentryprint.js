import React, { Component } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { db, auth } from '../firebaseconfig';
import '../App.css'
class Print2 extends Component {
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
        var time = `${fulldate.getMinutes()}${fulldate.getHours()}`
        var merge = `${date}${month}${year}${time}${miliscnd}`
        return merge
    }
    setData = () => {
        var data = this.props.data;
        auth.onAuthStateChanged((user) => {
            for (var i = 0; i < data.length; i++) {
                if (user && data) {
                    console.log(user.uid)
                    db.ref().child(user.uid).child('data').child(data[i].shopname).child(data[i].date).set(data[i]).then(() => {
                        console.log("succesful", user.uid)
                        data = ""
                    })
                }
            }
        })
    }

    printElem = () => {
        var content = document.getElementById("printDiv").innerHTML;
        var mywindow = window.open('', 'Print');

        mywindow.document.write('<html><head><title>Print</title>');
        mywindow.document.write(`<style>
        h3 , h5 {
            text-align: center;
          }
          
        </style>`)
        mywindow.document.write('<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">')

        mywindow.document.write('</head><body >');
        mywindow.document.write(content);
        mywindow.document.write('</body></html>');

        mywindow.document.close();
        // mywindow.focus()

        // mywindow.close();
        setTimeout(() => { mywindow.print() }, 750)
        return true;
    }

    render() {
        console.log(this.props.data)
        return (
            <Modal
                size="lg"
                aria-labelledby="example-modal-sizes-title-lg"
                show={this.props.show}
                onHide={()=>this.props.handleClose("addmore")}
                
            >
                <Modal.Header closeButton id="example-custom-modal-styling-title">
                    <Modal.Title >
                        Print preview
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ 'overflow': 'scroll' }}>
                    <div id="printDiv">
                        <div>

                            <h3>Shopname</h3>
                            <h5>({this.props.data[0].shopname})</h5>

                            <table className="table">
                                <thead className="thead-dark">
                                    <tr>
                                        <th>S no</th>
                                        <th>Entry no</th>
                                        <th>Date</th>
                                        <th>Stone</th>
                                        <th>per CT</th>
                                        <th>Weigth</th>
                                        <th>total price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.props.data ?
                                        this.props.data.map((value, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{value.date}</td>
                                                    <td>{value.newDate}</td>
                                                    <td>{value.stone}</td>
                                                    <td>{value.perkarat}</td>
                                                    <td>{value.weigth}CT</td>
                                                    <td>{value.totalprice}</td>
                                                </tr>
                                            )
                                        })
                                        : null}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => {
                        this.setData()
                        this.props.handleClose("print")
                        this.printElem()
                    }}>Print & Save </Button>
                </Modal.Footer>
            </Modal>


        )
    }
}
export default Print2 