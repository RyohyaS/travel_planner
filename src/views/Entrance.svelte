<script>
  export let movePage;
  export let data;
</script>

<div class="card">
  <form on:submit|preventDefault={() => movePage()}>
    <button id="submit" style="font-size:125%; padding-bottom:100px; font-weight:bold; "><br>Get Started<br><img src="down.png" alt="Image" width="25px" height="20px"></button>
  </form>
</div>

<style>
  button {
    height: 100px;
    width: 220px;
    transition: 0.4s;
    border-width: 2px;
  }

  button:hover {
    background-color: rgb(251, 251, 157);
    color: #1a1a1a;
    font-weight: bolder;
    font-size: large;
  }
</style>
