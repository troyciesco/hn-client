import { json } from "@sveltejs/kit"

export async function GET({ url }) {
	const ids = url.searchParams.get("ids")?.split(",").map(Number) || []
	const stories = await Promise.all(
		ids.map(async (id: number) => {
			const storyUrl = `https://hacker-news.firebaseio.com/v0/item/${id}.json`
			const storyResponse = await fetch(storyUrl)
			if (!storyResponse.ok) {
				throw new Error(`Failed to fetch story with ID: ${id}`)
			}
			return await storyResponse.json()
		})
	)

	return json(stories)
}
