<script lang="ts">
	import type { PollPart } from "$lib/types"

	type Props = {
		parts: PollPart[]
	}

	const { parts }: Props = $props()

	const sortedParts = parts.sort((a, b) => b.score - a.score)

	let maxValue = sortedParts[0].score
	let barHeight = 36 // thickness of each bar
	let barSpacing = 8 // vertical space between bars
	let maxBarPercent = 90
</script>

<!-- The total SVG height depends on the number of bars, barHeight, and spacing -->
<svg class="w-full" height={parts.length * (barHeight + barSpacing) + barSpacing}>
	{#each parts as part, i}
		<!-- Y position for this bar -->
		<rect
			x="0"
			y={i * (barHeight + barSpacing) + barSpacing}
			width={(part.score / maxValue) * maxBarPercent + "%"}
			height={barHeight}
			class="fill-orange-200"
			rx="4"
		/>

		<!-- Label on top-left (inside bar) -->
		<text
			class="label text-sm"
			x="8"
			y={i * (barHeight + barSpacing) + barSpacing + barHeight / 2}
			text-anchor="start"
		>
			{part.text}
		</text>

		<!-- Total all the way to the right; anchor at 'end' -->
		<text
			class="value text-sm"
			x="98%"
			y={i * (barHeight + barSpacing) + barSpacing + barHeight / 2}
			text-anchor="end"
		>
			{part.score}
			{part.score === 1 ? "point" : "points"}
		</text>
	{/each}
</svg>

<style>
	.label {
		dominant-baseline: middle; /* vertically center text on bar */
	}
	.value {
		dominant-baseline: middle;
	}
</style>
