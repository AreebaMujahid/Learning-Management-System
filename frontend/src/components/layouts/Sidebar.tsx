import { NavLink } from "react-router-dom";
import { NAV_ITEMS } from "../../configs/navigation";
import { cn } from "@/lib/utils";

export const Sidebar = () => {
  return (
    <aside className="w-64 bg-white border-r border-slate-200 p-6 hidden md:flex flex-col">
      <div className="text-2xl font-bold text-indigo-600 mb-10 px-2">
        LMS Admin
      </div>

      <nav className="space-y-2 flex-1">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              cn(
                "flex items-center space-x-3 p-2 rounded-lg transition-colors",
                isActive
                  ? "bg-indigo-50 text-indigo-600 font-medium"
                  : "text-slate-600 hover:bg-slate-50 hover:text-indigo-600",
              )
            }
          >
            <item.icon size={20} />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};
