<script lang="ts">
	import { onMount } from 'svelte';
	import { DocLayout, CodeBlock } from '@keenmate/svelte-docs';
	import { PropTable, cssVarGroups, technologies } from '$lib/demo';

	// The live theming demo is hand-authored: theming is driven by CSS custom
	// properties (set on the element itself — Shadow DOM), not by attributes, so
	// the attribute-reflecting DemoPlayground is a poor fit here.
	let elRef = $state<any>();

	// Themeable knobs, each bound to a real --ms-* variable.
	let rem = $state(10);
	let accent = $state('#6366f1');
	let radius = $state(6);

	// One style string, applied to the <web-multiselect> element directly.
	let styleVars = $derived(
		`--ms-rem: ${rem}px;` +
			` --ms-input-border-color: ${accent};` +
			` --ms-input-border-color-focus: ${accent};` +
			` --ms-option-bg-selected: ${accent}22;` +
			` --ms-option-bg-hover: ${accent}18;` +
			` --ms-input-border-radius: ${radius}px`
	);

	$effect(() => {
		if (elRef) elRef.setAttribute('style', styleVars);
	});

	// Live CSS snippet mirroring the current knobs.
	let cssCode = $derived(
		`web-multiselect {\n` +
			`  --ms-rem: ${rem}px;\n` +
			`  --ms-input-border-color: ${accent};\n` +
			`  --ms-input-border-color-focus: ${accent};\n` +
			`  --ms-option-bg-selected: ${accent}22;\n` +
			`  --ms-option-bg-hover: ${accent}18;\n` +
			`  --ms-input-border-radius: ${radius}px;\n` +
			`}`
	);

	onMount(() => {
		if (elRef) elRef.options = technologies;
	});
</script>

<DocLayout
	titleText="Theming"
	descriptionText="Style the whole component with CSS custom properties — one --ms-rem knob to rescale, --base-* to bridge into a design system, and a --base-icon-* contract to reskin glyphs."
>
	<div class="py-3">
		<p class="lead">
			Theming is done entirely through CSS custom properties — there are no styling
			attributes. Because the component lives in a Shadow DOM, variables must be set on
			the <code>&lt;web-multiselect&gt;</code> element itself (or a theme layer above it),
			never on an inner wrapper.
		</p>

		<ul>
			<li>
				<code>--ms-rem</code> is the global sizing unit. It bridges to
				<code>--base-rem</code> (default <code>10px</code>), so a single knob rescales the
				input, options, checkboxes, badges and dropdown together. Font sizes are unitless
				multipliers of it (e.g. <code>1.4 × --ms-rem</code>).
			</li>
			<li>
				Colors, borders and radii are per-concern <code>--ms-*</code> variables that default
				to <code>--base-*</code> tokens, so a design system can theme every KeenMate
				component at once.
			</li>
			<li>
				Icons flow from a <code>--base-icon-*</code> contract (new in v2.0.0) with a Lucide
				SVG fallback — swap one token and the chevron, checkbox glyphs and every ✕ reskin
				centrally.
			</li>
		</ul>

		<hr class="my-4" />

		<section id="live-theming" class="py-2">
			<h2 class="h4 mb-1">TH01 Live theming</h2>
			<p class="text-muted mb-3">
				Drag the sliders and pick an accent — the variables are written straight onto the
				element, and the CSS snippet below updates to match.
			</p>

			<div class="row g-3">
				<div class="col-lg-7">
					<div class="multiselect-demo">
						<web-multiselect
							bind:this={elRef}
							value-member="value"
							display-value-member="label"
							icon-member="icon"
							subtitle-member="subtitle"
							search-placeholder="Search technologies…"
						></web-multiselect>
						<p class="text-muted small mt-2 mb-0">
							Open the dropdown to see the accent carry into hover and selected rows.
						</p>
					</div>
				</div>

				<div class="col-lg-5">
					<div class="theming-controls">
						<span class="fw-semibold small text-uppercase text-muted d-block mb-2">Controls</span>

						<div class="mb-3">
							<label for="rem-range" class="form-label small mb-1">
								<code>--ms-rem</code>: {rem}px
							</label>
							<input
								id="rem-range"
								type="range"
								class="form-range"
								min="8"
								max="16"
								step="1"
								bind:value={rem}
							/>
							<div class="form-text">Rescales the whole component (8–16px).</div>
						</div>

						<div class="mb-3">
							<label for="accent-color" class="form-label small mb-1">
								Accent — <code>--ms-input-border-color</code> / <code>--ms-option-bg-selected</code>
							</label>
							<input
								id="accent-color"
								type="color"
								class="form-control form-control-color"
								bind:value={accent}
							/>
						</div>

						<div class="mb-0">
							<label for="radius-range" class="form-label small mb-1">
								<code>--ms-input-border-radius</code>: {radius}px
							</label>
							<input
								id="radius-range"
								type="range"
								class="form-range"
								min="0"
								max="24"
								step="1"
								bind:value={radius}
							/>
						</div>
					</div>
				</div>
			</div>

			<div class="mt-3">
				<CodeBlock codeContent={cssCode} languageType="css" titleText="Applied CSS" />
			</div>
		</section>

		<hr class="my-4" />

		<h2 class="h4 mb-3">CSS variables reference</h2>
		<p class="text-muted">
			A curated selection grouped by concern. See the
			<a href="/api/css-variables">full CSS variables reference</a> for the complete list.
		</p>

		{#each cssVarGroups as group (group.title)}
			<h2 class="h5 mt-4">{group.title}</h2>
			{#if group.blurb}
				<p class="text-muted small">{@html group.blurb}</p>
			{/if}
			<PropTable rows={group.rows} nameHeader="Variable" />
		{/each}
	</div>
</DocLayout>

<style>
	.theming-controls {
		display: flex;
		flex-direction: column;
		padding: 1rem;
		border: 1px solid var(--bs-border-color);
		border-radius: 0.375rem;
		background-color: var(--bs-tertiary-bg, var(--bs-light));
		height: 100%;
	}
</style>
