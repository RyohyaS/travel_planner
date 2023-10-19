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
        <h3>[day {i}]: {day.date}</h3>
        <ol>
          {#each day.activities as item, i}
            <li>{item}</li>
          {/each}
        </ol>
      {/each}
    </details>
  {/each}
</div>
<hr />

<style>
</style>
