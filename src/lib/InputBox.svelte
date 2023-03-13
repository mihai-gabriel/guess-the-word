<script lang="ts">
  let buttonPressed = false;
  export let userInput = "";

  // Styling button when enter is pressed
  const pressButton = (e: KeyboardEvent) => {
    if (e.code === "Enter") {
      buttonPressed = true;
    }
  };

  const releaseButton = (e: KeyboardEvent) => {
    if (e.code === "Enter") {
      buttonPressed = false;
    }
  };
</script>

<form
  on:submit|preventDefault
  on:keydown={pressButton}
  on:keyup={releaseButton}
>
  <input
    type="text"
    bind:value={userInput}
    placeholder="Enter the completed word..."
    autofocus
  />
  <button type="submit" class:pressed={buttonPressed}>GUESS</button>
</form>

<style>
  input {
    all: unset;
    border: 2px solid #000;
    border-right: 0;
    padding: 8px;
    width: 100%;
    background: #f5f5f5;
  }

  button {
    margin: 0;
    padding: 12px;
    border: 2px solid #000;
    background: #fff205;
    font-family: "Share Tech Mono", "Courier New", Courier, monospace;
    font-size: 16px;
    cursor: pointer;
  }

  button:active,
  button.pressed {
    background: #01fff4;
  }

  form {
    box-shadow: 4px 4px;
    display: flex;
    max-width: 400px;
  }

  /* @keyframes shake {
    10%,
    90% {
      transform: translate3d(-1px, 0, 0);
    }

    20%,
    80% {
      transform: translate3d(2px, 0, 0);
    }

    30%,
    50%,
    70% {
      transform: translate3d(-4px, 0, 0);
    }

    40%,
    60% {
      transform: translate3d(4px, 0, 0);
    }
  } */
</style>
