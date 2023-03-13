import type { TransitionConfig } from "svelte/transition";

export type SpinningTransitionConfig = TransitionConfig & {
  spinningTimes: number;
};
