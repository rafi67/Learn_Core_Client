import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import EnrollClassesCard from "./EnrollClassesCard/EnrollClassesCard";
import Loading from "../../shared/Loading/Loading";

const MyEnrollClasses = () => {
  const { get } = useAxiosSecure();
  const { user } = useAuth();
  const { data: enrollClass = [], isLoading } = useQuery({
    queryKey: ["myEnrollClass"],
    queryFn: async () =>
      get(`/myEnrollClass?email=${user.email}`).then((res) =>
        res.data
      ),
    refetchOnWindowFocus: false,
  });

  if(isLoading) return <Loading/>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-5 p-5">
      <title>My Enroll Class</title>
      {enrollClass.map((data) => (
        <EnrollClassesCard data={data} />
      ))}
    </div>
  );
};

export default MyEnrollClasses;
