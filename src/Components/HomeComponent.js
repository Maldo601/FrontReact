import React, { useState } from "react";
import LoginComponent from "./LoginComponent";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';


export default function HomeComponent() {
    const [showBasic, setShowBasic] = useState(false);
        return(
        <>
            <header>
                <Navbar bg="dark" variant="dark">
                    <Container>
                        <Navbar.Brand href="/home">
                     
                        </Navbar.Brand>
                    </Container>
                </Navbar>
                <div className='p-5 text-center bg-image'>
                    <div className='d-flex justify-content-center align-items-center h-100'>
                        <div className='text-black'>
                            <h1 className='mb-3'>Heading</h1>
                            <h4 className='mb-3'>Subheading</h4>
                        </div>
                    </div>
                </div>
            </header>
            <body>
            <LoginComponent>
            </LoginComponent>
            </body>
        </>
    )
}
