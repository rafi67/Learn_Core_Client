import useAuth from "../../hooks/useAuth";
import useVerifyUser from "../../hooks/useVerifyUser";
const Profile = () => {
  const { user } = useAuth();
  const { userType } = useVerifyUser();

  return (
    <div className="p-4 w-[80%]">
      <title>Profile</title>
      <fieldset className="fieldset space-y-4">
        <div className="avatar relative left-25">
          <div className="w-24 rounded-full">
            <img src={user.photoURL} />
          </div>
        </div>
      </fieldset>
      <fieldset className="fieldset space-y-4">
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
          placeholder="Name"
          value={user.email}
          readOnly
        />
        <legend className="fieldset-legend">Role</legend>
        <input
          type="text"
          className="input"
          placeholder="User Role"
          value={userType?.role}
          readOnly
        />
      </fieldset>
    </div>
  );
};

export default Profile;
