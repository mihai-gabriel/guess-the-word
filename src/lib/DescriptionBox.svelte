<script lang="ts">
  import { scale } from "svelte/transition";

  // LineAwesome icons @ iconfinder
  import externalIcon from "../assets/icons/external_link.svg";
  import windowMinimizeIcon from "../assets/icons/window_minimize.svg";
  import windowMaximizeIcon from "../assets/icons/window_maximize.svg";
  import quoteIcon from "../assets/icons/quote.svg";

  export let message = "";
  export let definitionURL = "";

  let minimized = false;

  $: minimizeIcon = minimized ? windowMaximizeIcon : windowMinimizeIcon;

  const toggleMinimize = () => {
    minimized = !minimized;
    console.log(minimizeIcon);
  };
</script>

<div
  class="window"
  out:scale={{ duration: 200 }}
  style="height: {minimized ? '40px' : 'initial'};"
>
  <header>
    <h3>Definition</h3>

    <div class="window-icons">
      <a href={definitionURL} target="_blank">
        <img
          role="button"
          src={externalIcon}
          width={28}
          height={28}
          alt="external link definition"
        />
      </a>
      <img
        role="button"
        src={minimizeIcon}
        width={28}
        height={28}
        alt="adjust definition window"
        on:keydown={toggleMinimize}
        on:click={toggleMinimize}
      />
    </div>
  </header>

  <hr />

  <blockquote>
    <div class="definition">
      <img src={quoteIcon} width={35} height={35} alt="quote icon" />
      <p>{message}</p>
    </div>
  </blockquote>
  <cite>— Cambridge Dictionary</cite>
</div>

<style>
  div.window {
    background: #7fdbff;
    position: absolute;
    left: 85%;
    top: 30%;
    padding: 0 20px 10px;
    box-shadow: 4px 4px #000;
    border: 2px solid #000;
    width: 220px;
    overflow: hidden;
  }

  header {
    padding: 10px 10px 0 0;
    width: 220px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  header > div.window-icons {
    display: flex;
  }

  h3 {
    margin: 0;
  }

  hr {
    border-color: #444;
  }

  p {
    text-align: left;
  }

  img[role="button"] {
    cursor: pointer;
  }

  div.definition {
    display: flex;
  }

  div.definition > p {
    margin: 0 10px 10px;
  }

  cite {
    font-size: 14px;
    padding: 20px 0;
  }

  blockquote {
    display: flex;
    flex-direction: column;
    background: #b10dc9;
    color: #fff;
    margin: 10px 0;
    padding: 10px 10px 0;
  }
</style>
