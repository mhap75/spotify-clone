"use client";

import { LikeButton, MediaItem, Slider } from "@/components";
import usePlayer from "@/hooks/usePlayer";
import { Song } from "@/types";
import { useEffect, useState } from "react";
import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai";
import { BsPauseFill, BsPlayFill } from "react-icons/bs";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";
// @ts-ignore
import useSound from "use-sound";

interface PlayerContentProps {
  song: Song;
  songUrl: string;
}

const PlayerContent: React.FC<PlayerContentProps> = ({ songUrl, song }) => {
  const { ids, activeId, setId } = usePlayer();
  const [volume, setVolume] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);

  const Icon = isPlaying ? BsPauseFill : BsPlayFill;
  const VolumeIcon = volume === 0 ? HiSpeakerXMark : HiSpeakerWave;

  const onPlayNext = () => {
    if (ids.length === 0) return;

    const currentIndex = ids.findIndex((id) => id === activeId);
    const nextSong = ids[currentIndex + 1];

    if (!nextSong) return setId(ids[0]);

    setId(nextSong);
  };

  const onPlayPrevious = () => {
    if (ids.length === 0) return;

    const currentIndex = ids.findIndex((id) => id === activeId);
    const previous = ids[currentIndex - 1];

    if (!previous) return setId(ids[ids.length - 1]);

    setId(previous);
  };

  const [play, { pause, sound }] = useSound(songUrl, {
    volume: volume,
    onplay: () => setIsPlaying(true),
    onend: () => {
      setIsPlaying(false);
      onPlayNext();
    },
    onpause: () => setIsPlaying(false),
    format: ["mp3"],
  });

  useEffect(() => {
    sound?.play();

    return () => {
      sound?.unload();
    };
  }, [sound]);

  const handlePlay = () => {
    if (!isPlaying) {
      play();
    } else {
      pause();
    }
  };

  const toggleMute = () => {
    if (volume === 0) {
      setVolume(1);
    } else {
      setVolume(0);
    }
  };

  return (
    <div className="grid h-full grid-cols-2 md:grid-cols-3">
      <div className="flex w-full justify-start">
        <div className="flex items-center gap-x-4">
          <MediaItem data={song} />
          <LikeButton songId={song.id} />
        </div>
      </div>

      {/* MOBILE VIEW */}
      <div className="flexEnd col-auto w-full md:hidden">
        <div
          className="flexCenter h-10 w-10 cursor-pointer rounded-full bg-white p-1"
          onClick={handlePlay}
        >
          <Icon size={30} className="text-black" />
        </div>
      </div>

      <div className="md:flexCenter hidden w-full max-w-[722px] gap-x-6">
        <AiFillStepBackward
          size={30}
          className="cursor-pointer text-neutral-400 transition hover:text-white"
          onClick={onPlayPrevious}
        />
        <div
          onClick={handlePlay}
          className="flexCenter h-10 w-10 cursor-pointer rounded-full bg-white p-1"
        >
          <Icon size={30} className="text-black" />
        </div>
        <AiFillStepForward
          size={30}
          className="cursor-pointer text-neutral-400 transition hover:text-white"
          onClick={onPlayNext}
        />
      </div>

      <div className="hidden w-full justify-end pr-2 md:flex">
        <div className="flex w-[120px] items-center gap-x-2">
          <VolumeIcon
            onClick={toggleMute}
            className="cursor-pointer"
            size={34}
          />
          <Slider value={volume} onChange={(value) => setVolume(value)} />
        </div>
      </div>
    </div>
  );
};
export default PlayerContent;
