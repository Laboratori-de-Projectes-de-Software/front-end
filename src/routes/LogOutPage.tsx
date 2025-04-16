import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LogOutPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setTimeout(() => navigate("/"), 1000);
  }, [navigate]);

  return (
    <div className="min-h-screen flex justify-center items-center">
      <h1 className="text-xl font-bold">Logging out...</h1>
    </div>
  );
};

export default LogOutPage;