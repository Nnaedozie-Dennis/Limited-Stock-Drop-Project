import { Camera } from "lucide-react";

const Profile = () => {
  return (
    <>
      <div>
        <h1 className="text-3xl font-bold lg:text-4xl">Profile</h1>

        <p className="mt-2 text-gray-500">Manage your account information.</p>
      </div>

      <div className="mt-8 rounded-3xl border bg-white p-8 shadow-sm dark:bg-slate-900">
        <div className="flex flex-col items-center">
          <div className="relative">
            <img
              src="https://i.pravatar.cc/150?img=12"
              alt="Profile"
              className="h-28 w-28 rounded-full object-cover"
            />

            <button className="absolute bottom-0 right-0 rounded-full bg-black p-2 text-white dark:bg-white dark:text-black">
              <Camera size={16} />
            </button>
          </div>

          <h2 className="mt-4 text-xl font-semibold">Dennis</h2>

          <p className="text-gray-500">dennis@example.com</p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium">Full Name</label>

            <input
              type="text"
              defaultValue="Dennis"
              className="w-full rounded-2xl border p-4"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Email</label>

            <input
              type="email"
              defaultValue="dennis@example.com"
              className="w-full rounded-2xl border p-4"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Phone</label>

            <input
              type="text"
              placeholder="+234..."
              className="w-full rounded-2xl border p-4"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Address</label>

            <input
              type="text"
              placeholder="Lagos, Nigeria"
              className="w-full rounded-2xl border p-4"
            />
          </div>
        </div>

        <button className="mt-8 rounded-full bg-black px-8 py-4 text-white transition hover:opacity-90 dark:bg-white dark:text-black">
          Save Changes
        </button>
      </div>
    </>
  );
};

export default Profile;