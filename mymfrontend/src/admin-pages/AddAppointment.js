import React from 'react'
import APIHandler from '../utils/APIHandler'
import {Link} from 'react-router-dom'

class AddAppointment extends React.Component {
    constructor(props) {
        super(props)
        this.formSubmit = this.formSubmit.bind(this)
    }
    state = {
        errorRes: false,
        errorMessage: "",
        btnMessage: 0,
        sendData: false,
    }

    async formSubmit(event) {
        event.preventDefault()
        this.setState({ btnMessage: 1 })
        var apiHandler = new APIHandler()
        var response = await apiHandler.saveAppointmentData(
            event.target.appointment_date.value,
            event.target.appointment_time.value,
            this.props.match.params.id
            )
        console.log(response)
        this.setState({ btnMessage: 0 })
        this.setState({ errorRes: response.data.error })
        this.setState({ errorMessage: response.data.message })
        this.setState({ sendData: true })
    }

    render() {
        return (
            <section className="content">
                <div className="container-fluid">
                    <div className="block-header">
                        <h2>Manage Client</h2>
                    </div>

                    <div className="row clearfix">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <div className="card">
                                <div className="header">
                                    <h2>
                                        Make appointment with client {this.props.match.params.id}
                                    </h2>
                                </div>
                                <div className="body">
                                    <form onSubmit={this.formSubmit}>
                                        {/* html form for client */}
                                        <label htmlFor="email_address">Appointment Date</label>
                                        <div className="form-group">
                                            <div className="form-line">
                                                <input type="text"
                                                    id="appointment_date"
                                                    className="form-control"
                                                    placeholder="Enter client name" />
                                            </div>
                                        </div>

                                        <label htmlFor="email_address">Appointment time</label>
                                        <div className="form-group">
                                            <div className="form-line">
                                                <input type="text"
                                                    id="appointment_time"
                                                    className="form-control"
                                                    placeholder="Enter client email" />
                                            </div>
                                        </div>
                                        <br />
                                        <button type="submit"
                                            className="btn btn-primary m-t-15 waves-effect"
                                            disabled={this.state.btnMessage === 0 ? false : true} >
                                            {this.state.btnMessage === 0 ? "Set appointment" : "Adding appointment..."}</button>
                                        <br />

                                        {/* if submit success */}
                                        {this.state.errorRes == false && this.state.sendData == true ? (
                                            <div className="alert alert-success">
                                                <strong>Success!</strong> {this.state.errorMessage}. 
                                                <Link to={"/clientdetail/"+this.props.match.params.id}
                                                    className="btn btn-info"
                                                    >Back to client page</Link>
                                            </div>
                                        ) : ("")}

                                        {/* if submit failed */}
                                        {this.state.errorRes == true && this.state.sendData == true ? (
                                            <div className="alert alert-danger">
                                                {this.state.errorMessage}
                                            </div>
                                        ) : ("")}

                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

export default AddAppointment
