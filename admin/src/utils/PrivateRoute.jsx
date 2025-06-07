import React from "react";
import { Navigate} from "react-router-dom";
import Dashboard from "../pages/Dashboard";

const ProtectedRoutes = () => {
	// TODO: Use authentication token
	const localStorageToken = localStorage.getItem("token");

	return localStorageToken ? <Dashboard /> : <Navigate to="/"  replace />;
};

export default ProtectedRoutes;