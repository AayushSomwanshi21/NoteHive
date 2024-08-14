import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom'

const Login = (props) => {

    const [credentials, setCredentials] = useState({ email: "", password: "" })
    const navigate = useNavigate()

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json = await response.json();
        //console.log(json.success, json.authtoken);
        if (json.success) {
            // redirect to Homepage
            localStorage.setItem('token', json.authtoken)
            navigate("/")
            props.showAlert("Successful", "success");
        }
        else {
            props.showAlert("Invalid Credentials", "danger");
        }
    }
    return (
        <Form onSubmit={handleSubmit} >
            <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" name="email" id='email' placeholder="Enter email" onChange={onChange} value={credentials.email} />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" name='password' id='password' placeholder="Password" onChange={onChange} value={credentials.password} />
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    );
}

export default Login;