import React from 'react'
import { db, auth } from '../firebaseconfig';
import Badge from 'react-bootstrap/Badge'
import { BrowserRouter as Router, Route, Link, withRouter } from "react-router-dom";

class FormList extends React.Component {
  constructor() {
    super()
    this.state = {
      stone: null
    }
  }
  stone = () => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        db.ref().child(user.uid).child("stones").on('value', (snap) => {
          if (snap.val()) {

            var data = Object.keys(snap.val())
            this.setState({
              stone: data
            }, () => {
              console.log(this.state.stone)
            })
          }
        })
      }
    })
  }

  componentWillMount() {
    // this.data()
    this.stone()
    // if(this.props.edit){
    // }
  }
  render() {
    return (
      <div className="Form" id="form">

        <div id="addbtn2">

          {!this.props.edit ?
            <Link to="/MainPage"><button type="button" className="btn btn-secondary btn-circle2 btn-xl2" onClick={this.props.gotoMain}><i className="fas fa-arrow-left addicon"></i>
            </button></Link>

            : <Link to="/Enteries"><button type="button" className="btn btn-secondary btn-circle2 btn-xl2" ><i className="fas fa-arrow-left addicon"></i>
            </button></Link>
          }
        </div>
        {this.props.edit ?
          <h1>Edit Form</h1>
          :
          <span>
            <h1>Submit Form</h1>
            <h3 style={{ "marginBottom": "13px" }}>Shopname : ({this.props.shopname})</h3>
          </span>
        }
        <div className="input-group mb-3 select">
          <div className="input-group-prepend">
            <label className="input-group-text select1">stones</label>
          </div>
          <select required className="custom-select" id="stone">
            <option>Choose...</option>
            {this.state.stone ?
              this.state.stone.map((value, index) => {
                return <option key={index}>{value}</option>
              }) : null
            }
            <option>وائٹ چیٹائی</option>
            <option>یورو رنگ</option>
            <option>کورین کول</option>
            <option> یورو چیٹائی </option>
          </select>
          <span className="input-group-text" id="name" onClick={() => this.props.handleShow2()}><i className="fas fa-plus addicon2" ></i></span>

        </div>
        <div className="input-group mb-3 select" >
          <div className="input-group-prepend">
            <span className="input-group-text select1" >Weigth</span>
          </div>
          <input type="number" className="form-control" id="weigth" onChange={this.props.totalprice} required />
          <span className="input-group-text" id="karat">CT</span>

        </div>
        <div className="input-group mb-3 select" >
          <div className="input-group-prepend">
            <span className="input-group-text select1 font" >per CT price</span>
          </div>
          <input type="number" required className="form-control" id="karatprice" onChange={this.props.totalprice} />
        </div>
        <div className="input-group mb-3 select" >
          <div className="input-group-prepend">
            <span className="input-group-text select1" >Total price</span>
          </div>
          <input type="text" className="form-control Totalprice" id="Totalprice" disabled />
        </div>
        {!this.props.edit ?
          <div style={{
            "position": "relative",
            "top": "11%"
          }}>
            <div className="input-group mb-3 select" >
              <button type="button" className="btn btn-secondary" id="customer" onClick={() => {
                this.props.sumbit()
                this.props.handleShow3()
              }
              }>submit</button>
            </div>
            <Link to="/Entries"><div className="input-group mb-3 select" >
              {/* <div id="addbtn2" className="btn btn-secondary btn-circle3 btn-xl3">
            <h1>1</h1>
          </div> */}

              <button data-badge={this.props.entries.length} disabled={!this.props.entries.length} type="button" className="btn btn-secondary d-block  badge-notification" id="customer" onClick={() => {
                this.props.viewentry()
              }}>
                View Entires
        </button>
            </div></Link>
            {this.props.entries.length ?
              <div className="input-group mb-3 select" >
                <button type="button" className="btn btn-secondary" id="customer" onClick={() => {
                  this.props.print()
                }}>
                  clear all entries
        </button>
              </div>
              : null}
          </div>
          : <div className="input-group mb-3 select" >
            <button type="button" className="btn btn-secondary" id="customer" onClick={() => {
              this.props.history.push('/Entries')

              this.props.update()
            }} >
              Update
        </button>
          </div>}
      </div>
    )
  }
}

export default withRouter(FormList)