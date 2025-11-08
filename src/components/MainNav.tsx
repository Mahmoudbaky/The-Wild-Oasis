import { NavLink } from "react-router";
import {
  HiOutlineCalendarDays,
  HiOutlineCog6Tooth,
  HiOutlineHome,
  HiOutlineHomeModern,
  HiOutlineUsers,
} from "react-icons/hi2";

function MainNav() {
  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-5 text-gray-600 text-base font-medium py-5 px-10 transition-all duration-300 ${
      isActive
        ? "text-gray-800 bg-gray-50 rounded-sm"
        : "hover:text-gray-800 hover:bg-gray-50 hover:rounded-sm"
    }`;

  const iconClasses = (isActive: boolean) =>
    `w-10 h-10 transition-all duration-300 ${
      isActive ? "text-brand-600" : "text-gray-400"
    }`;

  return (
    <nav>
      <ul className="flex flex-col gap-3">
        <li>
          <NavLink to="/dashboard" className={navLinkClasses}>
            {({ isActive }) => (
              <>
                <HiOutlineHome className={iconClasses(isActive)} />
                <span>Home</span>
              </>
            )}
          </NavLink>
        </li>
        <li>
          <NavLink to="/bookings" className={navLinkClasses}>
            {({ isActive }) => (
              <>
                <HiOutlineCalendarDays className={iconClasses(isActive)} />
                <span>Bookings</span>
              </>
            )}
          </NavLink>
        </li>
        <li>
          <NavLink to="/cabins" className={navLinkClasses}>
            {({ isActive }) => (
              <>
                <HiOutlineHomeModern className={iconClasses(isActive)} />
                <span>Cabins</span>
              </>
            )}
          </NavLink>
        </li>
        <li>
          <NavLink to="/users" className={navLinkClasses}>
            {({ isActive }) => (
              <>
                <HiOutlineUsers className={iconClasses(isActive)} />
                <span>Users</span>
              </>
            )}
          </NavLink>
        </li>
        <li>
          <NavLink to="/settings" className={navLinkClasses}>
            {({ isActive }) => (
              <>
                <HiOutlineCog6Tooth className={iconClasses(isActive)} />
                <span>Settings</span>
              </>
            )}
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default MainNav;
