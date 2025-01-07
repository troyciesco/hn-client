const HN_API_BASE_URL = "https://hacker-news.firebaseio.com/v0"

const buildUrl = (path: string) => `${HN_API_BASE_URL}${path}`

export const HN_API = {
	getItem: (id: number) => buildUrl(`/item/${id}.json`),
	getNewStories: () => buildUrl("/newstories.json"),
	getAskStories: () => buildUrl("/askstories.json"),
	getShowStories: () => buildUrl("/showstories.json"),
	getJobStories: () => buildUrl("/jobstories.json")
}
