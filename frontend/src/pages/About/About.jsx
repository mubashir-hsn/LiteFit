import React, { useEffect } from 'react'
import AboutBanner from './AboutBanner'
import AboutTestimonial from './AboutTestimonial'
import AboutTeam from './AboutTeam'
import AboutClients from './AboutClients'

const About = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <>
           <AboutBanner/>
           <AboutTestimonial/>
           <AboutTeam/>
           <AboutClients/>
        </>
    )
}

export default About