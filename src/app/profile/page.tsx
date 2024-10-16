import ProfileForm from "@/components/ProfileForm";
import { wixClientServer } from "@/lib/wixClientServer";
import { members } from "@wix/members";
import Link from "next/link";
import { format } from "timeago.js";

const ProfilePage = async () => {
  const wixClient = await wixClientServer();

  const user = await wixClient.members.getCurrentMember({
    fieldsets: [members.Set.FULL],
  });

  if (!user.member?.contactId) {
    return <div className="">Not logged in!</div>;
  }
  // console.log(user);

  const orderRes = await wixClient.orders.searchOrders({
    search: {
      filter: { "buyerInfo.contactId": { $eq: user.member?.contactId } },
    },
  });

  return (
    <div className="flex flex-col md:flex-row gap-24 md:h-[calc(100vh-180px)] mb-20 items-center px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
      <ProfileForm user={user} />
      <div className="w-full md:w-1/2">
        <h1 className="text-2xl">Orders</h1>
        <div className="mt-12 flex flex-col">
          {orderRes.orders.map((order) => (
            <Link
              href={`/orders/${order._id}`}
              key={order._id}
              className="flex justify-between px-2 py-6 rounded-md hover:bg-green-50 even:bg-slate-100"
            >
              <span className="w-1/4">{order._id?.substring(0, 10)}...</span>
              <span className="w-1/4">
                ₦{order.priceSummary?.subtotal?.amount}
              </span>
              {order._createdDate && (
                <span className="w-1/4">{format(order._createdDate)}</span>
              )}
              <span className="w-1/4">{order.status}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
