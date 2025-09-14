import useAuth from "./useAuth";
import { useQuery } from "@tanstack/react-query";

const usePagination = (data) => {
  const { itemsPerPage, setNumberOfPages, currentPage } = useAuth();


  const { data: paginatedData } = useQuery({
    queryKey: ["pagination", itemsPerPage, currentPage],
    queryFn: () => {
      const total = Math.ceil(data.length / itemsPerPage);
      setNumberOfPages(total);
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      return data.slice(startIndex, endIndex);
    },
    refetchOnWindowFocus: false,
  });

  return { paginatedData };
};

export default usePagination;
