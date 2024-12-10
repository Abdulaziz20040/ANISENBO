import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa"; // Icons
import "../App.css";
import { IoIosLogOut } from "react-icons/io";
import { FaCircleUser } from "react-icons/fa6";
import axios from "axios";
import { userDate } from "../Api/Api";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [oldname, setOldName] = useState("");
  const [oldpassword, setOldPassword] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(userDate)
      .then((res) => {
        setData(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const handleFormSubmitold = async () => {
    if (!oldname || !oldpassword) {
      toast.error("Iltimos, barcha maydonlarni to'ldiring!");
      return;
    }

    try {
      // Login tekshiruvi
      const isUserExist = data.find(
        (user) => user.name === oldname && user.password === oldpassword
      );

      if (isUserExist) {
        // Agar foydalanuvchi mavjud bo'lsa tizimga kirish
        localStorage.setItem("name", oldname);
        navigate(-1); // Dashboard sahifasiga yo'naltirish
        toast.success("Tizimga kirdingiz!");
      } else {
        toast.error("Bunday foydalanuvchi mavjud emas!");
      }
    } catch (error) {
      console.error("Xato yuz berdi:", error);
      toast.error("Xato yuz berdi, iltimos qaytadan urinib ko'ring!");
    }
  };

  const handleFormSubmit = () => {
    if (!name || !password) {
      toast.error("Iltimos, barcha maydonlarni to'ldiring!");
      return;
    }

    if (!isLogin && password !== repeatPassword) {
      toast.error("Parollar mos kelmaydi!");
      return;
    }

    toast.success(isLogin ? "Tizimga kirdingiz!" : "Ro'yxatdan o'tdingiz!");

    localStorage.setItem("name", name);
    localStorage.setItem("password", password);

    const dataToSend = {
      name,
      password,
      date: new Date().toISOString(),
    };

    axios
      .post(userDate, dataToSend)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Xato yuz berdi:", error);
        toast.error("Xato yuz berdi, iltimos qaytadan urinib ko'ring!");
      });

    navigate(-1);
  };

  const handleClose = () => {
    navigate("/");
  };

  return (
    <div className="bg-image-container relative h-screen">
      <button
        onClick={handleClose}
        className="absolute top-9 right-9 text-cyan-50/100 text-center hover:text-white hover:ps-1 rounded-lg text-[27px] z-10"
      >
        <IoIosLogOut />
      </button>
      <div className="flex flex-col lg:flex-row h-full">
        <div className="w-full lg:w-7/12 bg-cover bg-center bg-no-repeat" />

        <div
          style={{
            borderRadius: "30px 0px 0px 30px",
          }}
          className="w-full lg:w-5/12 flex justify-center items-center p-6 bg-gradient-to-r from-gray-800 to-gray-900"
        >
          <div className="w-full max-w-md p-6 rounded-lg shadow-lg">
            <h2 className="text-center text-2xl font-bold mb-4 text-gray-400">
              {isLogin ? "Tizimga kirish" : "Ro'yxatdan o'tish"}
            </h2>
            <button></button>
            {isLogin ? (
              <>
                <form className="space-y-4">
                  {/* Username Input */}
                  <div className="relative">
                    <FaUser className="absolute left-3 top-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Foydalanuvchi nomi"
                      value={oldname}
                      onChange={(e) => setOldName(e.target.value)}
                      className="input-field pl-10 w-full rounded-md border-2"
                    />
                  </div>

                  {/* Password Input */}
                  <div className="relative">
                    <FaLock className="absolute left-3 top-4 text-gray-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Parol"
                      value={oldpassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                      className="input-field pl-10 w-full rounded-md border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <span
                      className="absolute right-3 top-4 cursor-pointer"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <FaEyeSlash className="text-gray-400" />
                      ) : (
                        <FaEye className="text-gray-400" />
                      )}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={handleFormSubmitold}
                    className="btn-primary w-full py-3 rounded-md text-white bg-blue-600 hover:bg-blue-700"
                  >
                    {isLogin ? "Kirish" : "Ro'yxatdan o'tish"}
                  </button>
                </form>
              </>
            ) : (
              <>
                <form className="space-y-4">
                  {/* Username Input */}
                  <div className="relative">
                    <FaUser className="absolute left-3 top-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Foydalanuvchi nomi"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="input-field pl-10 w-full rounded-md border-2"
                    />
                  </div>

                  {/* Password Input */}
                  <div className="relative">
                    <FaLock className="absolute left-3 top-4 text-gray-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Parol"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="input-field pl-10 w-full rounded-md border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <span
                      className="absolute right-3 top-4 cursor-pointer"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <FaEyeSlash className="text-gray-400" />
                      ) : (
                        <FaEye className="text-gray-400" />
                      )}
                    </span>
                  </div>

                  <div className="relative">
                    <FaLock className="absolute left-3 top-4 text-gray-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Parolni takrorlang"
                      value={repeatPassword}
                      onChange={(e) => setRepeatPassword(e.target.value)}
                      className="input-field pl-10 w-full rounded-md border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  {/* Submit Button */}
                  <button
                    type="button"
                    onClick={handleFormSubmit}
                    className="btn-primary w-full py-3  rounded-md text-white bg-blue-600 hover:bg-blue-700"
                  >
                    {isLogin ? "Kirish" : "Ro'yxatdan o'tish"}
                  </button>
                </form>
              </>
            )}

            {/* Switch between Login and Sign-Up */}
            <div className="text-center mt-4 flex justify-between">
              <span>
                {isLogin ? " Hisobinggiz yo'qmi" : "hisobingiz bormi "}
              </span>
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-blue-500 hover:underline"
              >
                {isLogin ? "Ro'yxatdan o'tish" : "Tizimga kirish"}
              </button>
            </div>
            <p className="text-gray-500 text-xs mt-4 text-center">
              Kirish orqali siz Foydalanuvchi shartlari va Maxfiylik siyosati
              bilan rozi bo'lasiz
            </p>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
