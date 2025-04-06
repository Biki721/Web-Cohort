const bmiData = [
  {
    category: "Severe Thinness",
    minBMI: 0,
    maxBMI: 15.9,
    minCaloriesIntake: "1800-2000 kcal",
    minCaloriesBurn: "200-400 kcal",
    advice:
      "You're underweight! Prioritize a nutritious diet over calorie burn.",
  },
  {
    category: "Moderate Thinness",
    minBMI: 16.0,
    maxBMI: 16.9,
    minCaloriesIntake: "1900-2100 kcal",
    minCaloriesBurn: "250-450 kcal",
    advice:
      "You're a bit underweight. Focus on balanced meals and light activity.",
  },
  {
    category: "Mild Thinness",
    minBMI: 17.0,
    maxBMI: 18.4,
    minCaloriesIntake: "2000-2200 kcal",
    minCaloriesBurn: "300-500 kcal",
    advice: "You're close to normal, just keep moving and eat well!",
  },
  {
    category: "Normal Weight",
    minBMI: 18.5,
    maxBMI: 24.9,
    minCaloriesIntake: "2000-2500 kcal",
    minCaloriesBurn: "350-600 kcal",
    advice:
      "You're in a great range! But hey, a little workout never hurt anybody. 😉",
  },
  {
    category: "Overweight",
    minBMI: 25.0,
    maxBMI: 29.9,
    minCaloriesIntake: "1800-2200 kcal",
    minCaloriesBurn: "500-800 kcal",
    advice:
      "Slightly overweight? A good mix of cardio and strength training will help!",
  },
  {
    category: "Obesity Class I",
    minBMI: 30.0,
    maxBMI: 34.9,
    minCaloriesIntake: "1700-2100 kcal",
    minCaloriesBurn: "600-1000 kcal",
    advice:
      "Time to get active! Even 30 min of brisk walking daily will help. 🚶‍♂️",
  },
  {
    category: "Obesity Class II",
    minBMI: 35.0,
    maxBMI: 39.9,
    minCaloriesIntake: "1600-2000 kcal",
    minCaloriesBurn: "800-1200 kcal",
    advice:
      "Focus on sustainable lifestyle changes. Small steps make big progress! 🏋️‍♀️",
  },
  {
    category: "Obesity Class III (Severe)",
    minBMI: 40.0,
    maxBMI: Infinity,
    minCaloriesIntake: "1500-1900 kcal",
    minCaloriesBurn: "1000-1500 kcal",
    advice: "Start slow, consult a trainer or doctor, and stay consistent! 💪",
  },
];

const conversionData = {
  weight: {
    kg: {
      toLbs: (kg) => kg * 2.20462,
      toG: (kg) => kg * 1000,
      toOz: (kg) => kg * 35.274,
    },
    lbs: {
      toKg: (lbs) => lbs * 0.453592,
      toG: (lbs) => lbs * 453.592,
      toOz: (lbs) => lbs * 16,
    },
    g: {
      toKg: (g) => g / 1000,
      toLbs: (g) => g * 0.00220462,
      toOz: (g) => g * 0.035274,
    },
    oz: {
      toKg: (oz) => oz * 0.0283495,
      toLbs: (oz) => oz * 0.0625,
      toG: (oz) => oz * 28.3495,
    },
  },
  height: {
    cm: {
      toM: (cm) => cm / 100,
      toIn: (cm) => cm * 0.393701,
      toFt: (cm) => cm * 0.0328084,
    },
    m: {
      toCm: (m) => m * 100,
      toIn: (m) => m * 39.3701,
      toFt: (m) => m * 3.28084,
    },
    in: {
      toCm: (inch) => inch * 2.54,
      toM: (inch) => inch * 0.0254,
      toFt: (inch) => inch / 12,
    },
    ft: {
      toCm: (ft) => ft * 30.48,
      toM: (ft) => ft * 0.3048,
      toIn: (ft) => ft * 12,
    },
  },
};

export { bmiData, conversionData };
