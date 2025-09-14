import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router";
import Swal from "sweetalert2";
import Loading from "../../shared/Loading/Loading";
import usePagination from "../../hooks/usePagination";
import Pagination from "../../shared/Pagination/Pagination";

const AllClasses = () => {
  const { get, patch } = useAxiosSecure();
  const { user, setItemsPerPage, setCurrentPage, setNumberOfPages, setSelected } = useAuth();
  const queryClient = useQueryClient();

  const { data: allCourses = [], isLoading } = useQuery({
    queryKey: ["allCourses"],
    queryFn: async () =>
      await get(`/allCourses?email=${user.email}`).then((res) => {
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
      }),
    refetchOnWindowFocus: false,
  });

  const {paginatedData} = usePagination(allCourses);

  const patchMutation = useMutation({
    mutationFn: (data) =>
      patch(`/classStatus?email=${user.email}&classId=${data.id}`, {
        status: data.action,
      }),
    onSuccess: () => {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Approved Successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      queryClient.invalidateQueries(["allCourses"]);
    },
    onError: (err) => {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: `${err.message}`,
        showConfirmButton: false,
        timer: 1500,
      });
    },
  });

  const handleSubmit = (action, id) => {
    patchMutation.mutate({ action, id });
  };

  let i = 1;

  if (isLoading) return <Loading />;

  return (
    <div className="w-full lg:w-[90%] md:p-1 lg:p-4 space-y-2">
      <div className="overflow-x-auto items-start rounded-box border border-base-content/5 bg-base-100">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>Sl No.</th>
              <th>Title</th>
              <th>Image</th>
              <th>Email</th>
              <th>Description</th>
              <th>Approved</th>
              <th>Reject</th>
              <th>Progress</th>
            </tr>
          </thead>
          <tbody>
            {/* row */}
            {paginatedData?.map((data) => (
              <tr>
                <th>{i++}</th>
                <td>{data.title}</td>
                <td>
                  <img
                    className="rounded-full w-[40px] h-[40px]"
                    src={data.imageUrl}
                    alt=""
                  />
                </td>
                <td>{data.email}</td>
                <td className="text-sm md:text-md text-wrap">
                  {data.description}
                </td>
                <td>
                  <button
                    disabled={
                      data.status === "accepted" || data.status == "rejected"
                    }
                    className="btn text-sm"
                    onClick={() => handleSubmit("accepted", data._id)}
                  >
                    Approve
                  </button>
                </td>
                <td>
                  <button
                    disabled={
                      data.status === "accepted" || data.status == "rejected"
                    }
                    className="btn text-sm"
                    onClick={() => handleSubmit("rejected", data._id)}
                  >
                    Reject
                  </button>
                </td>
                <td>
                  <Link
                    to={`/adminDashboard/myClassDetails/${data._id}`}
                    disabled={!(data.status === "accepted")}
                    className="btn"
                  >
                    Progress
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination/>
      </div>
    </div>
  );
};

export default AllClasses;
