import type { Exercise } from "./types";

export const initialExercises: Exercise[] = [
  {
    id: "pushups",
    name: "Push-ups",
    description:
      "A classic exercise that targets your chest, shoulders, and triceps.",
    imageUrl:
      "https://images.ctfassets.net/6ilvqec50fal/JdeBsAsNI2XepyM4IDL1U/ef2c96e26f7c3af5bce6db428cd1237f/Screenshot_2024-03-21_at_12.36.05_PM.png",
  },
  {
    id: "squats",
    name: "Squats",
    description: "Works your quadriceps, hamstrings, and glutes.",
    imageUrl:
      "https://hips.hearstapps.com/hmg-prod/images/man-exercising-at-home-royalty-free-image-1645047847.jpg?resize=980:*",
  },
  {
    id: "situps",
    name: "Sit-ups",
    description: "Strengthens your core and abdominal muscles.",
    imageUrl:
      "https://hips.hearstapps.com/hmg-prod/images/shot-of-a-young-man-completing-crunches-royalty-free-image-1678721163.jpg",
  },
  {
    id: "lunges",
    name: "Lunges",
    description: "Targets your legs and glutes while improving balance.",
    imageUrl:
      "https://images.healthshots.com/healthshots/en/uploads/2024/05/02174153/Lunges.jpg",
  },
  {
    id: "plank",
    name: "Plank",
    description: "Isometric core exercise that improves stability.",
    imageUrl:
      "https://www.shape.com/thmb/i3tgB5V-vts89WQ0ZzDRB2WUNEM=/1500x0/filters:no_upscale():max_bytes(200000):strip_icc()/30-Day-Plank-Challenge-Stocksy_txp37c4682fMZb300_Medium_3751574-8471c02a2c6f4d959de0e4fc3487238b.jpg",
  },
  {
    id: "burpees",
    name: "Burpees",
    description: "Full-body exercise that builds strength and endurance.",
    imageUrl:
      "https://simplyfitme.com/wp-content/uploads/2021/11/Burpees-Exercise-Benefits-and-Weight-loss-1024x576.jpg",
  },
  {
    id: "jumpingjacks",
    name: "Jumping Jacks",
    description: "Cardiovascular exercise that works your whole body.",
    imageUrl:
      "https://cdn.prod.website-files.com/62e18da95149ec2ee0d87b5b/65b0d7b7d9a5e40eb3e4342b_standart-jumping-jacks-65ae476778685.webp",
  },
  {
    id: "mountainclimbers",
    name: "Mountain Climbers",
    description:
      "Dynamic exercise that targets your core and builds cardio endurance.",
    imageUrl:
      "https://app-media.fitbod.me/v2/255/images/landscape/0_960x540.jpg",
  },
  {
    id: "tricepsdips",
    name: "Triceps Dips",
    description: "Targets your triceps, shoulders, and chest.",
    imageUrl:
      "https://www.ativafit.com/cdn/shop/articles/Tricep_workouts.jpg?v=1668423477",
  },
  {
    id: "crunches",
    name: "Crunches",
    description: "Focuses on your abdominal muscles.",
    imageUrl:
      "https://images.healthshots.com/healthshots/en/uploads/2022/10/27130441/sit-ups-vs-crunches.jpg",
  },
  {
    id: "jumpingsquats",
    name: "Jumping Squats",
    description: "Explosive exercise that builds leg power and endurance.",
    imageUrl:
      "https://cdn.mos.cms.futurecdn.net/DR377ma6vDMPpNDAAnLXv4-1200-80.jpg",
  },
  {
    id: "wallsit",
    name: "Wall Sit",
    description: "Isometric exercise that builds leg strength and endurance.",
    imageUrl:
      "https://heightperformance.com/wp-content/uploads/2021/07/Wall-Sit-Weighted.jpg",
  },
  {
    id: "highknees",
    name: "High Knees",
    description: "Cardio exercise that also works your core and legs.",
    imageUrl:
      "https://barbend.com/wp-content/uploads/2024/07/high-knees-1992330344-1.jpg",
  },
  {
    id: "superman",
    name: "Superman",
    description: "Strengthens your lower back, glutes, and hamstrings.",
    imageUrl:
      "https://i0.wp.com/www.muscleandfitness.com/wp-content/uploads/2016/06/Superman-core.jpg?quality=86&strip=all",
  },
  {
    id: "pikepushups",
    name: "Pike Push-ups",
    description: "Targets your shoulders and upper back.",
    imageUrl:
      "https://images.ctfassets.net/hjcv6wdwxsdz/7ttOp8ER6qe63u4WiTQDla/0e5d9078c0e6b997c3c7d67b51da6eaa/pike-push-up-curt-hold.png?w=1200",
  },
];

export const jacobChallenges: Exercise[] = [
  {
    id: "pushups",
    name: "Push-ups",
    description:
      "A classic exercise that targets your chest, shoulders, and triceps.",
    imageUrl:
      "https://media.gq.com/photos/59712c8b75d2965381f8bf69/16:9/w_2560%2Cc_limit/2017-06_GQ_FITNESS-Push-Ups_3x2.jpg",
    jacobTime: 60,
    jacobReps: 30,
  },
  {
    id: "squats",
    name: "Squats",
    description: "Works your quadriceps, hamstrings, and glutes.",
    imageUrl:
      "https://media.glamourmagazine.co.uk/photos/6138a5b2236c41e831489fec/16:9/w_2560%2Cc_limit/gettyimages-1219540136_sf.jpg",
    jacobTime: 45,
    jacobReps: 40,
  },
  {
    id: "situps",
    name: "Sit-ups",
    description: "Strengthens your core and abdominal muscles.",
    imageUrl:
      "https://hips.hearstapps.com/hmg-prod/images/sit-up-1672248718.jpeg?crop=0.518xw:0.698xh;0.335xw,0.302xh&resize=1200:*",
    jacobTime: 60,
    jacobReps: 25,
  },
  {
    id: "burpees",
    name: "Burpees",
    description: "Full-body exercise that builds strength and endurance.",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoaetyBaFJ_SGHwokaRhIAeqMwJNvqkzpNBQ&s",
    jacobTime: 60,
    jacobReps: 20,
  },
  {
    id: "jumpingjacks",
    name: "Jumping Jacks",
    description: "Cardiovascular exercise that works your whole body.",
    imageUrl:
      "https://www.dmoose.com/cdn/shop/articles/feature-image_6cc73cc1-4872-4fa2-aaf2-6a59b02381c2.jpg?v=1675699406",
    jacobTime: 60,
    jacobReps: 50,
  },
];
