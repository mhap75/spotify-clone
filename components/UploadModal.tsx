"use client";

import { Button, Input, Modal } from "@/components";
import useUploadModal from "@/hooks/useUploadModal";
import { useUser } from "@/hooks/useUser";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import uniqid from "uniqid";

const UploadModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, onClose } = useUploadModal();
  const { register, handleSubmit, reset } = useForm<FieldValues>({
    defaultValues: {
      author: "",
      title: "",
      song: null,
      image: null,
    },
  });
  const { user } = useUser();
  const supabaseClient = useSupabaseClient();
  const router = useRouter();

  const onChange = (open: boolean) => {
    if (!open) {
      reset();
      onClose();
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    try {
      setIsLoading(true);
      const imageFile = values.image?.[0];
      const songFile = values.song?.[0];

      if (!imageFile || !songFile || !user) {
        toast.error("Please fill all the fields");
        return;
      }

      const uniqueId = uniqid();

      const { data: songData, error: songError } = await supabaseClient.storage
        .from("songs")
        .upload(`song-${values.title}-${uniqueId}`, songFile, {
          cacheControl: "3600",
          upsert: false,
        });

      if (songError) {
        setIsLoading(false);
        return toast.error("failed to upload the song");
      }

      const { data: imageData, error: imageError } =
        await supabaseClient.storage
          .from("images")
          .upload(`image-${values.title}-${uniqueId}`, imageFile, {
            cacheControl: "3600",
            upsert: false,
          });

      if (imageError) {
        setIsLoading(false);
        return toast.error("failed to upload the image");
      }

      const { error: supabaseError } = await supabaseClient
        .from("songs")
        .insert({
          user_id: user.id,
          title: values.title,
          author: values.author,
          image_path: imageData.path,
          song_path: songData.path,
        });

      if (supabaseError) {
        setIsLoading(false);
        return toast.error(supabaseError.message);
      }

      router.refresh();
      setIsLoading(false);
      toast.success("Successfully added new song");
      onClose();
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      title="Add a song"
      description="Uploade songs in MP3 format"
      isOpen={isOpen}
      onChange={onChange}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flexCol gap-y-4">
        <Input
          id={"title"}
          {...register("title", { required: true })}
          disabled={isLoading}
          placeholder="Song title"
        />
        <Input
          id={"author"}
          {...register("author", { required: true })}
          disabled={isLoading}
          placeholder="Song author"
        />
        <div>
          <div className="pb-1">Select a song</div>
          <Input
            id={"song"}
            {...register("song", { required: true })}
            type="file"
            accept=".mp3"
            disabled={isLoading}
          />
        </div>
        <div>
          <div className="pb-1">Select a song</div>
          <Input
            id={"image"}
            {...register("image", { required: true })}
            type="file"
            accept="image/*"
            disabled={isLoading}
          />
        </div>
        <Button disabled={isLoading} type="submit" className="mt-3 rounded-lg">
          Save
        </Button>
      </form>
    </Modal>
  );
};

export default UploadModal;
