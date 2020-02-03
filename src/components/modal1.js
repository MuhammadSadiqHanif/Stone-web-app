import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import React from 'react';
import { db, auth } from '../firebaseconfig';

class Example extends React.Component {
    constructor() {
        super()
        this.state = {
            value: ""
        }
    }
    name = (ev) => {
        this.setState({
            value: ev.target.value
        })
        console.log(ev.target.value)
    }
    setName = () => {
        console.log(this.state.value, "62164564564")
        auth.onAuthStateChanged((user) => {
            if (user && this.state.value) {

                db.ref().child(user.uid).child('shopNames').child(this.state.value).set(this.state.value).then(() => {
                    this.setState({
                        value: ""
                    })
                })
            }
        })
    }
    render() {
        return (
            <>
                <Modal
                size = "sm"
                    show={this.props.show}
                    onHide={this.props.handleClose}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Add Shop Name</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="inputGroup-sizing-default">Shop Name</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                id="name"
                                aria-label="Default"
                                // aria-describedby="inputGroup-sizing-default"
                                onChange={(ev) => this.name(ev)}
                            />
                        </InputGroup>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => {
                            this.props.handleClose()
                        }}>close</Button>
                        <Button variant="primary" onClick={() => {
                            this.setName()
                            this.props.handleClose()

                        }}>Save Changes</Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }

}
export default Example