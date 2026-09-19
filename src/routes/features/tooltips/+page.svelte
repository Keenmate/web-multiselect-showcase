<script lang="ts">
	import { DocLayout } from '@keenmate/svelte-docs';
	import { DemoPlayground, technologies } from '$lib/demo';
	import type { ControlDef } from '$lib/demo';

	const baseAttrs = {
		'value-member': 'value',
		'display-value-member': 'label',
		'subtitle-member': 'subtitle'
	};

	const setup = (el: any) => {
		el.options = technologies;
		el.getOptionTooltipCallback = (item: any) => `${item.label} — ${item.subtitle ?? ''}`;
		el.getBadgeTooltipCallback = (item: any) => `${item.label} — ${item.subtitle ?? ''}`;
	};

	const controls: ControlDef[] = [
		{ key: 'enableOptionTooltips', label: 'Enable option tooltips', type: 'toggle', attr: 'enable-option-tooltips', default: false },
		{ key: 'enableBadgeTooltips', label: 'Enable badge tooltips', type: 'toggle', attr: 'enable-badge-tooltips', default: false },
		{
			key: 'optionTooltipPlacement',
			label: 'Option tooltip placement',
			type: 'select',
			attr: 'option-tooltip-placement',
			default: 'top-start',
			options: [
				{ value: 'top-start', label: 'top-start' },
				{ value: 'top', label: 'top' },
				{ value: 'right', label: 'right' },
				{ value: 'bottom', label: 'bottom' },
				{ value: 'left', label: 'left' }
			],
			hint: 'Floating UI auto-flips to the opposite side when there is no room.'
		},
		{ key: 'optionTooltipFollowCursor', label: 'Follow cursor', type: 'toggle', attr: 'option-tooltip-follow-cursor', default: false }
	];
</script>

<DocLayout
	titleText="Tooltips"
	descriptionText="Hover tooltips on dropdown option rows and selected badges, with independent placement, delay and styling."
>
	<div class="py-3">
		<p class="lead">
			Enable tooltips on option rows and badges, then customize their content with
			<code>getOptionTooltipCallback</code> / <code>getBadgeTooltipCallback</code>. Placement is
			powered by Floating UI, so tooltips auto-flip when space is tight.
		</p>

		<DemoPlayground
			code="TT01"
			titleText="Option & badge tooltips"
			subtitleText="Toggle tooltips on rows and badges, then tune placement and cursor tracking."
			{baseAttrs}
			{controls}
			{setup}
			idText="tooltips"
		>
			{#snippet description()}
				<ul class="mb-0">
					<li>
						The default tooltip content is the display value plus the subtitle (a second line
						when present). <code>getOptionTooltipCallback</code> and
						<code>getBadgeTooltipCallback</code> replace it with your own string or
						<code>HTMLElement</code>.
					</li>
					<li>
						<code>option-tooltip-placement</code> (default <code>top-start</code>) and
						<code>badge-tooltip-placement</code> (default <code>top</code>) auto-flip via Floating UI.
					</li>
					<li>
						<code>option-tooltip-follow-cursor</code> anchors the tooltip to the pointer instead of the
						row — handy on full-width controls where a row-centered tooltip lands mid-screen.
					</li>
					<li>
						Option tooltips can be styled independently via <code>--ms-option-tooltip-*</code>, which
						default to the shared <code>--ms-tooltip-*</code> surface. See the full list in
						<a href="/api/css-variables">CSS Variables</a>.
					</li>
				</ul>
			{/snippet}
		</DemoPlayground>
	</div>
</DocLayout>
