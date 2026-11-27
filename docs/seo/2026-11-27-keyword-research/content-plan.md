# Content plan from the 27 November 2026 research

Five clusters, each with a pillar and spokes that link to each other. 16 new posts publish two a day from 28 November to 5 December 2026; the 10 existing posts are updated now. Volumes are Google US monthly searches; "kd" is DataForSEO difficulty; the verdict is from `serp_analysis.csv`.

## Publishing schedule (new posts)

A post is built only on or after its `date` (lib/blog.ts). Links to a post that is not live yet render as plain text until it is.

| Date | Slug | Primary keyword (vol / kd / verdict) | Cluster |
| --- | --- | --- | --- |
| 2026-11-28 | push-pull-legs-routine | ppl routine (12,100 / 0 / pass) | Splits (pillar) |
| 2026-11-28 | how-long-does-it-take-for-muscles-to-recover | how long does it take for muscles to recover (1,000 / 10 / pass) | Recovery (pillar) |
| 2026-11-29 | how-much-protein-to-build-muscle | how much protein to build muscle (9,900 / 20 / borderline) | Nutrition (pillar) |
| 2026-11-29 | best-app-to-track-workouts | best app to track workouts (1,900 / 22 / pass) | Tracking (pillar) |
| 2026-11-30 | 4-day-workout-split | 4 day split workout (6,600 / 0 / pass) | Splits |
| 2026-11-30 | sore-muscles-after-workout | sore muscles after workout (8,100 / 10 / pass) | Recovery |
| 2026-12-01 | 3-day-workout-split | 3 day split workout (5,400 / 0 / pass) | Splits |
| 2026-12-01 | workout-log-template | exercise workout log (2,400 / 22 / pass) | Tracking |
| 2026-12-02 | how-many-sets-per-muscle-group-per-week | how many sets per muscle group per week (2,400 / 2 / pass) | Overload |
| 2026-12-02 | bulking-vs-cutting | cutting vs bulking (2,400 / 15 / pass) | Nutrition |
| 2026-12-03 | 5-day-workout-split | 5 day workout split (5,400 / 3 / pass) | Splits |
| 2026-12-03 | deload-week | what is a deload week in lifting (320 / 0 / pass) + deload week (3,600 / 11 / borderline) | Recovery |
| 2026-12-04 | progressive-overload-examples | progressive overload bench press (880 / 0 / pass) | Overload |
| 2026-12-04 | body-recomposition | protein intake for body recomposition (720 / 11 / pass) | Nutrition |
| 2026-12-05 | rpe-chart | rpe chart (2,400 / 4 / pass) | Overload |
| 2026-12-05 | ai-calorie-counter | ai calorie counter (1,600 / 38 / pass) | Nutrition / Tracking |

## Clusters

### Splits and programs
Pillar: **push-pull-legs-routine**, with the existing **how-to-build-your-own-workout-split** as the "make your own" hub.

| Post | Primary | Secondary keywords (vol / verdict) |
| --- | --- | --- |
| push-pull-legs-routine (new) | ppl routine | push pull legs routine (12,100), push pull legs workout (12,100 / borderline), push pull legs exercises (4,400 / borderline), push pull split (1,900 / borderline), beginner push/pull legs routine (210 / pass) |
| 4-day-workout-split (new) | 4 day split workout | 4 day upper/lower split (2,900 / pass), upper lower split (8,100 / borderline), 4 day lifting split (6,600) |
| 3-day-workout-split (new) | 3 day split workout | 3 day full body workout split (1,600 / pass), fbeod split (1,300 / pass), 3 day gym split (5,400) |
| 5-day-workout-split (new) | 5 day workout split | pplul split (2,900 / pass), bro split workout (1,300 / pass), arnold split (18,100 / borderline) |
| how-to-build-your-own-workout-split (update) | gym splits (3,600 / borderline) | workout split for beginners (320 / borderline), best split workout, workout planner (14,800 / pass) |
| missed-a-day-push-pull-legs (update) | missed a day push pull legs | ppl routine, push pull legs schedule |
| gym-workout-plan-for-beginners-india (update) | gym workout plan for beginners india | workout split for beginners, beginner gym routine |

### Progressive overload and training volume
Pillar: **how-to-track-progressive-overload** (existing).

| Post | Primary | Secondary |
| --- | --- | --- |
| how-to-track-progressive-overload (update) | how to track progressive overload (70 / pass) | progressive overload tracker (110 / pass), progressive overload app (140 / pass), progressive overload chart (210 / pass) |
| progressive-overload-examples (new) | progressive overload bench press | progressive overload for squats (390 / pass), progressive overload dumbbells (320 / pass), progressive overload push-ups (260 / pass), how often should you progressive overload (110 / pass), example of progressive overload (480) |
| double-progression (update) | double progression method (320 / pass) | double progression rep range, double progression example |
| how-many-sets-per-muscle-group-per-week (new) | how many sets per muscle group per week | how many sets (3,600 / borderline), how many sets per week for hypertrophy (210 / borderline), best muscle building rep range (720 / pass) |
| rpe-chart (new) | rpe chart | rpe meaning gym (1,900 / borderline), rpe scale (9,900), reps in reserve |
| rest-between-sets-compound-vs-isolation (update) | how long to rest between sets (3,600) | rest timer (1,300 / pass), optimal rest time between sets for muscle growth (590 / borderline), rest time between sets |
| how-to-load-a-barbell-in-kg (update) | how much does a barbell weigh in kg (210 / pass) | how to load a barbell, barbell weight kg |
| log-dumbbells-per-hand-or-total (update) | log dumbbells per hand or total | dumbbell weight per hand, exercise workout log |

### Recovery
Pillar: **how-long-does-it-take-for-muscles-to-recover**. GymLedger's Recovery tab is the tie-in.

| Post | Primary | Secondary |
| --- | --- | --- |
| how-long-does-it-take-for-muscles-to-recover (new) | how long does it take for muscles to recover | muscle recovery time (480 / borderline), how long do muscles take to recover (390), can you train the same muscle two days in a row |
| sore-muscles-after-workout (new) | sore muscles after workout | working out with sore muscles (2,400 / borderline), how to prevent sore muscles after workout (1,600 / pass), how to ease sore muscles (2,900 / borderline) |
| deload-week (new) | what is a deload week in lifting | deload week (3,600 / borderline), deload workouts (260 / borderline), why am I not getting stronger (110 / pass) |

### Nutrition
Pillar: **how-much-protein-to-build-muscle**. GymLedger's Diet tab and protein target are the tie-in.

| Post | Primary | Secondary |
| --- | --- | --- |
| how-much-protein-to-build-muscle (new) | how much protein to build muscle | protein for muscle gain (90,500 / borderline), protein how much is too much (8,100 / pass), protein per kg of body weight (390) |
| bulking-vs-cutting (new) | cutting vs bulking | what is bulking and cutting (720 / pass), calorie surplus for bulking (880 / pass), lean bulking diet (720 / borderline) |
| body-recomposition (new) | protein intake for body recomposition | resistance training for body recomposition (9,900 / borderline) |
| ai-calorie-counter (new) | ai calorie counter | AI meal logging, photo vs text calorie tracking |
| how-often-to-weigh-yourself (update) | how often should you weigh yourself (1,300; strong SERP, kept because the post exists) | weigh-in frequency bulking, scale weight fluctuations |

### Tracking and apps
Pillar: **best-app-to-track-workouts**.

| Post | Primary | Secondary |
| --- | --- | --- |
| best-app-to-track-workouts (new) | best app to track workouts | best weight workout app (3,600 / pass), best gym apps (880 / pass), app to track workouts (590 / pass), best free workout apps (9,900 / pass) |
| workout-log-template (new) | exercise workout log | what is a workout log (880 / pass), how to make a workout log (140 / pass), workout tracker template (390 / pass), free printable workout log (210 / pass), google sheet workout tracker (260 / pass) |
| hevy-alternatives-without-social-feed (update) | hevy alternative | hevy vs strong (390 / pass), strong workout app (720 / pass) |

## Internal links each post must carry

- Every spoke links to its pillar in the first third of the post, and to at least one sibling in its cluster.
- Every pillar links to all of its spokes.
- Cross-cluster links where the reader's next question lives there: splits → how-many-sets-per-muscle-group-per-week and how-long-does-it-take-for-muscles-to-recover; protein → body-recomposition and how-often-to-weigh-yourself; overload → deload-week and rpe-chart; tracking → how-to-track-progressive-overload.
- Links to scheduled posts are fine: they stay plain text until the target goes live, then become links on the next daily build.
