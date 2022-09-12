import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import loginPagePhoto from "../../static/images/loginPagePhoto.png";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import "./userLogin.css";
import { loginUser, registerUser } from "../../store/userstore/UserAction";
import { userActions } from "../../store/userstore/UserSlice";
import { CircularProgress } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import "react-toastify/dist/ReactToastify.css";
import { loginAdmin } from "../../store/adminstore/AdminAction";
import { adminActions } from "../../store/adminstore/AdminSlice";

function UserLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userCreated, userButtonLoader, loggedStatus, sessionExpired } =
    useSelector((state) => state.user);
  const { adminButtonLoader, adminLoggedStatus, adminSessionExpired } =
    useSelector((state) => state.admin);

  const [loginId, setLoginId] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [registerEmailId, setRegisterEmailId] = useState("");
  const [loginCheckbox, setLoginCheckbox] = useState(false);
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerName, setRegisterName] = useState("");
  const [loginOrRegister, setLoginOrRegister] = useState("login");

  useEffect(() => {
    if (userCreated) {
      setLoginOrRegister("login");
      setRegisterEmailId("");
      setRegisterPassword("");
      setRegisterName("");
      dispatch(userActions.updateUserCreatedValue());
    }
  }, [userCreated, dispatch]);

  useEffect(() => {
    if (sessionExpired || adminSessionExpired) {
      toast.error("Session Expired. Please login again");
    }
    dispatch(userActions.updateSessionExpiredValue());
    dispatch(adminActions.updateAdminSessionExpiredValue());
  }, [sessionExpired, dispatch, adminSessionExpired]);

  useEffect(() => {
    if (loggedStatus) {
      setLoginId("");
      setLoginPassword("");
      navigate("/");
    } else if (adminLoggedStatus) {
      setLoginId("");
      setLoginPassword("");
      setLoginCheckbox(false);
      navigate("/admin");
    }
  }, [loggedStatus, navigate, adminLoggedStatus]);

  const siginHandler = () => {
    if (loginCheckbox === true) {
      dispatch(adminActions.updateAdminButtonLoaderValue());
      dispatch(
        loginAdmin({
          email: loginId,
          password: loginPassword,
          role: "admin",
        })
      );
    } else {
      dispatch(userActions.updateUserButtonLoaderValue());
      dispatch(
        loginUser({
          email: loginId,
          password: loginPassword,
          role: "user",
        })
      );
    }
  };

  const registerHandler = () => {
    dispatch(userActions.updateUserButtonLoaderValue());
    dispatch(
      registerUser({
        name: registerName,
        email: registerEmailId,
        password: registerPassword,
        role: "user",
      })
    );
  };

  return (
    <>
      <ToastContainer
        position="top-center"
        hideProgressBar={true}
        autoClose={3000}
      />
      <div className="userlogin-wrapper">
        <div className="container">
          <img src={loginPagePhoto} alt="ecommerce" />
          {loginOrRegister === "login" ? (
            <div className="loginform">
              <h1 id="loginH1">Daily Needs</h1>
              <TextField
                id="outlined-basic"
                label="Email or mobile phone number"
                variant="outlined"
                fullWidth
                autoComplete="off"
                value={loginId}
                onChange={(e) => setLoginId(e.target.value)}
                style={{ margin: "25px 0 10px 0" }}
              />
              <br />
              <TextField
                type="password"
                id="outlined-basic"
                label="Password"
                variant="outlined"
                fullWidth
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                style={{ margin: "10px 0 20px 0" }}
              />
              <FormGroup>
                <FormControlLabel
                  onClick={() => setLoginCheckbox(!loginCheckbox)}
                  control={<Checkbox />}
                  label="Is Admin"
                />
              </FormGroup>
              {userButtonLoader || adminButtonLoader ? (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <CircularProgress />
                </div>
              ) : (
                <Button
                  style={{ margin: "5px 0 0 0" }}
                  variant="contained"
                  fullWidth
                  onClick={siginHandler}
                >
                  Sign In
                </Button>
              )}

              <p onClick={(e) => setLoginOrRegister("register")}>
                New to Daily Needs ? Create your account
              </p>
            </div>
          ) : (
            <div className="loginform">
              <h1 id="registerH1">Daily Needs</h1>

              <TextField
                id="outlined-basic"
                label="Email"
                variant="outlined"
                fullWidth
                autoComplete="off"
                value={registerEmailId}
                onChange={(e) => setRegisterEmailId(e.target.value)}
                style={{ margin: "25px 0 0 0" }}
              />
              <br />
              <TextField
                id="outlined-basic"
                label="Full name"
                variant="outlined"
                fullWidth
                value={registerName}
                onChange={(e) => setRegisterName(e.target.value)}
                style={{ margin: "10px 0 0 0" }}
                autoComplete="off"
              />
              <br />
              <TextField
                type="password"
                id="outlined-basic"
                label="Password"
                variant="outlined"
                fullWidth
                value={registerPassword}
                onChange={(e) => setRegisterPassword(e.target.value)}
                style={{ margin: "10px 0 20px 0" }}
              />
              {userButtonLoader ? (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <CircularProgress />
                </div>
              ) : (
                <Button
                  style={{ margin: "5px 0 0 0" }}
                  variant="contained"
                  fullWidth
                  onClick={registerHandler}
                  color="error"
                >
                  Register
                </Button>
              )}

              <p onClick={(e) => setLoginOrRegister("login")}>
                Already have an account ? Sign In
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default UserLogin;
