import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const PRIMARY_COLOR = "rgb(62, 158, 97)";
const SECONDARY_COLOR = "#0c0c1f";
const url = `${process.env.REACT_APP_BACKEND_SERVER_URI}/user/signup`;
const Register = () => {
  const [data, setData] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const [bgColor] = useState(SECONDARY_COLOR);
 

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  
  let labelStyling = {
    color: PRIMARY_COLOR,
    fontWeight: "bold",
    textDecoration: "none",
  };
  
  let buttonStyling = {
    background: PRIMARY_COLOR,
    borderStyle: "none",
    color: bgColor,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(url, data);
      const {accessToken} = res.data;

      navigate("/login");
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <>
      <section className="vh-100">
        <div className="container-fluid h-custom vh-100">
          <div
            className="row d-flex justify-content-center align-items-center h-100 "
          >
            <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
              <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label style={labelStyling}>Username</Form.Label>
                  <Form.Control
                    type="username"
                    name="username"
                    onChange={handleChange}
                    placeholder="Enter username"
                  />
                  <Form.Text className="text-muted">
                    Enter a unique username here
                  </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label style={labelStyling}>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    onChange={handleChange}
                    placeholder="Enter Email Please"
                  />
                  <Form.Text className="text-muted">
                    Enter a valid email address here
                  </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label style={labelStyling}>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                  />
                  <Form.Text className="text-muted">
                    8 digits and contains a special character
                  </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Form.Text className="text-muted pt-1">
                    Already have an account?
                    <span>
                      <Link to="/login" style={labelStyling}> Log in
                      </Link>
                    </span>
                    <br/>
                    <span>
                      <Link to="/privateUserProfile" style={labelStyling}> continue as guest
                      </Link>
                    </span>
                  </Form.Text>
                  
                </Form.Group>
                
                
                {error && (
                  <div style={labelStyling} className="pt-3">
                    {error}
                  </div>
                )}
                <Button
                  variant="primary"
                  type="submit"
                  onClick={handleSubmit}
                  style={buttonStyling}
                  className="mt-2"
                >
                  Register
                </Button>
              </Form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Register;
