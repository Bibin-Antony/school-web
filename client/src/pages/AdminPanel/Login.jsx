import { Link, useNavigate } from 'react-router-dom';
import image from "../../assets/Images/AdminPaneImages/TVSchool.jpg";
import { useEffect, useState } from 'react';
import { setUser } from '../../../Redux/UserSlice';
import { ToastContainer, toast } from 'react-toastify';
import { useAlert } from 'react-alert';
import { useDispatch } from 'react-redux';
import { useLoginMutation, useMeMutation } from '../../../Redux/UserAuth';

const Login = () => {

  const alert = useAlert();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  // Mutation hook generated by RTK Query
  const [loginUser, { isLoading, isError, error }] = useLoginMutation();
  const [me, { isLoading:userLoading, isError:isUserError, error:userError }] = useMeMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  useEffect(() => {
    if (isError) {
      toast.error(error.data.err);
    }
  }, [isError, alert, error]);
  useEffect(() => {
    if (isUserError) {
      toast.error(userError.data.err);
    }
  }, [isUserError, alert, userError]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Call the registerUser mutation with form data
    await loginUser(form).unwrap();
    toast.success("Login successful");
    navigate("/");
    const userData=await me().unwrap();
    console.log(userData)
    dispatch(setUser(userData.user))
    

  };

  
  return (
    <>
    <ToastContainer/>
    <div className="flex items-center justify-center h-screen bg-cover" style={{ backgroundImage: `url(${image})` }}>
      <div className="w-96 bg-opacity-80 backdrop-filter backdrop-blur-lg rounded-lg p-8 border border-white">
        <form className="flex flex-col items-center space-y-6" onSubmit={handleSubmit}>
          <h1 className="text-3xl text-white">Login</h1>
          <div className="input-box relative w-full h-16 ">
            <input
            onChange={handleChange}
              type="text"
              placeholder="email"
              name='email'
              className="w-full h-full bg-transparent border-white  border-2 rounded-full text-white pl-8 text-base placeholder:text-white"
            />
            <i className='bx bxs-user absolute right-8 top-1/2 transform -translate-y-1/2 text-2xl text-white'></i>
          </div>
          <div className="input-box relative w-full h-16">
            <input
                        onChange={handleChange}

              type="password"
              placeholder="Password"
              name='password'
              className="w-full h-full bg-transparent  border-2 border-white rounded-full text-white pl-8 text-base placeholder:text-white"
            />
            <i className='bx bxs-lock-alt absolute right-8 top-1/2 transform -translate-y-1/2 text-2xl text-white'></i>
          </div>
          <div className="flex justify-between text-base w-[100%]">
            <label className="flex  text-white text-sm">
              <input type="checkbox" className="mr-2" />
              Remember me
            </label>
            <a href="#" className="text-white hover:underline text-sm">
                Forgot Password?
            </a>
          </div>
          <button
            type="submit"
            className="btn w-full h-12 bg-white text-gray-800 rounded-full transition-all duration-300 ease-in-out hover:bg-secondary hover:text-white">
                       {isLoading ? "Logging in..." : "Login"}

          </button>
          <div className="flex justify-between w-[100%] text-base text-center">
            <p className="text-white">
              Don't have an account?{' '}
            </p>
            <Link to="/Register"className="text-white hover:underline">
              Register
            </Link>
          </div>
        </form>
      </div>
    </div>
    </>
  );
};

export default Login;