import { useState } from "react";
import { auth, googleProvider } from "../../config/firebase";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { FaFacebook, FaGithub, FaGoogle } from "react-icons/fa6";
import { TbLockFilled, TbMailFilled } from "react-icons/tb";
import backgroundImage from "../../assets/sky.jpg";
import { FiDownload } from "react-icons/fi";
export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const signUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };
  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);

      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };
  const signIn = async () => {
    try {
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div
      style={{ backgroundImage: `url(${backgroundImage})` }}
      className="flex h-screen bg-cover bg-center"
    >
      <div className="m-auto max-w-[400px] bg-[linear-gradient(180deg,_skyblue_-10%,_white_30%)] shadow-lg flex flex-col  rounded-3xl py-7 px-10 text-center">
        <div className="self-center shadow-lg p-3 mb-3 rounded-2xl bg-white">
          <FiDownload style={{ transform: "rotate(-90deg)" }} size={30} />
        </div>
        <p className="text-2xl font-[500]">Sign in with email</p>
        <p className="text-sm opacity-75 mb-5">
          Make a new doc to bring your words, data, and teams together. For free
        </p>
        <div className="flex items-center gap-2 bg-gray-100 p-2 rounded-xl mb-3">
          <TbMailFilled className="mt-0.5 opacity-50" size={20} />
          <input
            className="outline-0 text-sm w-full"
            type="text"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="username"
          />
        </div>
        <div className="flex items-center gap-2 bg-gray-100 p-2 rounded-xl mb-3">
          <TbLockFilled className="mt-0.5 opacity-50" size={20} />
          <input
            className="outline-0 text-sm w-full"
            type="password"
            placeholder="Password..."
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
        </div>
        <a href="" className="text-end text-sm mb-4">
          Forgot password?
        </a>
        <button
          className="bg-black text-white p-2 rounded-xl mb-4 cursor-pointer"
          onClick={signUp}
        >
          Sign In
        </button>
        <p className="opacity-50 text-sm mb-4">Or sign in with</p>
        <div className="flex gap-2">
          <button
            className="border flex-1 flex items-center justify-center py-2 rounded-xl cursor-pointer"
            onClick={signInWithGoogle}
          >
            <FaGoogle />
          </button>
          <button
            className="border flex-1 flex items-center justify-center py-2 rounded-xl cursor-pointer"
            onClick={signInWithGoogle}
          >
            <FaFacebook />
          </button>
          <button
            className="border flex-1 flex items-center justify-center py-2 rounded-xl cursor-pointer"
            onClick={signInWithGoogle}
          >
            <FaGithub />
          </button>
        </div>
      </div>
    </div>
  );
}
