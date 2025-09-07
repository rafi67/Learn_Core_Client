import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

const AllClasses = () => {
  const { get } = useAxiosSecure();
  const { user } = useAuth();

  const { data: allCourses = [] } = useQuery({
    queryKey: ["allCourses"],
    queryFn: async () =>
      await get(`/allCourses?email=${user.email}`).then((res) => res.data),
    refetchOnWindowFocus: false,
  });

  let i = 1;

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
            {allCourses.map((data) => (
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
                    disabled={data.status !== "accepted"}
                    className="btn text-sm"
                  >
                    Approve
                  </button>
                </td>
                <td>
                  <button
                    disabled={data.status !== "accepted"}
                    className="btn text-sm"
                  >
                    Reject
                  </button>
                </td>
                <td>
                  <progress
                    className="progress progress-info w-[100%]"
                    value={
                      data.totalAssignment > 0 && data.totalSubmission > 0
                        ? (data.totalSubmission / data.totalAssignment) * 100
                        : 0
                    }
                    max="100"
                  ></progress>
                  {data.totalAssignment > 0 && data.totalSubmission > 0
                    ? (data.totalSubmission / data.totalAssignment) * 100
                    : 0 + "%"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllClasses;
