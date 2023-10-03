import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";

export interface IRegisterPageProps {}

interface User {
  name: string;
  email: string;
  password: string;
}

const RegisterPage: React.FC<IRegisterPageProps> = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const register = async (user: User) => {
    try {
      console.log(user);

      const response = await axios.post("register", user);

      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  };
  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4">Register</h1>
        <form
          className="max-w-md mx-auto "
          onSubmit={(event) => {
            event.preventDefault();
            register({ name, email, password });
          }}
        >
          <input
            type="text"
            placeholder="DinhB"
            value={name}
            onChange={(ev) => setName(ev.target.value)}
          />
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
          />
          <button className="primary">Login</button>
          <div className="text-center py-2 text-gray-500">
            Already a member?{" "}
            <Link className="underline text-clip" to={"/login"}>
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
