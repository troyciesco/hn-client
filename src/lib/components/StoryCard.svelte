<script>
	import { getRelativeTimeString } from "$lib/get-relative-time-string"
	import ChatIcon from "$lib/icons/ChatIcon.svelte"
	import ClockIcon from "$lib/icons/ClockIcon.svelte"
	import ExternalIcon from "$lib/icons/ExternalIcon.svelte"
	import PenIcon from "$lib/icons/PenIcon.svelte"
	import PointIcon from "$lib/icons/PointIcon.svelte"
	import StoryIcon from "$lib/icons/StoryIcon.svelte"

	const { story } = $props()
</script>

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
			<a
				href={story.url ? story.url : `/articles/${story.id}`}
				class="mb-2 flex items-center gap-1"
			>
				<h2 class="text-sm font-medium hover:underline">{story.title}</h2>
				{#if story.url}
					<span class="group text-xs text-neutral-600">
						(<span class="group-hover:underline">{new URL(story.url).host}</span>)
					</span>
				{/if}
			</a>
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
					<span class="text-neutral-600">{getRelativeTimeString(story.time * 1000)}</span>
				</div>
				<a href={`/articles/${story.id}`} class="group flex items-center gap-1">
					<ChatIcon />
					<span class="text-neutral-600 group-hover:underline">
						{story.kids?.length || 0} comments
					</span>
				</a>
			</div>
		</div>
	</article>
</li>
