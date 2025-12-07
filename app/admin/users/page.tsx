"use client";

interface MockUser {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user";
  createdAt: string;
  storiesCount: number;
}

const mockUsers: MockUser[] = [
  {
    id: "user-001",
    name: "Lisa K.",
    email: "lisa.k@example.com",
    role: "user",
    createdAt: "2025-11-15",
    storiesCount: 2,
  },
  {
    id: "user-002",
    name: "David R.",
    email: "david.r@example.com",
    role: "user",
    createdAt: "2025-11-20",
    storiesCount: 1,
  },
  {
    id: "user-003",
    name: "Michael P.",
    email: "michael.p@example.com",
    role: "user",
    createdAt: "2025-11-25",
    storiesCount: 1,
  },
  {
    id: "user-004",
    name: "Admin User",
    email: "admin@aisavedme.com",
    role: "admin",
    createdAt: "2025-10-01",
    storiesCount: 0,
  },
  {
    id: "user-005",
    name: "Maria G.",
    email: "maria.g@example.com",
    role: "user",
    createdAt: "2025-12-01",
    storiesCount: 3,
  },
];

export default function AdminUsersPage() {
  const adminCount = mockUsers.filter((u) => u.role === "admin").length;
  const userCount = mockUsers.filter((u) => u.role === "user").length;

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-black">Users</h1>
        <p className="text-gray-500 mt-2">Manage registered users and their roles.</p>
      </div>

      <div className="flex gap-4 mb-8">
        <div className="px-4 py-2 bg-[#0066FF] border-3 border-black shadow-memphis-sm">
          <span className="font-display font-bold text-white">{mockUsers.length}</span>
          <span className="text-white ml-2">Total Users</span>
        </div>
        <div className="px-4 py-2 bg-[#FF1493] border-3 border-black shadow-memphis-sm">
          <span className="font-display font-bold text-white">{adminCount}</span>
          <span className="text-white ml-2">Admins</span>
        </div>
        <div className="px-4 py-2 bg-[#00FF7F] border-3 border-black shadow-memphis-sm">
          <span className="font-display font-bold text-black">{userCount}</span>
          <span className="text-black ml-2">Regular Users</span>
        </div>
      </div>

      <div className="bg-white border-3 border-black shadow-memphis-md overflow-hidden">
        <div className="px-6 py-4 bg-[#FFF9E6] border-b-3 border-black">
          <h2 className="font-display font-bold text-lg text-black">All Users</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-black">
                <th className="px-6 py-3 text-left text-xs font-display font-bold text-gray-500 uppercase tracking-wide">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-display font-bold text-gray-500 uppercase tracking-wide">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-display font-bold text-gray-500 uppercase tracking-wide">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-display font-bold text-gray-500 uppercase tracking-wide">
                  Joined
                </th>
                <th className="px-6 py-3 text-left text-xs font-display font-bold text-gray-500 uppercase tracking-wide">
                  Stories
                </th>
              </tr>
            </thead>
            <tbody className="divide-y-2 divide-gray-200">
              {mockUsers.map((user) => (
                <tr key={user.id} className="hover:bg-[#FFF9E6] transition-colors">
                  <td className="px-6 py-4">
                    <span className="font-body font-bold text-black">{user.name}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-body text-gray-700">{user.email}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-block px-3 py-1 text-xs font-display font-bold border-2 border-black transform -rotate-1 ${
                        user.role === "admin"
                          ? "bg-[#FF1493] text-white"
                          : "bg-[#0066FF] text-white"
                      }`}
                    >
                      {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-body text-gray-500">{user.createdAt}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-display font-bold text-black">{user.storiesCount}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
