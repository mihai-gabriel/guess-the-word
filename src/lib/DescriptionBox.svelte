<script lang="ts">
  export let message = "";
</script>

<div>
  <h3>Word <span>Definition</span></h3>
  <p>{message}</p>
</div>

<style>
  h3 {
    text-decoration: underline;
  }

  div {
    background: #7fdbff;
    position: absolute;
    left: 85%;
    top: 30%;
    padding: 0 20px 10px;
    box-shadow: 4px 4px #000;
    border: 2px solid #000;
    width: 200px;
  }
</style>
