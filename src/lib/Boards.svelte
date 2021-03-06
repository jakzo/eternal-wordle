<script lang="ts">
  import { fly } from "svelte/transition";
  import { wordSolved } from "../transitions";
  import { GuessResult, calculateResults } from "../results";
  import { ALL_WORDS } from "../words";

  export let wordLen: number | undefined;
  export let words: [string, number][];
  export let maxGuesses: number;
  export let guesses: string[];
  export let currentGuess: string;
  export let focusedBoard: number | undefined = undefined;
  export let showWords: boolean = false;
  export let showGuessesLeft: boolean = true;

  let wordGuesses: [string, GuessResult[] | undefined][][];
  $: wordGuesses = words.map(([word, ts]) => [
    [currentGuess, undefined],
    ...guesses
      .slice(Math.max(guesses.length - maxGuesses, ts))
      .map<[string, GuessResult[]]>((guess) => [
        guess,
        calculateResults(word, guess),
      ])
      .reverse(),
  ]);

  let knownLetters: [string, string][];
  $: knownLetters = wordGuesses.map((entry) => {
    const charCounts: Record<string, number> = {};
    for (const [guess, results] of entry) {
      if (!results) continue;
      const counts: Record<string, number> = {};
      for (const [j, result] of results.entries())
        if (result !== GuessResult.NOT_FOUND)
          counts[guess[j]] = (counts[guess[j]] ?? 0) + 1;
      for (const [ch, count] of Object.entries(counts))
        if (count > (charCounts[ch] ?? 0)) charCounts[ch] = count;
    }
    const correct: string[] = [];
    for (const [guess, results] of entry) {
      if (!results) continue;
      for (const [j, result] of results.entries())
        if (result === GuessResult.CORRECT) correct[j] = guess[j];
    }
    const correctLetters = correct.join("");
    const correctCounts: Record<string, number> = {};
    for (const ch of correctLetters)
      correctCounts[ch] = (correctCounts[ch] ?? 0) + 1;
    const incorrectLetters = Object.entries(charCounts)
      .map(([ch, count]) =>
        ch.repeat(count - Math.min(count, correctCounts[ch] ?? 0))
      )
      .join("");
    return [correctLetters, [...incorrectLetters].sort().join("")];
  });
</script>

<div class="boards">
  {#each words as [word, ts], i (word)}
    <div
      class="board"
      tabindex="0"
      in:fly={{ delay: 500 }}
      out:wordSolved
      on:focus={() => {
        focusedBoard = i;
      }}
      on:blur={() => {
        if (focusedBoard === i) focusedBoard = undefined;
      }}
    >
      {#if showWords}
        <div>Word: <span class="word">{word}</span></div>
      {/if}
      <div>
        Known letters: <span class="monospace"
          ><span class="correct">{knownLetters[i][0]}</span><span
            class="wrong-pos">{knownLetters[i][1]}</span
          ></span
        >{#if showGuessesLeft}, guesses left: {maxGuesses -
            (guesses.length - ts)}{/if}
      </div>
      {#each wordGuesses[i] as [guess, results], j (guesses.length - j)}
        <div class="row" class:guess-row={!results}>
          {#if j <= guesses.length - ts}
            {#each word as _, k}
              <div
                class="char"
                class:correct={results?.[k] === GuessResult.CORRECT}
                class:wrong-pos={results?.[k] === GuessResult.WRONG_POS}
                class:not-found={results?.[k] === GuessResult.NOT_FOUND}
                class:not-word={j === 0 &&
                  (!wordLen || currentGuess.length === wordLen) &&
                  !ALL_WORDS.has(currentGuess)}
              >
                {guess[k] || ""}
              </div>
            {/each}
          {/if}
        </div>
      {/each}
    </div>
  {/each}
</div>

<style>
  .boards {
    text-align: center;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin: 16px;
  }

  .board {
    margin: 16px;
    display: inline-block;
    box-sizing: border-box;
    max-width: calc(50% - 32px);
    background: rgb(40, 40, 50, 0.8);
    border-radius: 6px;
    transition: transform box-shadow 100ms ease;
    box-shadow: 0px 0px 0px 0px #000;
    border: 1px solid #223;
  }
  .board:hover {
    box-shadow: 2px 2px 16px -8px #000;
    transform: translate(-2px, -2px);
  }
  .board:focus {
    outline: auto;
  }

  .row {
    display: flex;
  }

  .char {
    width: 48px;
    height: 36px;
    margin: 4px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 36px;
    border-radius: 4px;
    overflow: hidden;
  }
  .guess-row .char {
    height: 48px;
    border: 2px solid #999;
  }

  .correct {
    background: #393;
  }
  .wrong-pos {
    background: #9f9f00;
  }
  .not-found {
    background: #333;
  }
  .not-word {
    color: #c33;
  }

  .monospace {
    font-family: "Courier New", Courier, monospace;
  }

  .word {
    color: #c33;
  }

  @media (max-width: 600px) {
    .boards {
      margin: 4px;
    }
    .board {
      margin: 8px 4px;
      max-width: calc(50% - 8px);
    }
    .char {
      font-size: 28px;
      height: 32px;
    }
    .guess-row .char {
      height: 44px;
    }
  }

  @media (max-width: 500px) {
    .char {
      font-size: 24px;
      height: 28px;
    }
    .guess-row .char {
      height: 40px;
    }
  }

  @media (max-width: 400px) {
    .char {
      height: 24px;
      margin: 2px;
      font-size: 20px;
    }
    .guess-row .char {
      height: 36px;
    }
  }
</style>
