import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import ClassCard from "./ClassCard/ClassCard";
import Pagination from "../../shared/Pagination/Pagination";
import Loading from "../../shared/Loading/Loading";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";

const Class = () => {
  const { get } = useAxiosPublic();
  const { paginatedData, searchClass } = useAuth();

  const {
    data: Classes = [],
    isLoading,
    isFetched,
  } = useQuery({
    queryKey: ["class", searchClass],
    queryFn: async () =>
      await get(`/allClasses?search=${searchClass}`)
        .then((res) => res.data)
        .catch((err) =>
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${err.message}`,
            showConfirmButton: false,
            timer: 1500,
          })
        ),
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <Loading />;

  if (isFetched && !Classes.length)
    return (
      <img
        className="w-screen h-screen"
        src="https://i.ibb.co.com/mVrbjd7G/59563768-9318688.jpg"
      />
    );

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
