<script lang="ts">
  // svelte
  import { onMount } from "svelte";
  import { crossfade } from "svelte/transition";
  import { flip } from "svelte/animate";
  import { backIn, backInOut, linear } from "svelte/easing";

  // lib
  import InputBox from "./lib/InputBox.svelte";
  import DescriptionBox from "./lib/DescriptionBox.svelte";

  // utils
  import { getRandomNumbersGenerator } from "./utils/getRandomInt";

  // types
  import type { Word } from "./types/Word";
  import type { SpinningTransitionConfig } from "./types/Transition";

  // assets
  import githubIcon from "./assets/icons/github.svg";
  import { shuffleArray } from "./utils/shuffleArray";

  let uid = 0;

  let words: Word[] = [
    {
      id: uid++,
      value: "nice",
      definition: "pleasant, enjoyable, or satisfactory",
      definitionURL: "https://dictionary.cambridge.org/dictionary/english/nice",
      guessed: false,
    },
    {
      id: uid++,
      value: "cool",
      definition: "fashionable in a way that people admire",
      definitionURL: "https://dictionary.cambridge.org/dictionary/english/cool",
      guessed: false,
    },
    {
      id: uid++,
      value: "feature",
      definition: "a typical quality or an important part of something",
      definitionURL:
        "https://dictionary.cambridge.org/dictionary/english/feature",
      guessed: false,
    },
    {
      id: uid++,
      value: "face",
      definition: "the front of the head, where the eyes, nose, and mouth are",
      definitionURL: "https://dictionary.cambridge.org/dictionary/english/face",
      guessed: false,
    },
    {
      id: uid++,
      value: "concentration",
      definition:
        "the ability to think carefully about something you are doing and nothing else",
      definitionURL:
        "https://dictionary.cambridge.org/dictionary/english/concentration",
      guessed: false,
    },
    {
      id: uid++,
      value: "family",
      definition:
        "a group of people who are related to each other, such as a mother, a father, and their children",
      definitionURL:
        "https://dictionary.cambridge.org/dictionary/english/family",
      guessed: false,
    },
  ];
  let obsfucatedWords = [];
  let userInput = "";
  let hasError = false;

  onMount(async () => {
    words = await shuffleArray(words);

    obsfucatedWords = words.map(({ id, value }) => {
      // refactor, it's too confusing
      const generateNumbers = getRandomNumbersGenerator(0, value.length);
      const randomNumbers = generateNumbers(Math.floor(value.length / 2));

      const newWordValue = [...value]
        .map((letter, idx) => (randomNumbers.includes(idx) ? "_" : letter))
        .join("");

      return { id, value: newWordValue };
    });
  });

  $: getObsfucatedWord = (wordId: number): string => {
    if (obsfucatedWords.length) {
      const obsfucatedWord = obsfucatedWords.find(
        (word) => word.id === wordId
      )?.value;

      return obsfucatedWord;
    }

    return "";
  };

  $: notGuessedWords = words.filter((word) => !word.guessed);
  $: guessedWords = words.filter((word) => word.guessed);
  $: currentDefinition = notGuessedWords[0]?.definition;
  $: currentDefinitionURL = notGuessedWords[0]?.definitionURL;
  $: allGuessed = notGuessedWords.length === 0;

  const handleSubmit = () => {
    if (!notGuessedWords.length) return;

    const cleanUserInput = userInput.trim().toLowerCase();
    hasError = false;

    if (cleanUserInput === notGuessedWords[notGuessedWords.length - 1].value) {
      words = words.map((word) =>
        word.value === cleanUserInput ? { ...word, guessed: true } : word
      );

      userInput = "";
    } else {
      hasError = true;
    }
  };

  const [send, receive] = crossfade({ duration: 100 });

  function spin(node: Element, options: SpinningTransitionConfig) {
    return {
      ...options,
      // The value of t passed to the css method
      // varies between zero and one during an "in" transition
      // and between one and zero during an "out" transition.
      css(t: number) {
        // Svelte takes care of applying the easing function.
        const degrees = 360 * options.spinningTimes; // through which to spin
        return `transform: scale(${t}) rotate(${t * degrees}deg);`;
      },
    };
  }
</script>

<main>
  <div>
    <header>
      {#if !allGuessed}
        <div
          class="spiny-header-leave"
          transition:spin={{ duration: 400, easing: linear, spinningTimes: 2 }}
        >
          <h1>Guess <span>the word</span></h1>
        </div>
      {:else}
        <div
          class="spiny-header-enter"
          transition:spin={{
            duration: 1400,
            easing: backInOut,
            spinningTimes: 4,
          }}
        >
          <h1>
            <span class="yellow-text">Congratulations!</span>
            <a href="/">Play again?</a>
          </h1>
        </div>
      {/if}
    </header>
    <ul class="not-guessed">
      {#if obsfucatedWords.length}
        {#each notGuessedWords.reverse() as { id }, idx (id)}
          <p
            class:active={idx === notGuessedWords.length - 1}
            style="font-size: {(notGuessedWords.length - idx < 4
              ? 4 + idx - notGuessedWords.length
              : 1) * 16}px"
            out:send={{ key: id }}
            animate:flip={{ duration: 100 }}
          >
            {getObsfucatedWord(id)}
          </p>
        {/each}
      {/if}
    </ul>
    <InputBox on:submit={handleSubmit} bind:userInput {hasError} />
    <ul class="guessed">
      {#each guessedWords.reverse() as { value, id }, idx (id)}
        <p
          in:receive={{ key: id }}
          animate:flip={{ duration: 100 }}
          style="font-size: {(idx < 3 ? (4 - idx) * 0.5 : 1) * 16}px"
        >
          {value}
        </p>
      {/each}
    </ul>
    {#if currentDefinition}
      <DescriptionBox
        message={currentDefinition}
        definitionURL={currentDefinitionURL}
      />
    {/if}
  </div>
  <footer>
    <a href="https://github.com/mihai-gabriel" target="_blank">
      <img src={githubIcon} width={60} height={60} alt="github icon" />
      <p>Mihai Gabriel</p>
    </a>
  </footer>
</main>

<style>
  header {
    margin-bottom: 120px;
    min-width: 450px;
    position: relative;
    background-color: red;
  }

  main {
    font-family: "Fragment Mono", "Courier New", Courier, monospace;
    display: flex;
    align-items: center;
    flex-direction: column;
  }

  p {
    margin: 5px;
  }

  main > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;

    width: 700px;
    padding: 50px;
  }

  ul {
    display: flex;
    align-items: center;
    flex-direction: column;
    list-style-type: none;
    padding: 0;
    min-height: 200px;
    max-height: 200px;
    min-width: 400px;
    overflow: hidden;
    z-index: -1;
    user-select: none;
    letter-spacing: 0.4em;
  }

  ul.not-guessed {
    justify-content: flex-end;
    -webkit-mask-image: linear-gradient(
      0deg,
      rgba(0, 0, 0, 1) 0%,
      rgba(255, 255, 255, 0.6) 40%,
      rgba(255, 255, 255, 0) 100%
    );
    mask-image: linear-gradient(
      0deg,
      rgba(0, 0, 0, 1) 0%,
      rgba(255, 255, 255, 0.6) 40%,
      rgba(255, 255, 255, 0) 100%
    );
  }

  ul.guessed {
    -webkit-mask-image: linear-gradient(
      0deg,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.6) 40%,
      rgba(0, 0, 0, 1) 100%
    );
    mask-image: linear-gradient(
      0deg,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.6) 40%,
      rgba(0, 0, 0, 1) 100%
    );
  }

  div.spiny-header-leave,
  div.spiny-header-enter {
    display: flex;
    justify-content: center;
    position: absolute;
    min-width: 450px;
    left: 0;
  }

  div.spiny-header-enter {
    text-align: center;
    top: 100px;
    left: -20px;
  }

  div.spiny-header-enter a {
    color: #000;
    cursor: pointer;
  }

  div.spiny-header-enter a:hover {
    color: #fff205;
  }

  div.spiny-header-enter > h1 {
    line-height: 1.5;
  }

  p.active {
    /* color: #0074d9; */
    color: #b10dc9;
    font-weight: bold;
    position: relative;
  }

  span {
    background: #000;
    color: #fff;
  }

  span.yellow-text {
    background: #fff205;
    color: #fff;
  }

  footer {
    margin: 20px 0;
  }

  footer > a {
    display: flex;
    align-items: center;
    color: #000;
  }
</style>
