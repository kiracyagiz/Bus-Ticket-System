'use client'

import React, { useEffect } from "react";
import { AuthContextProvider, useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import AdminSideBar from "../components/AdminSideBar";
import { useSearchParams } from "next/navigation";
import AdminTicketsComponent from "../components/Admin/AdminTicketsComponent";
import AdminTableComponent from "../components/Admin/AdminTableComponent";
import AdminDefaultComponent from "../components/Admin/AdminDefaultComponent";
import AdminEmployers from "../components/Admin/AdminEmployers";
import AdminBuses from "../components/Admin/AdminBuses";
import ProfileComponent from "../components/Profile/ProfileComponent";

function Admin({ params }) {
  const router = useRouter();
  const { user, logOut } = useAuth();
  const searchParams = useSearchParams();
  const search = searchParams.get("componentName");



  console.log(user,"user")
  useEffect(() => {
    if (!user || !user.uid) {
      router.push("/");
    }
  }, [user, router]);

  const logoutHandler = async () => {
    try {
      await logOut();
      router.push("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  let renderedComponent;

  switch (search) {
    case "allTickets":
      renderedComponent = <AdminTicketsComponent searchParams={searchParams} router={router} />;
      break;
    case "table":
      renderedComponent = <AdminTableComponent />;
      break;
    case "monthlyTickets":
      renderedComponent = <AdminTicketsComponent />;
      break;
    case "allEmployers":
      renderedComponent = <AdminEmployers searchParams={searchParams} />;
      break;
    case "allBuses":
      renderedComponent = <AdminBuses />;
      break;
    case "profile": 
        renderedComponent = <ProfileComponent/>
      break;
    default:
      renderedComponent = <AdminDefaultComponent/>
  }

  return (
    <div className="flex bg-gray-200">
      <AdminSideBar logoutHandler={logoutHandler} />
      <div className="flex  mx-auto min-h-screen">
      <div className="flex justify-center mx-auto min-h-screen ">{renderedComponent}</div>
      </div>
   
    </div>
  );
}

const AdminPage = () => {
  const router = useRouter();
  const params = router.query;
  return (
    <AuthContextProvider>
      <Admin params={params} />
    </AuthContextProvider>
  );
};

export default AdminPage;
