import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import MainLayout from "./layout/HomeLayout/HomeLayout";
import CreateCandidateForm from "./pages/CreateCandidate/CreateCandidate";
import Login from "./pages/Login/Login";
import UpdateCandidateForm from "./pages/UpdateCandidate/UpdateCandidate";
import Search from "./pages/Search/Search";

export default function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <MainLayout />,
      children: [
        { index: true, element: <Home /> },
        { path: 'create', element: <CreateCandidateForm /> },
        { path: 'update', element: <UpdateCandidateForm /> },
        { path: 'login', element: <Login /> },
        { path: 'search', element: <Search /> },
      ]
    },
  ]);
  
  return <RouterProvider router={router}></RouterProvider>;
}