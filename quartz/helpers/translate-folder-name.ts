export default function translateFolderName(folderName: string) {
  const nameMap: Record<string, string> = {
    cataphract: "⚔️ Катафракти",
    celestial: "🪐 Небесні тіла",
    episodes: "🎬 Епізоди",
    faction: "🚩 Фракції",
    location: "📍 Місця",
    npc: "🎭 НІПи",
    pc: "🎭 ІПи",
    player: "👤 Гравці",
    region: "🗺️ Регіони",
    // Ігровий світ
    season01: "Сезон 01",
    setting: "✨ Сетинг",
    vessel: "🛸 Судна",
  }

  if (nameMap[folderName]) {
    return nameMap[folderName]
  }
  return folderName
}
