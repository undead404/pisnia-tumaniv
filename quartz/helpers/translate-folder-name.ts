export default function translateFolderName(folderName: string) {
    const nameMap: Record<string, string> = {
        "cataphract": "⚔️ Катафракт",
        "celestial": "🪐 Небесні тіла",
        "episodes": "🎬 Епізоди",
        "faction": "🚩 Фракції",
        "location": "📍 Місця",
        "npc": "👤 НІПи",
        "pc": "👤 ІПи",
        "region": "🗺️ Регіони",
        // Ігровий світ
        "season01": "Сезон 01",
        "setting": "✨ Сетинг",
        "vessel": "🛸 Судна",
    }

    if (nameMap[folderName]) {
        return nameMap[folderName]
    }
    return folderName
}