<script lang="ts">
  import { onMount } from "svelte";
  import { crossfade } from "svelte/transition";
  import { flip } from "svelte/animate";

  import InputBox from "./lib/InputBox.svelte";
  import DescriptionBox from "./lib/DescriptionBox.svelte";
  import { getRandomNumbersGenerator } from "./utils/getRandomInt";

  let words = [
    {
      id: 0,
      value: "nice",
      guessed: false,
      description: "pleasant, enjoyable, or satisfactory",
    },
    {
      id: 1,
      value: "cool",
      guessed: false,
      description: "fashionable in a way that people admire",
    },
    {
      id: 2,
      value: "feature",
      guessed: false,
      description: "a typical quality or an important part of something",
    },
    {
      id: 3,
      value: "behaviour",
      guessed: false,
      description: "to act in a particular way",
    },
    {
      id: 4,
      value: "search",
      guessed: false,
      description: "to look somewhere carefully in order to find something",
    },
    {
      id: 5,
      value: "draw",
      guessed: false,
      description:
        "to make a picture of something or someone with a pencil or pen",
    },
    {
      id: 6,
      value: "compute",
      guessed: false,
      description: "to calculate an answer or amount by using a machine",
    },
  ];
  let obsfucatedWords = [];
  let userInput = "";

  onMount(() => {
    obsfucatedWords = words.map(({ id, value }) => {
      // refactor, it's too confusing
      const generateNumbers = getRandomNumbersGenerator(0, value.length);
      let randomNumbers = generateNumbers(Math.floor(value.length / 2));

      const newWordValue = [...value]
        .map((letter, idx) => (randomNumbers.includes(idx) ? "?" : letter))
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
  $: currentDefinition = notGuessedWords[0]?.description;

  const handleSubmit = () => {
    const cleanUserInput = userInput.trim();

    if (cleanUserInput === notGuessedWords[notGuessedWords.length - 1].value) {
      words = words.map((word) =>
        word.value === cleanUserInput ? { ...word, guessed: true } : word
      );

      userInput = "";
    }
  };

  const [send, receive] = crossfade({ duration: 100 });
</script>

<main>
  <div>
    <h1>Guess <span>the word</span></h1>
    <ul class="not-guessed">
      {#if obsfucatedWords.length}
        {#each notGuessedWords.reverse() as { id }, idx (id)}
          <p
            class:active={idx === notGuessedWords.length - 1}
            style="font-size: {((notGuessedWords.length - idx) % 3 < 3
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
    <InputBox on:submit={handleSubmit} bind:userInput />
    <ul class="guessed">
      {#each guessedWords.reverse() as { value, id } (id)}
        <p in:receive={{ key: id }} animate:flip={{ duration: 100 }}>
          {value}
        </p>
      {/each}
    </ul>
    {#if currentDefinition}
      <DescriptionBox message={currentDefinition} />
    {/if}
  </div>
</main>

<style>
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
    margin: 100px 0 0;
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

  p.active {
    color: #0074d9;
    font-weight: bold;
    position: relative;
  }

  span {
    background: #000;
    color: #fff;
  }
</style>
