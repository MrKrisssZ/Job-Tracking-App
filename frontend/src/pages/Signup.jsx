import { useState } from "react";
import { registerUser } from "../api/auth";
import { useNavigate } from "react-router-dom";

function Signup() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: ""
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (form.password !== form.password_confirmation) {
            alert("Passwords do not match!");
            return;
        }
        registerUser(form)
            .then((res) => {
                localStorage.setItem("token", res.data.token);
                navigate("/"); // redirect to job list
            })
            .catch((err) => {
                if (err.response?.data?.errors?.email) {
                    alert("This email is already registered.");
                } else {
                    alert("Registration failed.");
                }
            });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
                <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">
                    Create Account
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">

                    {/* Full Name */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">
                            Full Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Full Name"
                            value={form.name}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">
                            Email Address
                        </label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            value={form.email}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Password (min 6 characters)"
                            value={form.password}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-1">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            name="password_confirmation"
                            placeholder="Confirm Password"
                            value={form.password_confirmation}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        />
                    </div>

                    {/* Sign Up Button */}
                    <button
                        type="submit"
                        className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition"
                    >
                        Sign Up
                    </button>
                </form>

                {/* Redirect to Login */}
                <p className="text-center mt-4 text-gray-600">
                    Already have an account?{" "}
                    <span
                        className="text-blue-600 hover:underline cursor-pointer"
                        onClick={() => navigate("/login")}
                    >
                        Log in
                    </span>
                </p>
            </div>
        </div>
    );
}

export default Signup;
