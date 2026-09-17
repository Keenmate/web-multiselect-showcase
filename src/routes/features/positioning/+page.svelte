<script lang="ts">
	import { DocLayout, CodeBlock } from '@keenmate/svelte-docs';
	import { DemoPlayground, technologies } from '$lib/demo';
	import type { ControlDef } from '$lib/demo';

	const baseAttrs = {
		'value-member': 'value',
		'display-value-member': 'label',
		'icon-member': 'icon',
		'subtitle-member': 'subtitle',
		'search-placeholder': 'Search technologies…'
	};

	const setup = (el: any) => {
		el.options = technologies;
	};

	const baselineControls: ControlDef[] = [
		{
			key: 'lockPlacement',
			label: 'Lock placement',
			type: 'toggle',
			attr: 'lock-placement',
			default: true,
			hint: 'Lock the dropdown placement after the first open so it stops flipping as you scroll.'
		},
		{
			key: 'maxHeight',
			label: 'Max dropdown height',
			type: 'select',
			attr: 'max-height',
			default: '20rem',
			options: [
				{ value: '20rem', label: '20rem' },
				{ value: '12rem', label: '12rem' },
				{ value: '30rem', label: '30rem' }
			],
			hint: 'CSS length the list grows to before it scrolls.'
		}
	];

	const problematicCss = `/* An ancestor with contain (or container-type) establishes a
   containing block the browser does NOT reliably honor for the
   shadow-DOM fixed panel — the dropdown can drift to the side. */
.layout-shell {
  contain: paint;
}`;

	const fixCss = `/* transform establishes the same containing block, but every
   browser definitively anchors fixed positioning to it — the panel
   lands under the input. */
.layout-shell {
  transform: translateZ(0);
}`;
</script>

<DocLayout
	titleText="Positioning"
	descriptionText="How the dropdown anchors with Floating UI, and the CSS containing-block traps that make it drift."
>
	<div class="py-3">
		<p class="lead">
			The dropdown, hint, tooltips and selected-items popover are all placed with
			<strong>Floating UI</strong> as <code>position: fixed</code> panels that normally anchor to the
			viewport, right under the input.
		</p>

		<div class="alert alert-warning" role="alert">
			<strong>Containing-block trap.</strong> A CSS <em>containing block</em> on any ancestor —
			<code>transform</code>, <code>perspective</code>, <code>filter</code>,
			<code>backdrop-filter</code>, <code>will-change</code>, <code>contain</code>, or
			<code>container-type</code> — can capture fixed positioning and make the panel drift away from
			the input. The component detects the likely culprits and warns in the console
			<em>once</em> per instance.
		</div>

		<p>There are two consumer-side fixes when you hit the warning:</p>
		<ul>
			<li>
				Replace <code>contain</code> / <code>container-type</code> on the intended anchor with
				<code>transform: translateZ(0)</code> — the same containing-block effect, but browsers
				definitively honor it for fixed positioning.
			</li>
			<li>Move the <code>&lt;web-multiselect&gt;</code> out of the problematic subtree.</li>
		</ul>

		<hr class="my-4" />

		<DemoPlayground
			titleText="Baseline & size controls"
			subtitleText="No special ancestor CSS — the panel anchors to the viewport, under the input."
			{baseAttrs}
			controls={baselineControls}
			{setup}
			idText="positioning-baseline"
		>
			{#snippet description()}
				<ul class="mb-0">
					<li>
						<code>lock-placement</code> (default <code>true</code>) fixes the chosen side after the
						first open, so the panel does not flip above/below as you scroll or the page reflows.
					</li>
					<li>
						<code>max-height</code> caps how tall the list grows before it scrolls — a CSS length,
						defaulting to <code>20rem</code>.
					</li>
				</ul>
			{/snippet}
		</DemoPlayground>

		<hr class="my-4" />

		<section id="positioning-transform">
			<h2 class="h4 mb-1">Inside a transformed ancestor</h2>
			<p class="text-muted mb-3">
				The demo below is wrapped in a div with <code>transform: translateZ(0)</code>.
			</p>

			<div style="transform: translateZ(0); border: 1px dashed var(--bs-border-color); padding: 1rem; border-radius: .5rem;">
				<DemoPlayground
					titleText="Transformed wrapper"
					subtitleText="transform establishes a containing block — browsers honor it, so the panel still lands under the input."
					{baseAttrs}
					{setup}
					demoNote="transform establishes a containing block that browsers honor, so the panel still anchors correctly under the input — unlike contain / container-type."
					idText="positioning-transform-demo"
				/>
			</div>

			<div class="row g-3 mt-1">
				<div class="col-lg-6">
					<CodeBlock
						codeContent={problematicCss}
						languageType="css"
						titleText="Problematic: contain: paint"
					/>
				</div>
				<div class="col-lg-6">
					<CodeBlock
						codeContent={fixCss}
						languageType="css"
						titleText="Fix: transform: translateZ(0)"
					/>
				</div>
			</div>
		</section>
	</div>
</DocLayout>
