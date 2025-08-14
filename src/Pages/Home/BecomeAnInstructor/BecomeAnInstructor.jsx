const BecomeAnInstructor = () => {
  return (
    <div className="mt-20">
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <img
            src="https://cdn.shortpixel.ai/spai/q_lossy+w_872+to_webp+ret_img/cosstraining.org/wp-content/uploads/2023/11/COSS-instructor-01.png"
            className="w-[400px] rounded-lg shadow-2xl"
          />
          <div className="w-[40%]">
            <h1 className="text-5xl font-bold">Become an Instructor</h1>
            <p className="py-6">
              Becoming an instructor allows you to share your expertise, inspire
              others, and shape the learning journey of your students. It’s a
              role that blends teaching, mentorship, and leadership to create
              lasting impact.
            </p>
            <button className="btn bg-[#FDC800]">Start teaching today</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BecomeAnInstructor;
