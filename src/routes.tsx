import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "./features/auth/pages/register.tsx";
import App from "./App.tsx";
import Login from "./features/auth/pages/login.tsx";
import Admin from "./features/admin/pages/admin.tsx";
import AdminLayout from "./features/admin/components/layout/admin-layout.tsx";
import EmailConfirmation from "./features/auth/pages/email-confirmation.tsx";
import InviteEmployee from "./features/auth/pages/invite-employee.tsx";
import OrgDetails from "./features/auth/pages/org-details.tsx";
import AcceptInvitation from "./features/auth/pages/accept-invitation.tsx";
import CreateLeaveType from "./features/admin/pages/create-leave-type.tsx";
import LeaveList from "./features/employee/pages/leave-list.tsx";
import ApplyLeave from "./features/employee/pages/apply-leave.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/invitation",
    element: <AcceptInvitation />,
  },
  {
    path: "/verification",
    element: <EmailConfirmation />,
  },
  {
    path: "/verification",
    element: <EmailConfirmation />,
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        element: <Admin />,
        index: true,
      },
      {
        path: "invite",
        element: <InviteEmployee />,
      },
      {
        path: "org-details",
        element: <OrgDetails />,
      },
      {
        path: "create-leave-type",
        element: <CreateLeaveType />,
      },
    ],
    // path: "/",
    // element: ,
  },
  {
    path: "/employee",
    // element: <LeaveList />,
    children: [
      {
        element: <LeaveList />,
        index:true,
      },
      {
        element: <ApplyLeave />,
        path: "apply-leave",
      },
    ],
  },
]);

const Routes = () => {
  return <RouterProvider router={router} />;
};

export default Routes;
