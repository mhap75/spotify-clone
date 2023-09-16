"use client";
import { Button } from "@/components";
import useSubscribeModal from "@/hooks/useSubscribeModal";
import { useUser } from "@/hooks/useUser";
import { postData } from "@/lib/helpers";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const AccountContent = () => {
  const router = useRouter();
  const { onOpen } = useSubscribeModal();
  const { user, isLoading, subscription } = useUser();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/");
    }
  }, [user, isLoading, router]);

  const redirectToCustomerPortal = async () => {
    setLoading(true);
    try {
      const { url, error } = await postData({
        url: "/api/create-portal-link",
      });
      window.location.assign(url);
    } catch (e: any) {
      toast.error((e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-7 px-6">
      {subscription ? (
        <div className="flexCol gap-y-4">
          <p>
            Current plan:
            <strong> {subscription?.prices?.products?.name}</strong>
          </p>
          <Button
            disabled={loading || isLoading}
            onClick={redirectToCustomerPortal}
            className="w-[300px]"
          >
            Open customer portal
          </Button>
        </div>
      ) : (
        <div className="flexCol gap-y-4">
          <p>No active plan.</p>
          <Button onClick={onOpen} className="w-[300px]">
            Subscribe
          </Button>
        </div>
      )}
    </div>
  );
};
export default AccountContent;
