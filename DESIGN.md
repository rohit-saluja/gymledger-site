---
name: GymLedger
description: The gym whiteboard you read before you lift, for an iPhone workout tracker.
colors:
  board: "#F2F4F6"
  board-shade: "#E9ECEF"
  grid: "#E0E4E9"
  rule: "#D2D7DD"
  paper: "#FCFCFA"
  ghost: "#CBD0D7"
  ink: "#17181B"
  ink-2: "#4A4E54"
  ink-3: "#666A70"
  red: "#D94040"
  red-ink: "#B42E2C"
  blue: "#2453C2"
  green: "#23874A"
  green-ink: "#1C7040"
  alu: "#BEC3C7"
  alu-light: "#E6E9EB"
  alu-dark: "#878D92"
typography:
  display:
    fontFamily: "Kalam, ui-rounded, cursive"
    fontSize: "clamp(7.5rem, 18vw, 16rem)"
    fontWeight: 700
    lineHeight: 0.86
    letterSpacing: "-0.01em"
  headline:
    fontFamily: "Kalam, ui-rounded, cursive"
    fontSize: "clamp(2.5rem, 5.2vw, 4.25rem)"
    fontWeight: 700
    lineHeight: 0.95
    letterSpacing: "-0.01em"
  title:
    fontFamily: "Barlow, system-ui, sans-serif"
    fontSize: "clamp(2.125rem, 3.6vw, 3.25rem)"
    fontWeight: 800
    lineHeight: 1.03
    letterSpacing: "-0.025em"
  title-sm:
    fontFamily: "Barlow, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 700
    lineHeight: 1.375
  body:
    fontFamily: "Barlow, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.625
  body-article:
    fontFamily: "Barlow, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.72
  note:
    fontFamily: "Kalam, ui-rounded, cursive"
    fontSize: "1.375rem"
    fontWeight: 400
    lineHeight: 1.2
  label:
    fontFamily: "Barlow Condensed, Barlow, system-ui, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 600
    letterSpacing: "0.04em"
rounded:
  photo: "3px"
  sheet: "4px"
  board-sm: "6px"
  board: "10px"
  badge-sm: "10px"
  badge: "13px"
  magnet: "999px"
spacing:
  frame-sm: "8px"
  frame: "14px"
  gutter: "20px"
  gutter-md: "32px"
  grid: "32px"
  section: "96px"
  section-lg: "128px"
  container-max: "1216px"
components:
  app-store-badge:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.badge}"
    height: "56px"
    padding: "0 24px 0 16px"
  app-store-badge-sm:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.badge-sm}"
    height: "40px"
    padding: "0 16px 0 14px"
  sheet:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sheet}"
    padding: "12px 12px 20px"
  board-box:
    backgroundColor: "{colors.board}"
    textColor: "{colors.ink}"
    rounded: "{rounded.board-sm}"
    padding: "28px 40px 40px"
  nav-link:
    textColor: "{colors.ink-2}"
    typography: "{typography.title-sm}"
    padding: "8px 12px"
  nav-link-hover:
    textColor: "{colors.ink}"
  day-picker:
    textColor: "{colors.ink-3}"
    typography: "{typography.note}"
    padding: "4px 12px"
  day-picker-active:
    textColor: "{colors.ink}"
  magnet:
    backgroundColor: "{colors.red}"
    rounded: "{rounded.magnet}"
    size: "30px"
---

# Design System: GymLedger

## Overview

**Creative North Star: "The Gym Whiteboard"**

The whole site is one glossy whiteboard bolted to a gym wall. A brushed-aluminium frame runs round every page; inside it, a cool white board carries a faint printed grid. Everything on the board was put there by hand or held up by something physical: big words and numbers written in dry-erase marker, real iPhone screenshots held up by round magnets and hung at a slight tilt, printed sheets (blog posts, legal pages) stuck up the same way, and the faint ghost of yesterday's writing that never wipes clean.

Two voices share the board. The marker voice (Kalam) writes single words, section headings, numbers, tallies and the coach's notes. The printed voice (Barlow) carries every sentence that has to be read: hero claim, body copy, article text, navigation. Colour is marker colour: black for writing, red (the app's own red) for the day's word and emphasis, blue for the coach's notes, green for "fresh". The board is generous and mostly empty; sections sit far apart, and the grid, not boxes, holds them in line.

The world rejects the category default of a dark page, a centred phone mockup and an icon-card feature grid. States are written as marker notes, never chrome badges.

**Key Characteristics:**
- Brushed-aluminium frame (raster texture) around a glossy grid board on every page.
- Kalam marker for words and numbers; Barlow for sentences; Barlow Condensed for printed labels.
- Four marker colours: black, red, blue, green. No other hues.
- Real app screenshots in a black iPhone frame, tilted 1.5 to 3 degrees, held by two magnets.
- Hand-drawn SVG marks (underlines, loops, arrows, ticks, boxes) in the current marker colour.
- Ghost writing: giant blurred marker words left behind from an erased day.
- One signature control: the eraser that wipes the day's word and writes the next day in.

## Colors

A cool, near-neutral board with four dry-erase marker colours and an aluminium frame; colour comes from the marker, never from fills.

### Primary
- **Marker Red** (red): the app's own red. The day's word in the hero, the closing "gym.", magnet fills, underlines and loops, the PR board heading, the eraser label, bullet markers in prose. Large type and marks only (it is about 3.9:1 on the board).
- **Red Ink** (red-ink): the same red, deepened for small text (5.6:1): prose links, the "fresh tomorrow" countdown note.

### Secondary
- **Coach's Blue** (blue): handwritten annotations: callouts beside the phone, "free trial" notes, the typed meal, "drag to wipe". Also the focus ring and blue magnets.

### Tertiary
- **Fresh Green** (green): the tick beside a recovered muscle. **Green Ink** (green-ink) for small "fresh" and "new PR" notes.

### Neutral
- **Glossy Board** (board): the page ground under the grid; also the fill of boxed board areas.
- **Board Shade** (board-shade): inline code, quiet hover ground.
- **Printed Grid** (grid): the 32px grid lines.
- **Hairline** (rule): header bottom border, table rules, blockquote and table insets.
- **Printed Paper** (paper): sheets held on the board; text on the black badge.
- **Erased Marker** (ghost): ghost writing, always at 30% with a 0.7px blur.
- **Black Marker** (ink): headings, marker words, the App Store badge fill.
- **Printed Grey** (ink-2): body copy and secondary navigation.
- **Muted Grey** (ink-3): metadata, fine print, inactive day words (4.6:1 on the board).
- **Aluminium** (alu, alu-light, alu-dark): frame and tray. alu-dark is the page edge colour outside the frame and the scrollbar thumb.

### Named Rules
**The Marker Box Rule.** Only black, red, blue and green ever write on the board. A fifth hue means something is not marker.

**The Small Red Rule.** Text under 24px that should read red uses red-ink, never red.

## Typography

**Display Font:** Kalam 700 (with ui-rounded, cursive)
**Body Font:** Barlow 400 to 800 (with system-ui, sans-serif)
**Label Font:** Barlow Condensed 600

**Character:** A felt-tip hand that stays legible small, against a plate-lettering grotesk drawn from road signs. The marker is loud and brief; Barlow does the explaining.

### Hierarchy
- **Display** (Kalam 700, clamp(7.5rem, 18vw, 16rem), 0.86, uppercase): the day's word in the hero. Never below 120px.
- **Headline** (Kalam 700, clamp(2.5rem, 5.2vw, 4.25rem), 0.95): every section heading, written in on first view. Blog index title at clamp(3rem, 7vw, 5.5rem); closing line up to 6.5rem.
- **Title** (Barlow 800, clamp(2.125rem, 3.6vw, 3.25rem), 1.03, -0.025em): the hero H1 sentence and article H1s.
- **Title small** (Barlow 700, 1.125rem, 1.375): sheet titles, guide cards.
- **Body** (Barlow 400, 1.125rem, 1.625): section copy, max 33 to 38rem. Articles at 1.72 line height on a max-w-3xl sheet.
- **Note** (Kalam 400, 1.1875 to 1.5rem, 1.2): annotations, lists written on the board, tallies.
- **Label** (Barlow Condensed 600, 0.8125rem, 0.04em, uppercase): printed column heads, as on a weight plate.

### Named Rules
**The Two Voices Rule.** Marker writes words and numbers; Barlow writes sentences. A paragraph in Kalam, or a heading in Barlow on the board, breaks the world. (Article and legal headings inside a printed sheet are Barlow: they are printed.)

**The Badge Face Rule.** The Apple system face appears only inside the App Store badge and inside simulated iOS screens (Dynamic Island, Lock Screen). It is never site type.

## Layout

A centred container (max 1216px, 20px side padding, 32px from md) on a 32px printed grid. The home page alternates asymmetric 12-column splits (7/5 hero, 5/6 recovery, 7/4 protein) with centred moments (rest timer, close). Sections are far apart: 96px vertical on mobile, 128px from md. Phones sit beside copy on lg and drop below or above it on mobile, at min(72vw, 290px). The frame is 8px on mobile, 14px from md. Breakpoints are Tailwind defaults (640, 768, 1024, 1280). Header is sticky, 68px tall.

## Elevation & Depth

Depth is physical, not interface. Objects on the board (magnets, phones, sheets, the eraser, the tray) cast soft, cool shadows from overhead gym light (rgb 40 46 56). The board itself is flat. Aluminium reads through 1px inset highlights and shadows on a brushed raster texture. One broad diagonal sheen crosses the hero like a strip light.

### Shadow Vocabulary
- **Magnet** (`inset 0 -3px 5px rgb(0 0 0 / 0.25), 0 3px 4px rgb(40 46 56 / 0.28), 0 8px 14px rgb(40 46 56 / 0.16)`): round magnets.
- **Sheet** (`0 1px 0 rgb(255 255 255) inset, 0 1px 2px rgb(40 46 56 / 0.08), 0 14px 34px -12px rgb(40 46 56 / 0.22)`): printed paper on the board.
- **Phone** (`0 2px 4px rgb(40 46 56 / 0.18), 0 28px 56px -18px rgb(40 46 56 / 0.55)` plus bezel insets): the iPhone frame.
- **Tray** (`0 2px 0 rgb(255 255 255 / 0.75) inset, 0 -1px 0 rgb(40 46 56 / 0.25) inset, 0 7px 10px -4px rgb(40 46 56 / 0.35)`): the aluminium ledge.
- **Badge** (`0 1px 0 rgb(255 255 255 / 0.12) inset, 0 10px 22px -12px rgb(23 24 27 / 0.7)`): App Store button.

### Named Rules
**The Held Up Rule.** Anything lifted off the board (phone, sheet, app icon in a CTA) is held by something: magnets, or it rests on the tray. Text and marks are never shadowed.

**The Light On Material Rule.** Gradients exist only as light on a material: the board sheen, the magnet's highlight, the eraser handle, simulated iOS wallpaper. Never as a decorative fill or a text effect.

## Shapes

Small, physical radii. Sheets 4px, photos inside sheets 3px, outlined board boxes 6px, the board surface 6px on mobile and 10px from md, the App Store badge 10px (small) and 13px (large), magnets fully round. The iPhone frame uses proportional radii (15%/6.9% outer) so it stays true at any width. Boxes drawn on the board are a 3px near-black stroke (ink at 85%), like a marker rectangle. Hand-drawn marks are round-capped SVG strokes in currentColor.

## Components

### Buttons
The only filled button is Apple's badge, rebuilt.
- **Shape:** gently rounded (13px large, 10px small).
- **Primary:** black ink fill, paper text, solid Apple logo; large has "Download on the" over "App Store" at 56px tall; small reads "Download" at 40px in the header.
- **Hover / Focus / Press:** hover drops the fill to 90%; focus is the 2px blue ring at 3px offset; press scales to 0.97 over 160ms.

### Sheets (cards)
- **Corner Style:** 4px.
- **Background:** paper on the board.
- **Shadow Strategy:** Sheet shadow, plus magnets at the top edge.
- **Internal Padding:** 12px with 20px bottom for guide sheets; 20 to 56px for article and legal sheets.
- **Hover:** title underlines in red at 60%; press scales 0.97.

### Board Box
A rectangle drawn in black marker (3px ink/85, 6px radius) for the PR board and the in-article app CTA; heading in marker, contents in marker and note type.

### Navigation
Barlow 600 at 15px in ink-2, hover to ink; Support hides under 640px. The header is the board itself (board at 85 to 95%), with a hairline below, the app icon and wordmark left, links and the small badge right. Footer: the aluminium tray across the board's foot, then icon, wordmark, links in ink-2 and fine print in ink-3.

### Magnet
30px round, red by default, black (#26282C) or blue variants, a highlight at 34%/30%. Two per phone (top left and top right at 8%), one or two per sheet.

### Eraser (signature)
A felt-and-handle whiteboard eraser in SVG, with a red label, beside the day's word. Drag left to wipe the word (clip-path follows the eraser's leading edge); release past halfway or flick to commit; click or keyboard wipes in one 620ms stroke. The next day writes itself in, the phone screenshot cross-fades with a 3px blur over 300ms, and the wiped word stays behind as ghost writing. A day picker in note type sits below, with a red marker loop around the active day.

### Write-on
Marker headings clip in from left to right over 900ms (ease-out) the first time they scroll into view. Content is visible by default; reduced motion and no-JS show it at once.

## Do's and Don'ts

### Do:
- **Do** put every page inside the aluminium frame and on the gridded board.
- **Do** write section headings in Kalam 700 at the headline size and let them write on once.
- **Do** hold every phone and sheet up with magnets, tilted between 0.5 and 3 degrees.
- **Do** write states and annotations as blue or green marker notes with a drawn arrow or tick.
- **Do** use red-ink for small red text and red for large words and marks.
- **Do** keep sentences in Barlow at 1.125rem with relaxed leading and a 33 to 38rem measure.

### Don't:
- **Don't** add a fifth marker colour or any decorative gradient fill.
- **Don't** use glass panels, icon-card feature grids, chrome status pills, or a dark page.
- **Don't** shrink the day's word below 120px.
- **Don't** set a sentence or paragraph in Kalam.
- **Don't** use the Apple system face outside the App Store badge and simulated iOS screens.
- **Don't** float a sheet or phone with a shadow but nothing holding it.
