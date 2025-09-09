import useAuth from "../../hooks/useAuth";

const TeachOnLearnCore = () => {
  const { user } = useAuth();

  return (
    <div className="hero bg-base-200 min-h-screen">
      <title>Teach on LearnCore</title>
      <div className="hero-content w-[50%] flex-col lg:flex-row-reverse">
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <div className="avatar relative mx-auto">
              <div className="w-24 rounded-full">
                <img src={user.photoURL} />
              </div>
            </div>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Name</legend>
              <input
                type="text"
                className="input"
                placeholder="Name"
                value={user.displayName}
                readOnly
              />
              <legend className="fieldset-legend">Email</legend>
              <input
                type="email"
                className="input"
                placeholder="email"
                value={user.email}
                readOnly
              />
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Experience</legend>
                <select defaultValue="Select an Experience" className="select">
                  <option disabled={true}>Select an Experience</option>
                  <option>Beginner</option>
                  <option>Experienced</option>
                  <option>Mid-Level</option>
                </select>
              </fieldset>
              <legend className="fieldset-legend">Title</legend>
              <input
                type="text"
                className="input"
                placeholder="Title"
                name="title"
              />
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Category</legend>
                <select defaultValue="Select a Category" className="select">
                  <option disabled={true}>Select a Category</option>
                  <option>Software Engineer</option>
                  <option>Database Engineer</option>
                  <option>Mobile app Developer</option>
                </select>
              </fieldset>
              <button className="btn btn-neutral mt-4">
                Submit for Review
              </button>
            </fieldset>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeachOnLearnCore;
