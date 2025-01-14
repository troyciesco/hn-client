import { HN_API } from "$lib/constants"
import type { ParentItem } from "$lib/types"
import type { PageLoad } from "./$types"

export const load: PageLoad = async ({ fetch }) => {
	const res = await fetch(HN_API.getNewStories())
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

	return { stories, additionalIds }
}
