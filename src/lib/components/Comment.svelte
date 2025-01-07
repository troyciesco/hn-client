<script lang="ts">
	import { page } from "$app/state"
	import { getRelativeTimeString } from "$lib/get-relative-time-string"
	import Comment from "./Comment.svelte"
	let { comment, isLastChild = false } = $props()

	const isParent = parseInt(page.params.id) === comment.parent
</script>

<div class={[isParent && "py-4"]}>
	<div class="relative flex items-center">
		{#if !isParent}
			<span
				class={[
					"absolute h-full w-[12px] -translate-y-[20px] rounded-bl-md border-b border-l border-neutral-300",
					isLastChild ? "-left-[16px]" : "-left-[17px]"
				]}
			></span>
		{/if}
		<div class="mb-3 flex items-center gap-1 text-sm">
			<span class="font-semibold">{comment.by}</span>
			<span class="text-neutral-600">•</span>
			<span class="text-neutral-600">{getRelativeTimeString(comment.time * 1000)}</span>
		</div>
	</div>
	<div class="comment pb-3 text-sm">{@html comment.text}</div>
	{#each comment.replies as reply, index}
		<div
			class={[
				"ml-4 pl-4 pt-4",
				Boolean(
					(reply.replies && reply.replies.length > 0) || index !== comment.replies.length - 1
				) && "border-l border-neutral-300"
			]}
		>
			<Comment
				comment={reply}
				isLastChild={(!reply.replies || reply.replies.length === 0) &&
					index === comment.replies.length - 1}
			/>
		</div>
	{/each}
</div>

<style>
	:global(.comment p) {
		@apply mt-2;
	}
	:global(.comment a) {
		@apply font-medium text-orange-500 underline;
	}

	:global(.comment pre) {
		@apply my-2 max-w-2xl text-wrap bg-neutral-100;
	}
</style>
