import axios, { AxiosResponse } from "axios";
import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { Link, useSearchParams} from "react-router-dom";

const EmailConfirmation = () => {
  const [EmailConfirmed, setEmailConfirmed] = useState(false);
  const [loading, setLoading] = useState(false)

  
  const [searchParams] = useSearchParams();
  console.log();
  
  
  useEffect(() => {
    const confirmEmail = async () => {
      try {
        const apiUrl = `${import.meta.env.VITE_API_URI}/api/user/confirmation?token=${searchParams.get('token')}`;
        const response: AxiosResponse = await axios.get(apiUrl);
        console.log(response);

        if (response.status === 200) {
          // return response.data;
          console.log(response);

          toast.success(response.data.message);
          
          //   navigate("/");
          //   setLoading(false);
        } else {
          toast.error(response?.data?.message);
          //   setLoading(false);
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
    confirmEmail()
  }, []);

  return (
    <div className="min-h-screen min-w-[100vw] flex justify-center items-center">
      <div className="w-full max-w-sm px-4 py-3 bg-white rounded-md shadow-md dark:bg-gray-800">
        <div>
          <h1 className="mt-2 text-lg font-semibold text-gray-800 dark:text-white">
            Email confirmed
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
            Continue to login
          </p>
          <div className="mt-4">
            <Link
              to={"/login"}
              className="px-6 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50 static"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailConfirmation;
