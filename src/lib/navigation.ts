import { createEventDispatcher, type EventDispatcher } from "svelte";
const event = "continue";
let dispatch: EventDispatcher<any>;

export function InitDispatcher() {
  dispatch = createEventDispatcher();
}

export function goNextPage() {
  dispatch("continue");
}
