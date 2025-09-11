import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";

const Users = () => {
  const { get, patch } = useAxiosSecure();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () =>
      await get(`/users?email=${user.email}`).then((res) => res.data),
    refetchOnWindowFocus: false,
  });

  const patchMutation = useMutation({
    mutationFn: (id) => patch(`/makeAdmin?email=${user.email}&userId=${id}`),
    onSuccess: () => {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Successfully done",
        showConfirmButton: false,
        timer: 1500,
      });
      queryClient.invalidateQueries(["users"]);
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

  const handleSubmit = (id) => {
    patchMutation.mutate(id);
  };

  let i = 1;

  return (
    <div className="w-full lg:w-[90%] md:p-1 lg:p-4 space-y-2">
      <title>Users</title>
      <div className="overflow-x-auto items-start rounded-box border border-base-content/5 bg-base-100">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>Sl No.</th>
              <th>Name</th>
              <th>Email</th>
              <th>Make Admin</th>
              <th>Image</th>
            </tr>
          </thead>
          <tbody>
            {/* row */}
            {users.map((data) => (
              <tr>
                <th>{i++}</th>
                <td className="text-sm md:text-md text-wrap">{data.name}</td>
                <td className="text-sm md:text-md text-wrap">{data.email}</td>
                <td>
                  <button
                    className="btn text-sm"
                    disabled={data.role === "admin"}
                    onClick={() => handleSubmit(data._id)}
                  >
                    Make Admin
                  </button>
                </td>
                <td>
                  <img
                    className="rounded-full w-[60px] h-[60px]"
                    src={data.photoUrl}
                    alt=""
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
