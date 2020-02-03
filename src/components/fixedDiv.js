import React from 'react';
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import { db } from '../firebaseconfig';
class Bottom extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            total: [],
            data: null,
            balance: [],
            values: null
        }
    }

    totalprice = () => {

        var total = 0;
        if (this.props.datalist) {
            console.log(this.props.datalist)
            this.props.datalist.map((value) => {
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

    componentWillMount() {
        // this.props.data2(this.props.shopname)
    }
    render() {
        return (
            <div id="fixed">
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>balance</th>
                            <th>
                                <Button name={this.totalprice()} variant="danger" onClick={(ev) => { this.props.handleShow(ev) }}>
                                    receive payment
                                </Button>
                            </th>
                            <th>
                                <Button  variant="danger" onClick={(ev) => { 
                                    // this.khataClose(ev) 
                                    this.props.handleShow2(ev)
                                    
                                    }}>
                                    Khata Close
                                </Button>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* {this.props.datalist ?
                            this.props.datalist.map((value, index) => {
                                return (
                                value.balance ?
                                <tr key={index}>
                                    <td className="classestd">{value.date}</td>
                                    <td className="classestd">{value.balance}</td>
                                    <td className="classestd"></td>
                                </tr>:"null")
                            })
                            : */}
                            <tr>
                                <td>{this.date()}</td>
                                <td>{this.totalprice()}</td>
                            </tr>
                    </tbody>
                </Table>

            </div>
        )
    }
}
export default Bottom