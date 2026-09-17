<script lang="ts">
	import { DocLayout } from '@keenmate/svelte-docs';
	import { DemoPlayground, makeLargeDataset } from '$lib/demo';
	import type { ControlDef } from '$lib/demo';

	// Compute the dataset once at module scope so it isn't rebuilt on every render.
	const bigData = makeLargeDataset(15000);

	const baseAttrs = {
		'value-member': 'value',
		'display-value-member': 'label',
		'enable-virtual-scroll': 'true',
		'virtual-scroll-threshold': '100',
		'option-height': '50',
		'search-placeholder': 'Search 15,000 items…'
	};

	const setup = (el: any) => {
		el.options = bigData;
	};

	const controls: ControlDef[] = [
		{ key: 'optionHeight', label: 'Option height (px)', type: 'number', attr: 'option-height', default: 50, min: 28, step: 2 },
		{ key: 'virtualScrollBuffer', label: 'Virtual-scroll buffer', type: 'number', attr: 'virtual-scroll-buffer', default: 10, min: 0 }
	];
</script>

<DocLayout
	titleText="Virtual Scrolling"
	descriptionText="Render only the visible rows so lists of thousands stay instant to open, search and scroll."
>
	<div class="py-3">
		<p class="lead">
			Virtual scrolling swaps a full DOM list for a fixed-height <em>window</em> — only the rows in
			(and just around) the viewport are rendered, so opening and scrolling stay fast no matter how
			many options you feed in.
		</p>

		<ul>
			<li>
				It <strong>auto-enables</strong> once the option count passes
				<code>virtual-scroll-threshold</code> (default <code>100</code>). You can also force it on
				with <code>enable-virtual-scroll="true"</code>.
			</li>
			<li>
				It requires a <strong>fixed</strong> <code>option-height</code> — the component uses index
				math on that height to place rows, so the row you want doesn't have to be rendered yet.
			</li>
			<li>
				<code>virtual-scroll-buffer</code> renders a few extra rows above and below the viewport to
				keep fast scrolling flicker-free.
			</li>
			<li>
				The same technique applies to the <strong>selected-items popover</strong> for very large
				selections (paired with <code>badge-height</code>).
			</li>
		</ul>

		<DemoPlayground
			titleText="15,000 options"
			subtitleText="A flat list of 15,000 items — try scrolling, searching, and the jump buttons."
			{baseAttrs}
			{controls}
			{setup}
			idText="large-dataset"
		>
			{#snippet actions(el)}
				<button
					type="button"
					class="btn btn-sm btn-outline-primary"
					onclick={() => {
						el.open();
						el.scrollToIndex(14999, { block: 'center' });
					}}
				>
					Jump to #15000
				</button>
				<button
					type="button"
					class="btn btn-sm btn-outline-primary"
					onclick={() => {
						el.open();
						el.scrollToValue('item-5000');
					}}
				>
					Jump to item-5000
				</button>
			{/snippet}

			{#snippet description()}
				<ul class="mb-0">
					<li>
						<code>enable-virtual-scroll</code> + a fixed <code>option-height</code> are all the demo
						needs; the 15,000 rows are assigned imperatively via <code>el.options</code>.
					</li>
					<li>
						The v2.0.0 scroll-to API (<code>scrollToIndex</code> / <code>scrollToValue</code>) locates
						the target by index math, so it works even though the target row isn't currently rendered
						— jumping to the last of 15,000 items is instant. Each handler calls
						<code>el.open()</code> first so there's a scroll container to move.
					</li>
					<li>
						Raise <code>option-height</code> for taller rows, or grow
						<code>virtual-scroll-buffer</code> if you see any flicker while scrolling fast.
					</li>
				</ul>
			{/snippet}
		</DemoPlayground>
	</div>
</DocLayout>
