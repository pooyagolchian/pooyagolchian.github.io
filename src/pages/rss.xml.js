import rss, { pagesGlobToRssItems } from '@astrojs/rss'

export async function GET(context) {
  return await rss({
    title: 'Pooya Golchian | Blog',
    description: 'Senior Software Engineer',
    site: context.site,
    items: await pagesGlobToRssItems(import.meta.glob('./**/*.md')),
    customData: `<language>en-us</language>`,
  })
}
