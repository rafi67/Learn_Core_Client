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
    <div className="stats shadow ml-[25%] mt-20 bg-[#18365A] text-white">
      <div className="stat">
        <div className="stat-figure text-secondary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block h-8 w-8 stroke-current text-[#FDC800]"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
        </div>
        <div className="stat-little text-2xl">Total Classes</div>
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

      <div className="stat">
        <div className="stat-figure text-secondary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block h-8 w-8 stroke-current text-[#FDC800]"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
            ></path>
          </svg>
        </div>
        <div className="stat-title text-2xl text-white">Total Users</div>
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

      <div className="stat">
        <div className="stat-figure text-secondary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block h-8 w-8 stroke-current text-[#FDC800]"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
            ></path>
          </svg>
        </div>
        <div className="stat-title text-2xl text-white">Total Enrollment</div>
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
  );
};

export default Stats;
