# Beagle Voyage Chapter Spec

This is the working chapter map for implementing the overview file in the current web app. It records both the intended design and the current asset situation.

## Current Image Inventory

| Folder | Current images |
| --- | --- |
| `pictures/CH.0` | `게임 시작화면.png`, `벽보.png`, `비글호 탑승.png`, `비글호 출항.png` |
| `pictures/CH.1` | `비글호 리우데자네이루 도착.png`, `다윈의 노예 목격.png`, `피츠로이 선장의 방(대화 장소).png` |
| `pictures/CH.2` | `리우데자네이루를 떠나는 비글호.png`, `동굴 입구.png`, `동굴 내부.png` |
| `pictures/CH.3` | `비글호 티에라델푸에고 도착.png`, `티에라델푸에고의 원주민.png`, `선교사와의 대화 장소.png` |
| `pictures/CH.4` | `원주민과의 대화 장소(식인종).png` |
| `pictures/CH.5` | `티에라델푸에고를 떠나는 비글호.png`, `비글호 갑판.png`, `비글호 내 다윈의 방.png` |
| `pictures/CH.6` | `비글호 갈라파고스 도착.png` |
| `pictures/CH.7` | `비글호 오스트레일리아 도착.png`, `다윈이 설명을 듣는 오스트레일리아 해안가.png`, `오스트레일리아를 떠나는 비글호.png` |
| `pictures` root | `opening pic.png`, `wall paper.png`, `paper zoomin.png`, `darwin original.png`, `player original.png`, `take on ship.png`, `going ship.png`, `choolhang.png` |

## Current Public Chapter Backgrounds

| Public path | Intended source/use |
| --- | --- |
| `/assets/backgrounds/chapters/ch0-scene1.png` | Current CH.0 scene 1 background |
| `/assets/backgrounds/chapters/ch0-scene2.png` | Current CH.0 scene 2 background |
| `/assets/backgrounds/chapters/ch0-scene3.png` | Current CH.0 scene 3 background |
| `/assets/backgrounds/chapters/ch0-scene4.png` | Current CH.0 scene 4 background |
| `/assets/backgrounds/chapters/ch1-scene1.png` | Current CH.1 scene 1 background |
| `/assets/backgrounds/chapters/ch1-scene2.png` | Current CH.1 scene 2 background |
| `/assets/backgrounds/chapters/ch1-scene3.png` | Current CH.1 scene 3 background |
| `/assets/backgrounds/chapters/ch2-scene1.png` | Current CH.2 scene 1 background |
| `/assets/backgrounds/chapters/ch2-scene2.png` | Current CH.2 scene 2 background |
| `/assets/backgrounds/chapters/ch2-scene3.png` | Current CH.2 scene 3 background |
| `/assets/backgrounds/chapters/ch3-scene1.png` | Current CH.3 scene 1 background |
| `/assets/backgrounds/chapters/ch3-scene2.png` | Current CH.3 scene 2 background |
| `/assets/backgrounds/chapters/ch3-scene3.png` | Current CH.3 scene 3 background |
| `/assets/backgrounds/chapters/ch4-scene1.png` | Current CH.4 scene 1 background |
| `/assets/backgrounds/chapters/ch5-scene1.png` | Current CH.5 scene 1 background |
| `/assets/backgrounds/chapters/ch5-scene2.png` | Current CH.5 scene 2 background |
| `/assets/backgrounds/chapters/ch5-scene3.png` | Current CH.5 scene 3 background |
| `/assets/backgrounds/chapters/ch6-scene1.png` | Current CH.6 scene 1 background; image content is Galapagos arrival |
| `/assets/backgrounds/chapters/ch7-scene1.png` | Current CH.7 scene 1 background; image content is Australia |
| `/assets/backgrounds/chapters/ch7-scene2.png` | Current CH.7 scene 2 background; image content is Australia |
| `/assets/backgrounds/chapters/ch7-scene3.png` | Current CH.7 scene 3 background; image content is Australia |

## Global Character Assets

| Slot | Current asset | Notes |
| --- | --- | --- |
| Left character | `/assets/characters/player-original.png` | Applied to all current scenes. |
| Right character | `/assets/characters/darwin-original.png` | Applied to all current scenes. |

## Intended Chapter Plan

| Chapter | Overview chapter | Current asset status | Core interaction | Elements | Next route |
| --- | --- | --- | --- | --- | --- |
| CH.0 | London - assistant recruitment notice | Existing `pictures/CH.0` backgrounds and root poster zoom assets. | Poster/easter egg interaction, then choose whether to board the Beagle. | Do not show `voyage_start` as visible inventory unless requested. `bad_no_voyage` if refusing. | Board -> CH.1 or MVP route to CH.7/CH.9. Refuse -> bad ending. |
| CH.1 | Rio de Janeiro - slavery and FitzRoy | Existing `pictures/CH.1` backgrounds. | Choice dialogue about slavery and FitzRoy. | `balanced_view_of_evolution`, `biased_view`; missing element ids may be needed for "incomplete human understanding". | CH.2 |
| CH.2 | Cave near Rio - fossils and common structure | Existing `pictures/CH.2` backgrounds. | Skeleton/fossil matching mini-game. | Missing current ids for `common_structure_discovery`, `incomplete_fossil_interpretation`, `observation_failure`. | CH.3 |
| CH.3 | Tierra del Fuego - find the missionary | Existing `pictures/CH.3` backgrounds. | Missionary click game, then interpretation choices. | `human_diversity`, `balanced_view_of_evolution`, `biased_view`. | CH.4 |
| CH.4 | Tierra del Fuego night - cannibal story and fear | Existing `pictures/CH.4` background. | Choice dialogue about fear, othering, and judgment. | `human_diversity`, `balanced_view_of_evolution`, `biased_view`. | CH.5 |
| CH.5 | Reading during voyage - Malthus | Existing `pictures/CH.5` backgrounds. | Choice dialogue plus simple graph/explanation. | `competition_structure`, `social_darwinism_misunderstanding`; missing id may be needed for "incomplete natural selection understanding". | CH.6 |
| CH.6 | Toward Australia - catch the prisoner | Current folder mismatch: `pictures/CH.7` has Australia images. | Prisoner click game, then empire/context choices. | `imperialism_shadow`; missing ids may be needed for `imperialism_bias` and `social_context_missing`. | CH.7 |
| CH.7 | Galapagos - classification first | Current folder mismatch: `pictures/CH.6` only has Galapagos arrival; more Galapagos classification images needed. | Classification choices, then BeakFoodMatchingGame. | `classification_need`, `classification_failure`, `environment_adaptation_clue`, `incomplete_classification`, `natural_selection_clue`, `incomplete_adaptation`. | CH.8 or MVP route to CH.9 |
| CH.8 | Galapagos - sexual selection bonus clue | Missing folder/assets. | Choice dialogue about traits that help mating success. | `sexual_selection_concept`; missing ids may be needed for "incomplete evolution understanding" and "observation disconnect". | CH.9 |
| CH.9 | Final manuscript | Missing folder/assets, but `FinalManuscriptPanel` and `judgeEnding` exist. | Select acquired elements and complete manuscript. | Uses selected final elements by category. | Ending result screen |

## MVP Restoration Sequence

| Step | Scene/content | Required data changes later |
| --- | --- | --- |
| 1 | Restore CH.0 playable opening chapter. | Add choices to the wall/poster scene; reconnect poster zoom to the current scene id. |
| 2 | Restore CH.7 Galapagos classification path. | Add two choice scenes and one `miniGameType: "beakFoodMatching"` scene. |
| 3 | Restore CH.9 final manuscript. | Add `chapter9` and route to `FinalManuscriptPanel`. |
| 4 | Add remaining chapter choices. | Fill CH.1-CH.6 and CH.8 with dialogue, choices, and missing elements. |
| 5 | Replace placeholder mini-games. | Implement SkeletonMatchingGame, MissionaryClickGame, and PrisonerClickGame. |

## Missing Element Ids To Decide Before Full Implementation

The current `src/data/elements.ts` contains the original MVP element set, but the overview references several additional elements. Decide whether to add these as real elements or map them to existing negative elements.

| Overview concept | Current status | Suggested handling |
| --- | --- | --- |
| 항해의 시작 | Not in `gameElements` | Keep as story progress only; do not show in inventory unless requested. |
| 게임 규칙 이해 | Not in `gameElements` | Optional tutorial/easter egg only. |
| 불완전한 인간 이해 | Not in `gameElements` | Add later or map to `biased_view`. |
| 공통 구조의 발견 | Not in `gameElements` | Add as science element before implementing Chapter 2. |
| 불완전한 화석 해석 | Not in `gameElements` | Add as negative element before implementing Chapter 2. |
| 관찰 실패 | Not in `gameElements` | Add as negative element or map to `incomplete_classification`. |
| 불완전한 자연선택 이해 | Not in `gameElements` | Add as negative element or map to `incomplete_adaptation`. |
| 제국주의적 편향 | Not in `gameElements` | Add as negative element or map to `social_darwinism_misunderstanding`. |
| 사회적 맥락 결여 | Not in `gameElements` | Add as negative element or map to missing empire-awareness failure. |
| 불완전한 진화 이해 | Not in `gameElements` | Add as negative element for CH.8. |
| 관찰 단절 | Not in `gameElements` | Add as negative element for CH.8. |

## Ending Requirements

Current `judgeEnding` already supports the original MVP categories:

- Science success requires at least two of:
  - `classification_need`
  - `environment_adaptation_clue`
  - `natural_selection_clue`
- Human success requires at least one of:
  - `human_diversity`
  - `balanced_view_of_evolution`
- Empire success requires at least one of:
  - `imperialism_shadow`
  - `competition_structure`
- Advanced ending requires:
  - `sexual_selection_concept`

Before full implementation, decide whether Chapter 2's `common_structure_discovery` should also count as science. The overview implies yes, but current ending logic does not include it.
