import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import ClassCard from "./ClassCard/ClassCard";
import usePagination from "../../hooks/usePagination";
import Pagination from "../../shared/Pagination/Pagination";
import Loading from "../../shared/Loading/Loading";

const Class = () => {
  const { get } = useAxiosPublic();

  const {
    data: Classes = [],
    error,
    isLoading,
  } = useQuery({
    queryKey: ["class"],
    queryFn: async () =>
      await get("/allClasses")
        .then((res) => res.data)
        .catch((err) => console.log(err)),
    refetchOnWindowFocus: false,
  });

  const { paginatedData } = usePagination(Classes);

  const { data: paginated = [] } = useQuery({
    queryKey: ["paginated", paginatedData],
    queryFn: () => paginatedData,
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <Loading />;

  if (error) return <p>Error</p>;

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-5">
        <title>All Classes</title>
        {paginated?.map((cl) => (
          <ClassCard key={cl._id} data={cl} />
        ))}
      </div>
      <Pagination />
    </div>
  );
};

export default Class;
