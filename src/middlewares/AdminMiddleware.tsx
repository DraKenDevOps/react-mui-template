import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { RootState } from "../stores";
import EditorMiddleware from "./StaffMiddleware";

const AdminMiddleware = () => {
    const { auth } = useSelector((state: RootState) => ({ ...state }));
    if (
        (auth && auth.isLogin && auth.role == "Admin") ||
        (auth && auth.isLogin && auth.role == "SuperAdmin")
    ) {
        return <Outlet />;
    }
    return <EditorMiddleware />;
};

export default AdminMiddleware;
