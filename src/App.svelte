<script lang="ts">
  import Game from "./lib/Game.svelte";

  let isStarted = false;

  let wordCount = 4;
  let wordLen = 5;
  let maxGuesses = wordCount + 5;
  let zen = false;

  let score = 0;
  let isGameOver = false;
</script>

{#if !isStarted}
  <form
    on:submit|preventDefault={() => {
      isStarted = true;
    }}
  >
    <div>
      <label for="word-count">Number of words to guess simultaneously:</label>
      <input
        type="number"
        id="word-count"
        bind:value={wordCount}
        on:change={() => {
          maxGuesses = wordCount + 5;
        }}
      />
    </div>
    <div>
      <label for="word-len">Length of words to guess:</label>
      <input type="number" id="word-len" bind:value={wordLen} />
    </div>
    <div>
      <label for="max-guesses">Maximum number of guesses:</label>
      <input type="number" id="max-guesses" bind:value={maxGuesses} />
    </div>
    <div>
      <label for="zen">Zen mode (no losing):</label>
      <input type="checkbox" id="zen" bind:value={zen} />
    </div>
    <div><input type="submit" value="Play!" /></div>
  </form>
{:else}
  <header>
    {#if zen}
      <span class="zen">Zen mode 🧘</span>
    {:else}
      Score: {score}
      {#if isGameOver}
        <span class="game-over">Game over!</span>
      {/if}
    {/if}
    <button
      on:click={() => {
        isStarted = false;
        score = 0;
        isGameOver = false;
      }}>End game</button
    >
  </header>
  <Game {wordCount} {wordLen} {maxGuesses} {zen} bind:score bind:isGameOver />
{/if}

<style>
  :root {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  }

  .game-over {
    color: #933;
    text-transform: capitalize;
  }

  .zen {
    color: #393;
  }
</style>
