"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItem {
  label: string;
  href: string;
  badge?: number;
}

const navItems: NavItem[] = [
  { label: "Dashboard", href: "/admin" },
  { label: "Stories", href: "/admin/stories", badge: 12 },
  { label: "Users", href: "/admin/users" },
];

export function AdminSidebar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/admin") {
      return pathname === "/admin";
    }
    return pathname.startsWith(href);
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-black text-white flex flex-col">
      <div className="p-6 border-b border-gray-800">
        <Link href="/" className="block">
          <h1 className="font-display text-xl font-bold text-white">AI Saved Me</h1>
          <p className="text-sm text-gray-400 mt-1">Admin Dashboard</p>
        </Link>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`flex items-center justify-between px-4 py-3 transition-all ${
                  isActive(item.href)
                    ? "bg-[#0066FF] text-white shadow-memphis-sm"
                    : "text-gray-400 hover:text-white hover:bg-gray-800"
                }`}
              >
                <span className="font-body font-medium">{item.label}</span>
                {item.badge && (
                  <span className="px-2 py-0.5 text-xs font-bold bg-[#FFD700] text-black rounded-full border-2 border-black">
                    {item.badge}
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-800">
        <div className="flex items-center gap-3 px-4 py-3 bg-gray-900">
          <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center">
            <span className="text-sm font-bold">AD</span>
          </div>
          <div>
            <p className="font-body font-medium text-white text-sm">Admin User</p>
            <p className="text-xs text-gray-400">Admin</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
