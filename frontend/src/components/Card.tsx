import { useEffect, useState } from "react";
import { ExternalLink, Trash2, Calendar } from "lucide-react";

export interface CardProps {
  id: string;
  contentId: string;
  title: string;
  link: string;
  type: "youtube" | "twitter" | "document" | "other";
  createdAt?: string;
  onDelete?: (contentId: string) => void;
}

const getYouTubeVideoId = (url: string): string => {
  const regExp =
    /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[7].length === 11 ? match[7] : "";
};

const getYouTubeThumbnail = (videoId: string) =>
  `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

export default function Card(props: CardProps) {
  const [meta, setMeta] = useState<{ image?: string; title?: string; description?: string }>({});

  useEffect(() => {
    if (props.type !== "youtube") {
      fetch(`/preview?url=${encodeURIComponent(props.link)}`)
        .then((res) => res.json())
        .then((data) => setMeta(data))
        .catch(() => {});
    }
  }, [props.link, props.type]);

  const getThumbnail = () => {
    if (props.type === "youtube") {
      const videoId = getYouTubeVideoId(props.link);
      return getYouTubeThumbnail(videoId);
    }
    return meta.image;
  };

  return (
    <div className="border rounded-xl shadow-sm bg-white overflow-hidden hover:shadow-lg transition">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b bg-gray-50">
        <h3 className="text-sm font-semibold text-gray-800 truncate">{props.title}</h3>
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

      {/* Thumbnail */}
      <div
        className="p-4 cursor-pointer"
        onClick={() => window.open(props.link, "_blank", "noopener,noreferrer")}
      >
        {getThumbnail() ? (
          <img
            src={getThumbnail()}
            alt={props.title}
            className="w-full rounded-lg object-cover"
          />
        ) : (
          <div className="bg-gray-100 rounded-lg p-8 text-center text-gray-500">
            No preview available
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-4 pb-4">
        <button
          onClick={() => window.open(props.link, "_blank", "noopener,noreferrer")}
          className="flex items-center gap-2 text-xs text-blue-600 hover:underline"
        >
          <ExternalLink size={12} />
          Open original
        </button>
      </div>
    </div>
  );
}
