import { writable } from "svelte/store";

const eclModes = ["L", "M", "Q", "H"];

export const eclMode = writable(eclModes[localStorage.getItem("eclMode") || 0]);
eclMode.subscribe((value) => {
  localStorage.setItem("eclMode", eclModes.indexOf(value));
});
