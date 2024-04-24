// Login.js
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router";
const Login = () => {
    const navigate = useNavigate();
    return (
        <div className="min-h-screen bg-gray-100 flex justify-center items-center">
            <div className="bg-white p-8 rounded shadow-md w-96">
                <h2 className="text-2xl font-semibold mb-4">Login</h2>
                <Formik
                    initialValues={{ email: "", password: "" }}
                    validationSchema={Yup.object({
                        email: Yup.string()
                            .email("Invalid email address")
                            .required("Email is required"),
                        password: Yup.string()
                            .required("Password is required")
                            .min(
                                6,
                                "Password must be at least 6 characters long"
                            ),
                    })}
                    onSubmit={(values, { setSubmitting }) => {
                        setTimeout(() => {
                            if (values.email && values.password) {
                                navigate("graph-from");
                            } else {
                                alert("Invalid email or password");
                            }
                            setSubmitting(false);
                        }, 400);
                    }}
                >
                    <Form>
                        <div className="mb-4">
                            <label
                                htmlFor="email"
                                className="block text-gray-700"
                            >
                                Email
                            </label>
                            <Field
                                type="email"
                                id="email"
                                name="email"
                                className="form-input mt-1 block w-full"
                            />
                            <ErrorMessage
                                name="email"
                                component="div"
                                className="text-red-500 mt-1"
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="password"
                                className="block text-gray-700"
                            >
                                Password
                            </label>
                            <Field
                                type="password"
                                id="password"
                                name="password"
                                className="form-input mt-1 block w-full"
                            />
                            <ErrorMessage
                                name="password"
                                component="div"
                                className="text-red-500 mt-1"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                        >
                            Login
                        </button>
                    </Form>
                </Formik>
            </div>
        </div>
    );
};

export default Login;
