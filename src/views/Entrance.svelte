<script>
  export let movePage;
  export let data;
</script>

<div class="card">
  <form on:submit|preventDefault={() => movePage()}>
    <button id="submit">Get Started<br><br><img src="down.png" alt="Image" width="25px" height="20px" ></button>
  </form>
</div>

<style>
  button {
    height: 70px;
    width: 180px;
    transition: 0.4s;
  }

  button:hover {
    background-color: #5799bc;
    color: #1a1a1a;
    font-weight: bolder;
    font-size: large;
  }
</style>
