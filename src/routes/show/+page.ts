import type { PageLoad } from "./$types"

export const load: PageLoad = async ({ fetch }) => {
	const res = await fetch(`https://hacker-news.firebaseio.com/v0/showstories.json?`)
	const ids = await res.json()
	const [initialIds, ...additionalIds] = [ids.slice(0, 20), ...ids.slice(20)]

	const stories = await Promise.all(
		initialIds.map(async (id: number) => {
			const storyUrl = `https://hacker-news.firebaseio.com/v0/item/${id}.json`
			const storyResponse = await fetch(storyUrl)
			if (!storyResponse.ok) {
				throw new Error(`Failed to fetch story with ID: ${id}`)
			}
			return await storyResponse.json()
		})
	)

	return { stories, additionalIds }
}
