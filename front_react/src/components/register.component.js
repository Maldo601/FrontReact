import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import AuthService from "../services/auth.service";

const required = value => {
    if(!value) {
        return (
            <div className="alert alert-danger" role="alert">
                ¡ Este campo es obligatorio ! 
            </div>
        );
    }
};
// TODO: Añadir libreria validator en el upgrade a React 18
/** 
const email = value => {
        return (
            <div className="alert alert-danger" role="alert">
                Este email no es válido.
            </div>
        );
};
*/
const vpassword = value => {
    if(value.length < 6 || value.length > 24) {
        return (
            <div className="alert alert-danger" role="alert">
                La contraseña debe contener entre 6 y 24 caracteres
            </div>
        );
    }
};

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.handleRegister = this.handleRegister.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.onChangeSecondLastName = this.onChangeSecondLastName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);

        this.state = {
            name: "",
            lastname: "",
            secondlastname: "",
            email: "",
            password: "",
            successful: false,
            message: ""
        };
    }

    onChangeName(e) {
        this.setState({
            name: e.target.value
        });
    }

    onChangeLastName(e) {
        this.setState({
            lastname: e.target.value
        });
    }

    onChangeSecondLastName(e) {
        this.setState({
            secondlastname: e.target.value
        });
    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        });
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }

    handleRegister(e){
        e.preventDefault();

        this.setState({
            message: "",
            successful: false
        });

        this.form.validateAll();
        

        if(this.checkBtn.context._errors.length === 0) {
            AuthService.register(
                this.state.name,
                this.state.lastname,
                this.state.secondlastname,
                this.state.email,
                this.state.password
            ).then(
                // TODO: Enviar message desde Backend, redirigir al Login despues de 5 segundos.
                response => {
                    this.setState({
                        message: response.data.message,
                        successful: true
                    });
                },
                error => {
                    // TODO: Enviar message desde Backend
                    const resMessage = 
                    (error.response && error.response.data && error.response.data.message)
                    || error.message || error.toString();

                    this.setState({
                        successful: false,
                        message: resMessage
                    });
                }
            );
        }
    }

    // Aplicar Componentes Propios y vincular a CSS 
    render () {
        return (
            <div className="col-md-12" > 
                <div className="card card-container" >
                    <img src="https://cdn-icons-png.flaticon.com/512/5087/5087579.png"
                         className="profile-img-card"
                         style={{
                             width: '20%', 
                             marginLeft: '40%',
                             borderRadius: '200px' }}
                    />

                    <Form 
                        onSubmit={this.handleRegister}
                        style={{backgroundColor: "whitesmoke"}}
                        ref={c => {
                            this.form = c;
                        }}
                    >
                    {!this.state.successful && (
                        <div>
                            <div className="form-group">
                                <label htmlFor="name">Nombre</label>
                                <Input
                                    type="text"
                                    className="form-control"
                                    value={this.state.name}
                                    onChange={this.onChangeName}
                                    validations={[required]}
                            />
                            </div>

                            <div className="form-group">
                                <label htmlFor="lastname">Primer Apellido</label>
                                <Input
                                    type="text"
                                    className="form-control"
                                    value={this.state.lastname}
                                    onChange={this.onChangeLastName}
                                    validations={[required]}
                            />
                            </div>

                            <div className="form-group">
                                <label htmlFor="secondlastname">Segundo Apellido</label>
                                <Input
                                    type="text"
                                    className="form-control"
                                    value={this.state.secondlastname}
                                    onChange={this.onChangeSecondLastName}
                            />
                            </div>

                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <Input
                                    type="text"
                                    className="form-control"
                                    value={this.state.email}
                                    onChange={this.onChangeEmail}
                                    validations={[required]}
                            />
                            </div>

                            <div className="form-group">
                                <label htmlFor="password">Contraseña</label>
                                <Input
                                    type="text"
                                    className="form-control"
                                    value={this.state.password}
                                    onChange={this.onChangePassword}
                                    validations={[required, vpassword]}
                            />
                            </div>

                            <div className="form-group">
                                <button className="btn btn-primary btn-block">Registrarse</button>
                            </div>
                        </div>
                    )}

                   {this.state.message && (
                    <div className="form-group">
                        <div className={
                            this.state.successful
                                ? "alert alert-success"
                                : "alert alert-danger"
                        }
                        role="alert"
                        >
                        {this.state.message}
                    </div>
                </div>
            )}
            <CheckButton
              style={{ display: "none" }}
              ref={c => {
                this.checkBtn = c;
              }}
            />
          </Form>
        </div>
      </div>
    );
  }
}