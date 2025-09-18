import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import EnrollClassesCard from "./EnrollClassesCard/EnrollClassesCard";
import Loading from "../../shared/Loading/Loading";
import Pagination from "../../shared/Pagination/Pagination";

const MyEnrollClasses = () => {
  const { get } = useAxiosSecure();
  const { user, paginatedData } = useAuth();
  const { data: enrollClass = [], isLoading } = useQuery({
    queryKey: ["myEnrollClass"],
    queryFn: async () =>
      get(`/myEnrollClass?email=${user.email}`).then((res) => res.data),
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <Loading />;

  return (
    <div className="w-full md:w-[90%] mb-10 p-2">
      <div className="items-start w-full md:w-[90%] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-5">
        <title>My Enroll Classes</title>
        {paginatedData?.map((data) => (
          <EnrollClassesCard key={data._id} data={data} />
        ))}
      </div>
      <Pagination data={enrollClass} />
    </div>
  );
};

export default MyEnrollClasses;
