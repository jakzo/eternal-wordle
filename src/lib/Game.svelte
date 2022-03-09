<script lang="ts">
  import { onMount } from "svelte";
  import JSConfetti from "js-confetti";

  import { ALL_WORDS, COMMON_WORDS } from "../words";
  import { CODE_BACKSPACE, CODE_ENTER } from "../constants";
  import { calculateResults, GuessResult } from "../results";
  import { randStr, seedrandom } from "../utils";
  import Boards from "./Boards.svelte";
  import Keyboard from "./Keyboard.svelte";

  export let wordCount: number = 4;
  export let wordLen: number = 5;
  export let maxGuesses: number = wordCount + 5;
  export let score: number = 0;
  export let isGameOver: boolean = false;
  export let seed: string = randStr(5);
  export let zen: boolean = false;

  export let loadedGuesses: string[] | undefined;
  export let guesses: string[] = [];

  let currentGuess = "";
  let focusedBoard: number | undefined;

  const confetti = new JSConfetti();

  let rand = seedrandom(seed);
  const pickNextWord = () => {
    const idx =
      wordPoolIdx + Math.floor(rand() * (wordPool.length - wordPoolIdx));
    [wordPool[wordPoolIdx], wordPool[idx]] = [
      wordPool[idx],
      wordPool[wordPoolIdx],
    ];
    return wordPool[wordPoolIdx++];
  };

  const wordPool = COMMON_WORDS.filter((word) => word.length === wordLen);
  let wordPoolIdx = 0;
  while (wordPoolIdx < wordCount) pickNextWord();
  const words = wordPool
    .slice(0, wordCount)
    .map<[string, number]>((word) => [word, 0]);

  const processLastGuess = (guesses: string[]) => {
    for (const [i, [word, ts]] of words.entries()) {
      if (ts >= guesses.length) continue;

      if (
        calculateResults(word, guesses[guesses.length - 1]).every(
          (result) => result === GuessResult.CORRECT
        )
      ) {
        words[i] = [pickNextWord(), guesses.length];
        score += maxGuesses - (guesses.length - 1 - ts);
        confetti.addConfetti();
      }
    }

    if (!zen && words.some(([, ts]) => guesses.length - ts >= maxGuesses)) {
      isGameOver = true;
    }
  };

  onMount(() => {
    if (loadedGuesses) {
      for (const guess of loadedGuesses) {
        guesses.push(guess);
        processLastGuess(guesses);
      }
      guesses = guesses;
    }
  });

  $: processLastGuess(guesses);

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
</script>

<svelte:window on:keydown={(evt) => onKeyPress(evt.keyCode)} />
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
