import { useState } from "react";
import { signup } from "../Api.js";
import AnimatedForm from "../components/AnimatedForm";

export default function Signup() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    gender: "",
    contact: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await signup(form);
    alert(res.msg || "Signup failed");
  };

  return (
    <div className="h-screen flex justify-center items-center bg-linear-to-br from-black via-gray-900 to-gray-950">
      <AnimatedForm
        title="Create Account"
        fields={[
          { placeholder: "Username", onChange: e => setForm({ ...form, username: e.target.value }) },
          { placeholder: "Email", type: "email", onChange: e => setForm({ ...form, email: e.target.value }) },
          { placeholder: "Gender (Male/Female/Other)", onChange: e => setForm({ ...form, gender: e.target.value }) },
          { placeholder: "Contact No", onChange: e => setForm({ ...form, contact: e.target.value }) },
          { placeholder: "Password", type: "password", onChange: e => setForm({ ...form, password: e.target.value }) },
        ]}
        buttonText="Sign Up"
        onSubmit={handleSubmit}
      />
    </div>
  );
}
