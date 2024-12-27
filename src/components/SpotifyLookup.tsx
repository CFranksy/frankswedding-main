import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm, useFormContext } from "react-hook-form";

const client = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT;
const secret = process.env.NEXT_PUBLIC_SPOTIFY_SECRET;

type SpotifySearchResponse = {
  href: string;
  items: SpotifyTrack[];
  limit: number;
  next: string | null;
  offset: number;
  previous: string | null;
  total: number;
};

type SpotifyTrack = {
  album: SpotifyAlbum;
  artists: SpotifyArtist[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: {
    isrc: string;
  };
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  is_local: boolean;
  is_playable: boolean;
  name: string;
  popularity: number;
  preview_url: string | null;
  track_number: number;
  type: string;
  uri: string;
};

type SpotifyAlbum = {
  album_type: string;
  artists: SpotifyArtist[];
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  images: SpotifyImage[];
  is_playable: boolean;
  name: string;
  release_date: string;
  release_date_precision: string;
  total_tracks: number;
  type: string;
  uri: string;
};

type SpotifyArtist = {
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
};

type SpotifyImage = {
  height: number;
  url: string;
  width: number;
};

type TracksType = {
  tracks: SpotifySearchResponse;
};

export type TrimedTrack = {
  id: string;
  name: string;
  albumCover: string;
  artist: string;
  albumName: string;
};

type SpotifyListProps = {
  result: (SpotifyTrack | TrimedTrack)[];
  removeTrack?: boolean;
};

export const SpotifyList = ({ result, removeTrack }: SpotifyListProps) => {
  const { setValue, getValues } = useFormContext();
  const songs = getValues("songs") || [];

  return (
    <div className="flex flex-wrap gap-2 py-2 justify-between">
      {result?.map((track) => {
        const songData: TrimedTrack =
          "albumCover" in track
            ? track
            : {
                id: track.id,
                name: track.name,
                albumCover: track.album.images[0].url,
                artist: track.artists.map((artist) => artist.name).join(", "),
                albumName: track.album.name,
              };
        const updateValues = removeTrack
          ? songs.filter((en: TrimedTrack) => en.id !== songData.id)
          : [...songs, songData];

        return (
          <div
            key={track.id}
            className="flex flex-col gap-2 items-start justify-between size-32 relative bg-gray-400 rounded-lg text-xs"
          >
            <div className="size-20 bg-gray-800 rounded-full relative mx-auto mt-2">
              <Image
                src={songData.albumCover}
                alt={`Track art for ${songData.albumName}`}
                fill
                style={{ objectFit: "cover", borderRadius: "50%" }}
              />
              <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-gray-400 size-1/3 rounded-full" />
              <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-gray-800 size-1 rounded-full" />
            </div>
            <div className="absolute left-0 bottom-0 bg-gray-900 w-full py-2 rounded-b-lg px-2 text-left flex flex-col justify-evenly">
              <p className="font-bold text-white w-full text-[0.5rem]">
                {songData.name}
              </p>
              <p className="italic text-[0.5rem] text-white">
                {songData.artist}
              </p>

              <button
                type="button"
                className="bg-emerald-500 text-white rounded-full w-full mt-1"
                onClick={() => setValue("songs", [...updateValues])}
                disabled={!removeTrack && songs.length >= 3}
              >
                {removeTrack ? (
                  <FontAwesomeIcon icon={faMinus} />
                ) : (
                  <FontAwesomeIcon icon={faPlus} />
                )}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export const SpotifyLookup = () => {
  const [accessToken, setToken] = useState("");
  const [input, setInput] = useState("");
  const [result, setResults] = useState<TracksType>();

  const { watch } = useFormContext();

  useEffect(() => {
    const authParams = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body:
        "grant_type=client_credentials&client_id=" +
        client +
        "&client_secret=" +
        secret,
    };

    fetch("https://accounts.spotify.com/api/token", authParams)
      .then((result) => result.json())
      .then((data) => setToken(data.access_token));
  }, []);

  const searchSong = async () => {
    const params = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    };

    await fetch(
      `https://api.spotify.com/v1/search?q=${input}&type=track&market=GB`,
      params
    )
      .then((response) => response.json())
      .then((data) => setResults(data));
  };

  const songs = watch("songs");

  return (
    <div className=" overflow-auto">
      <div className="flex gap-2">
        <input
          className="w-full border-b border-b-blush py-2 px-1 outline-none"
          type="text"
          placeholder="search song.."
          onBlur={(e) => setInput(e.target.value)}
        />
        <button
          onClick={searchSong}
          type="button"
          className="w-1/2 bg-blush text-white"
        >
          Search a Song
        </button>
      </div>
      <p className="italic text-gray-500 w-full text-left text-xs">
        powered by spotify - 3 max
      </p>
      {result?.tracks?.items?.length && (
        <SpotifyList
          result={result.tracks.items.filter(
            (el) => !songs?.find((en: SpotifyTrack) => en.id === el.id)
          )}
        />
      )}
    </div>
  );
};
