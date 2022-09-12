import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import "./adminRegister.css";
import { CircularProgress } from "@mui/material";
import { adminActions } from "../../store/adminstore/AdminSlice";
import { registerAdmin } from "../../store/adminstore/AdminAction";
import { useNavigate } from "react-router-dom";

function AdminRegister() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { adminButtonLoader, adminCreated, adminLoggedStatus } = useSelector(
    (state) => state.admin
  );
  const { loggedStatus } = useSelector((state) => state.user);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (adminCreated) {
      setName("");
      setEmail("");
      setPassword("");
      dispatch(adminActions.updateAdminCreatedValue());
      navigate("/auth");
    }
  }, [adminCreated, navigate, dispatch]);

  useEffect(() => {
    if (adminLoggedStatus) {
      navigate("/admin");
    } else if (loggedStatus) {
      navigate("/");
    }
  }, [navigate, adminLoggedStatus, loggedStatus]);

  const registerHandler = () => {
    dispatch(adminActions.updateAdminButtonLoaderValue());
    dispatch(
      registerAdmin({
        name: name,
        email: email,
        password: password,
        role: "admin",
      })
    );
  };

  return (
    <div className="adminregister-wrapper">
      <div className="admincontainer">
        <h1>Admin Registration</h1>
        <div className="form">
          <TextField
            id="outlined-basic"
            label="Full name"
            variant="outlined"
            fullWidth
            autoComplete="off"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Email address"
            variant="outlined"
            fullWidth
            autoComplete="off"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Password"
            variant="outlined"
            fullWidth
            autoComplete="off"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {adminButtonLoader ? (
            <CircularProgress />
          ) : (
            <Button onClick={registerHandler} variant="contained">
              Register
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminRegister;
