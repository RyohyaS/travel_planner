<script>
  export const movePage = () => {};
  export let data;
  const plans = data.plans;
</script>

<div>
  <h2>Plans</h2>
  {#each plans as plan, i}
    <details>
      <summary>{plan.name} ({plan.budget})</summary>
      {#each plan.days as day, i}
        <div>
          <h3>[day {i + 1}]: {day.date}</h3>
          <ol>
            {#each day.activities as item, i}
              <li>{item}</li>
            {/each}
          </ol>
        </div>
      {/each}
    </details>
  {/each}
</div>
<hr />

<style>
  summary {
    color: var(--color-primary);
    margin: 0.5em 3em;
    text-align: left;
    font-weight: bold;
  }
  li::marker {
    font-weight: bold;
  }
  li {
    margin-left: 3em;
    margin-right: 3em;
    padding-left: 1em;
    text-align: left;
  }
  details {
    border: 1px solid #1a1a1a;
    border-radius: 0.5em;
    color: white;
    background-color: #1a1a1a;
    opacity: 0.7;
    margin-bottom: 1em;
  }
  details div {
    /* background-color: #1a1a0a; */
    border: #666 2px solid;
    border-radius: 0.9em;
    margin: 0.6em;
  }
</style>
