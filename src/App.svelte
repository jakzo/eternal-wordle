<script lang="ts">
  import { onMount } from "svelte";
  import Game from "./lib/Game.svelte";
  import { randStr } from "./utils";
  import { AUTOSAVE_KEY, HIGHSCORE_KEY } from "./constants";

  onMount(() => {
    navigator.serviceWorker.register("./assets/service-worker.js");
  });

  interface Autosave {
    wordCount: number;
    wordLen: number;
    maxGuesses: number;
    seed: string;
    zen: boolean;
    guesses: string[];
  }

  const autosave = JSON.parse(
    localStorage.getItem(AUTOSAVE_KEY) ?? null
  ) as Autosave | null;
  let highScore = JSON.parse(localStorage.getItem(HIGHSCORE_KEY) ?? null) as
    | number
    | null;
  let isNewHighScore = false;

  let isStarted = !!autosave;

  let wordCount = autosave?.wordCount ?? 4;
  let wordLen = autosave?.wordLen ?? 5;
  let maxGuesses = autosave?.maxGuesses ?? wordCount + 5;
  let seed = autosave?.seed ?? randStr(5);
  let zen = autosave?.zen ?? false;

  let loadedGuesses: string[] | undefined = autosave?.guesses;
  let guesses: string[];
  let score: number = 0;
  let isGameOver = false;

  $: if (isStarted)
    setTimeout(() => {
      const autosave: Autosave = {
        wordCount,
        wordLen,
        maxGuesses,
        seed,
        zen,
        guesses,
      };
      localStorage.setItem(AUTOSAVE_KEY, JSON.stringify(autosave));
    }, 100);
  $: if (!isStarted) {
    localStorage.removeItem(AUTOSAVE_KEY);
    guesses = [];
  }

  $: if (isGameOver && (highScore === null || score > highScore)) {
    highScore = score;
    isNewHighScore = true;
    localStorage.setItem(HIGHSCORE_KEY, JSON.stringify(highScore));
  }
  $: if (!isStarted) isNewHighScore = false;
</script>

{#if !isStarted}
  <div class="menu-container">
    <div class="menu">
      <article class="instructions">
        <h2>How to play</h2>
        <p>
          It's <a href="https://www.nytimes.com/games/wordle/index.html"
            >Wordle</a
          >
          but with multiple words being guessed simultaneously (like
          <a href="https://zaratustra.itch.io/dordle">Dordle</a>,
          <a href="https://quordle.com">Quordle</a>
          or <a href="https://octordle.com/">Octordle</a>) but also when you
          guess a word, it is replaced with a new one. The game keeps going
          until you fail to guess a word.
        </p>
      </article>
      <form
        on:submit|preventDefault={() => {
          isStarted = true;
        }}
      >
        <table>
          <tr>
            <td>
              <label for="word-count"
                >Number of words to guess simultaneously:</label
              >
            </td>
            <td>
              <input
                type="number"
                id="word-count"
                bind:value={wordCount}
                on:change={() => {
                  maxGuesses = wordCount + 5;
                }}
              />
            </td>
          </tr>
          <tr>
            <td>
              <label for="word-len">Length of words to guess:</label>
            </td>
            <td>
              <input type="number" id="word-len" bind:value={wordLen} />
            </td>
          </tr>
          <tr>
            <td>
              <label for="max-guesses">Maximum number of guesses:</label>
            </td>
            <td>
              <input type="number" id="max-guesses" bind:value={maxGuesses} />
            </td>
          </tr>
          <tr>
            <td>
              <label for="zen">Zen mode (no losing):</label>
            </td>
            <td>
              <input type="checkbox" id="zen" bind:checked={zen} />
            </td>
          </tr>
          <tr>
            <td>
              <label for="seed"
                >Word seed (determines order of words, paste someone else's seed
                to play the same game as them):</label
              >
            </td>
            <td>
              <input type="text" id="seed" bind:value={seed} />
            </td>
          </tr>
        </table>
        <input type="submit" value="Play!" />
      </form>
    </div>
  </div>
{:else}
  <header class="header">
    <button
      class="end-game"
      on:click={() => {
        isStarted = false;
        score = 0;
        isGameOver = false;
        seed = randStr(5);
      }}>End game</button
    >
    {#if zen}
      <span class="zen">Zen mode 🧘</span>
    {:else}
      <span>Score: {score}</span>
      {#if highScore !== null}
        <span class="high-score">High score: {highScore}</span>
      {/if}
      {#if isNewHighScore}
        <span class="new-high-score">New high score! 🥳</span>
      {/if}
      {#if isGameOver}
        <span class="game-over">Game over!</span>
      {/if}
    {/if}
    <span class="seed-box">Seed: <span class="seed">{seed}</span></span>
  </header>
  <Game
    {wordCount}
    {wordLen}
    {maxGuesses}
    {seed}
    {zen}
    {loadedGuesses}
    bind:score
    bind:guesses
    bind:isGameOver
  />
{/if}

<style>
  :root {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    color: #fff;
  }

  a {
    color: #c6c;
  }
  a:active {
    color: #a3a;
  }

  .menu {
    padding: 8px;
    max-width: 750px;
    margin: 0 auto;
  }

  .menu table {
    border-spacing: 8px;
    max-width: 400px;
  }

  .instructions h2 {
    margin: 0 0 12px 0;
  }

  #word-count,
  #word-len,
  #max-guesses {
    width: 32px;
  }
  #seed {
    width: 64px;
  }

  .header {
    position: sticky;
    top: 0;
    background: rgb(30, 30, 50, 0.8);
    padding: 2px 4px;
    width: 100%;
    box-sizing: border-box;
  }
  .header > {
    margin: 0 16px;
  }

  .end-game {
    float: right;
  }

  .game-over {
    color: #933;
    text-transform: capitalize;
  }

  .zen {
    color: #393;
  }

  .seed-box {
    color: #993;
  }
  .seed {
    font-family: "Courier New", Courier, monospace;
  }

  .high-score {
    color: #ccc;
  }
  .new-high-score {
    color: #393;
  }
</style>
