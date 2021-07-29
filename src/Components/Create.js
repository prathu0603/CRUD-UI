import React, { useState } from "react";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Create = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    job: "",
  });

  let name, value;

  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;

    setUser({ ...user, [name]: value });
  };

  const PostData = async (e) => {
    e.preventDefault();
    var tester =
      /^[-!#$%&'*+0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
    const { name, email, job } = user;

    if (!name || !email || !job) {
      toast.warn("Fill All Fields", {
        position: "top-right",
      });
    } else if (!tester.test(email)) {
      toast.warn("Check Email Format ", {
        position: "top-right",
      });
    } else {
      const data = await fetch("https://crud-api-1.herokuapp.com/create-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          job,
        }),
      });

      if (data.status === 500) {
        toast.error("Error, try to Refresh", {
          position: "top-right",
        });
      } else if (data.status === 200) {
        toast.success("User Created", {
          position: "top-right",
        });
      } else window.alert("Serious Issuesss");
    }
  };

  return (
    <div>
      <Container className="mt-5">
        <Form>
          <h3>Create An User</h3>
          <br />
          <Row>
            <Col>
              <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={user.name}
                  onChange={handleInputs}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={user.email}
                  onChange={handleInputs}
                />
              </Form.Group>
            </Col>
          </Row>
          <br />
          <Row>
            <Form.Group>
              <Form.Label>Job</Form.Label>
              <Form.Control
                type="text"
                name="job"
                value={user.job}
                onChange={handleInputs}
              />
            </Form.Group>
          </Row>
          <br />
          <Button type="submit" onClick={PostData} variant="success">
            Create
          </Button>
        </Form>
      </Container>
      <ToastContainer />
    </div>
  );
};

export default Create;
