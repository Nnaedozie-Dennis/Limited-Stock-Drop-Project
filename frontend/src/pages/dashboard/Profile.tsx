const Profile = () => {
  return (
    <>
      <h1 className="text-4xl font-bold">Profile</h1>

      <div className="mt-8 rounded-3xl bg-white p-6 shadow-sm dark:bg-slate-900">
        <div className="space-y-6">
          <input
            defaultValue="John Doe"
            className="w-full rounded-2xl border p-4"
          />

          <input
            defaultValue="john@example.com"
            className="w-full rounded-2xl border p-4"
          />

          <button className="rounded-full bg-black px-8 py-4 text-white dark:bg-white dark:text-black">
            Save Changes
          </button>
        </div>
      </div>
    </>
  );
};

export default Profile;
