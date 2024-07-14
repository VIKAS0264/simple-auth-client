import { useAuth } from "./AuthContext";
import { Link } from "react-router-dom";
const Home = () => {
  const { user, logout, token, isAuthenticated } = useAuth();
  console.log("token", token);
  return isAuthenticated ? (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col items-center">
        {" "}
        {/* Added flex container with column layout */}
        <p>Welcome to the home page! {user.email}</p>
        <div>
          <img
            src="https://media.giphy.com/media/l0amJzVHIAfl7jMDos/giphy.gif?cid=ecf05e475m19z3cl657rozwgfpwhtyou8qmii9bs9hcb7jfp&ep=v1_gifs_search&rid=giphy.gif&ct=g"
            alt="Animated image"
          />
        </div>
        <button
          className="mt-4 flex w-auto justify-center rounded-md bg-yellow-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-yellow-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={() => logout()}
        >
          {" "}
          <h3>Log Out</h3>
        </button>
      </div>
    </div>
  ) : (
    <div className="flex justify-center items-center h-screen">
      <h1>
        Please{" "}
        <Link to="/signin">
          <span className="underline">Sign In</span>
        </Link>{" "}
        to vist this page
      </h1>
    </div>
  );
};

export default Home;
