<script lang="ts">
	import { DocLayout, CodeBlock } from '@keenmate/svelte-docs';
	import { DemoPlayground, technologies, countries } from '$lib/demo';

	// --- Demo 1: rich option rows ------------------------------------------
	const optionBaseAttrs = {
		'value-member': 'value',
		'display-value-member': 'label',
		'search-placeholder': 'Search technologies…'
	};

	const optionSetup = (el: any) => {
		el.options = technologies;
		el.renderOptionContentCallback = (item: any, ctx: any) =>
			`<div style="display:flex;gap:.5rem;align-items:center"><span>${item.icon}</span><div><strong>${item.label}</strong>${
				ctx?.isFullscreen
					? ''
					: `<div style="font-size:.8em;opacity:.7">${item.subtitle ?? ''}</div>`
			}</div></div>`;
	};

	const optionCallbackCode = `el.renderOptionContentCallback = (item, ctx) =>
  \`<div style="display:flex;gap:.5rem;align-items:center">
    <span>\${item.icon}</span>
    <div>
      <strong>\${item.label}</strong>
      <div style="font-size:.8em;opacity:.7">\${item.subtitle ?? ''}</div>
    </div>
  </div>\`;

// v2.0.0: ctx is presentation-aware — render leaner rows on phones.
el.renderOptionContentCallback = (item, ctx) =>
  ctx.isFullscreen ? compactRow(item) : richRow(item);`;

	// --- Demo 2: whole-badge rendering (v2.0.0) ----------------------------
	const badgeBaseAttrs = {
		'value-member': 'code',
		'display-value-member': 'name',
		'search-placeholder': 'Search countries…'
	};

	const badgeSetup = (el: any) => {
		el.options = countries;
		el.renderBadgeCallback = (item: any, ctx: any) =>
			`<span class="badge text-bg-primary d-inline-flex align-items-center gap-1">${item.flag} ${item.name} <button type="button" data-action="remove" aria-label="Remove" style="border:0;background:transparent;color:inherit;cursor:pointer">×</button></span>`;
	};

	const badgeCallbackCode = `// renderBadgeCallback owns the WHOLE badge (new in v2.0.0).
// Return null to fall back to the default pill for an item.
el.renderBadgeCallback = (item, ctx) =>
  \`<span class="badge text-bg-primary d-inline-flex align-items-center gap-1">
    \${item.flag} \${item.name}
    <button type="button" data-action="remove" aria-label="Remove"
            style="border:0;background:transparent;color:inherit;cursor:pointer">×</button>
  </span>\`;

// Any element with data-action="remove" triggers deselect — no wiring needed.`;

	// --- Demo 3: declarative custom-styles, no JavaScript (v2.2.0) ----------
	const styledCss =
		'.ms__badge { border-radius: 999px; font-weight: 600; background: #ecfeff; color: #0e7490; border: 1px solid #a5f3fc; } .ms__option:hover { background: #eef2ff; }';

	const styledBaseAttrs = {
		'value-member': 'value',
		'display-value-member': 'label',
		'icon-member': 'icon',
		'search-placeholder': 'Search technologies…',
		'custom-styles': styledCss
	};

	const styledSetup = (el: any) => {
		el.options = technologies;
	};
</script>

<DocLayout
	titleText="Custom Rendering"
	descriptionText="Own the markup of option rows, badges, and selected items with render callbacks."
>
	<div class="py-3">
		<p class="lead">
			The render callbacks return raw HTML (or a DOM element) so you can build rich option rows,
			restyle badges, or replace a whole pill with a card. They are set imperatively on the element
			in <code>setup(el)</code>, never as attributes. To restyle the shadow-DOM internals themselves
			<strong>without any JavaScript</strong>, reach for the <code>custom-styles</code> attribute
			(v2.2.0) — see <a href="#custom-styles">CR03</a> below.
		</p>

		<div class="alert alert-warning" role="alert">
			<strong>Security:</strong> these callbacks emit raw HTML into the component. Never interpolate
			untrusted data without escaping it first. See
			<a href="/api/security">Security</a> for the escaping contract.
		</div>

		<DemoPlayground
			code="CR01"
			titleText="Rich option rows"
			subtitleText="renderOptionContentCallback builds a multi-line row with icon, label, and subtitle."
			baseAttrs={optionBaseAttrs}
			setup={optionSetup}
			idText="rich-options"
			demoNote="Open the dropdown — each row renders your HTML instead of the plain label."
		>
			{#snippet description()}
				<ul class="mb-0">
					<li>
						<code>renderOptionContentCallback</code> receives <code>(item, ctx)</code> and returns the
						row's inner HTML.
					</li>
					<li>
						In v2.0.0 the <code>ctx</code> is presentation-aware (<code>ctx.isFullscreen</code>), so
						you can render leaner rows on phones where the dropdown goes fullscreen.
					</li>
				</ul>
			{/snippet}
		</DemoPlayground>

		<CodeBlock
			codeContent={optionCallbackCode}
			languageType="javascript"
			titleText="The option callback"
		/>

		<hr class="my-4" />

		<DemoPlayground
			code="CR02"
			titleText="Whole-badge rendering (v2.0.0)"
			subtitleText="renderBadgeCallback replaces the entire pill — here a Bootstrap badge with its own remove button."
			baseAttrs={badgeBaseAttrs}
			setup={badgeSetup}
			idText="whole-badge"
			demoNote="Select a few countries — each selection becomes a fully custom badge you own."
		>
			{#snippet description()}
				<ul class="mb-0">
					<li>
						<code>renderBadgeCallback</code> is new in v2.0.0 and owns the <strong>whole</strong> badge,
						not just its content. Return <code>null</code> to fall back to the default pill for an
						item.
					</li>
					<li>
						Any element inside your badge with <code>data-action="remove"</code> triggers deselect —
						the component wires it up for you, no event handlers required.
					</li>
					<li>
						<code>renderBadgeContentCallback</code> is the lighter alternative when you only want to
						change the content <em>inside</em> the built-in pill.
					</li>
				</ul>
			{/snippet}
		</DemoPlayground>

		<CodeBlock
			codeContent={badgeCallbackCode}
			languageType="javascript"
			titleText="The whole-badge callback"
		/>

		<hr class="my-4" />

		<DemoPlayground
			code="CR03"
			titleText="Declarative styling — custom-styles (v2.2.0)"
			subtitleText="Style the shadow-DOM internals with a plain attribute — zero JavaScript."
			baseAttrs={styledBaseAttrs}
			setup={styledSetup}
			idText="custom-styles"
			demoNote="Select a few items — the badges are pill-shaped and the option hover is tinted, all from the custom-styles attribute above."
		>
			{#snippet description()}
				<ul class="mb-0">
					<li>
						<code>custom-styles</code> takes raw CSS as a string and injects it <strong>verbatim</strong>
						— selectors and all — into a replaceable style slot at the top of the shadow root, the same
						slot <code>customStylesCallback</code> uses.
					</li>
					<li>
						Because it's an attribute, static HTML, server-rendered markup, and no-build pages can restyle
						internals like <code>.ms__badge</code> and <code>.ms__option</code> (and your own
						custom-rendered content) with no script at all. It's reactive and mirrored by the
						<code>customStyles</code> property.
					</li>
					<li>
						When both are set, <code>customStylesCallback</code> wins — treat the attribute as the static
						fallback.
					</li>
				</ul>
			{/snippet}
		</DemoPlayground>
	</div>
</DocLayout>
