<script lang="ts">
	import type { PageData } from "./$types"
	import ExternalIcon from "$lib/icons/ExternalIcon.svelte"
	import StoryIcon from "$lib/icons/StoryIcon.svelte"
	import PointIcon from "$lib/icons/PointIcon.svelte"
	import PenIcon from "$lib/icons/PenIcon.svelte"
	import ClockIcon from "$lib/icons/ClockIcon.svelte"
	import ChatIcon from "$lib/icons/ChatIcon.svelte"
	import StoryCard from "$lib/components/StoryCard.svelte"
	import LoadingCard from "$lib/components/LoadingCard.svelte"

	const { data }: { data: PageData } = $props()
	let loadedStories = $state(data.stories)
	let availableIds = $state(data.additionalIds)
	let isLoading = $state(false)

	const fetchMoreStories = async () => {
		isLoading = true
		const response = await fetch(`api/items?ids=${availableIds.slice(0, 20).join(",")}`)
		const newStories = await response.json()
		loadedStories = [...loadedStories, ...newStories]
		availableIds = availableIds.slice(20)
		isLoading = false
	}
</script>

<div class="max-w-7xl">
	<div class="mb-8">
		<h1 class="mb-2 text-2xl font-semibold leading-8">New</h1>
		<p class="text-sm leading-5 text-neutral-500">
			Discover the latest submissions in the Hacker News community.
		</p>
	</div>
	<ul class="space-y-2">
		{#each loadedStories as story}
			<StoryCard {story} />
		{/each}
	</ul>
	<button
		onclick={fetchMoreStories}
		class="flex items-center gap-[6px] rounded-[4px] border border-neutral-200 bg-white px-[14px] py-[10px] shadow-[0_1px_3px_rgba(0,0,0,0.1),0_1px_2px_rgba(0,0,0,0.06)] disabled:bg-neutral-100 disabled:text-neutral-400"
		disabled={isLoading}
	>
		<span>{isLoading ? "Fetching..." : "More"}</span> <span class={[isLoading && "hidden"]}>↓</span>
	</button>
</div>
