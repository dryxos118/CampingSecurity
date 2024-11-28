import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const SharedLayout = ({ userId, setUserId }) => {
  return (
    <>
      <Navbar userId={userId} setUserId={setUserId} />
      <Outlet />
    </>
  );
};

export default SharedLayout;
