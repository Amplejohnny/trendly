"use client";

import { updateUser } from "@/lib/actions";
import UpdateButton from "@/components/UpdateButton";
import { members } from "@wix/members";
import { useState } from "react";
import { wixClientServer } from "@/lib/wixClientServer";

const ProfileForm = async () => {
  const wixClient = await wixClientServer();

  const user = await wixClient.members.getCurrentMember({
    fieldsets: [members.Set.FULL],
  });

  const [email, setEmail] = useState(user.member?.loginEmail || "");
  const [username, setUsername] = useState(
    user.member?.profile?.nickname || ""
  );
  const [firstName, setFirstName] = useState(
    user.member?.contact?.firstName || ""
  );
  const [lastName, setLastName] = useState(
    user.member?.contact?.lastName || ""
  );
  const [phone, setPhone] = useState(
    user.member?.contact?.phones && user.member?.contact?.phones[0]
  );

  return (
    <div className="w-full md:w-1/2">
      <h1 className="text-2xl">Profile</h1>
      <form action={updateUser} className="mt-12 flex flex-col gap-4">
        <input
          type="text"
          hidden
          name="id"
          value={user.member?.contactId || ""}
        />
        <label className="text-sm text-gray-700">Username</label>
        <input
          type="text"
          name="username"
          title="Username"
          placeholder={username || "john"}
          onChange={(e) => setUsername(e.target.value)}
          className="ring-1 ring-gray-300 rounded-md p-2 max-w-96"
        />
        <label className="text-sm text-gray-700">First Name</label>
        <input
          type="text"
          name="firstName"
          placeholder={firstName || "john"}
          onChange={(e) => setFirstName(e.target.value)}
          className="ring-1 ring-gray-300 rounded-md p-2 max-w-96"
        />
        <label className="text-sm text-gray-700">Surname</label>
        <input
          type="text"
          name="lastName"
          placeholder={lastName || "doe"}
          onChange={(e) => setLastName(e.target.value)}
          className="ring-1 ring-gray-300 rounded-md p-2 max-w-96"
        />
        <label className="text-sm text-gray-700">Phone</label>
        <input
          type="text"
          name="phone"
          placeholder={phone || "+2348012345678"}
          onChange={(e) => setPhone(e.target.value)}
          className="ring-1 ring-gray-300 rounded-md p-2 max-w-96"
        />
        <label className="text-sm text-gray-700">E-mail</label>
        <input
          type="email"
          name="email"
          title="Email"
          placeholder={email || "john"}
          onChange={(e) => setEmail(e.target.value)}
          className="ring-1 ring-gray-300 rounded-md p-2 max-w-96"
        />
        <UpdateButton />
      </form>
    </div>
  );
};

export default ProfileForm;

// AUTH WITH WIX-MANAGED AUTH SERVICE with OAuth2 (google, facebook, email)

// const wixClient = useWixClient();

// const login = async () => {
//   const loginRequestData = wixClient.auth.generateOAuthData(
//     "http://localhost:3000"
//   );

//   console.log(loginRequestData);

//   localStorage.setItem("oAuthRedirectData", JSON.stringify(loginRequestData));
//   const { authUrl } = await wixClient.auth.getAuthUrl(loginRequestData);
//   window.location.href = authUrl;
// };
