import { createBrowserRouter } from "react-router";
import { RootLayout } from "./components/RootLayout";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Programs } from "./pages/Programs";
import { GetInvolved } from "./pages/GetInvolved";
import { Impact } from "./pages/Impact";
import { Contact } from "./pages/Contact";
import { Donate } from "./pages/Donate";
import { ThankYou } from "./pages/ThankYou";
import { Login } from "./pages/auth/Login";
import { Signup } from "./pages/auth/Signup";
import { Dashboard } from "./pages/donor/Dashboard";
import { AdminPanel } from "./pages/admin/AdminPanel";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: Home },
      { path: "about", Component: About },
      { path: "programs", Component: Programs },
      { path: "get-involved", Component: GetInvolved },
      { path: "impact", Component: Impact },
      { path: "contact", Component: Contact },
      { path: "donate", Component: Donate },
    ],
  },
  // Auth routes (no layout)
  { path: "/auth/login", Component: Login },
  { path: "/auth/signup", Component: Signup },

  // Donor portal
  { path: "/donor/dashboard", Component: Dashboard },

  // Thank you page
  { path: "/thank-you", Component: ThankYou },

  // Admin panel
  { path: "/admin", Component: AdminPanel },
]);
