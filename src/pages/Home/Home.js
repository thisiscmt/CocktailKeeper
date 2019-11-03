import React from 'react';

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <section>
                <Header/>

                <div>This is the home page</div>

                <Footer/>
            </section>
        )
    }
}

export default Home;
