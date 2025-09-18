import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import MyClassCard from "./MyClassCard/MyClassCard";
import Pagination from "../../shared/Pagination/Pagination";
import Loading from "../../shared/Loading/Loading";

const MyClass = () => {
  const { get } = useAxiosSecure();
  const {
    user,
    paginatedData
  } = useAuth();

  const { data: myClass = [], isLoading } = useQuery({
    queryKey: ["myClass"],
    queryFn: async () =>
      await get(`/myClass?email=${user.email}`).then((res) => {
        return res.data;
      }),
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <Loading />;

  return (
    <div className="p-2">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-5">
        <title>My Class</title>
        {paginatedData?.map((data) => (
          <MyClassCard key={data._id} data={data} />
        ))}
      </div>
      <Pagination data={myClass} />
    </div>
  );
};

export default MyClass;
