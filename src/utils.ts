import seedrandom from "seedrandom";
export { seedrandom };

const RAND_CHARS = [...Array(26)]
  .map((_, i) => String.fromCharCode(65 + i, 97 + i))
  .join("")
  .replace(/[iI1l]/g, "");
export const randStr = (len: number) => {
  let str = "";
  for (let i = 0; i < len; i++)
    str += RAND_CHARS[Math.floor(Math.random() * RAND_CHARS.length)];
  return str;
};
