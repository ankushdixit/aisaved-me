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
    <aside className="fixed left-0 top-0 h-screen w-64 bg-[#1a1a1a] text-white flex flex-col">
      <div className="p-6 border-b border-[#2a2a2a]">
        <Link href="/" className="block">
          <h1 className="text-xl font-medium text-[#faf8f5]">AI Saved Me</h1>
          <p className="text-sm text-[#6b6b6b] mt-1">Admin Dashboard</p>
        </Link>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`flex items-center justify-between px-4 py-3 transition-all ${
                  isActive(item.href)
                    ? "bg-[#faf8f5] text-[#1a1a1a]"
                    : "text-[#6b6b6b] hover:text-[#faf8f5] hover:bg-[#2a2a2a]"
                }`}
              >
                <span className="font-medium">{item.label}</span>
                {item.badge && (
                  <span className="px-2 py-0.5 text-xs font-medium bg-[#c41e3a] text-white rounded">
                    {item.badge}
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-[#2a2a2a]">
        <div className="flex items-center gap-3 px-4 py-3">
          <div className="w-10 h-10 bg-[#2a2a2a] rounded-full flex items-center justify-center border border-[#3a3a3a]">
            <span className="text-sm text-[#faf8f5]">AD</span>
          </div>
          <div>
            <p className="font-medium text-[#faf8f5] text-sm">Admin User</p>
            <p className="text-xs text-[#6b6b6b]">Admin</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
