import React from 'react';

class PreviousKhata extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: null
        }
    }    
    render() {
        console.log(this.props.value)
        return(
            // <h1>hwllo</h1>
            <tbody>
                {!this.props.value.stone && !this.props.value.balance ?
                    <tr>    
                        <td>{this.props.index + 1}</td>
                        <td>-</td>
                        <td>{this.props.value.date}</td>
                        <td>(previous balance)</td>
                        <td>-</td>
                        <td>-</td>
                        <td>{this.props.value.totalprice} </td>
                        <td></td>
                    </tr>
                    : null}
                    {this.props.value.stone ?
                    < tr >
                        <td>{this.props.index + 1}</td>
                        <td>{this.props.value.date}</td>
                        <td>{this.props.value.newDate}</td>
                        <td>{this.props.value.stone}</td>
                        <td>{this.props.value.weigth}CT</td>
                        <td>{this.props.value.perkarat}</td>
                        <td>{this.props.value.totalprice}</td>
                        <td></td>
                    </tr >
                    : this.props.value.balance ?
                        <tr>
                            <td>{this.props.index + 1}</td>
                            <td>-</td>
                            <td>{this.props.value.date}</td>
                            {this.props.value.discount?
                            <td colSpan = "2">{`${this.props.value.total}(total) - ${this.props.value.discount}(discount)`}</td>
                        :<td>(cash received)</td>}
                            
                            <td>-</td>
                           
                            <td>
                                {this.props.value.totalprice}
                                
                             </td>
                             
                             <td></td>
                        </tr>
                        : null}
            </tbody>


        )
    }
}
export default PreviousKhata