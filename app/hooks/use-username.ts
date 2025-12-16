import { nanoid } from "nanoid";
import { useEffect, useState } from "react";

const ANIMALS = ["wolf", "bear", "shark", "snake", "crocodile", "tiger", "lion", "leopard", "cheetah", "panther"];
const KEY = "chat_username";
const generateUsername = () => {
  const word = ANIMALS[Math.floor(Math.random() * ANIMALS.length)];
  return `anonymous-${word}-${nanoid(5)}`;
}

export const useUsername = () => {
    const [username, setUsername] = useState("");
      useEffect(() => { 
        const main = () => {
          const storedUsername = localStorage.getItem(KEY);
          if (storedUsername) {
            setUsername(storedUsername);
            return;
          } 
          const generatedUsername = generateUsername();
          localStorage.setItem(KEY, generatedUsername);
          setUsername(generatedUsername);
        }
        main();
      }, []);
    return {username};
}