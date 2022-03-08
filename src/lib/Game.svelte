<script lang="ts">
  import { onMount } from "svelte";

  import { ALL_WORDS, COMMON_WORDS } from "../words";
  import { CODE_BACKSPACE, CODE_ENTER } from "../constants";
  import { calculateResults, GuessResult } from "../results";
  import Boards from "./Boards.svelte";
  import Keyboard from "./Keyboard.svelte";

  export let wordCount: number = 4;
  export let wordLen: number = 5;
  export let maxGuesses: number = wordCount + 5;
  export let score: number = 0;
  export let isGameOver: boolean = false;
  export let zen: boolean = false;

  let guesses: string[] = [];
  let currentGuess = "";
  let focusedBoard: number | undefined;

  const wordPool = COMMON_WORDS.filter((word) => word.length === wordLen);
  let wordPoolIdx = 0;
  while (wordPoolIdx < wordCount) {
    const idx =
      wordPoolIdx + Math.floor(Math.random() * (wordPool.length - wordPoolIdx));
    [wordPool[wordPoolIdx], wordPool[idx]] = [
      wordPool[idx],
      wordPool[wordPoolIdx],
    ];
    wordPoolIdx++;
  }
  const words = wordPool
    .slice(0, wordCount)
    .map<[string, number]>((word) => [word, 0]);

  $: for (const [i, [word, ts]] of words.entries()) {
    if (ts >= guesses.length) continue;

    if (
      calculateResults(word, guesses[guesses.length - 1]).every(
        (result) => result === GuessResult.CORRECT
      )
    ) {
      const idx =
        wordPoolIdx +
        Math.floor(Math.random() * (wordPool.length - wordPoolIdx));
      [wordPool[wordPoolIdx], wordPool[idx]] = [
        wordPool[idx],
        wordPool[wordPoolIdx],
      ];
      words[i] = [wordPool[wordPoolIdx], guesses.length];
      wordPoolIdx++;
      score += maxGuesses - (guesses.length - 1 - ts);
    }

    if (!zen && words.some(([, ts]) => guesses.length - ts >= maxGuesses))
      isGameOver = true;
  }

  const onKeyPress = (keyCode: number) => {
    if (isGameOver) return;

    const isCurrentGuessSubmittable =
      currentGuess.length === wordLen && ALL_WORDS.has(currentGuess);
    if (keyCode === CODE_ENTER && isCurrentGuessSubmittable) {
      guesses.push(currentGuess);
      guesses = guesses;
      currentGuess = "";
    } else if (keyCode === CODE_BACKSPACE) {
      currentGuess = currentGuess.slice(0, -1);
    } else if (
      currentGuess.length < wordLen &&
      keyCode >= 65 &&
      keyCode <= 90
    ) {
      currentGuess += String.fromCharCode(keyCode);
    }
  };

  const keydownListener = (evt: KeyboardEvent) => onKeyPress(evt.keyCode);
  onMount(() => {
    document.addEventListener("keydown", keydownListener);
    return () => {
      document.removeEventListener("keydown", keydownListener);
    };
  });
</script>

<Boards
  {wordLen}
  {words}
  {maxGuesses}
  {guesses}
  {currentGuess}
  showWords={isGameOver}
  showGuessesLeft={!zen}
  bind:focusedBoard
/>
<Keyboard
  {onKeyPress}
  words={focusedBoard === undefined ? words : [words[focusedBoard]]}
  {guesses}
  {maxGuesses}
  {currentGuess}
/>
