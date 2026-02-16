import type { QuartzConfig } from "./quartz/cfg"
import cleanNonTelling from "./quartz/helpers/clean-non-telling"
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
        // Геометричний, трохи агресивний, асоціюється з Sci-Fi UI
        header: "Rajdhani",
        // Читабельний, але з характером "технічної документації"
        body: "Inter",
        code: "JetBrains Mono",
      },
      colors: {
        darkMode: {
          light: "#0b0c10", // Deep Void (глибокий космос)
          lightgray: "#1f2833", // Gunmetal (збройовий метал)
          gray: "#45a29e", // Oxidized Copper (окислена мідь/тьмяне світіння)
          darkgray: "#c5c6c7", // Steel (сталь)
          dark: "#e3e4e6", // Off-white text

          secondary: "#66fcf1", // Cyan/Electric Blue - активні елементи HUD
          tertiary: "#ff4d4d", // Alert Red - для контрасту небезпеки (замість спокійного зеленого)

          highlight: "rgba(102, 252, 241, 0.15)", // HUD selection vibe
          textHighlight: "#66fcf144",
        },
        lightMode: {
          // "Архіви Цитаделі" - світла тема, схожа на паперові звіти
          light: "#f5f5f0",
          lightgray: "#e3e3dc",
          gray: "#888880",
          darkgray: "#40403a",
          dark: "#1a1a18",

          secondary: "#2e5c55", // Swamp Green / Aet Uniform
          tertiary: "#a63d40", // Dried Blood / Wax Seal

          highlight: "rgba(46, 92, 85, 0.15)",
          textHighlight: "#d4c8be",
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
      Plugin.FolderPage({
        sort: (a, b) => {
          const aTitle = a.frontmatter?.title || (a.filePath?.split("/").at(-1) as string)
          const cleanATitle = cleanNonTelling(aTitle);
          const bTitle = b.frontmatter?.title || b.filePath?.split("/").at(-1) || ""
          const cleanBTitle = cleanNonTelling(bTitle);
          // Sort order: folders first, then files. Sort folders and files alphabeticall
          if ((!a.isFolder && !b.isFolder) || (a.isFolder && b.isFolder)) {
            // numeric: true: Whether numeric collation should be used, such that "1" < "2" < "10"
            // sensitivity: "base": Only strings that differ in base letters compare as unequal. Examples: a ≠ b, a = á, a = A
            return cleanATitle.localeCompare(cleanBTitle, undefined, {
              numeric: true,
              sensitivity: "base",
            })
          }

          if (!a.isFolder && b.isFolder) {
            return 1
          } else {
            return -1
          }
        },
      }),
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
