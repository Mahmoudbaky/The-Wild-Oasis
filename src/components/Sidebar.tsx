import Logo from "./Logo";
import MainNav from "./MainNav";

function Sidebar() {
  return (
    <aside className="bg-gray-0 py-14 px-10 border-r border-gray-100 row-span-full flex flex-col gap-14">
      <Logo />
      <MainNav />
    </aside>
  );
}

export default Sidebar;
