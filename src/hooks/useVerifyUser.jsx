import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useVerifyUser = () => {
  const { user } = useAuth();
  const { get } = useAxiosSecure();

  const { data: verifyUser = [], isLoading } = useQuery({
    queryKey: "verifyUser",
    queryFn: async () =>
      await get(`/verifyUser/${user.email}`).then((res) => res.data),
    refetchOnWindowFocus: false,
  });

  console.log('verify user =', verifyUser);

  return { verifyUser, isLoading };
};

export default useVerifyUser;
