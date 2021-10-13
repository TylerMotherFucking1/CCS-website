import React from 'react'

class HomePage extends React.Component {
    render() {
        return (
            // content CSS are aligned to right
            <section className="content">
                <div className="container-fluid">
                    <div>
                        <h2> You deserve to be understood </h2> 
                        <p>
                        You are not being understood by anyone you know and we know you crave for being understood. 
                        We understand that you’re tired of talking about it with the people. But we want to understand you, truly. 
                        And we will listen to you without being jugmental. No third person. 
                        </p>
                        <h2>Just Us</h2>

                        <button className="btn btn-primary m-t-15">Share your story now</button>
                    </div>
                </div>
            </section>
        )
    }
}

export default HomePage
