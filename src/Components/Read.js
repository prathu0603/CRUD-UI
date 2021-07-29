import React, { useState, useEffect } from "react";
import { Table, Container, Form, Row, Col, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Read = () => {
  let i = 1;
  const history = useHistory();
  const [userData, setUserData] = useState([]);
  const LoadUsers = async () => {
    const response = await fetch("https://crud-api-1.herokuapp.com/users");
    const data = await response.json();
    setUserData(data);
  };

  useEffect(() => {
    LoadUsers();
  }, []);
  const EditUser = (e) => {
    e.preventDefault();
    const id = e.target.id;
    history.push(`/edit/${id}`);
  };
  const DeleteUser = async (e) => {
    const id = e.target.id;
    const res = await fetch(`https://crud-api-1.herokuapp.com/edit/${id}`, {
      method: "DELETE",
    });
    if (res.status === 200) {
      window.alert("User Deleted");
      window.location.reload();
    } else {
      toast.error("Server Error, Refresh", {
        position: "top-right",
      });
    }
  };
  return (
    <div>
      {userData.length !== 0 ? (
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th> `:)` </th>
              <th>Name</th>
              <th>Email</th>
              <th>Job</th>
              <th>Edit </th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {userData.length === 0 ? (
              <h3>Loading...</h3>
            ) : (
              <>
                {userData.map(({ _id, name, email, job }) => (
                  <tr>
                    <td>{i}</td>
                    <td>{name}</td>
                    <td>{email}</td>
                    <td>{job}</td>
                    <td>
                      <Button
                        id={_id}
                        onClick={EditUser}
                        variant="outline-warning"
                      >
                        Edit
                      </Button>
                    </td>
                    <td>
                      <Button
                        id={_id}
                        onClick={DeleteUser}
                        variant="outline-danger"
                      >
                        Delete
                      </Button>
                    </td>
                    {(i = i + 1)}
                  </tr>
                ))}
              </>
            )}
          </tbody>
        </Table>
      ) : (
        <Container className="mt-5 ">
          <h2>Create Some Users .....</h2>
        </Container>
      )}

      <ToastContainer />
    </div>
  );
};

export default Read;
