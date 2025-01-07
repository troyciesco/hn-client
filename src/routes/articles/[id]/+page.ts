export const load = async ({ data, fetch }) => {
	const fetchComments = async (ids: number[]) => {
		const response = await fetch(`/api/stories?ids=${ids.join(",")}`)
		return response.json()
	}

	const loadComments = async (item: { kids?: number[] }): Promise<any[]> => {
		if (!item.kids || item.kids.length === 0) {
			return []
		}

		const comments: any[] = await fetchComments(item.kids)

		const commentsWithReplies = await Promise.all(
			comments.map(async (comment) => {
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

	return {
		...data,
		comments: loadComments(data.item)
		// commentData: getCommentData(data.item)
	}
}
