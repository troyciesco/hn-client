<script lang="ts">
	import Comment from "./Comment.svelte"
	let { comment } = $props()
</script>

<div>
	<div class="flex items-center">
		<div class="mb-3 text-sm font-semibold">{comment.by}</div>
	</div>
	<div class="comment text-sm">{@html comment.text}</div>
	<div class="ml-4 border-l border-red-300 pl-4 pt-4">
		{#each comment.replies as reply}
			<Comment comment={reply} />
		{/each}
	</div>
</div>

<style>
	:global(.comment p) {
		margin-top: 8px;
		color: red;
	}
</style>
