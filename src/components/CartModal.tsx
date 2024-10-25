"use client";

import Image from "next/image";
import { useCartStore } from "@/hooks/useCartStore";
import { media as wixMedia } from "@wix/sdk";
import { useWixClient } from "@/hooks/useWixClient";
import { currentCart } from "@wix/ecom";
import { useRouter } from "next/navigation";

const CartModal = () => {
  const wixClient = useWixClient();
  const isLoggedIn = wixClient.auth.loggedIn();
  const { cart, isLoading, removeItem } = useCartStore();
  const router = useRouter();

  const calculateSubtotal = () => {
    return (
      cart.lineItems?.reduce((total, item) => {
        const quantity = item.quantity ?? 0;
        const priceAmount = item.price?.amount ?? 0;
        const itemTotal = Number(quantity) * Number(priceAmount);
        return total + itemTotal;
      }, 0) || 0
    );
  };

  const handleCheckout = async () => {
    if (isLoggedIn) {
      try {
        const checkout =
          await wixClient.currentCart.createCheckoutFromCurrentCart({
            channelType: currentCart.ChannelType.WEB,
          });

        const { redirectSession } =
          await wixClient.redirects.createRedirectSession({
            ecomCheckout: { checkoutId: checkout.checkoutId },
            callbacks: {
              postFlowUrl: window.location.origin,
              thankYouPageUrl: `${window.location.origin}/success`,
            },
          });

        if (redirectSession?.fullUrl) {
          window.location.href = redirectSession.fullUrl;
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      router.push("/login");
    }
  };

  return (
    <div className="w-full max-w-[90vw] md:w-max max-h-[70vh] overflow-y-auto p-4 rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)] bg-white top-20 right-4 fixed flex flex-col gap-6 z-20">
      {!cart.lineItems ? (
        <div className="text-center">Cart is Empty</div>
      ) : (
        <>
          <h2 className="text-xl text-center md:text-start">Shopping Cart</h2>

          {/* LIST */}
          <div className="flex flex-col gap-6 md:gap-8">
            {cart.lineItems.map((item) => (
              <div className="flex items-start gap-4" key={item._id}>
                {/* Image only on larger screens */}
                {item.image && (
                  <div className="hidden md:block">
                    <Image
                      src={wixMedia.getScaledToFillImageUrl(
                        item.image,
                        72,
                        96,
                        {}
                      )}
                      alt=""
                      width={72}
                      height={96}
                      className="object-cover rounded-md"
                    />
                  </div>
                )}
                <div className="flex flex-col justify-between w-full">
                  {/* Product Details */}
                  <div>
                    <div className="flex items-center justify-between md:gap-8">
                      <h3 className="font-semibold text-sm md:text-base">
                        {item.productName?.original}
                      </h3>
                      <div className="md:p-1 bg-gray-100 rounded px-2 py-1 items-center flex md:gap-2 gap-2 md:text-base text-xs font-medium">
                        {item.quantity && item.quantity > 1 && (
                          <div className="text-xs text-green-400">
                            {item.quantity} x{" "}
                          </div>
                        )}
                        ₦{item.price?.amount}
                      </div>
                    </div>
                    <div className="text-xs md:text-sm text-gray-500">
                      {item.availability?.status}
                    </div>
                  </div>
                  {/* Quantity and Remove */}
                  <div className="flex justify-between items-center text-xs mt-1">
                    <span className="text-gray-500">Qty. {item.quantity}</span>
                    <span
                      className="text-red-500 cursor-pointer"
                      style={{ cursor: isLoading ? "not-allowed" : "pointer" }}
                      onClick={() => removeItem(wixClient, item._id!)}
                    >
                      Remove
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Subtotal and Actions */}
          <div className="border-t pt-1">
            <div className="flex items-center justify-between font-semibold">
              <span>Subtotal</span>
              <span>₦{calculateSubtotal()}</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Shipping and taxes calculated at checkout.
            </p>
            <div className="flex gap-2 mt-4">
              <button
                disabled={isLoading || !cart.lineItems?.length}
                className="flex-1 rounded-md py-2 px-3 ring-1 ring-gray-300 text-sm font-medium disabled:cursor-not-allowed disabled:opacity-75"
              >
                View Cart
              </button>
              <button
                className="flex-1 rounded-md py-2 px-3 bg-black text-white text-sm font-medium disabled:cursor-not-allowed disabled:opacity-75"
                disabled={isLoading || !cart.lineItems?.length}
                onClick={handleCheckout}
              >
                Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CartModal;
