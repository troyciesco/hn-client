<script lang="ts">
	import type { PageData } from "./$types"
	import ItemCard from "$lib/components/ItemCard.svelte"

	let { data }: { data: PageData } = $props()
	let loadedItems = $state(data.stories)
	let availableIds = $state(data.additionalIds)
	let isLoading = $state(false)

	// @TODO: possibly needed because otherwise routing between same level slug doesn't work
	$effect(() => {
		loadedItems = data.stories
		availableIds = data.additionalIds
		isLoading = false
	})

	const fetchMoreStories = async () => {
		isLoading = true
		const response = await fetch(`api/items?ids=${availableIds.slice(0, 20).join(",")}`)
		const newStories = await response.json()
		loadedItems = [...loadedItems, ...newStories]
		availableIds = availableIds.slice(20)
		isLoading = false
	}
</script>

<div class="max-w-7xl">
	<div class="mb-8">
		<h1 class="mb-2 text-2xl font-semibold leading-8">{data.title}</h1>
		<p class="text-sm leading-5 text-neutral-500">
			{data.description}
		</p>
	</div>
	<ul class="space-y-2">
		{#each loadedItems as item}
			<ItemCard {item} />
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
