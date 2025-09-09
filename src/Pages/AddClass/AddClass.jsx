import useAuth from "../../hooks/useAuth";

const AddClass = () => {
  const { user } = useAuth();
  return (
    <div className="hero bg-base-200 min-h-screen">
      <title>Add Class</title>
      <div className="hero-content w-[50%] flex-col lg:flex-row-reverse">
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Title</legend>
              <input
                type="text"
                className="input"
                placeholder="Title"
                name="title"
              />
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
                type="text"
                className="input"
                placeholder="Email"
                value={user.email}
                readOnly
              />
              <legend className="fieldset-legend">Price</legend>
              <input type="text" className="input" placeholder="Price" />
              <legend className="fieldset-legend">Description</legend>
              <textarea
                className="textarea"
                placeholder="Write Description here"
              ></textarea>
              <legend className="fieldset-legend">Image</legend>
              <input type="file" className="file-input file-input-md" />
              <button className="btn btn-neutral mt-4">Add Class</button>
            </fieldset>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddClass;
