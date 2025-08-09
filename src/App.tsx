import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import AppHome from "./pages/AppHome";
import DebugAuth from "./pages/DebugAuth"; // ← ekledik

const router = createBrowserRouter([
  { path: "/", element: <AuthPage /> },
  { path: "/app", element: <AppHome /> },
  { path: "/debug", element: <DebugAuth /> }, // ← yeni route
]);

export default function App() {
  return <RouterProvider router={router} />;
}
