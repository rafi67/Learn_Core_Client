import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import jsPDF from "jspdf";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../shared/Loading/Loading";

const MyOrder = () => {
  const { get } = useAxiosSecure();
  const { user } = useAuth();

  const { data: myOrder, isLoading } = useQuery({
    queryKey: ["myOrder"],
    queryFn: async () =>
      await get(`/myOrder?email=${user.email}`).then((res) => res.data),
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <Loading />;

  const invoice = () => {
    const doc = new jsPDF({ putOnlyUsedFonts: true, orientation: "landscape" });

    const tableColumn = [
      "Sl No.",
      "Title",
      "Price",
      "Transaction ID",
      "Student Email",
      "Teacher Email",
    ];

    const result = [];
    for (var i = 0; i < myOrder.length; i += 1) {
      result.id = (i + 1).toString();
      result.push(Object.assign({}, myOrder[i]));
    }

    doc.table(1, 1, result, tableColumn, { autoSize: true });

    doc.save("invoice.pdf");
  };

  let i = 1;

  return (
    <div className="w-full lg:w-[90%] flex flex-col items-end md:p-1 lg:p-4 space-y-2">
      <title>Users</title>
      <div className="overflow-x-auto items-start rounded-box border border-base-content/5 bg-base-100">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>Sl No.</th>
              <th>Title</th>
              <th>Price</th>
              <th>Transaction ID</th>
              <th>Student Email</th>
              <th>Teacher Email</th>
            </tr>
          </thead>
          <tbody>
            {/* row */}
            {myOrder.map((data) => (
              <tr key={data._id}>
                <th>{i++}</th>
                <td className="text-sm md:text-md text-wrap">{data.title}</td>
                <td className="text-sm md:text-md text-wrap">
                  {data.price} BDT
                </td>
                <td>{data.transactionId}</td>
                <td>{data.email}</td>
                <td>{data.teacherEmail}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button className="btn w-[10%]" onClick={invoice}>
        Invoice
      </button>
    </div>
  );
};

export default MyOrder;
