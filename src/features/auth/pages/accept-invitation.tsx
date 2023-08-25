import axios, { AxiosResponse } from "axios";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
type Inputs = {
  cnfPassword: string;
  password: string;
};
interface ApiResponse {
  user: any;
  token: string;
  message: string;
  data: any;
}

const AcceptInvitation = () => {
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const password = watch("password", "");

  const onSubmit: SubmitHandler<Inputs> = async ({ password }) => {
    const apiUrl = `${import.meta.env.VITE_API_URI}/api/user/invitation/${searchParams.get('token')}`;
    const requestData = {
      password,
    };

    const headers = {
      //   Authorization: "Bearer YourAccessToken",
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
        console.log(response);

        toast.success(response.data.message);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        response.data.user?.role == "admin"
          ? navigate("/admin")
          : navigate("/employee");
        if (response.data.user?.role == "admin") {
        }
        navigate("/");
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

            <div className="flex items-center justify-between mt-4">
              <a
                href="#"
                className="text-sm text-gray-600 dark:text-gray-200 hover:text-gray-500"
              ></a>
              <button
                type="submit"
                className="px-6 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                disabled={loading}
              >
                {loading ? "..." : "Accept Invitation"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AcceptInvitation;
