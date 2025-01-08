import type { ParamMatcher } from "@sveltejs/kit"

export const match = ((param: string): param is "ask" | "jobs" | "show" => {
	return param === "ask" || param === "jobs" || param === "show"
}) satisfies ParamMatcher
