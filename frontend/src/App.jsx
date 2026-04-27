import { useState } from "react";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import HomePage from "./pages/customer/HomePage";

export default function App() {
  const [page, setPage] = useState("login");

  if (page === "register") {
    return <Register setPage={setPage} />;
  }

  if (page === "forgot-password") {
    return <ForgotPassword setPage={setPage} />;
  }

  if (page === "reset-password") {
    return <ResetPassword setPage={setPage} />;
  }

  if (page === "homepage") {
  return <HomePage />;
}

  return <Login setPage={setPage} />;
}