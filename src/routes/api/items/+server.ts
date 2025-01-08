import { HN_API } from "$lib/constants"
import { json } from "@sveltejs/kit"
import type { Item } from "$lib/types"

export async function GET({ url }) {
	const ids = url.searchParams.get("ids")?.split(",").map(Number) || []
	const items: Item[] = await Promise.all(
		ids.map(async (id: number) => {
			const res = await fetch(HN_API.getItem(id))
			if (!res.ok) {
				throw new Error(`Failed to fetch story with ID: ${id}`)
			}
			return await res.json()
		})
	)

	return json(items)
}
