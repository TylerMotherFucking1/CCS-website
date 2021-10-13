import React from 'react'
import APIHandler from '../utils/APIHandler'

class ClientComponent extends React.Component {
    constructor(props) {
        super(props)
        this.formSubmit = this.formSubmit.bind(this)
    }
    state = {
        errorRes: false,
        errorMessage: "",
        btnMessage: 0,
        sendData: false,
        clientDataList: [],
        dataLoaded:false,
    }

    async formSubmit(event) {
        event.preventDefault()
        this.setState({ btnMessage: 1 })
        var apiHandler = new APIHandler()
        var response = await apiHandler.saveClientData(
            event.target.name.value,
            event.target.email.value,
            event.target.school.value,
            event.target.programme.value)
        console.log(response)
        this.setState({ btnMessage: 0 })
        this.setState({ errorRes: response.data.error })
        this.setState({ errorMessage: response.data.message })
        this.setState({ sendData: true })
    }

    // this method will work when page is ready
    async componentDidMount() {
        var apihandler = new APIHandler()
        var clientData = await apihandler.fetchAllClient()
        this.setState({ clientDataList: clientData.data.data })
        console.log(clientData)
        this.setState({dataLoaded:true})
    }

    viewClientDetail = (client_id) => {
        console.log(client_id)
        this.props.history.push("/clientdetail/" + client_id)
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
                                        Add Client
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
                                                    placeholder="Enter client name" />
                                            </div>
                                        </div>

                                        <label htmlFor="email_address">Email</label>
                                        <div className="form-group">
                                            <div className="form-line">
                                                <input type="text"
                                                    id="email"
                                                    className="form-control"
                                                    placeholder="Enter client email" />
                                            </div>
                                        </div>

                                        <label htmlFor="email_address">School</label>
                                        <div className="form-group">
                                            <div className="form-line">
                                                <input type="text"
                                                    id="school"
                                                    className="form-control"
                                                    placeholder="Enter client's school" />
                                            </div>
                                        </div>

                                        <label htmlFor="email_address">programme</label>
                                        <div className="form-group">
                                            <div className="form-line">
                                                <input type="text"
                                                    id="programme"
                                                    className="form-control"
                                                    placeholder="Enter client's programme" />
                                            </div>
                                        </div>
                                        <br />
                                        <button type="submit"
                                            className="btn btn-primary m-t-15 waves-effect"
                                            disabled={this.state.btnMessage === 0 ? false : true} >
                                            {this.state.btnMessage === 0 ? "Add client" : "Adding client..."}</button>
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
                                    {this.state.dataLoaded == false? (
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
                                    ):""}

                                    <h2>
                                        All clients
                                    </h2>
                                </div>
                                <div className="body table-responsive">
                                    <table className="table table-hover">
                                        <thead>
                                            <tr>
                                                <th>#ID</th>
                                                <th>Name</th>
                                                <th>Email</th>
                                                <th>School</th>
                                                <th>Programme</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {/* loop through the list to display clients */}
                                            {this.state.clientDataList.map((client) => (
                                                <tr key={client.id} >
                                                    <td>{client.id} </td>
                                                    <td>{client.name} </td>
                                                    <td>{client.email} </td>
                                                    <td>{client.school} </td>
                                                    <td>{client.programme} </td>
                                                    <td> <button className="btn btn-block btn-warning"
                                                        onClick={() => this.viewClientDetail(client.id)}>
                                                        View</button> </td>
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

export default ClientComponent
