<script>
	let data = [
		{ label: "United States", value: 564 },
		{ label: "Canada", value: 477 },
		{ label: "Singapore", value: 259 },
		{ label: "Europe", value: 118 }
	]

	let maxValue = Math.max(...data.map((d) => d.value))
	let barHeight = 40 // thickness of each bar
	let barSpacing = 10 // vertical space between bars
	let maxBarPercent = 90
	// That means the largest bar (564) occupies 85% of the width,
	// and smaller bars scale accordingly.
</script>

<!-- The total SVG height depends on the number of bars, barHeight, and spacing -->
<svg height={data.length * (barHeight + barSpacing) + barSpacing}>
	{#each data as d, i}
		<!-- Y position for this bar -->
		<rect
			x="0"
			y={i * (barHeight + barSpacing) + barSpacing}
			width={(d.value / maxValue) * maxBarPercent + "%"}
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
			{d.label}
		</text>

		<!-- Total all the way to the right; anchor at 'end' -->
		<text
			class="value"
			x="98%"
			y={i * (barHeight + barSpacing) + barSpacing + barHeight / 2}
			text-anchor="end"
		>
			{d.value}
			{d.value === 1 ? "point" : "points"}
		</text>
	{/each}
</svg>

<style>
	svg {
		width: 100%; /* SVG scales horizontally */
		background-color: #f4f4f4; /* optional background */
	}
	.label {
		fill: #fff; /* label text color */
		font-size: 14px;
		dominant-baseline: middle; /* vertically center text on bar */
	}
	.value {
		fill: #444; /* total text color */
		font-size: 14px;
		dominant-baseline: middle;
	}
</style>
