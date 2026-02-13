import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [],
  footer: Component.Footer({
    links: {
      GitHub: "https://github.com/undead404/pisnia-tumaniv",
      "M87* Games у Discord": "https://discord.gg/M9bCu4Pt",
    },
  }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.ConditionalRender({
      component: Component.Breadcrumbs(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
        { Component: Component.ReaderMode() },
      ],
    }),
    Component.Explorer({
      title: "Навігація",
      mapFn: (node) => {
        // Карта перейменувань: "назва папки" -> "красива назва"
        const nameMap: Record<string, string> = {
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

        if (nameMap[node.displayName]) {
          node.displayName = nameMap[node.displayName]
        }
      },
    }),
  ],
  right: [
    Component.Graph(),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
      ],
    }),
    Component.Explorer({
      title: "Навігація",
      mapFn: (node) => {
        // Карта перейменувань: "назва папки" -> "красива назва"
        const nameMap: Record<string, string> = {
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

        if (nameMap[node.displayName]) {
          node.displayName = nameMap[node.displayName]
        }
      },
    }),
  ],
  right: [],
}
