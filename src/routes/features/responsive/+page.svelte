<script lang="ts">
	import { DocLayout } from '@keenmate/svelte-docs';
	import { DemoPlayground, technologies, arabicOptions } from '$lib/demo';
	import type { ControlDef } from '$lib/demo';

	// --- 1. Mobile presentation ---------------------------------------------
	const mobileAttrs = {
		'value-member': 'value',
		'display-value-member': 'label'
	};

	const mobileSetup = (el: any) => {
		el.options = technologies;
	};

	const mobileControls: ControlDef[] = [
		{
			key: 'mobilePresentation',
			label: 'Mobile presentation',
			type: 'select',
			attr: 'mobile-presentation',
			default: 'auto',
			options: [
				{ value: 'auto', label: 'auto' },
				{ value: 'floating', label: 'floating' },
				{ value: 'fullscreen', label: 'fullscreen' }
			],
			hint: 'Set fullscreen to preview the phone sheet here on desktop.'
		},
		{
			key: 'fullscreenAutofocus',
			label: 'Fullscreen autofocus',
			type: 'toggle',
			attr: 'fullscreen-autofocus',
			default: false
		},
		{
			key: 'showSearchModeToggle',
			label: 'Show search-mode toggle',
			type: 'toggle',
			attr: 'show-search-mode-toggle',
			default: false,
			hint: 'A filter/navigate toggle inside the fullscreen overlay.'
		}
	];

	// --- 2. Container-responsive collapse -----------------------------------
	const collapseAttrs = {
		'value-member': 'value',
		'display-value-member': 'label'
	};

	const collapseSetup = (el: any) => {
		el.options = technologies;
		el.setSelected(technologies.slice(0, 5).map((t) => t.value));
	};

	const collapseControls: ControlDef[] = [
		{
			key: 'collapseBadgesBelow',
			label: 'Collapse badges below',
			type: 'number',
			attr: 'collapse-badges-below',
			default: '',
			min: 0,
			step: 20,
			hint: 'px width of the control’s OWN box (empty = unset).'
		}
	];

	// --- 3. RTL --------------------------------------------------------------
	const rtlAttrs = {
		'value-member': 'value',
		'display-value-member': 'label',
		dir: 'rtl'
	};

	const rtlSetup = (el: any) => {
		el.options = arabicOptions;
		el.setSelected(arabicOptions.slice(0, 2).map((o) => o.value));
	};

	const rtlControls: ControlDef[] = [
		{
			key: 'badgesPosition',
			label: 'Badges position',
			type: 'select',
			attr: 'badges-position',
			default: 'bottom',
			options: [
				{ value: 'top', label: 'top' },
				{ value: 'bottom', label: 'bottom' },
				{ value: 'left', label: 'left' },
				{ value: 'right', label: 'right' }
			]
		}
	];
</script>

<DocLayout
	titleText="Responsive & RTL"
	descriptionText="Adapt the picker to the device, to its own box, and to right-to-left languages."
>
	<div class="py-3">
		<p class="lead">
			The multiselect adapts on three independent axes: the presentation it chooses per
			<strong>device</strong>, the badge display it forces from its
			<strong>own width</strong>, and full <strong>RTL</strong> mirroring driven by CSS logical
			properties.
		</p>

		<DemoPlayground
			code="RS01"
			titleText="Mobile presentation"
			subtitleText="Floating panel on desktop, fullscreen sheet on touch — or force either."
			baseAttrs={mobileAttrs}
			controls={mobileControls}
			setup={mobileSetup}
			idText="mobile-presentation"
		>
			{#snippet description()}
				<ul class="mb-0">
					<li>
						<code>auto</code> (default) is a floating dropdown on desktop and a fullscreen sheet on
						touch devices. Set <code>mobile-presentation</code> to
						<code>fullscreen</code> to preview the phone overlay here.
					</li>
					<li>
						<code>fullscreen-autofocus</code> focuses the search field (and pops the soft keyboard)
						when the sheet opens; by default the list shows first.
					</li>
					<li>
						<code>show-search-mode-toggle</code> adds a filter/navigate toggle inside the fullscreen
						overlay.
					</li>
				</ul>
			{/snippet}
		</DemoPlayground>

		<hr class="my-4" />

		<DemoPlayground
			code="RS02"
			titleText="Container-responsive collapse (v2.0.0)"
			subtitleText="Collapse to a count based on the control’s OWN box — not the viewport."
			baseAttrs={collapseAttrs}
			controls={collapseControls}
			setup={collapseSetup}
			demoNote="Unlike mobile-presentation (which reads the device), this reacts to the element’s own width. Drop the picker into a narrow column and it collapses to a “N selected” count; widen it and the badges return."
			idText="collapse-badges-below"
		>
			{#snippet description()}
				<ul class="mb-0">
					<li>
						<strong>New in v2.0.0.</strong> <code>collapse-badges-below</code> forces
						<code>count</code> mode whenever the element’s own border box is narrower than the given
						pixel width — container-responsive, not viewport-responsive.
					</li>
					<li>
						Five options are pre-selected via
						<code>el.setSelected(...)</code> so the collapse is visible. Leave the value empty to
						turn the behavior off entirely.
					</li>
					<li>
						It is non-destructive: your configured <code>badges-display-mode</code> is restored
						exactly once the box widens back.
					</li>
				</ul>
			{/snippet}
		</DemoPlayground>

		<hr class="my-4" />

		<DemoPlayground
			code="RS03"
			titleText="RTL"
			subtitleText="Add dir=&quot;rtl&quot; and the whole component mirrors — overlay included."
			baseAttrs={rtlAttrs}
			controls={rtlControls}
			setup={rtlSetup}
			idText="rtl"
		>
			{#snippet description()}
				<ul class="mb-0">
					<li>
						Everything mirrors via CSS logical properties when <code>dir="rtl"</code> is set:
						checkboxes move to the right of each row, the search and counter flip, and badges
						reverse.
					</li>
					<li>
						<code>badges-position</code> (<code>top</code>/<code>bottom</code>/<code>left</code>/<code
							>right</code
						>) is mirrored too — <code>left</code>/<code>right</code> follow the reading direction.
					</li>
					<li>There is nothing to configure beyond <code>dir</code> — even the fullscreen sheet mirrors.</li>
				</ul>
			{/snippet}
		</DemoPlayground>
	</div>
</DocLayout>
