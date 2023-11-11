<script>
  import logo from "/travel.svg";
  import { InitApi, messages } from "./lib/gpt";
  import Home from "./views/Home.svelte";
  import { isdebug, apikey } from "./lib/store";
  import { onMount } from "svelte";

  let key0 = "";
  let key = apikey.get();
  let pagenum;

  $isdebug = !!document.location.hash.match(/debug/);

  onMount(async () => {
    const isKeySet = key ? await InitApi(key) : false;
    if (!isKeySet) {
      document.querySelector("dialog").showModal();
    }
  });

  function renew_key(event) {
    event.preventDefault();
    key0 = "";
    apikey.set("");
    document.querySelector("dialog").showModal();
  }

  async function setApiKey(event) {
    console.log("setApiKey", pagenum);
    event.preventDefault();
    pagenum = 0;
    key = key0;
    apikey.set(key);
    document.querySelector("dialog").close();
    if (!(await InitApi(key))) {
      window.alert("invalid api key");
      renew_key(event);
    }
  }
</script>

<main>
  <div>
    <img src={logo} class="logo" alt="Vite Logo" />
  </div>

  {#if key}
    <Home bind:pagenum />

    {#if $isdebug}
      <div class="debug">
        <hr />
        <h2>## DEBUG ##</h2>
        {#each $messages as message}
          <p>role: {message.role}, content: {message.content}</p>
        {/each}
      </div>
    {/if}
  {/if}

  <dialog>
    <form on:submit={setApiKey}>
      <p>Please enter your api key</p>
      <label
        >api_key:
        <input type="text" bind:value={key0} />
      </label>
      <br />
      <button type="submit">set openai apikey</button>
    </form>
  </dialog>
  <hr />
  <button on:click={renew_key}>renew apikey</button>
</main>

<style>
  .debug {
    background-color: darkblue;
  }
  dialog::backdrop {
    background-color: grey;
  }
  .logo {
    height: 6em;
    padding: 0.5em;
    will-change: filter;
    transition: filter 300ms;
  }
  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
</style>
