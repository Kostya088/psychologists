import { type ReactNode } from "react";
import { useAuth } from "../../Hooks/useAuth";
import { Navigate } from "react-router-dom";

interface ProtecredRouteProps {
  children: ReactNode;
}

export default function ProtecredRoute({ children }: ProtecredRouteProps) {
  const { isLoading, user } = useAuth();

  if (isLoading) return <p>Loading session...</p>;

  if (user === null) {
    return <Navigate to="/" replace></Navigate>;
  }

  return children;
}
