import React, { useState } from "react";
import UserService from '../Services/UserService';

class UserComponent extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            users:[]
        }
    }

    componentDidMount(){
        UserService.getUsers().then((response) => {
            this.setState({ users: response.data})
        });
    }

    render () {
        return(
            <div>
                <h1 className = "text-center"> Users List</h1>
                <table className = "table table-striped">
                    <thead>
                    <tr>
                        <td> Id</td>
                        <td> Nombre de Usuario</td>
                        <td> Nombre Real</td>
                        <td> Apellido</td>
                        <td> Segundo Apellido</td>
                        <td> Email</td>
                        <td> Activo </td>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.users.map(
                            user =>
                                <tr key = {user.id}>
                                    <td> {user.id}</td>
                                    <td> {user.username}</td>
                                    <td> {user.name}</td>
                                    <td> {user.lastName}</td>
                                    <td> {user.secondLastName}</td>
                                    <td> {user.email}</td>
                                    <td> {"true"}</td>
                                </tr>
                        )
                    }
                    </tbody>
                </table>
            </div>
        )
    }
}
export default UserComponent