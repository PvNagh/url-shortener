import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { axiosInstance } from "../utils/axiosInstance";
import login from "../assets/login.png";
import login2 from "../assets/login-2.png";
import signup from "../assets/sign.png";
import { ToastContainer, toast } from "react-toastify";
const Login = () => {


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState('');
    const [showLogin, setShowLogin] = useState(true);
    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            const result = await axiosInstance.post("/auth/signup", {
                email: email,
                password: password
            });
            if (result.status === 201) {
                setShowLogin(true);
            }
        } catch (error) {

            if (error.status === 400) {

                toast.error(error.data.msg, {
                    position: toast.POSITION.TOP_CENTER
                }); // Show an alert message
            } else {
                console.error(error);
            }
        }
    };

    const handleSignIn = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axiosInstance.post("/auth/login",
                {
                    email: email,
                    password: password
                });
            localStorage.setItem(
                "user",
                JSON.stringify({ user: data, authenticated: true })
            );
            navigate("/dashboard", { replace: true });

        } catch (error) {
            if (error.status === 400) {
                toast.error(error.data.msg, {
                    position: toast.POSITION.TOP_CENTER
                }); 
            } else {
                console.error(error);
            }
        }
    };

    return (
        <>
            <div className="grid h-screen grid-cols-1 md:grid-cols-2">
                <div className="items-center py-[6rem] ">
                    <img src={
                        showLogin ? login2 : signup} className="h-full w-full" />
                </div>
                <div className="p-8 lg:px-28">
                    <div className="flex h-full flex-col justify-center">
                        <div className="">
                            <div className="flex flex-col items-center justify-center gap-y-5">
                                <div className="flex h-full w-full">
                                    <img src={login} alt="pic" />
                                </div>
                                <h1 className="mb-6 text-center text-4xl text-blue-500 font-bold">
                                    <span className="bg-gradient-to-r from-[#9336B4] to-[#DD58D6] text-transparent bg-clip-text">
                                        Welcome
                                    </span>
                                </h1>
                            </div>
                            <div>
                                {

                                    showLogin ? (
                                        // Show Login Form
                                        <form onSubmit={handleSignIn}>
                                            <div className="mb-4">
                                                <input
                                                    type="email"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    className="rounded-lg border p-2 w-full focus:outline-none focus:border-blue-500 transition-colors duration-300 text-gray-600"
                                                    placeholder="Enter Email"
                                                    required
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <input
                                                    type="password"
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    className="rounded-lg border p-2 w-full focus:outline-none focus:border-blue-500 transition-colors duration-300 text-gray-600"
                                                    placeholder="Enter password"
                                                    required
                                                />
                                            </div>
                                            <button className="w-full rounded-md text-white text-lg bg-blue-500 py-[7px] mb-4" type="submit">
                                                Login
                                            </button>
                                            <p className="text-center text-gray-500">
                                                Don't have an account?{" "}
                                                <button
                                                    className="text-[#0047ab] p-0"
                                                    type="button"
                                                    onClick={() => setShowLogin(false)}
                                                >
                                                    Sign Up
                                                </button>
                                            </p>
                                        </form>
                                    ) : (
                                        // Show Sign Up Form
                                        <form onSubmit={handleSignUp}>
                                            <div className="mb-4">
                                                <input
                                                    type="email"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    className="rounded-lg border p-2 w-full focus:outline-none focus:border-blue-500 transition-colors duration-300 text-gray-600"
                                                    placeholder="Enter Email"
                                                    required
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <input
                                                    type="password"
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    className="rounded-lg border p-2 w-full focus:outline-none focus:border-blue-500 transition-colors duration-300 text-gray-600"
                                                    placeholder="Enter password"
                                                    required
                                                />

                                            </div>
                                            <button className="w-full rounded-md text-white text-lg bg-blue-500 py-[7px] mb-4" type="submit">
                                                Sign Up
                                            </button>
                                            <p className="text-center text-gray-500 ">
                                                Already have an account?{" "}
                                                <button
                                                    type="button"
                                                    className="text-[#0047ab] p-0"
                                                    onClick={() => setShowLogin(true)}
                                                >
                                                    Login
                                                </button>
                                            </p>

                                        </form>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer autoClose={2000}/>
        </>
    );
};

export default Login;











