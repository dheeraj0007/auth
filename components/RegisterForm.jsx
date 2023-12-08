"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import Toast from "utils/common/toast";
const RegisterForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      toast.error("All fields are necessary!");
      return;
    }

    try {
      const checkUser = await fetch("api/userExists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      const { user } = await checkUser.json();
      console.log(user);
      if (user) {
        toast.error("User already exists");
        return;
      }
      const toasting = new Toast("Creating User");
      const res = await fetch("api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });
      if (res.ok) {
        const form = e.target;
        form.reset();
        toasting.success("User created");
        router.push("/");
      } else {
        toast.error("Error in creating user");
        console.log("user registration failed");
      }
    } catch (error) {
      "Error during registration", error;
    }
  };

  return (
    <div className="grid place-items-center h-screen ">
      <Toaster />
      <div className="shadow-lg p-5 rounded-lg border-t-4 border-green-400">
        <h1 className="text-xl font-bold my-4">Register</h1>
        <form action="" className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Full Name"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="bg-green-600 text-white font-bold cursor-pointer px-6 py-2"
            type="submit"
          >
            Register
          </button>
          <Link href={"/"} className="text-sm mt-3 text-right">
            Already have an account <span className="underline">Login</span>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
