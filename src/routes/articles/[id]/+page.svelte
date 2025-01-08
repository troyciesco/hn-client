<script lang="ts">
	import Chart from "$lib/components/Chart.svelte"
	import Comment from "$lib/components/Comment.svelte"
	import ErrorCard from "$lib/components/ErrorCard.svelte"
	import LoadingCard from "$lib/components/LoadingCard.svelte"
	import { getRelativeTimeString } from "$lib/get-relative-time-string"
	import ChatIcon from "$lib/icons/ChatIcon.svelte"
	import ClockIcon from "$lib/icons/ClockIcon.svelte"
	import PenIcon from "$lib/icons/PenIcon.svelte"
	import PointIcon from "$lib/icons/PointIcon.svelte"
	import { hasDescendantsField } from "$lib/type-utils"
	import type { PageData } from "./$types"

	const { data }: { data: PageData } = $props()
	const { item, comments, pollParts } = data
	const hasDescendants = hasDescendantsField(item)
</script>

<div class="max-w-7xl">
	<div class=" pb-10">
		<h1 class="mb-4 text-balance text-4xl font-semibold leading-10">{item.title}</h1>
		<div class="flex items-center gap-3 text-sm">
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
			{#if hasDescendants}
				<a href={`/articles/${item.id}`} class="flex items-center gap-1">
					<ChatIcon />
					<span class="text-neutral-600">{item.descendants || 0} comments</span>
				</a>
			{/if}
		</div>
	</div>
	{#if item.text}
		<div class="item-text pb-3 text-lg text-neutral-600">{@html item.text}</div>
	{/if}
	{#if item.type === "poll"}
		{#await pollParts}
			<LoadingCard />
		{:then pollParts}
			<Chart parts={pollParts} />
		{:catch error}
			<ErrorCard />
		{/await}
	{/if}
	<hr class="mb-4 mt-10 h-px border-0 bg-neutral-200" />
	{#if hasDescendants}
		<div>
			<h2 class="text-lg font-medium leading-[28px]">{item.descendants || 0} comments</h2>
		</div>
		{#await comments}
			<LoadingCard />
		{:then comments}
			{#each comments as comment}
				<div class="divide-y-4 border-b border-neutral-300">
					<Comment {comment} />
				</div>
			{/each}
		{:catch error}
			<ErrorCard />
		{/await}
	{/if}
</div>

<style>
	:global(.item-text p) {
		@apply mt-2;
	}
	:global(.item-text a) {
		@apply font-medium text-orange-500 underline;
	}
</style>
