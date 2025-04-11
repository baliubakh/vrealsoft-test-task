import { Navigate, Outlet } from "react-router";
import { useAuthStore } from "../store/useAuthStore";
import { useEffect } from "react";

export const AuthGuard = () => {
  const { setUser, user } = useAuthStore();

  const localToken = localStorage.getItem("token");
  const localUser = localStorage.getItem("user");

  useEffect(() => {
    console.count("keke");
    if (localToken && localUser) {
      setUser(JSON.parse(localUser), localToken);
    }
  }, [localToken, localUser, setUser]);

  return localToken && localUser ? (
    <div style={{ padding: "2rem" }}>
      <h1>Welcome, {user?.name}</h1>
      <Outlet />
    </div>
  ) : (
    <Navigate to="/login" replace />
  );
};
