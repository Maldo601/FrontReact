
import React, { Component, useState } from 'react';
import { render } from 'react-dom';
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
export default function Login(props) {
const [username, setUserName] = useState("");
const [password, setPassword] = useState("");
function validateFormFields() {
return username.length > 0 && password.length > 0;
}
function handleSubmit(event) {
event.preventDefault();
}
return (
    <div className="Login">
        <h1> Login </h1>
        <form onSubmit={handleSubmit}>
    <FormGroup controlId="Username" >
    <FormLabel>Usuario </FormLabel>
    <FormControl
        autoFocus
        type="text"
        value={username}
        onChange={e => setUserName(e.target.value)}
    />
    </FormGroup>
    <FormGroup controlId="password" >
    <FormLabel>Contraseña </FormLabel>
    <FormControl
        value={password}
        onChange={e => setPassword(e.target.value)}
        type="password"
    />
    </FormGroup>
    <Button block disabled={!validateFormFields()} type="submit">
    Acceder
    </Button>
    </form>
    </div>
    );
}
render(<Login />, document.getElementById('root'));