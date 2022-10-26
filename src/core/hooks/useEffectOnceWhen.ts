/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import React from 'react';

/**
 * React useEffect() that waits for a condition to be met, then runs only once.
 *
 * You can use options.waitUntil to wait until a condition is true before calling the action once.
 * You can use options.resetWhen to allow a reset on the "once" if a condition becomes true.
 * @link https://github.com/scottbamford/use-effect-once-when
 *
 */
export function useEffectOnceWhen(
  condition: boolean | undefined | null,
  effect: React.EffectCallback,
  deps: React.DependencyList = []
) {
  const hasCompletedRef = React.useRef<boolean>(false);

  // Run any scheduled executions of the callback if we need to.
  React.useEffect(() => {
    // If we've already completed, do nothing.
    if (hasCompletedRef.current) {
      return;
    }

    // If we are not ready to return without doing anything until we are ready.
    if (!condition) {
      return;
    }

    // Note that the effect has been completed (we'll actually run it in a moment).
    hasCompletedRef.current = true;

    // Run the actual effect,
    effect();
  }, [effect, condition, deps]);
}
