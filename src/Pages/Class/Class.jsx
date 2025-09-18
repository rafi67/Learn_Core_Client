import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import ClassCard from "./ClassCard/ClassCard";
import Pagination from "../../shared/Pagination/Pagination";
import Loading from "../../shared/Loading/Loading";
import useAuth from "../../hooks/useAuth";

const Class = () => {
  const { get } = useAxiosPublic();
  const { paginatedData } = useAuth();

  const { data: Classes = [], isLoading } = useQuery({
    queryKey: ["class"],
    queryFn: async () =>
      await get("/allClasses")
        .then((res) => res.data)
        .catch((err) => console.log(err)),
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <Loading />;

  return (
    <div className="mb-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-5">
        <title>All Classes</title>
        {paginatedData?.map((cl) => (
          <ClassCard key={cl._id} data={cl} />
        ))}
      </div>
      <Pagination data={Classes} />
    </div>
  );
};

export default Class;
