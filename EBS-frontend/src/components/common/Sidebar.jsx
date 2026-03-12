import { NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const customerLinks = [
  { path:"/dashboard",        label:"Dashboard",        icon:"bi-house-door-fill",          group:"main"    },
  { path:"/accounts",         label:"Accounts",         icon:"bi-credit-card-2-front-fill",  group:"main"    },
  { path:"/transactions",     label:"Transactions",     icon:"bi-list-ul",                   group:"main"    },
  { path:"/transfer",         label:"Fund Transfer",    icon:"bi-arrow-left-right",          group:"banking" },
  { path:"/beneficiaries",    label:"Beneficiaries",    icon:"bi-people-fill",               group:"banking" },
  { path:"/deposits",         label:"Fixed Deposits",   icon:"bi-safe2",                     group:"banking" },
  { path:"/statements",       label:"Statements",       icon:"bi-file-earmark-text-fill",    group:"banking" },
  { path:"/atm",              label:"Virtual ATM",      icon:"bi-building-fill",             group:"banking" },
  { path:"/profile/update",   label:"Update Profile",   icon:"bi-person-gear",               group:"profile" },
  { path:"/profile/password", label:"Change Password",  icon:"bi-shield-lock-fill",          group:"profile" },
];

const adminLinks = [
  { path:"/admin/customers/create", label:"Create Customer", icon:"bi-person-plus-fill" },
];

const groups = [
  { key:"main",    label:"Overview" },
  { key:"banking", label:"Banking"  },
  { key:"profile", label:"Profile"  },
];

export default function Sidebar() {
  const { auth } = useAuth();
  const isAdmin = auth?.roles?.includes("ROLE_ADMIN");

  return (
    <aside className="warm-sidebar">
      {groups.map((group) => (
        <div key={group.key} className="warm-sidebar-group">
          <div className="warm-sidebar-label">{group.label}</div>
          {customerLinks.filter((l) => l.group === group.key).map((link) => (
            <NavLink key={link.path} to={link.path}
              className={({ isActive }) => "warm-sidebar-link" + (isActive ? " active" : "")}>
              <span className="warm-sidebar-icon"><i className={`bi ${link.icon}`} /></span>
              <span>{link.label}</span>
            </NavLink>
          ))}
        </div>
      ))}

      {isAdmin && (
        <div className="warm-sidebar-group">
          <div className="warm-sidebar-label admin-label"><i className="bi bi-shield-fill-check me-1" />Admin</div>
          {adminLinks.map((link) => (
            <NavLink key={link.path} to={link.path}
              className={({ isActive }) => "warm-sidebar-link admin-link" + (isActive ? " active" : "")}>
              <span className="warm-sidebar-icon"><i className={`bi ${link.icon}`} /></span>
              <span>{link.label}</span>
            </NavLink>
          ))}
        </div>
      )}
    </aside>
  );
}
