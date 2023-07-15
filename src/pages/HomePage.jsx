import React from "react";
import { useLoaderData } from "react-router-dom";
import axios from "axios";
import CocktailsList from "../components/CocktailsList";
import SearchForm from "../components/SearchForm";

// API URL
const cocktailsURL =
  "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";

import { useQuery } from "@tanstack/react-query";

const searchCocktailsQuery = (searchTerm) => {
  return {
    queryKey: ["search", searchTerm || "all"],
    queryFn: async () => {
      const response = await axios.get(`${cocktailsURL}${searchTerm}`);
      return response.data.drinks;
    },
  };
};

// loader function
export const loader =
  (queryClient) =>
  async ({ request }) => {
    const url = new URL(request.url);
    const searchTerm = url.searchParams.get("search") || "";
    await queryClient.ensureQueryData(searchCocktailsQuery(searchTerm));
    return { searchTerm };
  };

const HomePage = () => {
  const { searchTerm } = useLoaderData();
  const { data: drinks } = useQuery(searchCocktailsQuery(searchTerm));
  return (
    <>
      <SearchForm searchTerm={searchTerm} />
      <CocktailsList drinks={drinks} />
    </>
  );
};

export default HomePage;
