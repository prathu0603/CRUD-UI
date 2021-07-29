import React, { useState, useEffect } from "react";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";

const Edit = () => {
  const { id } = useParams();
  const initialValue = {
    name: "",
    email: "",
    job: "",
  };
  const [user, setUser] = useState(initialValue);
  const { name, email, job } = user;

  const LoadUsers = async () => {
    const response = await fetch(`https://crud-api-1.herokuapp.com/edit/${id}`);
    const data = await response.json();

    setUser(data);
  };

  useEffect(() => {
    LoadUsers();
  }, []);

  const onValueChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const editUserDetails = async () => {
    const res = await fetch(`https://crud-api-1.herokuapp.com/edit/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        job,
      }),
    });

    if (res.status === 200) {
      toast.success("User Updated", {
        position: "top-right",
      });
    } else {
      toast.error("Server Error, Refresh", {
        position: "top-right",
      });
    }
  };
  return (
    <div>
      <Container>
        <Form>
          <h3>Edit An User</h3>
          <br />
          <Row>
            <Col>
              <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  onChange={(e) => onValueChange(e)}
                  type="text"
                  name="name"
                  value={name}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  onChange={(e) => onValueChange(e)}
                  type="email"
                  name="email"
                  value={email}
                />
              </Form.Group>
            </Col>
          </Row>
          <br />
          <Row>
            <Form.Group>
              <Form.Label>Job</Form.Label>
              <Form.Control
                onChange={(e) => onValueChange(e)}
                type="text"
                name="job"
                value={job}
              />
            </Form.Group>
          </Row>
          <br />
          <Button onClick={editUserDetails} variant="warning">
            Update
          </Button>
        </Form>
      </Container>

      <ToastContainer />
    </div>
  );
};

export default Edit;
