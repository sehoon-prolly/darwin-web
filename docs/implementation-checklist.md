# Beagle Voyage Web MVP Implementation Checklist

This document is a working note for future implementation. It compares the current React/Vite web game against `Beagle Voyage Game Plan V2.docx` and records what should be restored or added later.

## Current Baseline

- Overview file: `Beagle Voyage Game Plan V2.docx`
  - Current Git status: untracked as of the latest inspection.
  - Treat it as the source overview, but do not assume it is available after clone unless committed.
- Current chapter data: `src/data/chapters.ts`
  - Generates linear chapters from `chapterSceneCounts = [4, 3, 3, 3, 1, 3, 1, 3]`.
  - Current chapters are `chapter0` through `chapter7` only.
  - Scenes have empty `speakerName` and `dialogueText`.
  - Scenes currently use `/assets/backgrounds/chapters/chN-sceneM.png`.
  - All scenes use `/assets/characters/player-original.png` on the left and `/assets/characters/darwin-original.png` on the right.
- Current localStorage key: `beagle-voyage-mvp-state`.

## Already Implemented

- Full viewport game frame with opening screen.
- Opening screen using `/assets/backgrounds/opening-pic.png`.
- Chapter HUD with new game button.
- Bottom dialogue box that advances by clicking the dialogue area.
- Right-side acquired element inventory with default collapsed toggle.
- DebugPanel for adding test elements.
- Element acquisition toast.
- Chapter transition fade overlay.
- Choice overlay system centered on the screen.
- Paper zoom overlay using `/assets/backgrounds/paper-zoomin.png`.
- Character image slots with opacity-only entrance animation.
- Ending judge utility and ending data.
- Final manuscript selection panel component.
- MiniGameRenderer.
- Functional BeakFoodMatchingGame.
- Placeholder components for MissionaryClickGame, PrisonerClickGame, and SkeletonMatchingGame.

## Present But Not Connected To Current Flow

- Choice-based progression exists in `App.tsx`, but current generated scenes have no `choices`.
- Element acquisition exists, but current generated scenes do not grant normal gameplay elements.
- BeakFoodMatchingGame works, but no current scene has `miniGameType: "beakFoodMatching"`.
- FinalManuscriptPanel exists, but current chapter data never reaches `chapter9`.
- Ending judge exists, but current flow does not naturally submit a final manuscript.
- Paper zoom hotspot logic is tied to scene id `assistant_notice`, but current generated scene ids are `chapter0-scene1`, `chapter0-scene2`, etc.
- DebugPanel can still test endings indirectly if the final panel is reachable later.

## Missing Or Incomplete

- Chapter 8 and Chapter 9 are absent from current chapter data.
- Chapter 0 no longer has the "board the Beagle / do not board" choice.
- Chapter 0 bad ending (`bad_no_voyage`) is in `endings.ts`, but no current choice triggers it.
- Chapter 1 through Chapter 8 narrative choices are not implemented in data.
- Chapter 2 skeleton matching is only a placeholder.
- Chapter 3 missionary click game is only a placeholder.
- Chapter 6 prisoner click game is only a placeholder.
- Chapter 7 Galapagos classification choice chain is not connected.
- Chapter 9 final manuscript and ending route is not connected.
- Final historical/factual/game adaptation distinction screen from the overview is not implemented.
- Saved state may point to old scene ids after future restructuring unless migration or reset handling is added.

## Important Mismatches

- The overview file requires Chapter 0 through Chapter 9, but the current app only generates Chapter 0 through Chapter 7.
- The overview says:
  - Chapter 6: Australia / prisoner click game.
  - Chapter 7: Galapagos / classification and beak-food matching.
- Current image folders say:
  - `pictures/CH.6`: Galapagos arrival.
  - `pictures/CH.7`: Australia scenes.
- The current folder numbering therefore conflicts with the overview's chapter numbering from Chapter 6 onward.
- The concept "항해의 시작" appears in the overview, but `voyage_start` is not currently in `gameElements`. Earlier UX direction removed "항해의 시작" from acquired elements, so do not reintroduce it as a visible inventory card unless explicitly requested.

## Image Assets

### Essential

- Chapter 8 Galapagos sexual selection backgrounds.
- Chapter 9 final manuscript / Darwin study / publication result backgrounds.
- Chapter 7 Galapagos classification backgrounds:
  - Finch specimen table.
  - Island-separated finch comparison.
  - Beak/food classification board.
- BeakFoodMatchingGame visual cards:
  - Thick strong beak.
  - Thin pointed beak.
  - Long pointed beak.
  - Hard seeds.
  - Insects.
  - Cactus fruit/flowers.
- Chapter 0 poster/easter egg clickable document images if the overview's full object interaction is restored.

### Useful Soon

- Skeleton/fossil images for Chapter 2.
- Missionary and Fuegian character sprites for Chapter 3.
- Prisoner and Darwin click-target sprites for Chapter 6.
- Element card icons by category:
  - science
  - human
  - empire
  - sexualSelection
  - negative
- Ending result images.
- Transparent-background refinements for player and Darwin character images if image backgrounds become visible in presentation.

### Later

- Newspaper article, route map, science specimen advertisement, game manual, and graffiti images for Chapter 0 easter eggs.
- A final "actual history vs game adaptation" illustrated summary screen.
- Additional alternate Darwin/player expressions.

## Recommended Development Order

1. Documentation baseline
   - Keep this checklist and `docs/chapter-spec.md` updated before major flow changes.
2. Restore Chapter 0 as a playable opening chapter
   - Use current `chapter0-scene1` through `chapter0-scene4` or replace with stable semantic ids.
   - Reconnect wall poster zoom to the actual wall poster scene.
   - Require the lower-left poster if the previous wall interaction rule remains desired.
   - Add choices: board the Beagle / do not board.
   - Trigger `bad_no_voyage` for "do not board".
   - Do not show "항해의 시작" as a visible inventory card unless explicitly requested.
3. Restore Chapter 7 MVP science route
   - Fix the Galapagos/Australia numbering decision first.
   - Add classification choices.
   - Grant `classification_need`, `classification_failure`, `environment_adaptation_clue`, `incomplete_classification`.
   - Connect BeakFoodMatchingGame and grant `natural_selection_clue` or `incomplete_adaptation`.
4. Restore Chapter 9 final manuscript
   - Add `chapter9`.
   - Route acquired elements into FinalManuscriptPanel.
   - Submit to `judgeEnding`.
   - Provide "new game" path back to opening.
5. Expand remaining chapters
   - Chapter 1: slavery/FitzRoy choices.
   - Chapter 2: fossil/common structure mini-game.
   - Chapter 3: missionary click game and human diversity choices.
   - Chapter 4: fear/othering choices.
   - Chapter 5: Malthus/competition choices.
   - Chapter 6: prisoner click game and empire choices.
   - Chapter 8: sexual selection bonus choices.

## Current UI Decisions To Preserve Unless Requested

- Game uses full browser viewport rather than a small framed 16:9 box.
- Opening page contains only the title and start button.
- Inventory starts collapsed.
- New game returns to the opening screen.
- Dialogue advances by clicking the dialogue box; there is no visible NEXT button.
- Choice buttons appear in a centered overlay, not inside the dialogue box.
- If element toast and choice overlay collide, toast appears first, then the choice overlay appears after the toast delay.
- If chapter fade and toast collide, chapter fade finishes first, then toast appears after a short delay.
- Panels are mostly transparent/dark overlay style.
- Character entrance uses opacity only; no brightness animation.

## Validation Notes For Future Changes

- Use `npm run build` after code changes.
- Use `rg --files docs` after documentation changes.
- Reset localStorage or use "새 게임 시작" after scene id changes.
- Verify the following manually in the browser after flow restoration:
  - Opening screen appears first.
  - Inventory starts collapsed.
  - Chapter transitions fade.
  - Poster zoom opens/closes on the intended wall poster.
  - Choices appear centered.
  - Element toast appears before choice overlay when both are due.
  - Final manuscript ending changes based on selected element categories.
