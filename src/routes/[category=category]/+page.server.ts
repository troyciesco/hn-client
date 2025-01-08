import { HN_API } from "$lib/constants"
import type { ParentItem } from "$lib/types"
import type { PageServerLoad } from "./$types"

export const load: PageServerLoad = async ({ fetch, params }) => {
	const { category } = params
	const categoryToEndpoint = {
		ask: {
			endpoint: HN_API.getAskStories,
			title: "Ask",
			description: "Explore community-driven Q&A where users seek insights and advice."
		},
		show: {
			endpoint: HN_API.getShowStories,
			title: "Show",
			description: "Showcase your projects, products, and discoveries to the Hacker News audience."
		},
		jobs: {
			endpoint: HN_API.getJobStories,
			title: "Jobs",
			description: "Connect with top tech job opportunities and company hiring posts."
		}
	} as const

	const categoryInfo = categoryToEndpoint[category as keyof typeof categoryToEndpoint]
	const url = categoryInfo?.endpoint() ?? HN_API.getNewStories()
	const title = categoryInfo?.title ?? "New"
	const description =
		categoryInfo?.description ?? "Discover the latest submissions in the Hacker News community."

	const res = await fetch(url)
	const ids: number[] = await res.json()
	const [initialIds, ...additionalIds] = [ids.slice(0, 20), ...ids.slice(20)]

	const stories: ParentItem[] = await Promise.all(
		initialIds.map(async (id: number) => {
			const response = await fetch(HN_API.getItem(id))
			if (!response.ok) {
				throw new Error(`Failed to fetch story with ID: ${id}`)
			}
			return await response.json()
		})
	)

	return { stories, additionalIds, title, description }
}
