import { Outlet } from "react-router";
import Header from "./Header";
import SideBar from "./SideBar";

const AppLayout = () => {
  return (
    <div className="grid grid-cols-[26rem_1fr] grid-rows-[auto_1fr] h-screen">
      <Header />
      <SideBar />
      <main className="bg-gray-50 py-16 px-20 pb-28">
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
