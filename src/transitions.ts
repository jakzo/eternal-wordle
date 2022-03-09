import type { TransitionConfig } from "svelte/transition";

const randPosOrNeg = (max: number) => Math.random() * max * 2 - max;

const easeJump = (initialVelocity: number, gravity: number) => (t: number) =>
  initialVelocity * t - (gravity * t * t) / 2;

export const wordSolved = (
  node: Element,
  {
    delay = 0,
    duration = 1000,
    jumpVelocity = 500,
    jumpGravity = 2000,
    maxDistX = 200,
    maxRotation = 30,
  }
): TransitionConfig => {
  const style = getComputedStyle(node);
  const opacity = +style.opacity;
  const transform = style.transform === "none" ? "" : style.transform;

  const distX = randPosOrNeg(maxDistX);
  const rotation = randPosOrNeg(maxRotation);
  const jump = easeJump(jumpVelocity, jumpGravity);

  if (node instanceof HTMLElement) {
    const box = node.getBoundingClientRect();
    node.style.position = "absolute";
    node.style.left = `${box.left}px`;
    node.style.top = `${box.top}px`;
  }

  return {
    delay,
    duration,
    css: (t, u) =>
      [
        `transform: ${transform} translate(${u * distX}px, ${-jump(
          u
        )}px) rotate(${u * rotation}deg);`,
        `opacity: ${(t > 0.5 ? 1 : t * 2) * opacity};`,
      ].join("\n"),
  };
};
