import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { loggedInAdminInfo } from "../../store/adminstore/AdminAction";
import MyComponent from "react-fullpage-custom-loader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./adminHome.css";
import LeftBar from "./LeftBar";
import RightBar from "./RightBar";

function AdminHome() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { page } = useParams();

  // const [adminPage, setAdminPage] = useState("");

  const { adminLoggedStatus, adminSessionExpired, loggedInAdminDetailsStatus } =
    useSelector((state) => state.admin);

  const { loggedStatus } = useSelector((state) => state.user);

  useEffect(() => {
    if (adminLoggedStatus) {
      dispatch(
        loggedInAdminInfo({ id: localStorage.getItem("adminLoggedId") })
      );
    } else if (!adminLoggedStatus && adminSessionExpired) {
      navigate("/auth");
    } else if (!adminLoggedStatus && loggedStatus) {
      navigate("/");
    } else {
      navigate("/auth");
    }
  }, [
    adminLoggedStatus,
    dispatch,
    navigate,
    loggedStatus,
    adminSessionExpired,
  ]);

  return (
    <>
      <ToastContainer
        position="top-center"
        hideProgressBar={true}
        autoClose={3000}
      />
      {!loggedInAdminDetailsStatus && adminLoggedStatus ? (
        <MyComponent />
      ) : (
        <>
          <div className="adminhome-wrapper">
            <div className="left-sidebar">
              <LeftBar />
            </div>
            <div className="right-content">
              <RightBar page={page} />
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default AdminHome;
