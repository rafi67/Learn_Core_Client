import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import MyClassCard from "./MyClassCard/MyClassCard";
import usePagination from "../../hooks/usePagination";
import Pagination from "../../shared/Pagination/Pagination";
import Loading from "../../shared/Loading/Loading";

const MyClass = () => {
  const { get } = useAxiosSecure();
  const {
    user,
    setItemsPerPage,
    setCurrentPage,
    setNumberOfPages,
    setSelected,
  } = useAuth();
 
  const { data: myClass = [], isLoading } = useQuery({
    queryKey: ["myClass"],
    queryFn: async () =>
      await get(`/myClass?email=${user.email}`).then((res) => {
        setCurrentPage(1);
        setItemsPerPage(5);
        setSelected(5);
        const pageNumber = Math.ceil(res.data.length / 5);
        setNumberOfPages(pageNumber);
        return res.data;
      }),
    refetchOnWindowFocus: false,
  });

  const { paginatedData } = usePagination(myClass);

  if (isLoading) return <Loading />;

  return (
    <div className="p-2">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-5">
        <title>My Class</title>
        {paginatedData?.map((data) => (
          <MyClassCard key={data._id} data={data} />
        ))}
      </div>
      <Pagination/>
    </div>
  );
};

export default MyClass;
