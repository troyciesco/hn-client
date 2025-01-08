// Hacker News API types come from schema at https://github.com/HackerNews/API?tab=readme-ov-file

export type BaseItem = {
	id: number
	by: string
	time: number
	text?: string
	kids?: number[]
	deleted?: boolean
	dead?: boolean
}

export type Story = BaseItem & {
	type: "story"
	title: string
	score: number
	descendants?: number
	url?: string
}

export type Comment = BaseItem & {
	type: "comment"
	parent: number
	// not in actual HN API, added as part of fetching
	replies: Comment[]
}

export type Ask = BaseItem & {
	type: "story"
	title: string
	score: number
	descendants?: number
}

export type Job = BaseItem & {
	type: "job"
	title: string
	score?: number
	url?: string
}

export type Poll = BaseItem & {
	type: "poll"
	title: string
	score: number
	parts: number[]
	descendants?: number
}

export type PollPart = BaseItem & {
	type: "pollopt"
	poll: number
	score: number
}

export type ParentItem = Story | Ask | Job | Poll
export type ChildItem = Comment | PollPart
export type Item = ParentItem | ChildItem
