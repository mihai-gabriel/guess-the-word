<script lang="ts">
  export let hasError = false;
  export let userInput = "";

  let buttonPressed = false;

  // Styling button when enter is pressed
  const mouseDownButton = (e: MouseEvent) => {
    hasError = false;
    buttonPressed = true;
  };

  const mouseUpButton = (e: MouseEvent) => {
    buttonPressed = false;
  };

  const pressButton = (e: KeyboardEvent) => {
    hasError = false;

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
  class:error={hasError}
>
  <input
    type="text"
    bind:value={userInput}
    placeholder="Enter the completed word..."
    autofocus
  />
  <button
    type="submit"
    class:pressed={buttonPressed}
    class:error={buttonPressed && hasError}
    on:mousedown={mouseDownButton}
    on:mouseup={mouseUpButton}>GUESS</button
  >
</form>

<style>
  input {
    all: unset;
    border: 2px solid #000;
    border-right: 0;
    padding: 8px;
    width: 100%;
    min-width: 150px;
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

  button.error {
    background: #ff4136;
  }

  form {
    box-shadow: 4px 4px;
    display: flex;
    max-width: 400px;
  }

  form.error {
    animation: shake 0.52s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
    transform: translate3d(0, 0, 0);
    backface-visibility: hidden;
    perspective: 1000px;
  }

  @keyframes shake {
    10%,
    90% {
      transform: translate3d(-2px, 0, 0);
    }

    20%,
    80% {
      transform: translate3d(3px, 0, 0);
    }

    30%,
    50%,
    70% {
      transform: translate3d(-6px, 0, 0);
    }

    40%,
    60% {
      transform: translate3d(6px, 0, 0);
    }
  }
</style>
