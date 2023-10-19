import { writable } from "svelte/store";

export const apikey = {
  set: (key: string) => {
    localStorage.setItem("apiKey", key);
  },
  get: () => {
    return localStorage.getItem("apiKey");
  },
};

export type View = "home" | "chat";

export const view = writable<View>("home");

export function nextView() {
  view.update((v) => (v === "home" ? "chat" : "home"));
}

export const isdebug = writable<boolean>(true);
