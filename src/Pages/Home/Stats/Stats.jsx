import CountUp from "react-countup";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const Stats = () => {
  const { get } = useAxiosPublic();
  const {
    data: Count,
    isPending,
    error,
  } = useQuery({
    queryKey: ["count"],
    queryFn: async () => get("/totalCount").then((res) => res.data),
    refetchOnWindowFocus: false,
  });

  if (isPending) return <p>Data Loading</p>;

  if (error) return <p>{error.message}</p>;

  return (
    <div className="flex flex-col lg:flex-row space-y-4 space-x-4 mt-20 justify-center">
      {/* total users */}
      <div className="card w-[100%] lg:w-72 shadow-sm h-[200px] bg-linear-to-bl from-[#FDF3F0] to-[#EDFEFE]">
        <div className="card-body">
          <h2 className="card-title">Total Users</h2>
          <CountUp
            className="account-balance"
            start={0}
            end={Count?.totalUser}
            decimal=","
            duration={3}
            enableScrollSpy
            onEnd={() => console.log("Ended! 👏")}
            onStart={() => console.log("Started! 💨")}
          >
            {({ countUpRef }) => (
              <div>
                <span className="stat-value" ref={countUpRef} />
              </div>
            )}
          </CountUp>
        </div>
      </div>

      {/* total classes */}
      <div className="card w-[100%] lg:w-72 shadow-sm h-[200px] bg-linear-to-bl from-[#FDF3F0] to-[#EDFEFE]">
        <div className="card-body">
          <h2 className="card-title">Total Classes</h2>
          <CountUp
            className="account-balance stat-value"
            start={0}
            end={Count?.totalClass}
            enableScrollSpy
            duration={3}
            onEnd={() => console.log("Ended! 👏")}
            onStart={() => console.log("Started! 💨")}
          >
            {({ countUpRef }) => (
              <div>
                <span className="stat-value" ref={countUpRef} />
              </div>
            )}
          </CountUp>
        </div>
      </div>

      {/* total enrollments */}
      <div className="card w-[100%] lg:w-72 shadow-sm h-[200px] bg-linear-to-bl from-[#FDF3F0] to-[#EDFEFE]">
        <div className="card-body">
          <h2 className="card-title">Total Enrollments</h2>
          <CountUp
            className="account-balance stat-value"
            start={0}
            end={Count?.totalEnrollment}
            enableScrollSpy
            duration={3}
            onEnd={() => console.log("Ended! 👏")}
            onStart={() => console.log("Started! 💨")}
          >
            {({ countUpRef }) => (
              <div>
                <span className="stat-value" ref={countUpRef} />
              </div>
            )}
          </CountUp>
        </div>
      </div>
    </div>
  );
};

export default Stats;
