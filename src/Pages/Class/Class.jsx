import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import ClassCard from "./ClassCard/ClassCard";

const Class = () => {
  const { get } = useAxiosPublic();

  const { data: Classes = [], error } = useQuery({
    queryKey: ["class"],
    queryFn: async () =>
      await get("/allClasses")
        .then((res) => res.data)
        .catch((err) => console.log(err)),
    refetchOnWindowFocus: false,
  });

  if(error) return <p>Error</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-5">
      <title>All Classes</title>
      {Classes.map((cl) => (
        <ClassCard key={cl._id} data={cl} />
      ))}
    </div>
  );
};

export default Class;
