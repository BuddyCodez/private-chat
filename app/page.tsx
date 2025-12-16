"use client"
import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import { useMutation } from "@tanstack/react-query";
import { api } from "./lib/eden";
import { useRouter, useSearchParams } from "next/navigation";
import { useUsername } from "./hooks/use-username";

export default function Home() {
  const { username } = useUsername();
  const router = useRouter();
  const searchParams = useSearchParams();
  const wasDestroyed = searchParams.get("destroyed") === "true";
  const error = searchParams.get("error");

  const { mutateAsync: createRoom } = useMutation({
    mutationFn: async () => {
      const response = await api.room.create.post()
      if (response.status === 200) {
        router.push(`/room/${response.data?.roomId}`)
      }
    }
  })
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {wasDestroyed && (
          <div className="bg-red-950/50 border border-red-900 p-4 text-center">
            <p className="text-red-500 text-sm font-bold">
              Room Destroyed
            </p>
            <p className="text-zinc-500 text-xs mt-1">
              The room you were trying to access has been destroyed.
            </p>
          </div>
        )}
        {error === "room_not_found" && (
          <div className="bg-red-950/50 border border-red-900 p-4 text-center">
            <p className="text-red-500 text-sm font-bold">
              Room Not Found
            </p>
            <p className="text-zinc-500 text-xs mt-1">
              The room you were trying to access does not exist.
            </p>
          </div>
        )}
        {error === "room_full" && (
          <div className="bg-red-950/50 border border-red-900 p-4 text-center">
            <p className="text-red-500 text-sm font-bold">
              Room Full
            </p>
            <p className="text-zinc-500 text-xs mt-1">
              The room you were trying to access is full.
            </p>
          </div>
        )}

        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold tracking-tight text-purple-500">
            {">"}private_chat
          </h1>
          <p className="text-sm text-zinc-500">
            A secure, private, self-destructing and anonymous chat application.
          </p>
        </div>
        <div className="border border-zinc-800 bg-zinc-900/50 p-6 backdrop-blur-md">
          <div className="space-y-5">
            <div className="space-y-2">
              <label className="flex items-center text-zinc-500">
                Your Identity
              </label>
              <div className="flex items-center gap-3">
                <div className="flex-1 bg-zinc-950 border border-zinc-800 p-3 text-sm text-zinc-400 font-mono">
                  {username}
                </div>
              </div>
            </div>
            <button className="w-full bg-zinc-100 text-black font-bold text-sm p-3 hover:text-black transition-colors mt-2 cursor-pointer disabled:opacity-50 uppercase"
            onClick={() => createRoom()}
            >
              create secure room
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
