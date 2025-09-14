import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import Loading from "../Loading/Loading";

const Pagination = () => {
  const { numberOfPages, selected, setItemsPerPage, setCurrentPage, setSelected } = useAuth();

  const { data: numberOfPage, isLoading } = useQuery({
    queryKey: ["pages", numberOfPages],
    queryFn: () => [...Array(numberOfPages)],
    refetchOnWindowFocus: false,
  });

  const handleChange = (e) => {
    const itemCount = parseInt(e.target.value);
    setSelected(itemCount);
    setItemsPerPage(itemCount);
  };

  if (isLoading) return <Loading />;

  return (
    <div className="join">
      {numberOfPage?.map((_, index) => (
        <input
          key={index}
          className="join-item btn btn-square"
          type="radio"
          name="options"
          aria-label={`${index + 1}`}
          value={`${index + 1}`}
          onClick={(e) => {
            setCurrentPage(parseInt(e.target.value));
          }}
        />
      ))}
      <select
        className="join-item btn btn-square"
        name=""
        id=""
        defaultValue={selected}
        onChange={handleChange}
      >
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="30">30</option>
      </select>
    </div>
  );
};

export default Pagination;
