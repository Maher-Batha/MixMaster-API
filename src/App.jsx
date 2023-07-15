import { Form, RouterProvider, createBrowserRouter } from "react-router-dom";
import {
  HomeLayout,
  HomePage,
  AboutPage,
  Cocktail,
  ErrorPage,
  SinglePageError,
} from "./pages";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { loader as HomePageLoader } from "./pages/HomePage";
import { loader as singleCocktailLoader } from "./pages/Cocktail";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 60,
    },
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        loader: HomePageLoader(queryClient),
        errorElement: <SinglePageError />,
        element: <HomePage />,
      },
      {
        path: "about",
        element: <AboutPage />,
      },
      {
        path: "cocktails/:id",
        errorElement: <SinglePageError />,
        loader: singleCocktailLoader(queryClient),
        element: <Cocktail />,
      },
    ],
  },
]);

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};
export default App;
