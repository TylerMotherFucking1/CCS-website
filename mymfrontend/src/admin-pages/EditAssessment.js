import React from 'react'
import APIHandler from '../utils/APIHandler'
import {Link} from 'react-router-dom'

class AddAssessment extends React.Component {
    constructor(props) {
        super(props)
        this.formSubmit = this.formSubmit.bind(this)
    }
    state = {
        errorRes: false,
        errorMessage: "",
        btnMessage: 0,
        sendData: "",
        attendance: false,
        intake_date: "",
        status: "",
        case_category: "",
        remarks: "",
        appointment_id: "",
    }

    async formSubmit(event) {
        event.preventDefault()
        this.setState({ btnMessage: 1 })
        var apiHandler = new APIHandler()
        var response = await apiHandler.editAssessmentData(
            event.target.attendance.value,
            event.target.intake_date.value,
            event.target.status.value,
            event.target.case_category.value,
            event.target.remarks.value,
            this.props.match.params.id, //assessment id
            this.props.match.params.client_id, //client id
            this.state.appointment_id //appointment id
            )
        console.log(response)
        this.setState({ btnMessage: 0 })
        this.setState({ errorRes: response.data.error })
        this.setState({ errorMessage: response.data.message })
        this.setState({ sendData: true })
    }

    // this method will work when page is ready
    async componentDidMount() {
        var apihandler = new APIHandler()
        var assessmentData = await apihandler.fetchAssessmentDetail(this.props.match.params.id)
        console.log(assessmentData)
        this.setState({ attendance: assessmentData.data.data.attendance })
        this.setState({ intake_date: assessmentData.data.data.intakeDate })
        this.setState({ status: assessmentData.data.data.status })
        this.setState({ case_category: assessmentData.data.data.case_category })
        this.setState({ remarks: assessmentData.data.data.remarks})
        this.setState({ appointment_id: assessmentData.data.data.appointment_id})
        this.setState({ dataLoaded:true})

    }


    render() {
        return (
            <section className="content">
                <div className="container-fluid">
                    <div className="block-header">
                        <h2>Edit client's assessment</h2>
                    </div>

                    <div className="row clearfix">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <div className="card">
                                <div className="header">
                                    <h2>
                                        Edit client's Counselling Assessment {this.props.match.params.id}
                                    </h2>
                                </div>
                                <div className="body">
                                    <form onSubmit={this.formSubmit}>
                                        {/* html form for client */}
                                        <label htmlFor="email_address">Attendance</label>
                                        <div className="form-group">
                                            <div className="form-line">
                                                <input type="text"
                                                    id="attendance"
                                                    className="form-control"
                                                    placeholder="Enter attendance" 
                                                    defaultValue={this.state.attendance} />
                                            </div>
                                        </div>

                                        <label htmlFor="email_address">Intake date</label>
                                        <div className="form-group">
                                            <div className="form-line">
                                                <input type="text"
                                                    id="intake_date"
                                                    className="form-control"
                                                    placeholder="Enter intake date" 
                                                    defaultValue={this.state.intake_date} />
                                            </div>
                                        </div>

                                        <label htmlFor="email_address">Status</label>
                                        <div className="form-group">
                                            <div className="form-line">
                                                <input type="text"
                                                    id="status"
                                                    className="form-control"
                                                    placeholder="Enter status" 
                                                    defaultValue={this.state.status}/>
                                            </div>
                                        </div>

                                        <label htmlFor="email_address">Case Category</label>
                                        <div className="form-group">
                                            <div className="form-line">
                                                <input type="text"
                                                    id="case_category"
                                                    className="form-control"
                                                    placeholder="Enter case category"
                                                    defaultValue={this.state.case_category} />
                                            </div>
                                        </div>

                                        <label htmlFor="email_address">Remarks</label>
                                        <div className="form-group">
                                            <div className="form-line">
                                                <input type="text"
                                                    id="remarks"
                                                    className="form-control"
                                                    placeholder="Enter remarks"
                                                    defaultValue={this.state.remarks} />
                                            </div>
                                        </div>
                                        <br />
                                        <button type="submit"
                                            className="btn btn-primary m-t-15 waves-effect"
                                            disabled={this.state.btnMessage === 0 ? false : true} >
                                            {this.state.btnMessage === 0 ? "Save edit assessment" : "Editing assessment..."}</button>
                                        <br />

                                        {/* if submit success */}
                                        {this.state.errorRes == false && this.state.sendData == true ? (
                                            <div className="alert alert-success">
                                                <strong>Success!</strong> {this.state.errorMessage}. 
                                                <Link to={"/clientdetail/"+this.props.match.params.client_id}
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

export default AddAssessment
