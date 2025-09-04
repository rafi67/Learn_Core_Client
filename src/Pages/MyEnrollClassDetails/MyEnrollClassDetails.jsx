import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useParams } from "react-router";
import { StarRating } from "react-flexible-star-rating";
import { useState } from "react";
import Swal from "sweetalert2";

const MyEnrollClassDetails = () => {
  const { user } = useAuth();
  const { get, post } = useAxiosSecure();
  const { id } = useParams();

  const [rating, setRating] = useState(0);
  const [docUrl, setDocUrl] = useState(null);

  const { data: assignments = [] } = useQuery({
    queryKey: ["assignments"],
    queryFn: async () =>
      await get(
        `/myEnrollClassDetails?email=${user.email}&enrollClassId=${id}`
      ).then((res) => res.data),
    refetchOnWindowFocus: false,
  });

  const { data: isEvaluate } = useQuery({
    queryKey: ["evaluation"],
    queryFn: async () =>
      await get(`/verifyFeedback?email=${user.email}&classId=${id}`).then(
        (res) => res.data
      ),
    refetchOnWindowFocus: false,
  });

  // const {data: isSubmitted} = useQuery({
  //   queryKey: ['submitted'],
  //   queryFn: async () => await get(`/verifySubmission?email=${user.email}`),
  //   refetchOnWindowFocus: false,
  // });

  const submitAssignment = async (id) => {
    const assignment = {
      assignmentId: id,
      Url: docUrl,
    };

    const res = await post(`/submitAssignment?email=${user.email}`, assignment);
    if (res.data.insertedId) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Assignment has been submitted successfully",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Failed to submit assignment",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const description = form.description.value;
    const feedback = {
      classId: id,
      feedbackText: description,
      rating: rating,
    };
    const res = await post(`/feedback?email=${user.email}`, feedback);

    if (res.data) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Feedback has been submitted successfully",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  let i = 0;

  return (
    <div className="w-full lg:w-[90%] md:p-1 lg:p-4 space-y-2">
      <button
        onClick={() => document.getElementById("my_modal_2").showModal()}
        className={`${
          isEvaluate === false ? "block" : "hidden"
        } btn rounded-full bg-blue-600 text-white`}
      >
        Evaluate
      </button>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <dialog id="my_modal_2" className="modal">
        <div className="modal-box">
          <h1 className="text-xl font-bold">Teacher Evaluation Report</h1>
          <form onSubmit={handleSubmit}>
            <fieldset className="fieldset space-y-2">
              <legend className="fieldset-legend">Description</legend>
              <input
                type="text"
                className="input w-full"
                name="description"
                placeholder="Type here"
              />
              <legend className="fieldset-legend">Rate Teacher</legend>
              <StarRating
                dimension={10}
                isHalfRatingEnabled={true}
                initialRating={rating}
                onRatingChange={setRating}
              />
              <button className="btn">Evaluate</button>
            </fieldset>
          </form>
        </div>
      </dialog>
      <div className="overflow-x-auto items-start rounded-box border border-base-content/5 bg-base-100">
        {assignments.length ? (
          <table className="table table-zebra">
            {/* head */}
            <thead>
              <tr>
                <th>Sl No.</th>
                <th>Title</th>
                <th>Description</th>
                <th>Deadline</th>
                <th>Assignment Doc</th>
                <th>Submit Assignment</th>
              </tr>
            </thead>
            <tbody>
              {/* row */}
              {assignments.map((data) => {
                const res = get(`/verifySubmission?email=${user.email}&assignmentId=${data._id}`);
                const isSubmitted = res.data;
                return (
                  <tr key={data._id}>
                    <th>{++i}</th>
                    <td className="text-sm md:text-md text-wrap">
                      {data.title}
                    </td>
                    <td className="text-sm md:text-md text-wrap">
                      {data.description}
                    </td>
                    <td className="lg:w-[10%]">{data.deadline}</td>
                    <td>
                      <input
                        type="text"
                        placeholder="Doc Url"
                        className="input"
                        name="docUrl"
                        onChange={(e) => setDocUrl(e.target.value)}
                        disabled={!isSubmitted}
                      />
                    </td>
                    <td>
                      <button
                        className="btn text-sm"
                        onClick={() => submitAssignment(data._id)}
                        disabled={!isSubmitted}
                      >
                        Submit
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <img
            className="w-[80%] h-screen"
            src="https://i.ibb.co.com/FkJ4Vmtb/58420911-9264746.jpg"
            alt=""
          />
        )}
      </div>
    </div>
  );
};

export default MyEnrollClassDetails;
