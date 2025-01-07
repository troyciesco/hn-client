<script>
	const { parts } = $props()
	// let data = [
	// 	{ label: "United States", value: 564 },
	// 	{ label: "Canada", value: 477 },
	// 	{ label: "Singapore", value: 259 },
	// 	{ label: "Europe", value: 118 }
	// ]

	const sortedParts = parts.sort((a, b) => b.score - a.score)

	// let maxValue = Math.max(...parts.map((part) => part.score))
	let maxValue = sortedParts[0].score
	let barHeight = 40 // thickness of each bar
	let barSpacing = 10 // vertical space between bars
	let maxBarPercent = 90
</script>

<!-- The total SVG height depends on the number of bars, barHeight, and spacing -->
<svg height={parts.length * (barHeight + barSpacing) + barSpacing}>
	{#each parts as part, i}
		<!-- Y position for this bar -->
		<rect
			x="0"
			y={i * (barHeight + barSpacing) + barSpacing}
			width={(part.score / maxValue) * maxBarPercent + "%"}
			height={barHeight}
			fill="#FAC090"
		/>

		<!-- Label on top-left (inside bar) -->
		<text
			class="label"
			x="5"
			y={i * (barHeight + barSpacing) + barSpacing + barHeight / 2}
			text-anchor="start"
		>
			{part.text}
		</text>

		<!-- Total all the way to the right; anchor at 'end' -->
		<text
			class="value"
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
	svg {
		width: 100%; /* SVG scales horizontally */
	}
	.label {
		fill: #444; /* label text color */
		font-size: 14px;
		dominant-baseline: middle; /* vertically center text on bar */
	}
	.value {
		fill: #444; /* total text color */
		font-size: 14px;
		dominant-baseline: middle;
	}
</style>
