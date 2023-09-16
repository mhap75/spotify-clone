"use client";

import { Box } from "@/components";
import { FadeLoader } from "react-spinners";

const Loading = () => {
  return (
    <Box className="flexCenter h-full">
      <FadeLoader color="#22c55e" height={10} radius={5} width={7} />
    </Box>
  );
};
export default Loading;
