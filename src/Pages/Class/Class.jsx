import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import ClassCard from "./ClassCard/ClassCard";
import usePagination from "../../hooks/usePagination";
import Pagination from "../../shared/Pagination/Pagination";
import Loading from "../../shared/Loading/Loading";
import useAuth from "../../hooks/useAuth";

const Class = () => {
  const { get } = useAxiosPublic();
  const { setItemsPerPage, setCurrentPage, setNumberOfPages, setSelected } = useAuth();
  const queryClient = useQueryClient();
  const {
    data: Classes = [],
    error,
    isLoading,
  } = useQuery({
    queryKey: ["class"],
    queryFn: async () =>
      await get("/allClasses")
        .then((res) => {
          queryClient.removeQueries({
          queryKey: ["pagination"],
          exact: true,
        });
          setCurrentPage(1);
          setItemsPerPage(5);
          setSelected(5);
          const pageNumber = Math.ceil(res.data.length / 5);
          setNumberOfPages(pageNumber);
          return res.data;
        })
        .catch((err) => console.log(err)),
    refetchOnWindowFocus: false,
  });

  const { paginatedData } = usePagination(Classes);

  if (isLoading) return <Loading />;

  if (error) return <p>Error</p>;

  return (
    <div className="mb-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-5">
        <title>All Classes</title>
        {paginatedData?.map((cl) => (
          <ClassCard key={cl._id} data={cl} />
        ))}
      </div>
      <Pagination />
    </div>
  );
};

export default Class;
