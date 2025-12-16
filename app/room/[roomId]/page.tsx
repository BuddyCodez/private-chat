"use client";
import { useUsername } from "@/app/hooks/use-username";
import { api } from "@/app/lib/eden";
import { useRealtime } from "@/app/lib/realtime-client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const formatTimeRemaining = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
};
const RoomPage = () => {
  const params = useParams();
  const roomId = params.roomId as string;
  const { username } = useUsername();
  const [copyStatus, setCopyStatus] = useState<string>("Copy");
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
  const [input, setInput] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const { data: messages, refetch } = useQuery({
    queryKey: ["messages", roomId],
    queryFn: async () => {
      const res = await api.messages.get({ query: { roomId } });
      return res.data;
    },
  });
  const { data: ttlData } = useQuery({
    queryKey: ["ttl", roomId],
    queryFn: async () => {
      const res = await api.room.ttl.get({ query: { roomId } });
      return res.data;
    },
  })


  const { mutateAsync: sendMessage, isPending } = useMutation({
    mutationFn: async ({ text }: { text: string }) => {
      await api.messages.post(
        {
          sender: username,
          text,
        },
        { query: { roomId } }
      );
    },
  });
  useRealtime({
    channels: [roomId],
    events: ["chat.destroy", "chat.message"],
    onData: ({ event }) => {
      if (event === "chat.message") {
        refetch();
      }
      if(event === "chat.destroy") {
        router.push("/?destroyed=true");
      }
    }
  })
  const { mutateAsync: destroyRoom, isPending: isDestroying } = useMutation({
    mutationFn: async () => {
      await api.room.delete(null, { query: { roomId } });
    },
  })
  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopyStatus("Copied");
    setTimeout(() => {
      setCopyStatus("Copy");
    }, 2000);
  };

  useEffect(() => {
    if (ttlData?.ttl !== undefined) setTimeRemaining(ttlData.ttl);
  }, [ttlData])

  useEffect(() => {
    if (timeRemaining === null || timeRemaining < 0) return;
    if (timeRemaining === 0) {
      router.push("/?destroyed=true");
      return;
    }
    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev === null) return null;
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [timeRemaining, router])
  return (
    <main className="flex flex-col h-screen max-h-screen overflow-hidden">
      <header className="border-b border-zinc-800 p-4 flex items-center justify-between bg-zinc-900/30">
        <div className="flex items-center gap-4">
          <div className="flex flex-col">
            <span className="uppercase text-xs text-zinc-500">Room ID</span>
            <div className="flex items-center gap-2">
              <div className="font-bold text-purple-500 ">{roomId}</div>
              <button
                className="text-[10px] text-zinc-500 hover:text-zinc-300 bg-zinc-800 hover:bg-zinc-700 px-2 py-0.5 rounded transition"
                onClick={copyLink}
              >
                {copyStatus}
              </button>
            </div>
          </div>
          <div className="h-8 w-px bg-zinc-800" />
          <div className="flex flex-col">
            <span className="text-xs text-zinc-500 uppercase">
              Self Destruct
            </span>
            <span
              className={`text-sm font-bold flex items-center gap-2 ${timeRemaining !== null && timeRemaining < 60
                  ? "text-red-500"
                  : "text-amber-500"
                }`}
            >
              {timeRemaining !== null
                ? formatTimeRemaining(timeRemaining)
                : "--:--"}
            </span>
          </div>
        </div>
        <button disabled={isDestroying} onClick={() => destroyRoom()} className="text-xs text-zinc-500 hover:text-zinc-300 bg-zinc-800 hover:bg-red-500 px-3 py-1.5 rounded transition">
          Destory Room
        </button>
      </header>
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin">
        {messages?.messages.length === 0 && (
          <div className="flex items-center justify-center h-full">
            <p className="text-zinc-600 text-sm font-mono">
              No messages yet, be the first to send a message!
            </p>
          </div>
        )}
        {messages?.messages.map((msg) => (
          <div key={msg.id} className="flex flex-col items-start">
            <div className="max-w-[80%] group">
              <div className="flex items-baseline gap-3 mb-1">
                <span
                  className={`text-xs font-bold ${msg.sender === username ? "text-purple-500" : "text-blue-500"
                    }`}
                >
                  {msg.sender === username ? "YOU" : msg.sender}
                </span>
                <span className="text-[10px] text-zinc-600">
                  {format(msg.timestamp, "HH:mm")}
                </span>
              </div>
              <p className="text-sm text-zinc-300 leading-relaxed break-all">
                {msg.text}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 border-t border-zinc-800 bg-zinc-900/30">
        <div className="flex gap-4">
          <div className="flex-1 relative group">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-500 animate-pulse">
              {">"}
            </span>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && input.trim()) {
                  // SEND MESSAGE.
                  sendMessage({ text: input });
                  inputRef.current?.focus();
                  setInput("");
                }
              }}
              placeholder="Type a message..."
              autoFocus
              type="text"
              className="w-full bg-black border border-zinc-800 focus:outline-none focus:border-zinc-700 transition-colors text-zinc-100 placeholder:text-zinc-500 py-3 pl-8 pr-4 text-sm"
            />
          </div>
          <button
            onClick={() => {
              if (!input.trim()) return;
              sendMessage({ text: input });
              inputRef.current?.focus();
              setInput("");
            }}
            disabled={!input.trim() || isPending}
            className="bg-zinc-800 text-zinc-400 px-6 text-sm font-bold hover:text-zinc-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed  cursor-pointer"
          >
            Send
          </button>
        </div>
      </div>
    </main>
  );
};

export default RoomPage;
