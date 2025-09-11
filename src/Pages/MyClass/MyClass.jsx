import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import MyClassCard from "./MyClassCard/MyClassCard";

const MyClass = () => {
  const { get } = useAxiosSecure();
  const { user } = useAuth();
  const { data: myClass = [] } = useQuery({
    queryKey: ["myClass"],
    queryFn: async () =>
      await get(`/myClass?email=${user.email}`).then((res) => res.data),
    refetchOnWindowFocus: false,
  });
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-5 p-2">
      <title>My Class</title>
      {
        myClass.map(data => <MyClassCard key={data._id} data={data}/>)
      }
    </div>
  );
};

export default MyClass;
