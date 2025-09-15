import { useEffect, useState } from "react";
import useAuth from "./useAuth";

const usePagination = (data) => {
  const { itemsPerPage, setNumberOfPages, currentPage, setCurrentPage } =
    useAuth();

    const [paginatedData, setPaginatedData] = useState(data);

    useEffect(() => {
       const total = Math.ceil(data.length / itemsPerPage);
      if (total < currentPage) setCurrentPage(1);
      setNumberOfPages(total);
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      setPaginatedData(data.slice(startIndex, endIndex));
    }, [itemsPerPage, currentPage, data, setCurrentPage, setNumberOfPages]);

  return { paginatedData };
};

export default usePagination;
