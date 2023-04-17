import React, { Suspense, useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Spinner from "./components/Spinner";
import DashboardLayout from "./layouts/dashboard";
import PublicLayout from "./layouts/public";
import AdminMiddleware from "./middlewares/AdminMiddleware";
// import StaffMiddleware from "./middlewares/StaffMiddleware";
import RouteAdmin from "./routes/admin";
import RoutePublic from "./routes/public";
// import RouteStaff from "./routes/staff";
import { storeLogin } from "./stores/features/auth";
import { useMeMutation } from "./stores/services/userApi";

interface Props {}

const App: React.FC<Props> = () => {
    const dispatch = useDispatch();
    const [getMe] = useMeMutation({});

    const handleGetMe = async () => {
        const { data }: any = await getMe({});
        if (data && data.status === "success" && data.user) {
            dispatch(storeLogin(data.user));
        }
    };

    useEffect(() => {
        let token = window.localStorage.getItem(
            import.meta.env.VITE_APP_LOCAL_TOKEN
        );
        if (token) {
            handleGetMe();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <BrowserRouter basename="/">
            <Suspense fallback={<Spinner />}>
                <Routes>
                    <Route path="*" element={<Navigate to="/" />} />

                    <Route element={<PublicLayout />}>
                        <Route path="/">
                            {RoutePublic.length > 0 &&
                                RoutePublic.map((r, x) =>
                                    r.path ? (
                                        <Route
                                            key={r.name + x}
                                            path={r.path}
                                            element={<r.component />}
                                        />
                                    ) : null
                                )}
                        </Route>
                    </Route>

                    <Route element={<DashboardLayout />}>
                        <Route element={<AdminMiddleware />} path="/dashboard">
                            {RouteAdmin.length > 0 &&
                                RouteAdmin.map(
                                    (r, x) =>
                                        r.path && (
                                            <Route
                                                key={r.name + x}
                                                path={r.path}
                                                element={<r.component />}
                                            />
                                        )
                                )}
                        </Route>
                    </Route>
                </Routes>
            </Suspense>
        </BrowserRouter>
    );
};

export default App;
