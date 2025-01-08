import type { Ask, Job, ParentItem, Poll, Story } from "./types"

function hasField<
	T extends ParentItem,
	K extends keyof T,
	V extends Exclude<T[K], undefined> // ensures no undefined
>(item: ParentItem, key: K, guard: (val: unknown) => val is V): item is T & Record<K, V> {
	return key in item && guard((item as T)[key])
}

export function hasUrlField(item: ParentItem) {
	return hasField<Story | Job, "url", string>(
		item,
		"url",
		(val): val is string => typeof val === "string"
	)
}

export function hasDescendantsField(item: ParentItem) {
	return hasField<Story | Ask | Poll, "descendants", number>(
		item,
		"descendants",
		(val): val is number => typeof val === "number"
	)
}

// Additional type exploration, saving for posterity ↓

// // type that picks out all items from U that have property K of type P
// // type ExtractWithProperty<U, K extends PropertyKey, P> = U extends Record<K, P> ? U : never
// type ExtractWithProperty<U, K extends PropertyKey, P> = U extends { [k in K]?: P } ? U : never

// function hasProperty<U, K extends PropertyKey, P>(
//     item: U,
//     prop: K,
//     predicate: (value: unknown) => value is P
// ): item is U & Record<K, P> {
//     return (
//         typeof item === "object" &&
//         item !== null &&
//         prop in item &&
//         predicate((item as Record<K, unknown>)[prop])
//     )
// }

// type ParentItemWithUrl = ExtractWithProperty<ParentItem, "url", string>

// export function hasUrl(item: ParentItem): item is ParentItemWithUrl {
//     return hasProperty(item, "url", (val): val is string => typeof val === "string")
// }

// function hasField<T extends ParentItem, K extends keyof T>(
//     item: ParentItem,
//     key: K,
//     guard: (val: unknown) => val is T[K]
// ): item is T {
//     return key in item && guard((item as T)[key])
// }
