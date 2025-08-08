import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import AppHome from "./pages/AppHome";

const router = createBrowserRouter([
  { path: "/", element: <AuthPage /> },
  { path: "/app", element: <AppHome /> },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
