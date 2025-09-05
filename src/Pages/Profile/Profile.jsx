import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useVerifyUser from "../../hooks/useVerifyUser";

const Profile = () => {
  const { user } = useAuth();
  const { userType } = useVerifyUser();

  const handleSubmit = (e) => {
    e.preventDefault();
    Swal.fire("Feature will be available soon!");
  };

  return (
    <div className="p-4 w-[80%]">
      <form className="fieldset space-y-4" onSubmit={handleSubmit}>
        <div className="avatar relative left-25">
          <div className="w-24 rounded-full">
            <img src={user.photoURL} />
          </div>
        </div>
        <button className="btn lg:w-1/3">Update Profile Image</button>
      </form>
      <form className="fieldset space-y-4" onSubmit={handleSubmit}>
        <legend className="fieldset-legend">Name</legend>
        <input
          type="text"
          className="input"
          placeholder="Name"
          value={user.displayName}
        />
        <legend className="fieldset-legend">Email</legend>
        <input
          type="text"
          className="input"
          placeholder="Name"
          value={user.email}
        />
        <legend className="fieldset-legend">Role</legend>
        <input
          type="text"
          className="input"
          placeholder="User Role"
          value={userType?.role}
        />
        <button className="btn w-1/3">Save</button>
      </form>
    </div>
  );
};

export default Profile;
