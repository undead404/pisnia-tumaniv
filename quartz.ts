import { h } from "preact"
import { componentRegistry } from "./quartz/components/registry"
import type { QuartzComponentProps } from "./quartz/components/types"
import { loadQuartzConfig, loadQuartzLayout } from "./quartz/plugins/loader/config-loader"
import type { QuartzPluginData } from "./quartz/plugins/vfile"
import type { FileTrieNode } from "./quartz/util/fileTrie"
import { preserveLegacyAliases } from "./quartz.legacy-aliases"

componentRegistry.setOptionOverrides("@quartz-community/explorer", {
  mapFn: (node: FileTrieNode) => {
    if (/^episodes\/season\d+\/s\d+e\d+$/.test(node.slug)) {
      node.displayName = node.slugSegment.toUpperCase()
    }
  },
  sortFn: (a: FileTrieNode, b: FileTrieNode) => {
    return Number(b.isFolder) - Number(a.isFolder) || a.displayName.localeCompare(b.displayName)
  },
})

function listingTitle(page: QuartzPluginData) {
  const title = page.frontmatter?.title || page.filePath?.split("/").at(-1) || ""
  return title.replace(/[^a-zA-Z\u0400-\u04FF0-9 -]/g, "").trim()
}

componentRegistry.setOptionOverrides("@quartz-community/folder-page", {
  sort: (a: QuartzPluginData, b: QuartzPluginData) => {
    const aIsFolder = a.slug?.endsWith("/index") === true
    const bIsFolder = b.slug?.endsWith("/index") === true
    return (
      Number(bIsFolder) - Number(aIsFolder) ||
      listingTitle(a).localeCompare(listingTitle(b), undefined, {
        numeric: true,
        sensitivity: "base",
      })
    )
  },
})

const baseUrl = process.env.QUARTZ_BASE_URL
const config = await loadQuartzConfig(baseUrl === undefined ? undefined : { baseUrl })

const aliasRedirects = config.plugins.emitters.find((emitter) => emitter.name === "AliasRedirects")
if (aliasRedirects) preserveLegacyAliases(aliasRedirects)

const folderPage = config.plugins.pageTypes?.find((pageType) => pageType.name === "FolderPage")
const contentPage = config.plugins.pageTypes?.find((pageType) => pageType.name === "ContentPage")

if (folderPage && contentPage) {
  const folderBody = folderPage.body
  const contentBody = contentPage.body
  folderPage.body = (options) => {
    const FolderBody = folderBody(options)
    const ContentBody = contentBody(undefined)
    const Body = (props: QuartzComponentProps) =>
      h(props.fileData.frontmatter?.hideFolderListing === true ? ContentBody : FolderBody, props)
    return Object.assign(Body, FolderBody)
  }
}

export default config
export const layout = await loadQuartzLayout()
