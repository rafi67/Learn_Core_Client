import { Link } from "react-router";
import SocialLogin from "../../shared/SocialLogin/SocialLogin";

const SignIn = () => {
  return (
    <div className="hero bg-base-200 min-h-screen">
      <title>Sign Up</title>
      <div className="hero-content flex-col lg:flex-row">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Sign In now!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <form className="fieldset">
              <label className="label">Email</label>
              <input type="email" className="input" placeholder="Email" />
              <label className="label">Password</label>
              <input type="password" className="input" placeholder="Password" />
              {/* <div>
                <a className="link link-hover">Forgot password?</a>
              </div> */}
              <button className="btn bg-[#FDC800] mt-4">Sign In</button>
              <Link to='/signUp' className="text-lg link link-hover">Don't have an account, create new</Link>
              <div className="divider">OR</div>
              <SocialLogin />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
