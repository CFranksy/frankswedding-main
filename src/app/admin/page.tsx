"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const password = process.env.NEXT_PUBLIC_ADMIN_PWD;
const localStorageKey = "WEDDING_ADMIN_LOGGED_IN";
const loggedInAddress = "/admin/logged-in";

const AdminPage = () => {
  const router = useRouter();
  const [adminPassword, setAdminPassword] = useState<string>("");
  const [isCorrect, setCorrect] = useState<"pending" | "success" | "fail">(
    "pending"
  );

  useEffect(() => {
    if (localStorage.getItem(localStorageKey)) {
      router.replace(loggedInAddress);
    }
  }, []);

  const checkPassword = () => {
    const checkIsCorrect = adminPassword === password;

    if (checkIsCorrect) {
      localStorage.setItem(localStorageKey, "true");
    }
    setCorrect(() => (checkIsCorrect ? "success" : "fail"));
  };

  useEffect(() => {
    if (isCorrect === "success") {
      router.replace(loggedInAddress);
    }
  }, [isCorrect]);

  return (
    <section className="bg-blush h-screen w-screen grid place-items-center">
      <div className="bg-white sm:w-2/5 w-5/6 shadow-lg shadow-slate-900 rounded-lg flex flex-col gap-5 items-center overflow-auto py-4 px-10">
        <h3 className="text-2xl text-blush">Login to the admin page</h3>
        <input
          type="password"
          name=""
          id=""
          placeholder="Enter Password"
          className={`focus:outline-none w-full text-2xl text-blush border py-2 px-4 rounded-lg ${
            isCorrect === "success" ? "border-green-400" : "border-red-400"
          }`}
          onFocus={() => setCorrect("pending")}
          onChange={(e) => setAdminPassword(e.target.value)}
          value={adminPassword}
        />
        {isCorrect === "fail" && (
          <div className="text-red-400"> Incorrect Password </div>
        )}
        <button
          onClick={checkPassword}
          className="bg-emerald-600 p-4 text-white w-full rounded-lg"
        >
          Submit
        </button>
      </div>
    </section>
  );
};

export default AdminPage;
