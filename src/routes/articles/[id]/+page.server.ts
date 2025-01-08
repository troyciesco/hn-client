import { HN_API } from "$lib/constants"
import type { ParentItem } from "$lib/types"
import type { PageServerLoad } from "./$types"
// const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const load: PageServerLoad = async ({ fetch, params }) => {
	// Create a reusable fetch function that we'll pass down
	// const fetchComments = async (ids: number[]) => {
	// 	const response = await fetch(`/api/items?ids=${ids.join(",")}`)
	// 	return response.json()
	// }

	const res = await fetch(HN_API.getItem(parseInt(params.id)))
	if (!res.ok) {
		throw new Error(`Failed to fetch story with ID: ${params.id}`)
	}
	const item: ParentItem = await res.json()

	// const loadComments = async (item: any) => {
	// 	if (!item.kids || item.kids.length === 0) {
	// 		return []
	// 	}
	// 	const response = await fetch(`/api/items?ids=${item.kids.join(",")}`)
	// 	const comments = await response.json()
	// 	console.log(comments)
	// 	return comments
	// }

	// const loadComments = async (item: { kids?: number[] }): Promise<any[]> => {
	// 	if (!item.kids || item.kids.length === 0) {
	// 		return []
	// 	}

	// 	const comments: any[] = await fetchComments(item.kids)

	// 	// Recursively load replies for each comment
	// 	const commentsWithReplies = await Promise.all(
	// 		comments.map(async (comment) => {
	// 			const replies = await loadComments(comment)
	// 			return {
	// 				...comment,
	// 				replies
	// 			}
	// 		})
	// 	)

	// 	return commentsWithReplies
	// }

	return {
		// comments: loadComments(item),
		item
	}
}
