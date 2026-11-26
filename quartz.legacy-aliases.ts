import path from "node:path"
import { VFile } from "vfile"
import type { QuartzEmitterPluginInstance } from "./quartz/plugins/types"
import type { ProcessedContent } from "./quartz/plugins/vfile"
import type { FullSlug } from "./quartz/util/path"

function routeKey(slug: string) {
  return path.posix
    .normalize(`/${slug}`)
    .toLowerCase()
    .replace(/\/index$/, "")
}

function addLegacyAliases(file: VFile, canonicalRoutes: Set<string>) {
  const legacyAliases = (file.data.frontmatter?.aliases ?? [])
    .map((alias) =>
      alias
        .replace(/^\/|\/$/g, "")
        .replace(/\s/g, "-")
        .replace(/&/g, "-and-")
        .replace(/%/g, "-percent")
        .replace(/[?#]/g, "")
        .replace(/(^|\/)_index$/, "$1index"),
    )
    .filter((slug) => slug !== slug.toLowerCase() && !canonicalRoutes.has(routeKey(slug)))

  if (legacyAliases.length === 0) return file

  return new VFile({
    path: file.path,
    data: {
      ...file.data,
      aliases: [...(file.data.aliases ?? []), ...(legacyAliases as FullSlug[])],
    },
  })
}

function canonicalRoutes(content: ProcessedContent[]) {
  return new Set(content.map(([, file]) => routeKey(file.data.slug ?? "index")))
}

// Quartz 5 redirects the original note paths. Include Quartz 4's case-sensitive alias URLs too.
export function preserveLegacyAliases(redirects: QuartzEmitterPluginInstance) {
  const { emit, partialEmit } = redirects

  redirects.emit = (ctx, content, resources) => {
    const routes = canonicalRoutes(content)
    return emit(
      ctx,
      content.map(([tree, file]) => [tree, addLegacyAliases(file, routes)]),
      resources,
    )
  }

  if (partialEmit) {
    redirects.partialEmit = (ctx, content, resources, changes) => {
      const routes = canonicalRoutes(content)
      return partialEmit(
        ctx,
        content,
        resources,
        changes.map((change) =>
          change.file ? { ...change, file: addLegacyAliases(change.file, routes) } : change,
        ),
      )
    }
  }
}
