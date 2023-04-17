import { useSelector } from "react-redux";

import { RootState } from "../stores";

import Redirect from "./Redirect";

const StaffMiddleware = () => {
    const { auth } = useSelector((state: RootState) => ({ ...state }));
    return <Redirect />;
};

export default StaffMiddleware;
