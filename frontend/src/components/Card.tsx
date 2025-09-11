// Card.tsx
import { ExternalLink, Trash2, Calendar } from "lucide-react";
import { useEffect, useRef } from "react";

export interface CardProps {
  id: string;
  contentId: string;
  title: string;
  link: string;
  type: "youtube" | "twitter" | "document" | "other";
  createdAt?: string;
  onDelete?: (contentId: string) => void;
}

// Extract YouTube video ID safely
const getYouTubeVideoId = (url: string): string => {
  const regExp =
    /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[7] && match[7].length === 11 ? match[7] : "";
};

// Get thumbnail from YouTube ID
const getYouTubeThumbnail = (videoId: string) =>
  `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

export default function Card(props: CardProps) {
  const twitterRef = useRef<HTMLDivElement>(null);

  // Load Twitter embeds if it's a Twitter card
useEffect(() => {
  if (props.type === "twitter") {
    // @ts-ignore - Twitter widget is injected via global script
    if (window?.twttr?.widgets) {
      // @ts-ignore
      window.twttr.widgets.load(twitterRef.current || undefined);
    }
  }
}, [props.type, props.link]);


  const getThumbnail = () => {
    if (props.type === "youtube") {
      const videoId = getYouTubeVideoId(props.link);
      return videoId ? getYouTubeThumbnail(videoId) : null;
    }
    return null;
  };

  return (
    <div className="border rounded-xl shadow-sm bg-white overflow-hidden hover:shadow-lg transition">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b bg-gray-50">
        <h3 className="text-sm font-semibold text-gray-800 truncate">
          {props.title}
        </h3>
        {props.createdAt && (
          <div className="flex items-center text-xs text-gray-500 ml-2">
            <Calendar size={10} className="mr-1" />
            {new Date(props.createdAt).toLocaleDateString()}
          </div>
        )}
        <button
          onClick={() => props.onDelete?.(props.contentId)}
          className="p-2 hover:bg-red-100 rounded-full transition"
          title="Delete card"
        >
          <Trash2 size={14} className="text-gray-400 hover:text-red-600" />
        </button>
      </div>

      {/* Content Preview */}
      <div className="p-4">
      {/* YouTube Thumbnail */}
{props.type === "youtube" && getThumbnail() && (
  <div
    className="cursor-pointer w-full aspect-video" // 👈 locks box to 16:9
    onClick={() =>
      window.open(props.link, "_blank", "noopener,noreferrer")
    }
  >
    <img
      src={getThumbnail()!}
      alt={props.title}
      className="w-full h-full rounded-lg object-cover"
    />
  </div>
)}

{/* Twitter Embed */}
{props.type === "twitter" && (
  <div ref={twitterRef} className="w-full">
    <blockquote className="twitter-tweet" data-dnt="true">
      <a href={props.link}></a>
    </blockquote>
  </div>
)}


        {props.type !== "youtube" && props.type !== "twitter" && (
          <div
            className="bg-gray-100 rounded-lg p-8 text-center text-gray-500 cursor-pointer"
            onClick={() =>
              window.open(props.link, "_blank", "noopener,noreferrer")
            }
          >
            No preview available
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-4 pb-4">
        <button
          onClick={() =>
            window.open(props.link, "_blank", "noopener,noreferrer")
          }
          className="flex items-center gap-2 text-xs text-blue-600 hover:underline"
        >
          <ExternalLink size={12} />
          Open original
        </button>
      </div>
    </div>
  );
}
