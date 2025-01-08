<script lang="ts">
	import { getRelativeTimeString } from "$lib/get-relative-time-string"
	import ChatIcon from "$lib/icons/ChatIcon.svelte"
	import ClockIcon from "$lib/icons/ClockIcon.svelte"
	import ExternalIcon from "$lib/icons/ExternalIcon.svelte"
	import PenIcon from "$lib/icons/PenIcon.svelte"
	import PointIcon from "$lib/icons/PointIcon.svelte"
	import StoryIcon from "$lib/icons/StoryIcon.svelte"
	import type { ParentItem } from "$lib/types"

	type Props = {
		item: ParentItem
	}
	const { item }: Props = $props()
</script>

<li>
	<article class="flex items-center gap-4 py-6 transition-colors hover:bg-orange-50">
		<div
			class="flex h-10 w-10 items-center justify-center rounded-full bg-stone-50 text-neutral-700"
		>
			{#if item.url}
				<ExternalIcon />
			{:else}
				<StoryIcon />
			{/if}
		</div>
		<div>
			<a
				href={item.url ? item.url : `/articles/${item.id}`}
				class="mb-2 flex flex-wrap items-center gap-1"
			>
				<h2 class="text-sm font-medium hover:underline">{item.title}</h2>
				{#if item.url}
					<span class="group text-xs text-neutral-600">
						(<span class="group-hover:underline">{new URL(item.url).host}</span>)
					</span>
				{/if}
			</a>
			<div class="flex flex-wrap items-center gap-3 text-xs">
				<div class="flex items-center gap-1">
					<PointIcon /> <span class="text-neutral-600">{item.score} points</span>
				</div>
				<div class="flex items-center gap-1">
					<PenIcon />
					<span class="text-neutral-600">
						by <span class="font-medium text-orange-500">{item.by}</span>
					</span>
				</div>
				<div class="flex items-center gap-1">
					<ClockIcon />
					<span class="text-neutral-600">{getRelativeTimeString(item.time * 1000)}</span>
				</div>
				<a href={`/articles/${item.id}`} class="group flex items-center gap-1">
					<ChatIcon />
					<span class="text-neutral-600 group-hover:underline">
						{item.kids?.length || 0}
						{item.kids?.length === 1 ? "comment" : "comments"}
					</span>
				</a>
			</div>
		</div>
	</article>
</li>
