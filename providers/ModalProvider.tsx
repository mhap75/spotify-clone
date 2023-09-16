"use client";

import { AuthModal, SubscribeModal, UploadModal } from "@/components";
import { ProductWithPrice } from "@/types";
import { useEffect, useState } from "react";

interface ModalProvideProps {
  products: ProductWithPrice[];
}

const ModalProvider: React.FC<ModalProvideProps> = ({ products }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <AuthModal />
      <UploadModal />
      <SubscribeModal products={products} />
    </>
  );
};

export default ModalProvider;
