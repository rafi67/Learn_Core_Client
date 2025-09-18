import { useState } from "react";
import useAuth from "./useAuth";
import { useQuery } from "@tanstack/react-query";

const usePagination = (data) => {
  const { setPaginatedData } = useAuth();

  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [numberOfPages, setNumberOfPages] = useState(null);
  const [selected, setSelected] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  useQuery({
    queryKey: ["paginatedData", data, itemsPerPage, currentPage],
    queryFn: () => {
      const total = Math.ceil(data.length / itemsPerPage);
      if (total < currentPage) setCurrentPage(1);
      setNumberOfPages(total);
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      setPaginatedData(data.slice(startIndex, endIndex));
      return [];
    },
    refetchOnWindowFocus: false,
  });
  return {
    numberOfPages,
    setItemsPerPage,
    setCurrentPage,
    setSelected,
    selected,
  };
};

export default usePagination;
