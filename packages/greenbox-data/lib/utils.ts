const MAFIA_DATA_BASE = "https://raw.githubusercontent.com/kolmafia/kolmafia/main/src/data";

export async function loadMafiaData(fileName: string) {
  const request = await fetch(`${MAFIA_DATA_BASE}/${fileName}.txt`);
  const raw = await request.text();
  return raw
    .split("\n")
    .slice(1)
    .filter((r) => r !== "" && !r.startsWith("#"))
    .map((r) => r.split("\t"));
}

export const isPermable = (id: number) => {
  // Random old skills
  if (id < 10) return false;

  // Bad Moon
  if (id > 20 && id <= 27) return false;

  // Way of the Surprising Fist skills
  if (id > 63 && id <= 73) return false;

  // Spirit derived skills
  if (id > 7175 && id < 7181) return false;

  switch (id) {
    // VIP lounge skills
    case 91: // SkillPool.DOG_TIRED:
    case 116: // SkillPool.HOLLOW_LEG:
      return false;

    // Nemesis skills
    case 49: // SkillPool.GOTHY_HANDWAVE:
    case 50: // SkillPool.BREAK_IT_ON_DOWN:
    case 51: // SkillPool.POP_AND_LOCK:
    case 52: // SkillPool.RUN_LIKE_THE_WIND:
    case 3024: // SkillPool.CARBOLOADING:
      return false;

    case 6019: // SkillPool.GEMELLIS_MARCH_OF_TESTERY:
      return false;

    // Other skills from this class are not permable
    case 17047: // SkillPool.MILD_CURSE:
      return true;

    // Avatar of West of Loathing skills
    case 156: // SkillPool.SHOOT:
      return false;
  }

  switch (Math.floor(id / 1000)) {
    case 7: // Skills granted by items
    case 8: // Mystical Bookshelf Skills
    case 11: // Avatar of Boris skills
    case 12: // Zombie Slayer skills
    case 14: // Avatar of Jarlsberg skills
    case 15: // Avatar of Sneaky Pete skills
    case 16: // Heavy Rains skills
    case 17: // Ed skills
    case 18: // Cow Puncher skills
    case 19: // Bean Slinger skills
    case 20: // Snake Oiler skills
    case 21: // The Source skills
    case 22: // Nuclear Autumn skills
    case 23: // Gelatinous Noob skills
    case 24: // Vampyre skills
    case 25: // Plumber skills
    case 27: // Grey Goo skills
      return false;
  }

  return true;
};