import { HN_API } from "$lib/constants.js"
import type { Comment, PollPart } from "$lib/types"

export const load = async ({ data, fetch }) => {
	const fetchComments = async (ids: number[]) => {
		const response = await fetch(`/api/items?ids=${ids.join(",")}`)
		return response.json()
	}

	const loadComments = async (item: { kids?: number[] }): Promise<Comment[]> => {
		if (!item.kids || item.kids.length === 0) {
			return []
		}

		const comments: Comment[] = await fetchComments(item.kids)

		// Filter out deleted/dead comments
		const validComments = comments.filter((comment) => !comment.deleted && !comment.dead)

		const commentsWithReplies = await Promise.all(
			validComments.map(async (comment) => {
				const replies = await loadComments(comment)
				return {
					...comment,
					replies
				}
			})
		)

		return commentsWithReplies
	}

	// const getCommentData = async (item) => {
	// 	const comments = await loadComments(item)

	// 	function countComments(commentList) {
	// 		// If there's nothing or it's not an array, return 0
	// 		if (!commentList || !Array.isArray(commentList)) {
	// 			return 0
	// 		}

	// 		return commentList.reduce((sum, comment) => {
	// 			// If for some reason comment is null/undefined
	// 			if (!comment) {
	// 				return sum
	// 			}

	// 			// If this comment is not type "comment" or is deleted/dead, skip it
	// 			if (comment.type !== "comment" || comment.deleted || comment.dead) {
	// 				return sum
	// 			}

	// 			// Count this comment, plus its replies recursively
	// 			const replies = comment.replies || []
	// 			return sum + 1 + countComments(replies)
	// 		}, 0)
	// 	}
	// 	const count = countComments(comments)
	// 	return { comments, count }
	// }

	const getPollParts = async (item: { type: string; parts?: number[] }) => {
		if (item.type !== "poll" || !item.parts || item.parts.length === 0) {
			return []
		}

		const pollParts: PollPart[] = await Promise.all(
			item.parts.map(async (id: number) => {
				const response = await fetch(HN_API.getItem(id))
				if (!response.ok) {
					throw new Error(`Failed to fetch part with ID: ${id}`)
				}
				return await response.json()
			})
		)

		return pollParts
	}

	return {
		...data,
		pollParts: getPollParts(data.item),
		comments: loadComments(data.item)
		// commentData: getCommentData(data.item)
	}
}
