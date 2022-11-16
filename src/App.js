import React from 'react';
import { NavigationBar } from './components/NavigationBar.js';
import { HomePage } from './components/HomePage.js';
import { Footer } from './components/Footer.js';


export default function App(props) {
    const currentPage = "HomePage";
    return (
        <div>
            <NavigationBar currentPage={currentPage}/>
            <HomePage />
            <Footer currentPage={currentPage} />
        </div>
    );
}