import type { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "Пісня туманів",
    pageTitleSuffix: " | Пісня туманів",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "plausible",
    },
    locale: "uk-UA",
    baseUrl: "pisnia-tumaniv.pages.dev",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Rajdhani",
        body: "Space Grotesk",
        code: "JetBrains Mono",
      },
      colors: {
        darkMode: {
          light: "#0D1117",       // Майже чорний, колір мастила/космосу
          lightgray: "#2D333B",   // Темна сталь обшивки
          gray: "#586069",        // Попіл/Туман
          darkgray: "#8b949e",    // Старий бетон
          dark: "#c9d1d9",        // Текст (не чисто білий, а "старий екран")

          // Замість пастельного синього — холодний, індустріальний колір
          secondary: "#3fb950",   // Неоново-зелений (термінал/HUD) або Смарагд дому Аед (#2ea043)

          // Замість м'ятного — колір іржі або попереджень
          tertiary: "#d29922",    // Іржа/Бурштин

          highlight: "rgba(56, 139, 253, 0.15)", // Холодне підсвічування голограми
          textHighlight: "#1f6feb44",
        },
        lightMode: {
          light: "#F0F0EE",       // Пергамент/Світлий бетон
          lightgray: "#E5E5E0",
          gray: "#A8A8A8",
          darkgray: "#555555",
          dark: "#222222",
          secondary: "#1a5c37",   // Темний смарагд (офіційний)
          tertiary: "#8c6a1c",    // Темна бронза
          highlight: "rgba(143, 159, 169, 0.15)",
          textHighlight: "#fff23688",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
      // Comment out CustomOgImages to speed up build time
      Plugin.CustomOgImages(),
    ],
  },
}

export default config
