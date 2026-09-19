<script lang="ts">
	import { DocLayout, CodeBlock } from '@keenmate/svelte-docs';
	import { PropTable, cssVarGroups } from '$lib/demo';

	const example = `/* Set variables on the element itself (Shadow DOM). */
web-multiselect {
  --ms-rem: 12px;                        /* scale everything up */
  --ms-accent-color: #6366f1;            /* focus, checkbox, selected, badges */
  --ms-input-border: 1px solid #6366f1;  /* resting field border */
  --ms-option-bg-selected: #eef2ff;
}`;

	const baseExample = `/* One design-system layer themes EVERY KeenMate component at once. */
:root {
  --base-rem: 1rem;             /* global scale (html { font-size: 62.5% }) */
  --base-accent-color: #6366f1; /* --ms-accent-color inherits this */
  --base-border-color: #cbd5e1;
  --base-font-family: 'Inter', sans-serif;
  --base-icon-chevron: url('/icons/chevron.svg'); /* reskins the glyph */
}`;
</script>

<DocLayout
	titleText="CSS Variables"
	descriptionText="Theme with --ms-* custom properties. All theming flows from these — no preprocessor required.">
	<div class="py-3">
		<div class="alert alert-info">
			Variables must be set on the <code>&lt;web-multiselect&gt;</code> element itself (not a wrapper),
			because the component uses Shadow DOM. See the <a href="/features/theming">Theming</a> page for
			live examples.
		</div>

		<CodeBlock codeContent={example} languageType="css" titleText="Theming" />

		<section class="mt-5">
			<h2 class="h4">How <code>--base-*</code> variables work</h2>
			<p>
				Every <code>--ms-*</code> variable resolves through a three-step fallback chain, so you
				can theme at whichever level you own:
			</p>
			<ol>
				<li>
					<strong>Per-instance override</strong> — set the <code>--ms-*</code> variable directly
					(e.g. <code>--ms-accent-color: #6366f1</code>). Wins over everything.
				</li>
				<li>
					<strong>Shared base token</strong> — if you don’t, it inherits a
					<code>--base-*</code> counterpart. Setting <code>--base-accent-color</code> once on
					<code>:root</code> themes this multiselect <em>and</em> every other KeenMate component
					(date-range picker, treeview, …) together — a single design-system layer.
				</li>
				<li>
					<strong>Built-in default</strong> — with no base layer loaded, a hardcoded fallback
					applies. Color defaults are wrapped in <code>light-dark()</code>, so they adapt to the
					page’s <code>color-scheme</code> automatically.
				</li>
			</ol>
			<p class="mb-2">
				So <code>--ms-accent-color: var(--base-accent-color, #3b82f6)</code> means:
				<em>your override → the shared token → a sensible blue.</em> Two base knobs stand out:
				<code>--base-rem</code> (global sizing — <code>--ms-rem</code> bridges to it) and the
				<strong><code>--base-icon-*</code> contract</strong> (new in v2.0.0), where each glyph
				(chevron, checkbox check/dash, ✕, search/filter, add-new) flows from a
				<code>--base-icon-*</code> token with a Lucide SVG fallback — point one token at your own
				SVG to reskin the glyph across all components.
			</p>
			<CodeBlock codeContent={baseExample} languageType="css" titleText="Design-system base layer" />
		</section>

		{#each cssVarGroups as group (group.title)}
			<section class="mb-4 mt-4">
				<h2 class="h5">{group.title}</h2>
				{#if group.blurb}<p class="text-muted small">{@html group.blurb}</p>{/if}
				<PropTable rows={group.rows} nameHeader="Variable" />
			</section>
		{/each}
	</div>
</DocLayout>
