export type PuzzleData = {
  text: string;
  options: string[];
  ans: number;
};
export const puzzleData = [
  {
    text: "_AT",
    options: ["C", "Q", "T"],
    ans: 0,
  },
  {
    text: "DO_",
    options: ["S", "H", "G"],
    ans: 2,
  },
  {
    text: "C_R",
    options: ["U", "A", "D"],
    ans: 1,
  },
  {
    text: "BU_",
    options: ["K", "R", "S"],
    ans: 2,
  },
  {
    text: "P_N",
    options: ["R", "E", "B"],
    ans: 1,
  },
  {
    text: "_AT",
    options: ["H", "L", "D"],
    ans: 0,
  },
  {
    text: "_AN",
    options: ["F", "E", "J"],
    ans: 0,
  },
  {
    text: "BE_",
    options: ["K", "P", "D"],
    ans: 2,
  },
  {
    text: "S_N",
    options: ["R", "U", "N"],
    ans: 1,
  },
  {
    text: "SK_",
    options: ["P", "E", "Y"],
    ans: 2,
  },
  // 1
  {
    text: "_ORD",
    options: ["B", "K", "W"],
    ans: 2,
  },
  {
    text: "BO_K",
    options: ["L", "O", "P"],
    ans: 1,
  },
  {
    text: "_REE",
    options: ["B", "R", "T"],
    ans: 2,
  },
  {
    text: "L_VE",
    options: ["O", "B", "L"],
    ans: 0,
  },
  {
    text: "STA_",
    options: ["R", "T", "K"],
    ans: 0,
  },
  {
    text: "_HIP",
    options: ["B", "S", "P"],
    ans: 1,
  },
  {
    text: "_AME",
    options: ["B", "F", "G"],
    ans: 2,
  },
  {
    text: "BIR_",
    options: ["D", "K", "Q"],
    ans: 0,
  },
  {
    text: "_OPE",
    options: ["T", "H", "F"],
    ans: 1,
  },
  {
    text: "F_RE",
    options: ["E", "T", "I"],
    ans: 2,
  },
  // 2
  {
    text: "_IND",
    options: ["W", "D", "K"],
    ans: 0,
  },
  {
    text: "LIO_",
    options: ["K", "J", "N"],
    ans: 2,
  },
  {
    text: "W_VE",
    options: ["A", "R", "B"],
    ans: 0,
  },
  {
    text: "_OON",
    options: ["R", "W", "M"],
    ans: 2,
  },
  {
    text: "RO_K",
    options: ["C", "T", "E"],
    ans: 0,
  },
  {
    text: "S_OW",
    options: ["Q", "N", "X"],
    ans: 1,
  },
  {
    text: "K_NG",
    options: ["I", "C", "A"],
    ans: 0,
  },
  {
    text: "_ISH",
    options: ["E", "F", "H"],
    ans: 1,
  },
  {
    text: "RO_D",
    options: ["W", "Q", "A"],
    ans: 2,
  },
  {
    text: "T_ME",
    options: ["B", "I", "X"],
    ans: 1,
  },
  // 3
  {
    text: "_OUSE",
    options: ["T", "H", "W"],
    ans: 1,
  },
  {
    text: "TAB_E",
    options: ["L", "E", "Q"],
    ans: 0,
  },
  {
    text: "G_ASS",
    options: ["K", "E", "R"],
    ans: 2,
  },
  {
    text: "LI_HT",
    options: ["G", "T", "E"],
    ans: 0,
  },
  {
    text: "SMIL_",
    options: ["K", "P", "E"],
    ans: 2,
  },
  {
    text: "W_TER",
    options: ["A", "T", "E"],
    ans: 0,
  },
  {
    text: "DR_AM",
    options: ["R", "E", "Q"],
    ans: 1,
  },
  {
    text: "B_ACH",
    options: ["E", "A", "F"],
    ans: 0,
  },
  {
    text: "PLA_E",
    options: ["K", "N", "W"],
    ans: 1,
  },
  {
    text: "STO_E",
    options: ["Q", "N", "E"],
    ans: 1,
  },
];

// smallPunks = 100, 200, 200,1000 
// 500,700,800,1800 = 3800
type enemyTypes = "smallPunks" | "sharpShooter" | "bruteShooter" | "bigBadBoss";
export const waves: enemyTypes[][] = [
  ["smallPunks", "smallPunks", "smallPunks", "smallPunks"],
  ["smallPunks", "sharpShooter", "smallPunks", "sharpShooter", "smallPunks"],
  ["smallPunks", "smallPunks", "sharpShooter", "bruteShooter", "bruteShooter"],
  [
    "sharpShooter",
    "bruteShooter",
    "bruteShooter",
    "sharpShooter",
    "bigBadBoss",
  ],
];
