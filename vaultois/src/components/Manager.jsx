import React from "react";
import { useState, useEffect, useRef } from "react";
import { ToastContainer, toast, Bounce } from "react-toastify";
// import LottieAnimatedIcon from "./LottieAnimatedIcon";
import { v4 as uuidv4 } from "uuid";
// import AnimatedIcon from "./AnimatedIcon";
import AnimatedIcon from "./AnimatedIcon2.jsx";
import { useHeight } from "../../context/heightContext.js";
import Logo from "./Logo.jsx";

const Manager = () => {
  const emptyForm = { site: "", username: "", password: "" };
  const eyeRef = useRef();
  const passwordRef = useRef();
  const [form, setForm] = useState(emptyForm);
  const [passwordArray, setPasswordArray] = useState([]);
  const { navbarHeight, footerHeight } = useHeight();
  const [contentMinHeight, setContentMinHeight] = useState("100vh");
  const [showpassword, setShowpassword] = useState(false);

  useEffect(() => {
    let minHeight = `calc(100vh - ${navbarHeight}px - ${footerHeight}px)`;
    setContentMinHeight(minHeight);
  }, [navbarHeight, footerHeight]);

  /* ---------------------------------------------------------------------------------------------------------------------------- */

  // Show Password
  const showPassword = () => {
    if (eyeRef.current.src.includes("icons/eye-close.svg")) {
      eyeRef.current.src = "icons/eye-open.svg";
      setShowpassword(true);
    } else {
      eyeRef.current.src = "icons/eye-close.svg";
      setShowpassword(false);
    }
  };

  /* --------------------------------------------------------Local Storage------------------------------------------------------- */

  // Local Storage
  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    if (passwords) {
      setPasswordArray(JSON.parse(passwords));
    }
  }, []);

  // Local Storage
  const savePassword = () => {
    if (form.id) {
      let item = passwordArray.filter((item) => item.id == form.id)[0];
      item.username = form.username;
      item.password = form.password;
      let passwordArr = [...passwordArray.filter((i) => i.id != form.id), item];
      setPasswordArray(passwordArr);
      setForm(emptyForm);
      localStorage.setItem("passwords", JSON.stringify(passwordArr));
      toast("Password saved successfully!");
    } else if (form.site && form.username && form.password) {
      let formWithId = { ...form, id: uuidv4() };
      setPasswordArray([...passwordArray, formWithId]);
      localStorage.setItem(
        "passwords",
        JSON.stringify([...passwordArray, formWithId])
      );
      toast("Password saved successfully!");
    }
  };

  // Local Storage
  const editPassword = (id) => {
    let formWithId = passwordArray.filter((item) => item.id == id)[0];
    setForm(formWithId);
  };

  // Local Storage
  const deletePassword = (id) => {
    let confirmation = confirm("Do you really want to delete the credentials?");
    if (confirmation) {
      let passwordArr = passwordArray.filter((item) => item.id != id);
      setPasswordArray(passwordArr);
      localStorage.setItem("passwords", JSON.stringify(passwordArr));
      toast("Password deleted successfully!");
    }
  };

  /* -----------------------------------------------------------MongoDB---------------------------------------------------------- */

  // const getPasswords = async () => {
  //   let res = await fetch("http://localhost:3003/passwords");
  //   let passwords = await res.json();
  //   setPasswordArray(passwords);
  // };

  // useEffect(() => {
  //   getPasswords();
  // }, []);

  // const savePassword = async () => {
  //   if (form.id) {
  //     let item = passwordArray.filter((item) => item.id == form.id)[0];
  //     item.site = form.site;
  //     item.username = form.username;
  //     item.password = form.password;
  //     let passwordArr = [...passwordArray.filter((i) => i.id != form.id), item];
  //     const res = await fetch("http://localhost:3003/passwords/" + form.id, {
  //       method: "PUT",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(item),
  //     });
  //     setPasswordArray(passwordArr);
  //     setForm(emptyForm);
  //     toast("Password updated successfully!");
  //   } else if (form.site && form.username && form.password) {
  //     let formWithId = { ...form, id: uuidv4() }; //////// <--------
  //     let res = await fetch("http://localhost:3003/save-password", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(formWithId),
  //     });
  //     setPasswordArray([...passwordArray, formWithId]);
  //     setForm(emptyForm);
  //     toast("Password saved successfully!");
  //   } else {
  //     toast("Please fill all the fields");
  //   }
  // };

  // const editPassword = (id) => {
  //   let formWithId = passwordArray.filter((item) => item.id == id)[0];
  //   setForm(formWithId);
  // };

  // const deletePassword = async (id) => {
  //   let confirmation = confirm("Do you really want to delete the credentials?");
  //   if (confirmation) {
  //     let passwordArr = passwordArray.filter((item) => item.id != id);
  //     let res = await fetch("http://localhost:3003/passwords/" + id, {
  //       method: "DELETE",
  //       headers: { "Content-Type": "application/json" },
  //     });
  //     setPasswordArray(passwordArr);
  //     toast("Password deleted successfully!");
  //   }
  // };

  /* ---------------------------------------------------------------------------------------------------------------------------- */

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const copyText = (text) => {
    toast("Copied to clipboard!");
    navigator.clipboard.writeText(text);
  };

  return (
    <div style={{ minHeight: contentMinHeight }}>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]"></div>{" "}
      <div className="container mx-auto pb-20 justify-center max-w-7xl body-margin-padding px-5 sm:px-10">
        <Logo height={70} />
        <p className="text-blue-900 font-light font-sans text-center my-2">
          Your own Password Manager
        </p>
        <div className="flex flex-col gap-4 my-10 items-center">
          <input
            value={form.site}
            onChange={handleChange}
            className="border border-blue-300 rounded-2xl px-4 py-0.5 w-full"
            placeholder="Enter Website URL"
            type="text"
            name="site"
            id="site"
          />
          <div className="flex flex-col sm:flex-row gap-4 w-full">
            <input
              value={form.username}
              onChange={handleChange}
              className="border border-blue-300 rounded-2xl px-4 py-0.5 w-full"
              placeholder="Enter Username"
              type="text"
              name="username"
              id="username"
            />
            <div className="flex relative w-full items-center">
              <input
                ref={passwordRef}
                value={form.password}
                onChange={handleChange}
                className="border border-blue-300 rounded-2xl px-4 py-0.5 w-full"
                placeholder="Enter Password"
                type={showpassword ? "text" : "password"}
                name="password"
                id="password"
              />
              <span
                className="absolute right-3 cursor-pointer"
                onClick={showPassword}
              >
                <img ref={eyeRef} width={25} src="icons/eye-close.svg" alt="" />
              </span>
            </div>
          </div>
          <button
            onClick={savePassword}
            className="flex gap-2 justify-center items-center w-fit bg-blue-300 px-4 py-2 hover:bg-blue-200 rounded-full cursor-pointer"
          >
            <lord-icon
              src="https://cdn.lordicon.com/efxgwrkc.json"
              trigger="hover"
              style={{ width: "25px", height: "25px", cursor: "pointer" }}
            ></lord-icon>
            <span>Save Password</span>
          </button>
        </div>
        <div className="passwords">
          <h2 className="text-2xl font-bold mb-4">
            Your <span className="text-blue-900">Passwords</span>
          </h2>
          {passwordArray.length === 0 && <div>No Passwords to show</div>}
          {passwordArray.length !== 0 && (
            <table className="table-fixed w-full rounded-md overflow-hidden">
              <thead className="bg-blue-300 text-blue-900">
                <tr>
                  <th className="py-0.5 md:py-2 text-sm sm:text-[16px]">
                    Website
                  </th>
                  <th className="py-0.5 md:py-2 text-sm sm:text-[16px]">
                    Username
                  </th>
                  <th className="py-0.5 md:py-2 text-sm sm:text-[16px]">
                    Password
                  </th>
                  <th className="py-0.5 md:py-2 text-sm sm:text-[16px] w-2/12">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {passwordArray.map((item) => {
                  return (
                    <tr key={item.id} className="group">
                      <td className="py-0.5 md:py-2 border border-white bg-blue-100 px-2.5">
                        <div className="flex justify-between items-center">
                          <a
                            className="truncate overflow-hidden whitespace-nowrap max-w-[200px] block"
                            href={item.site}
                            target="_blank"
                          >
                            <span>{item.site}</span>
                          </a>
                          <div className="opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-400">
                            <AnimatedIcon
                              src="https://animatedicons.co/get-icon?name=copy&style=minimalistic&token=047dcf87-b84c-41c5-b2c6-5d33d94222ee"
                              height={25}
                              width={25}
                              onClick={() => copyText(item.site)}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="py-0.5 md:py-2 border border-white bg-blue-100 px-2.5">
                        <div className="flex justify-between items-center">
                          <span className="truncate overflow-hidden whitespace-nowrap max-w-[200px] block">
                            {item.username}
                          </span>
                          <div className="opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-400">
                            <AnimatedIcon
                              src="https://animatedicons.co/get-icon?name=copy&style=minimalistic&token=047dcf87-b84c-41c5-b2c6-5d33d94222ee"
                              height={25}
                              width={25}
                              onClick={() => copyText(item.username)}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="py-0.5 md:py-2 border border-white bg-blue-100 px-2.5">
                        <div className="flex justify-between items-center">
                          <span className="truncate overflow-hidden whitespace-nowrap max-w-[200px] block">
                            {"•".repeat(item.password.length)}
                          </span>
                          <div className="opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-400">
                            <AnimatedIcon
                              src="https://animatedicons.co/get-icon?name=copy&style=minimalistic&token=047dcf87-b84c-41c5-b2c6-5d33d94222ee"
                              height={25}
                              width={25}
                              onClick={() => copyText(item.password)}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="py-0.5 md:py-2 border border-white bg-blue-100 px-2.5">
                        <div className="opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-400 flex justify-center items-center space-x-2">
                          <AnimatedIcon
                            src="https://animatedicons.co/get-icon?name=edit&style=minimalistic&token=bef79568-d828-4e67-a904-60a1bb446375"
                            height={25}
                            width={25}
                            onClick={() => editPassword(item.id)}
                          />
                          <AnimatedIcon
                            src="https://animatedicons.co/get-icon?name=delete&style=minimalistic&token=c1352b7b-2e14-4124-b8fd-a064d7e44225"
                            height={25}
                            width={25}
                            onClick={() => deletePassword(item.id)}
                          />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Manager;
