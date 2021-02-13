import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Auth } from "aws-amplify";
import { useAppContext} from "../../libs/contextLib";
import { useFormFields} from "../../libs/hooksLib";
import "./Login.css";
import {useHistory} from "react-router";

export default function Login() {
    const history = useHistory();
    const { userHasAuthenticated } = useAppContext();
    const [fields, handleFieldChange] = useFormFields({
        username: "",
        password: ""
    });

    function formIsValid() {
        return fields.username.length > 0 && fields.password.length > 0;
    }

    function handleSubmit(event) {
        event.preventDefault();
        Auth.signIn(fields.username, fields.password)
            .then(() => {
                userHasAuthenticated(true);
                history.push("/app");
            })
            .catch(err => alert(err.message));
    }

    return (
        <div className="Login">
            <Form onSubmit={handleSubmit}>
                <Form.Group size="lg" controlId="username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control autoFocus type="text" value={fields.username} onChange={handleFieldChange}/>
                </Form.Group>
                <Form.Group size="lg" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" value={fields.password} onChange={handleFieldChange}/>
                </Form.Group>
                <Button block size="lg" type="submit" disabled={! formIsValid()}>Login</Button>
            </Form>
        </div>
    );
}
