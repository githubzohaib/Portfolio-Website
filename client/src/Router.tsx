import { createBrowserRouter } from "react-router-dom";
import AppLayout from "./components/layouts/AppLayout";
import NoMatch from "./pages/NoMatch";
import Error500 from "./pages/Error500";
import Hero from "./components/layouts/Hero";
import AboutMe from "./components/layouts/AboutMe";
import Skills from "./components/layouts/Skills";
import Projects from "./components/layouts/Projects";
import Internship from "./components/layouts/Internship";
import HackExp from "./components/layouts/HackExp";
import Contact from "./components/layouts/Contact";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <AppLayout />,
      children: [
        {
          path: "/",
          element: <Hero />,
        },
        {
          path: "/about",
          element: <AboutMe />,
        },
        {
          path: "/skills",
          element: <Skills />,
        },
        {
          path: "/projects",
          element: <Projects />,
        },
        {
          path: "/internship",
          element: <Internship />,
        },
        {
          path: "/hackexp",
          element: <HackExp />,
        },
        {
          path: "/contact",
          element: <Contact />,
        },
      ],
    },
    {
      path: "/error",
      element: <Error500 />,
    },
    {
      path: "*",
      element: <NoMatch />,
    },
  ],
  {
    basename: global.basename,
  }
);