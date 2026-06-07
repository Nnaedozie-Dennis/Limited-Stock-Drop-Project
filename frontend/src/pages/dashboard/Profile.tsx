import { Camera } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../../context/AuthContext";
// import type { ChangeEvent } from "react";

const Profile = () => {
  const { user } = useAuth();

  const [profile, setProfile] = useState({
    full_name: "",
    email: "",
    phone: "",
    address: "",
    avatar_url: "",
  });

  useEffect(() => {
  const fetchProfile = async () => {
    if (!user) return;

    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    setProfile({
      full_name: data.full_name || "",
      email: data.email || "",
      phone: data.phone || "",
      address: data.address || "",
      avatar_url: data.avatar_url || "",
    });
  };

  fetchProfile();
}, [user]);


const saveProfile = async () => {
  if (!user) return;

  const { data, error } = await supabase
    .from("profiles")
    .update({
      full_name: profile.full_name,
      phone: profile.phone,
      address: profile.address,
    })
    .eq("id", user.id)
    .select()
    .single();

  if (error) {
    console.log(error.message);
    return;
  }

  setProfile(data);
  alert("Profile updated");
};

const uploadAvatar = async (event: React.ChangeEvent<HTMLInputElement>) => {
  if (!event.target.files?.[0] || !user) return;

  const file = event.target.files[0];

  const fileExt = file.name.split(".").pop();

  const fileName = `${user.id}.${fileExt}`;

  const { error } = await supabase.storage
    .from("avatars")
    .upload(fileName, file, {
      upsert: true,
    });
    console.log(user);
    console.log(fileName);

  if (error) {
    console.log(error.message);
    return;
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from("avatars").getPublicUrl(fileName);

  await supabase
    .from("profiles")
    .update({
      avatar_url: publicUrl,
    })
    .eq("id", user.id);

  setProfile({
    ...profile,
    avatar_url: publicUrl,
  });
};


  return (
    <>
      <div>
        <h1 className="text-3xl font-bold lg:text-4xl">Profile</h1>

        <p className="mt-2 text-gray-500">Manage your account information.</p>
      </div>

      <div className="mt-8 rounded-3xl border bg-white p-8 shadow-sm dark:bg-slate-900">
        <div className="flex flex-col items-center">
          <div className="relative">
            {profile?.avatar_url ? (
              <img
                src={profile.avatar_url}
                alt="avatar"
                className="h-28 w-28 rounded-full object-cover"
              />
            ) : (
              <div className="flex h-28 w-28 items-center justify-center rounded-full bg-gray-200 font-semibold">
                {user?.user_metadata?.full_name?.charAt(0).toUpperCase()}
              </div>
            )}
            {/* <img
              src={
                profile.avatar_url || "https://ui-avatars.com/api/?name=User"
              }
              alt="Profile"
              className="h-28 w-28 rounded-full object-cover"
            /> */}

            {/* <button className="absolute bottom-0 right-0 rounded-full bg-black p-2 text-white dark:bg-white dark:text-black">
              <Camera size={16} />
            </button> */}

            <label className="absolute bottom-0 right-0 cursor-pointer rounded-full bg-black p-2 text-white dark:bg-white dark:text-black">
              <Camera size={16} />

              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={uploadAvatar}
              />
            </label>
          </div>

          <h2 className="mt-4 text-xl font-semibold">{profile?.full_name}</h2>

          <p className="text-gray-500">{profile?.email}</p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium">Full Name</label>

            <input
              type="text"
              value={profile.full_name}
              onChange={(e) =>
                setProfile({ ...profile, full_name: e.target.value })
              }
              className="w-full rounded-2xl border p-4"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Email</label>

            <input
              type="email"
              value={profile.email}
              disabled
              className="w-full rounded-2xl border p-4 opacity-60"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Phone</label>

            <input
              type="text"
              value={profile.phone}
              onChange={(e) =>
                setProfile({ ...profile, phone: e.target.value })
              }
              className="w-full rounded-2xl border p-4"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Address</label>

            <input
              type="text"
              value={profile.address}
              onChange={(e) =>
                setProfile({ ...profile, address: e.target.value })
              }
              className="w-full rounded-2xl border p-4"
            />
          </div>
        </div>

        <button
          onClick={saveProfile}
          className="mt-8 rounded-full bg-black px-8 py-4 text-white transition hover:opacity-90 dark:bg-white dark:text-black cursor-pointer"
        >
          Save Changes
        </button>
      </div>
    </>
  );
};

export default Profile;