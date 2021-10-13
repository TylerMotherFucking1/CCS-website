import React from 'react'
import APIHandler from '../utils/APIHandler'

class ClientDetailComponent extends React.Component {
    constructor(props) {
        super(props)
        this.formSubmit = this.formSubmit.bind(this)
        console.log(props.match.params.id) //location of client id, for accessing id
    }
    state = {
        errorRes: false,
        errorMessage: "",
        btnMessage: 0,
        sendData: false,
        appointmentList: [],
        name: "",
        email: "",
        school: "",
        programme: "",
        dataLoaded: false,
        assessList: [],
    }

    async formSubmit(event) {
        event.preventDefault()
        this.setState({ btnMessage: 1 })
        var apiHandler = new APIHandler()
        var response = await apiHandler.editClientData(
            event.target.name.value,
            event.target.email.value,
            event.target.school.value,
            event.target.programme.value,
            this.props.match.params.id)
        console.log(response)
        this.setState({ btnMessage: 0 })
        this.setState({ errorRes: response.data.error })
        this.setState({ errorMessage: response.data.message })
        this.setState({ sendData: true })
    }

    // this method will work when page is ready
    async componentDidMount() {
        var apihandler = new APIHandler()
        var clientData = await apihandler.fetchClientDetail(this.props.match.params.id)
        console.log(clientData)
        this.setState({ appointmentList: clientData.data.data.appointment_details })
        this.setState({ assessList: clientData.data.data.assessment_details })
        this.setState({ name: clientData.data.data.name })
        this.setState({ email: clientData.data.data.email })
        this.setState({ school: clientData.data.data.school })
        this.setState({ programme: clientData.data.data.programme })
        this.setState({ dataLoaded: true })

    }

    addAppointment = () => {
        this.props.history.push("/addappointment/" + this.props.match.params.id)
    }

    addAssessment = (appointment_id) => {
        this.props.history.push("/addassessment/" + this.props.match.params.id + "/" + appointment_id)
    }

    editAppointment = (appointment_id) => {
        console.log(appointment_id)
        // pass two params for updating data
        this.props.history.push("/editAppointment/" + this.props.match.params.id + "/" + appointment_id)
    }
    editAssess = (asssess_id) => {
        console.log(asssess_id)
        // pass two params for updating data
        this.props.history.push("/editAssessment/" + this.props.match.params.id + "/" + asssess_id)
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
                                        Edit Client
                                    </h2>
                                </div>
                                <div className="body">
                                    <form onSubmit={this.formSubmit}>
                                        {/* html form for client */}
                                        <label htmlFor="email_address">Name</label>
                                        <div className="form-group">
                                            <div className="form-line">
                                                <input type="text"
                                                    id="name"
                                                    className="form-control"
                                                    placeholder="Enter client name"
                                                    defaultValue={this.state.name} />
                                            </div>
                                        </div>

                                        <label htmlFor="email_address">Email</label>
                                        <div className="form-group">
                                            <div className="form-line">
                                                <input type="text"
                                                    id="email"
                                                    className="form-control"
                                                    placeholder="Enter client email"
                                                    defaultValue={this.state.email} />
                                            </div>
                                        </div>

                                        <label htmlFor="email_address">School</label>
                                        <div className="form-group">
                                            <div className="form-line">
                                                <input type="text"
                                                    id="school"
                                                    className="form-control"
                                                    placeholder="Enter client's school"
                                                    defaultValue={this.state.school} />
                                            </div>
                                        </div>

                                        <label htmlFor="email_address">programme</label>
                                        <div className="form-group">
                                            <div className="form-line">
                                                <input type="text"
                                                    id="programme"
                                                    className="form-control"
                                                    placeholder="Enter client's programme"
                                                    defaultValue={this.state.programme} />
                                            </div>
                                        </div>
                                        <br />
                                        <button type="submit"
                                            className="btn btn-primary m-t-15 waves-effect"
                                            disabled={this.state.btnMessage === 0 ? false : true} >
                                            {this.state.btnMessage === 0 ? "Edit client" : "Edit client..."}</button>
                                        <br />

                                        {/* if submit success */}
                                        {this.state.errorRes == false && this.state.sendData == true ? (
                                            <div className="alert alert-success">
                                                <strong>Success!</strong> {this.state.errorMessage}.
                                            </div>
                                        ) : ("")}

                                        {/* if submit failed */}
                                        {this.state.errorRes == true && this.state.sendData == true ? (
                                            <div className="alert alert-danger">
                                                <strong>Oh snap!</strong> {this.state.errorMessage}
                                            </div>
                                        ) : ("")}

                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row clearfix">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <div className="card">
                                <div className="header">
                                    {/* loading animation */}
                                    {this.state.dataLoaded == false ? (
                                        <div className="text-center">
                                            <div className="preloader pl-size-xl">
                                                <div className="spinner-layer">
                                                    <div className="circle-clipper left">
                                                        <div className="circle"></div>
                                                    </div>
                                                    <div className="circle-clipper right">
                                                        <div className="circle"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ) : ""}

                                    <h2>
                                        Client appointment history
                                        <div className="header-dropdown">
                                            <button className="btn btn-info"
                                                onClick={this.addAppointment}
                                            >Make appointment</button>
                                        </div>
                                    </h2>
                                </div>
                                <div className="body table-responsive">
                                    {/* appointment list */}
                                    <table className="table table-hover">
                                        <thead>
                                            <tr>
                                                <th>#ID</th>
                                                <th>Appointment Date</th>
                                                <th>Appointment Time</th>
                                                <th>Added on</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {/* loop through the list to display appointment */}
                                            {this.state.appointmentList.map((app) => (
                                                <tr key={app.id} >
                                                    <td>{app.id} </td>
                                                    <td>{app.appointment_date} </td>
                                                    <td>{app.appointment_time} </td>
                                                    <td>{app.added_on} </td>
                                                    <td> <button className="btn btn-block btn-success"
                                                    >
                                                        Approve</button>
                                                        <button className="btn btn-block btn-danger"
                                                            onClick={() => this.editAppointment(app.id)} >
                                                            Reject</button>

                                                        <button className="btn btn-block btn-info"
                                                            onClick={() => this.addAssessment(app.id)}
                                                        >Add Assessment</button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row clearfix">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <div className="card">
                                <div className="header">
                                    {/* loading animation */}
                                    {this.state.dataLoaded == false ? (
                                        <div className="text-center">
                                            <div className="preloader pl-size-xl">
                                                <div className="spinner-layer">
                                                    <div className="circle-clipper left">
                                                        <div className="circle"></div>
                                                    </div>
                                                    <div className="circle-clipper right">
                                                        <div className="circle"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ) : ""}

                                    <h2>
                                        Assessment details
                                        <div className="header-dropdown">
                                        </div>
                                    </h2>
                                </div>
                                <div className="body table-responsive">
                                    {/* appointment list */}
                                    <table className="table table-hover">
                                        <thead>
                                            <tr>
                                                <th>#ID</th>
                                                <th>Appointment ID</th>
                                                <th>Attendance</th>
                                                <th>Intake Date</th>
                                                <th>Status</th>
                                                <th>Case category</th>
                                                <th>Remarks</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {/* loop through the list to display assessment */}
                                            {this.state.assessList.map((assess) => (
                                                <tr key={assess.id} >
                                                    <td>{assess.id} </td>
                                                    <td>{assess.appointment_id} </td>
                                                    <td>{assess.attendance} </td>
                                                    <td>{assess.intakeDate} </td>
                                                    <td>{assess.status} </td>
                                                    <td>{assess.case_category} </td>
                                                    <td>{assess.remarks} </td>
                                                    <td> <button className="btn btn-block btn-warning"
                                                    onClick={() => this.editAssess(assess.id)}
                                                    >
                                                        Edit</button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

export default ClientDetailComponent
