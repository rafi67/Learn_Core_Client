import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import jsPDF from "jspdf";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../shared/Loading/Loading";
import { applyPlugin } from 'jspdf-autotable';
import Pagination from "../../shared/Pagination/Pagination";

const MyOrder = () => {
  const { get } = useAxiosSecure();
  const { user, paginatedData } = useAuth();

  const { data: myOrder, isLoading } = useQuery({
    queryKey: ["myOrder"],
    queryFn: async () =>
      await get(`/myOrder?email=${user.email}`).then((res) => res.data),
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <Loading />;

  const invoice = () => {
    // Create a new jsPDF instance
    applyPlugin(jsPDF);
    const doc = new jsPDF();
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth()+1;
    const year = today.getFullYear();

    // Invoice Header
    doc.setFontSize(20);
    doc.text("Invoice", 14, 20);

    doc.setFontSize(12);
    doc.text(`Name: ${user.displayName}`, 14, 30);
    doc.text(`Date: ${day}-${month}-${year}`, 14, 37);

    // Define the table columns and rows
    const tableColumn = ["Sl No.", "Title", "Price", "Transaction Id", "Email", "Teacher Email"];
    const tableRows = [];

    myOrder.map((item, index) => {
      const rowData = [
        index+1,
        item.title,
        item.price+" BDT",
        item.transactionId,
        item.email,
        item.teacherEmail
      ];
      tableRows.push(rowData);
    });

    // Add the table to the PDF using autoTable
    doc.autoTable( {
      head: [tableColumn],
      body: tableRows,
      startY: 50, // Position the table vertically
      theme: 'grid', // Add a grid theme to the table
    });
    
    // Add a total at the bottom

    // Save the PDF
    doc.save(`invoice of ${user.displayName}.pdf`);
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
            {paginatedData?.map((data) => (
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
      <Pagination data={myOrder}/>
    </div>
  );
};

export default MyOrder;
