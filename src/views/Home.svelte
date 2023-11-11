<script lang="ts">
  import Spinner from "../lib/Spinner.svelte";
  import { resetMessages } from "../lib/gpt";
  import DestinationAndDates from "./DestinationAndDates.svelte";
  import Itinerary from "./Itinerary.svelte";
  import Entrance from "./Entrance.svelte";
  import Travelers from "./Travelers.svelte";
  import Activities from "./Activities.svelte";
  import Budget from "./Budget.svelte";

  export let pagenum = 0;
  let page;

  const pages = [
    Entrance,
    DestinationAndDates,
    Travelers,
    Activities,
    Budget,
    Itinerary,
  ];

  $: {
    console.log("pagenum", pagenum);
    page = pages[pagenum];
  }

  let data = {
    thinking: false,
    recipes: [],
    selection: "",
    instruction: "",
  };

  function movePage(offset = 1) {
    pagenum = pagenum + offset;
  }

  function reset() {
    resetMessages();
    pagenum = 0;
  }
</script>

<content>
  <h1>Travel Planning Assistant</h1>
  <br /><br /><br />
  {#if data.thinking}
    <Spinner />
    <br /><br /><br /><br /><br />
  {:else}
    <svelte:component this={page} bind:data {movePage} />
    <br /><br /><br />
    <button style="border-width:2px" on:click={reset}>Reset</button>
  {/if}
</content>

<style>
  h1 {
    background-color: rgba(255, 255, 100, 0.3);
    border-radius: 0.7em;
    padding: 0.5em;
  }
</style>
