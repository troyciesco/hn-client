<script lang="ts">
	import type { PageData } from "./$types"
	import ExternalIcon from "$lib/icons/ExternalIcon.svelte"
	import StoryIcon from "$lib/icons/StoryIcon.svelte"
	import PointIcon from "$lib/icons/PointIcon.svelte"
	import PenIcon from "$lib/icons/PenIcon.svelte"
	import ClockIcon from "$lib/icons/ClockIcon.svelte"
	import ChatIcon from "$lib/icons/ChatIcon.svelte"

	const { data }: { data: PageData } = $props()
	let loadedStories = $state(data.stories)
	let availableIds = $state(data.additionalIds)

	const fetchMoreStories = async () => {
		const response = await fetch(`api/stories?ids=${availableIds.slice(0, 20).join(",")}`)
		const newStories = await response.json()
		loadedStories = [...loadedStories, ...newStories]
		availableIds = availableIds.slice(20)
	}
</script>

<div class="max-w-7xl">
	<div class="mb-8">
		<h1 class="mb-2 text-2xl font-semibold leading-8">Show</h1>
		<p class="text-sm leading-5 text-neutral-500">
			Showcase your projects, products, and discoveries to the Hacker News audience.
		</p>
	</div>
	<ul class="space-y-2">
		{#each loadedStories as story}
			<li>
				<article class="flex items-center gap-4 py-6">
					<div
						class="flex h-10 w-10 items-center justify-center rounded-full bg-stone-50 text-neutral-700"
					>
						{#if story.url}
							<ExternalIcon />
						{:else}
							<StoryIcon />
						{/if}
					</div>
					<div>
						<div class="mb-2 flex items-center gap-1">
							<h2 class="text-sm font-medium">{story.title}</h2>
							{#if story.url}
								<span class="text-xs text-neutral-600">({new URL(story.url).host})</span>
							{/if}
						</div>
						<div class="flex items-center gap-3 text-xs">
							<div class="flex items-center gap-1">
								<PointIcon /> <span class="text-neutral-600">{story.score} points</span>
							</div>
							<div class="flex items-center gap-1">
								<PenIcon />
								<span class="text-neutral-600">
									by <span class="font-medium text-orange-500">{story.by}</span>
								</span>
							</div>
							<div class="flex items-center gap-1">
								<ClockIcon />
								<span class="text-neutral-600"
									>{Math.floor((Date.now() / 1000 - story.time) / 60)} minutes ago</span
								>
							</div>
							<a href={`/articles/${story.id}`} class="flex items-center gap-1">
								<ChatIcon />
								<span class="text-neutral-600">{story.kids?.length || 0} comments</span>
							</a>
						</div>
					</div>
				</article>
			</li>
		{/each}
	</ul>
	<button
		onclick={fetchMoreStories}
		class="flex items-center gap-[6px] rounded-[4px] border border-neutral-200 bg-white px-[14px] py-[10px] shadow-[0_1px_3px_rgba(0,0,0,0.1),0_1px_2px_rgba(0,0,0,0.06)]"
	>
		<span>More</span> <span>↓</span>
	</button>
</div>
