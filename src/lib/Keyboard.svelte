<script lang="ts">
  import { calculateResults, GuessResult } from "../results";

  export let onKeyPress: (keyCode: number) => void;
  export let words: [string, number][] = [];
  export let guesses: string[] = [];
  export let maxGuesses: number = Infinity;
  export let currentGuess: string = "";

  type Key = [/** Text */ string, /** Code **/ number, /** Width */ number];
  const defineKeys = (keyDefs: (Key | string)[][]): Key[][] =>
    keyDefs.map((row) =>
      row.map((ch) =>
        typeof ch === "string"
          ? [ch.toUpperCase(), ch.toUpperCase().charCodeAt(0), 1]
          : ch
      )
    );

  const keyboardKeys = defineKeys([
    [..."qwertyuiop"],
    [..."asdfghjkl"],
    [["⌫", 8, 1.5], ..."zxcvbnm", ["⏎", 13, 1.5]],
  ]);

  const maxRowWidth = Math.max(
    ...keyboardKeys.map((row) =>
      row.reduce((total, [, , width]) => total + width, 0)
    )
  );

  type Histogram = Record<
    "correct" | "wrong-pos" | "not-found" | "unknown",
    Record<string, number>
  >;
  let histogram: Histogram;
  $: {
    histogram = Object.fromEntries(
      ["correct", "wrong-pos", "not-found", "unknown"].map((type) => [
        type,
        Object.fromEntries(
          keyboardKeys.flatMap((row) =>
            row.flatMap(([text, code]) =>
              code >= 65 && code <= 90 ? [[text, 0]] : []
            )
          )
        ),
      ])
    ) as Histogram;
    for (const [word, ts] of words) {
      const results = new Map<string, Set<GuessResult>>(
        keyboardKeys.flatMap((row) =>
          row.flatMap(([text, code]) =>
            code >= 65 && code <= 90 ? [[text, new Set()]] : []
          )
        )
      );
      for (const guess of guesses.slice(
        Math.max(ts, guesses.length - maxGuesses)
      )) {
        for (const [j, result] of calculateResults(word, guess).entries()) {
          results.get(guess[j])!.add(result);
        }
      }
      for (const [key, resultSet] of results) {
        if (resultSet.has(GuessResult.CORRECT)) histogram.correct[key]++;
        else if (resultSet.has(GuessResult.WRONG_POS))
          histogram["wrong-pos"][key]++;
        else if (resultSet.has(GuessResult.NOT_FOUND))
          histogram["not-found"][key]++;
        else histogram["unknown"][key]++;
      }
    }
  }
</script>

<div class="spacer" style="height: {keyboardKeys.length * 48 + 8}px;" />
<div class="container">
  <div class="keyboard" on:mousedown|preventDefault>
    {#each keyboardKeys as row}
      <div class="row">
        {#each row as [text, code, width]}
          <div class="key" style="width: {(width / maxRowWidth) * 100}%;">
            <button
              class:used={histogram.unknown[text] === 0}
              class:current={currentGuess.includes(text)}
              on:click|preventDefault|stopPropagation={() => onKeyPress(code)}
            >
              <div class="text">{text}</div>
              {#if Object.prototype.hasOwnProperty.call(histogram.unknown, text)}
                <div class="histogram">
                  {#each Object.entries(histogram) as [result, amounts]}
                    <div class={result} style="flex: {amounts[text] ?? 0};" />
                  {/each}
                </div>
              {/if}
            </button>
          </div>
        {/each}
      </div>
    {/each}
  </div>
</div>

<style>
  .container {
    position: fixed;
    bottom: 0;
    width: 100%;
  }

  .keyboard {
    box-sizing: border-box;
    max-height: 20%;
    background: rgb(22, 78, 99, 0.8);
    border-radius: 8px 8px 0 0;
    width: 100%;
    max-width: 550px;
    margin: 0 auto;
    padding: 4px 8px;
    user-select: none;
  }

  .row {
    text-align: center;
    width: 100%;
  }

  .key {
    flex: 1;
    display: inline-flex;
    box-sizing: border-box;
    align-items: center;
    justify-content: center;
  }
  .key button {
    width: 100%;
    background: #777;
    border: 1px solid #555;
    box-shadow: 2px 2px rgb(60 60 80);
    border-radius: 4px;
    cursor: pointer;
    color: #fff;
    font-size: 32px;
    height: 48px;
    margin: 2px;
    display: flex;
    align-items: center;
    justify-content: center;
    outline: none;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    transition: transform ease-in-out 50ms;
    padding: 1px 0 0 0;
  }
  .key button:hover {
    transform: translateY(-2px);
  }

  .key button.used {
    background: #444;
    border: 1px solid #333;
  }
  .key button.current {
    outline: auto;
  }

  .text {
    flex: 2;
  }

  .histogram {
    flex: 1;
    display: flex;
    width: 100%;
  }

  .correct,
  .wrong-pos,
  .not-found {
    border-top: 1px solid #111;
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

  @media (max-width: 550px) {
    .keyboard {
      border-radius: 0;
    }
  }
</style>
