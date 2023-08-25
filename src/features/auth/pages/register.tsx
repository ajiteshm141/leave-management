import axios, { AxiosResponse } from "axios";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
type Inputs = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  cnfPassword: string;
};
interface ApiResponse {
  message: string;
  data: any;
}

const Register = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async ({
    email,
    firstName,
    lastName,
    password,
  }) => {
    const apiUrl = `${import.meta.env.VITE_API_URI}/api/user/register`;
    const requestData = {
      email,
      firstName,
      lastName,
      password,
    };

    const headers = {
      // Authorization: "Bearer YourAccessToken",
      "Content-Type": "application/json",
      // Other headers as needed
    };

    try {
      setLoading(true);
      const response: AxiosResponse<ApiResponse> = await axios.post(
        apiUrl,
        requestData,
        { headers }
      );
      console.log(response);

      if (response.status === 200) {
        // return response.data;
        toast.success(response.data.message);
        setLoading(false);
      } else {
        toast.error(response?.data?.message);
        setLoading(false);
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.log(error);
        toast.error(error?.response?.data.message as string);
        setLoading(false);
        // Do something with this error...
      } else {
        console.error(error);
        toast.error("something went wrong");
        setLoading(false);
      }

      console.log(error);
    }
  };

  const password = watch("password", "");
  return (
    <div className="flex flex-col min-h-screen justify-center items-center">
      <div className="w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
        <div className="px-6 py-4">
          <div className="flex justify-center mx-auto">
            <img
              className="w-auto h-7 sm:h-8"
              src="https://merakiui.com/images/logo.svg"
              alt=""
            />
          </div>
          <h3 className="mt-3 text-xl font-medium text-center text-gray-600 dark:text-gray-200">
            Welcome Back
          </h3>
          <p className="mt-1 text-center text-gray-500 dark:text-gray-400">
            Create account
          </p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex gap-2">
              <div className="w-full mt-4">
                <input
                  {...register("firstName", {
                    required: "First Name is required",
                  })}
                  className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                  type="text"
                  placeholder="First Name"
                  aria-label="First Name"
                />
              </div>
              <div className="w-full mt-4">
                <input
                  {...register("lastName", {
                    required: "Last Name is required",
                  })}
                  className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                  type="text"
                  placeholder="Last Name"
                  aria-label="Last Name"
                />
              </div>
            </div>
            <div className="w-full mt-4">
              <input
                {...register("email", { required: "Email is required" })}
                className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                type="email"
                placeholder="Email Address"
                aria-label="Email Address"
              />
            </div>
            <div className="w-full mt-4">
              <input
                {...register("password", {
                  required: " Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                })}
                className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                type="password"
                placeholder="Password"
                aria-label="Password"
                name="password"
              />
            </div>

            <div className="w-full mt-4">
              <input
                {...register("cnfPassword", {
                  required: "Confirm Password is required",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
                className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                type="password"
                placeholder="Confirm Password"
                aria-label="Confirm Password"
              />
              {errors.cnfPassword && (
                <p className="text-sm text-red-500">
                  {errors.cnfPassword.message}
                </p>
              )}
            </div>
            <div className="flex items-center justify-end mt-4">
              <button
                type="submit"
                className="px-6 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                disabled={loading}
              >
                {loading ? "..." : "Register"}
              </button>
            </div>
          </form>
        </div>
        <div className="flex items-center justify-center py-4 text-center bg-gray-50 dark:bg-gray-700">
          <span className="text-sm text-gray-600 dark:text-gray-200">
            Already have an account?{" "}
          </span>
          <Link
            to={'/login'}
            className="mx-2 text-sm font-bold text-blue-500 dark:text-blue-400 hover:underline"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
