import { useMutation, useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import usePagination from "../../hooks/usePagination";
import Pagination from "../../shared/Pagination/Pagination";
import Loading from "../../shared/Loading/Loading";

const TeacherRequest = () => {
  const { get, patch } = useAxiosSecure();
  const { user, setItemsPerPage, setCurrentPage, setNumberOfPages, setSelected } = useAuth();

  const { data: teacherRequest = [], isLoading, refetch } = useQuery({
    queryKey: ["teacherRequest"],
    queryFn: async () =>
      await get(`/teacherRequest?email=${user.email}`).then((res) => {
        setCurrentPage(1);
        setItemsPerPage(5);
        setSelected(5);
        const pageNumber = Math.ceil(res.data.length / 5);
        setNumberOfPages(pageNumber);
        return res.data;
      }),
    refetchOnWindowFocus: false,
  });

  const { paginatedData } = usePagination(teacherRequest);

  const patchMutation = useMutation({
    mutationFn: (requestData) =>
      patch(`/teacherStatus?teacherId=${requestData.id}&email=${user.email}`, {
        status: requestData.status,
      }),
    onSuccess: () => {
      Swal.fire({
        title: "Accepted!",
        text: "Teacher request has been accepted successfully.",
        icon: "success",
      });
      refetch();
    },
    onError: (err) => {
      Swal.fire({
        title: "Failed",
        text: `${err.message}`,
        icon: "error",
      });
    },
  });

  if (isLoading) return <Loading />;

  const handleStatus = (id, status) => {
    patchMutation.mutate({ id, status });
  };

  let i = 1;

  return (
    <div className="w-full lg:w-[90%] md:p-1 lg:p-4 space-y-2">
      <title>Teacher Request</title>
      <div className="overflow-x-auto items-start rounded-box border border-base-content/5 bg-base-100">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>Sl No.</th>
              <th>Name</th>
              <th>Image</th>
              <th>Experience</th>
              <th>Tittle</th>
              <th>Category</th>
              <th>Status</th>
              <th>Approve</th>
              <th>Reject</th>
            </tr>
          </thead>
          <tbody>
            {/* row */}
            {paginatedData?.map((data) => (
              <tr>
                <th>{i++}</th>
                <td className="text-sm md:text-md text-wrap">{data.name}</td>
                <td>
                  <img
                    className="rounded-full w-[45%] h-[45%]"
                    src={data.image}
                    alt=""
                  />
                </td>
                <td className="text-sm md:text-md text-wrap">
                  {data.experience}
                </td>
                <td className="lg:w-[10%]">{data.title}</td>
                <td>{data.category}</td>
                <td>{data.status}</td>
                <td>
                  <button
                    disabled={
                      data.status === "accepted" || data.status === "rejected"
                    }
                    className="btn text-sm"
                    onClick={() => {
                      handleStatus(data.userId, "accepted");
                    }}
                  >
                    Approve
                  </button>
                </td>
                <td>
                  <button
                    className="btn text-sm"
                    disabled={
                      data.status === "accepted" || data.status === "rejected"
                    }
                    onClick={() => handleStatus(data.userId, "rejected")}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination />
    </div>
  );
};

export default TeacherRequest;
