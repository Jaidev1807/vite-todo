import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";

import UseUser from "../api/useUser";
function Addlist() {
  const [getThedata, setGetTheData] = useState([]);
  const [user, setUser] = useState({
    id: Math.random * 1000,
    todo: "",
  });

  const { id, todo } = user;
  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:3003/data", user);
    window.location.reload(1);
  };

  useEffect(() => {
    try {
      axios.get("http://localhost:3003/data").then((res) => {
        console.log(res.data);
        setGetTheData(res?.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const deleteList = (id) => {
    console.log("--->", id);
    let deletedthedata = axios.delete(`http://localhost:3003/data/${id}`);
    if (deletedthedata) {
      setTimeout(function () {
        window.location.reload(1);
      }, 1000);
    }
  };

  return (
    <>
      <div align="center">
        <label>TODO :</label>
        <input
          type="text"
          name="todo"
          placeholder="Enter your to do work here"
          onChange={(e) => onInputChange(e)}
        />
        <Button onClick={onSubmit} variant="primary" sx={{ ml: 10 }}>
          Add
        </Button>
      </div>
      <div>
        <table align="center" border="1" cellPadding="20px">
          <tr>
            <th scope="col">Sr.No.</th>
            <th scope="col">TODO tasks</th>
            <th scope="col">Actions</th>
          </tr>

          {
            <tbody>
              {getThedata?.map((d, index) => (
                <tr>
                  <th scope="row" key={index}>
                    {index + 1}
                  </th>
                  <td>{d.todo}</td>
                  <td>
                    <Button
                      variant="outlined"
                      sx={{ bgcolor: "maroon", color: "#fff", ml: 2 }}
                      onClick={() => {
                        deleteList(d.id);
                      }}
                    >
                      Delete
                    </Button>
                    <input type="checkbox" />
                  </td>
                </tr>
              ))}
            </tbody>
          }
        </table>
      </div>
    </>
  );
}
export default Addlist;
