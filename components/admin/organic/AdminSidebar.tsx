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
    <aside className="fixed left-0 top-0 h-screen w-64 bg-[#3d405b] text-white flex flex-col">
      <div className="p-6 border-b border-[#5a5d7a]">
        <Link href="/" className="block">
          <h1 className="text-xl font-semibold text-[#fff8f0]">AI Saved Me</h1>
          <p className="text-sm text-[#a1c9b5] mt-1">Admin Dashboard</p>
        </Link>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all ${
                  isActive(item.href)
                    ? "bg-[#e07a5f] text-white shadow-soft"
                    : "text-[#a1c9b5] hover:text-white hover:bg-[#5a5d7a]"
                }`}
              >
                <span className="font-medium">{item.label}</span>
                {item.badge && (
                  <span className="px-2 py-0.5 text-xs font-semibold bg-[#f2cc8f] text-[#3d405b] rounded-full">
                    {item.badge}
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-[#5a5d7a]">
        <div className="flex items-center gap-3 px-4 py-3 bg-[#5a5d7a] rounded-xl">
          <div className="w-10 h-10 bg-[#81b29a] rounded-full flex items-center justify-center">
            <span className="text-sm font-semibold text-white">AD</span>
          </div>
          <div>
            <p className="font-medium text-[#fff8f0] text-sm">Admin User</p>
            <p className="text-xs text-[#a1c9b5]">Admin</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
