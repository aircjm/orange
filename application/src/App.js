import React from 'react';
import Header from "./layouts/header"

import Background from './layouts/background'
import Footer from "./layouts/footer"
import Message from "./components/message";
import {useMediaQuery} from "react-responsive";
import {desktopStyle} from "./utils/constants";
import {PageWrapper} from "./styles";
import {Redirect, Route} from "react-router-dom";
import Post from "./pages/post";
import Topic from "./pages/topic";
import Project from "./pages/project";

export default function App() {
    const isDesktop = useMediaQuery({query: desktopStyle});
    return (
        <React.Fragment>
            {/*{isDesktop && <Background/>}*/}
            <Header/>
            <PageWrapper id='PageWrapper'>
                <Route path='/' exact render={() => <Redirect to="/post"/>}/>
                <Route path='/post' children={({match}) => match && <Post/>}/>
                <Route path='/topic' children={({match}) => match && <Topic/>}/>
                <Route path='/project' children={({match}) => match && <Project/>}/>
            </PageWrapper>
            <Footer/>
            <Message/>
        </React.Fragment>
    );
}
