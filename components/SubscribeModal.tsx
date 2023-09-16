"use client";

import { Button, Modal } from "@/components";
import useSubscribeModal from "@/hooks/useSubscribeModal";
import { useUser } from "@/hooks/useUser";
import { postData } from "@/lib/helpers";
import { getStripe } from "@/lib/stripeClient";
import { Price, ProductWithPrice } from "@/types";
import { useState } from "react";
import toast from "react-hot-toast";
import { TbSquareCheckFilled } from "react-icons/tb";

interface SubscribeModalProps {
  products: ProductWithPrice[];
}

const SubscribeModal: React.FC<SubscribeModalProps> = ({ products }) => {
  const { isOpen, onClose } = useSubscribeModal();
  const { user, subscription, isLoading } = useUser();
  const [priceIdLoading, setPriceIdLoading] = useState<string>();

  let content = <div className="text-center">No products available</div>;

  const onChange = (open: boolean) => {
    if (!open) onClose();
  };

  const handleCheckout = async (price: Price) => {
    setPriceIdLoading(price.id);

    if (!user) {
      setPriceIdLoading(undefined);
      return toast.error("Login first to access subscriptions");
    }

    if (subscription) {
      setPriceIdLoading(undefined);
      return toast(
        "Thank you! You've already subscribed to Premium Membership",
      );
    }

    try {
      const { sessionId } = await postData({
        url: "/api/create-checkout-session",
        data: { price },
      });

      const stripe = await getStripe();
      stripe?.redirectToCheckout({ sessionId });
    } catch (error) {
      toast.error((error as Error)?.message);
    } finally {
      setPriceIdLoading(undefined);
    }
  };

  if (products.length) {
    content = (
      <div>
        {products.map((p) => {
          if (!p.prices?.length) {
            return <div key={p.id}>No prices available.</div>;
          }

          return p.prices.map((p) => (
            <Button
              onClick={() => handleCheckout(p)}
              disabled={isLoading || p.id === priceIdLoading}
              key={p.id}
              className="mb-4"
            >
              Subscribe for {formatPrice(p)} a {p.interval}
            </Button>
          ));
        })}
      </div>
    );
  }

  if (subscription) {
    content = (
      <div className="flexCenter mx-auto w-fit gap-1 rounded-lg bg-green-900/50 p-2 text-center">
        <p>Already subscribed. Enjoy!</p>
        <TbSquareCheckFilled
          className="text-green-500 shadow-green-500 drop-shadow-lg"
          size={24}
        />
      </div>
    );
  }

  return (
    <Modal
      title="Premium content"
      description="Listen to music using Premium Membership"
      isOpen={isOpen}
      onChange={onChange}
    >
      {content}
    </Modal>
  );
};

export default SubscribeModal;

const formatPrice = (price: Price) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: price.currency,
    minimumFractionDigits: 0,
  }).format((price?.unit_amount || 0) / 100);
