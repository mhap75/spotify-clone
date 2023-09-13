import { useSupabaseClient } from "@supabase/auth-helpers-react";

const useLoadImage = (image_path: string) => {
  const supabaseClient = useSupabaseClient();

  if (!image_path) return null;

  const { data: imageData } = supabaseClient.storage
    .from("images")
    .getPublicUrl(image_path);

  return imageData.publicUrl;
};

export default useLoadImage;
