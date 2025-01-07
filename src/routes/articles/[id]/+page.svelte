<script lang="ts">
	import Comment from "$lib/components/Comment.svelte"
	import ChatIcon from "$lib/icons/ChatIcon.svelte"
	import ClockIcon from "$lib/icons/ClockIcon.svelte"
	import PenIcon from "$lib/icons/PenIcon.svelte"
	import PointIcon from "$lib/icons/PointIcon.svelte"
	import type { PageData } from "./$types"

	const { data }: { data: PageData } = $props()
</script>

<div class="max-w-7xl">
	<div class=" pb-10">
		<h1 class="mb-4 text-balance text-4xl font-semibold leading-10">{data.item.title}</h1>
		<div class="flex items-center gap-3 text-sm">
			<div class="flex items-center gap-1">
				<PointIcon /> <span class="text-neutral-600">{data.item.score} points</span>
			</div>
			<div class="flex items-center gap-1">
				<PenIcon />
				<span class="text-neutral-600">
					by <span class="font-medium text-orange-500">{data.item.by}</span>
				</span>
			</div>
			<div class="flex items-center gap-1">
				<ClockIcon />
				<span class="text-neutral-600"
					>{Math.floor((Date.now() / 1000 - data.item.time) / 60)} minutes ago</span
				>
			</div>
			<a href={`/articles/${data.item.id}`} class="flex items-center gap-1">
				<ChatIcon />
				<span class="text-neutral-600">{data.item.descendants || 0} comments</span>
			</a>
		</div>
	</div>
	<hr class="mb-4 mt-10 h-px border-0 bg-neutral-200" />
	<div>
		<h2 class="mb-8 text-lg font-medium leading-[28px]">{data.item.descendants || 0} comments</h2>
	</div>
	{#await data.comments}
		Loading comments...
	{:then comments}
		{#each comments as comment}
			<div class="divide-y-8 border-blue-500">
				<Comment {comment} />
			</div>
		{/each}
	{:catch error}
		<p>error loading comments: {error.message}</p>
	{/await}
</div>
