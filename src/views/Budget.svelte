<script lang="ts">
  import CurrencySelector from "../lib/CurrencySelector.svelte";
  import { getPlans } from "../lib/gpt";
  import { isdebug } from "../lib/store";

  export let movePage;
  export let data;

  data.budget = {
    amount: 0,
    currency: "",
    include_flight: false,
  };
  if ($isdebug) {
    data.budget = {
      amount: 9000,
      currency: "USD",
      include_flight: true,
    };
    data.home_location = "New York City";
  }
  async function handleSubmit() {
    console.log("handleSubmit");
    data.thinking = true;
    data.plans = await getPlans({
      home_location: data.home_location,
      destination: data.destination,
      dates: {
        from: data.datesFrom,
        to: data.datesTo,
      },
      travelers: data.travelers,
      activities: data.activities,
      budget: data.budget,
    });
    data.thinking = false;
    movePage();
  }
</script>

<div class="card">
  <h2>4. Budget</h2>
  <form on:submit|preventDefault={handleSubmit}>
    <label
      >Include Flight
      <input type="checkbox" bind:checked={data.budget.include_flight} />
    </label><br />
    {#if data.budget.include_flight}
      <label
        >Home location
        <input type="text" bind:value={data.home_location} /><br />
      </label><br />
    {/if}
    <label for="currency"
      >Currency
      <CurrencySelector bind:value={data.budget.currency} />
    </label><br />
    <label
      >Amount
      <input class="small" type="number" bind:value={data.budget.amount} />
    </label>
    <hr />
    <br />
    <button id="submit">Create Plan</button>
  </form>
  <br />
  <footer>
    <button on:click={() => movePage(-1)}
      ><img
        src="back1.png"
        alt="BackButton"
        width="10px"
        height="10px"
      />&nbsp;Back</button
    >
  </footer>
  <br />
</div>

<style>
  #submit {
    background-color: #1a1a1a;
    font-size: larger;
    font-weight: bold;
    color: #1d90ce;
  }
  input {
    float: right;
    width: 120px;
  }
  input.small {
    float: right;
    width: 80px;
  }
</style>
