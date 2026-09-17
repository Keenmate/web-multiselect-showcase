<script lang="ts">
	import { DocLayout, CodeBlock } from '@keenmate/svelte-docs';
</script>

<DocLayout
	titleText="Security Considerations"
	descriptionText="Important information about HTML injection and XSS in rendering callbacks">

	<div class="py-4">
		<!-- Warning Banner -->
		<div class="alert alert-warning mb-5">
			<h4 class="alert-heading">Design Decision: Raw HTML Allowed</h4>
			<p class="mb-0">
				This component <strong>intentionally allows raw HTML injection</strong> in rendering callbacks
				to give developers full control over content display. This is a conscious design choice, not a bug.
				<strong>If you display user-generated content, you must sanitize it yourself.</strong>
			</p>
		</div>

		<!-- Overview -->
		<section class="mb-5">
			<h2 class="mb-3">Overview</h2>
			<p class="lead">
				The MultiSelect component uses <code>innerHTML</code> for rendering custom content in several callbacks.
				This provides maximum flexibility for creating rich, interactive content but requires developers to be
				aware of XSS (Cross-Site Scripting) implications when displaying untrusted data.
			</p>
		</section>

		<!-- Unsafe Callbacks -->
		<section class="mb-5">
			<h2 class="mb-4">Callbacks Allowing HTML Injection</h2>
			<p>The following callbacks output is rendered using <code>innerHTML</code> and will execute any HTML/JavaScript:</p>

			<div class="table-responsive mb-4">
				<table class="table table-bordered">
					<thead class="table-light">
						<tr>
							<th>Callback</th>
							<th>Used In</th>
							<th>Risk</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td><code>renderOptionContentCallback</code></td>
							<td>Dropdown options</td>
							<td><span class="badge bg-danger">HTML Injection</span></td>
						</tr>
						<tr>
							<td><code>renderBadgeContentCallback</code></td>
							<td>Selected item badges</td>
							<td><span class="badge bg-danger">HTML Injection</span></td>
						</tr>
						<tr>
							<td><code>renderBadgeCallback</code> <span class="badge bg-success-subtle text-success-emphasis">v2.0.0</span></td>
							<td>Whole badge markup</td>
							<td><span class="badge bg-danger">HTML Injection</span></td>
						</tr>
						<tr>
							<td><code>renderSelectedItemContentCallback</code></td>
							<td>Selected items popover</td>
							<td><span class="badge bg-danger">HTML Injection</span></td>
						</tr>
						<tr>
							<td><code>renderGroupLabelContentCallback</code></td>
							<td>Group headers</td>
							<td><span class="badge bg-danger">HTML Injection</span></td>
						</tr>
						<tr>
							<td><code>getIconCallback</code></td>
							<td>Option icons</td>
							<td><span class="badge bg-danger">HTML Injection</span></td>
						</tr>
						<tr>
							<td><code>getSubtitleCallback</code></td>
							<td>Option subtitles</td>
							<td><span class="badge bg-danger">HTML Injection</span></td>
						</tr>
						<tr>
							<td><code>getDisplayValueCallback</code></td>
							<td>Option titles, badge text</td>
							<td><span class="badge bg-danger">HTML Injection</span></td>
						</tr>
						<tr>
							<td><code>getBadgeDisplayCallback</code></td>
							<td>Badge text</td>
							<td><span class="badge bg-danger">HTML Injection</span></td>
						</tr>
						<tr>
							<td><code>getCounterCallback</code></td>
							<td>Count badges</td>
							<td><span class="badge bg-danger">HTML Injection</span></td>
						</tr>
						<tr>
							<td><code>getBadgeTooltipCallback</code></td>
							<td>Badge tooltips</td>
							<td><span class="badge bg-warning text-dark">HTML if HTMLElement</span></td>
						</tr>
						<tr>
							<td><code>customStylesCallback</code></td>
							<td>Style tag injection</td>
							<td><span class="badge bg-warning text-dark">CSS Injection</span></td>
						</tr>
					</tbody>
				</table>
			</div>
		</section>

		<!-- Safe Callbacks -->
		<section class="mb-5">
			<h2 class="mb-4">Safe Callbacks</h2>
			<p>The following callbacks are safe - their output is escaped or used as data only:</p>

			<div class="table-responsive mb-4">
				<table class="table table-bordered">
					<thead class="table-light">
						<tr>
							<th>Callback</th>
							<th>Usage</th>
							<th>Status</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td><code>getValueCallback</code></td>
							<td>Data lookup (ID extraction)</td>
							<td><span class="badge bg-success">Safe</span></td>
						</tr>
						<tr>
							<td><code>getSearchValueCallback</code></td>
							<td>Search filtering</td>
							<td><span class="badge bg-success">Safe</span></td>
						</tr>
						<tr>
							<td><code>getGroupCallback</code></td>
							<td>Group name extraction</td>
							<td><span class="badge bg-success">Safe</span></td>
						</tr>
						<tr>
							<td><code>getDisabledCallback</code></td>
							<td>Boolean check</td>
							<td><span class="badge bg-success">Safe</span></td>
						</tr>
						<tr>
							<td><code>getBadgeClassCallback</code></td>
							<td>CSS class names only</td>
							<td><span class="badge bg-success">Safe</span></td>
						</tr>
						<tr>
							<td><code>getSelectedItemClassCallback</code></td>
							<td>CSS class names only</td>
							<td><span class="badge bg-success">Safe</span></td>
						</tr>
						<tr>
							<td><code>beforeSearchCallback</code></td>
							<td>Search term transformation</td>
							<td><span class="badge bg-success">Safe</span></td>
						</tr>
						<tr>
							<td><code>searchCallback</code></td>
							<td>Returns data array</td>
							<td><span class="badge bg-success">Safe</span></td>
						</tr>
						<tr>
							<td><code>addNewCallback</code></td>
							<td>Returns item object</td>
							<td><span class="badge bg-success">Safe</span></td>
						</tr>
						<tr>
							<td><code>onSelect</code> / <code>onDeselect</code> / <code>onChange</code></td>
							<td>Event handlers (receive a CustomEvent)</td>
							<td><span class="badge bg-success">Safe</span></td>
						</tr>
						<tr>
							<td><code>beforeSelectCallback</code> / <code>beforeDeselectCallback</code></td>
							<td>Selection interceptors</td>
							<td><span class="badge bg-success">Safe</span></td>
						</tr>
						<tr>
							<td><code>getRemoveButtonTooltipCallback</code></td>
							<td>Title attribute (escaped)</td>
							<td><span class="badge bg-success">Safe</span></td>
						</tr>
						<tr>
							<td><code>getValueFormatCallback</code></td>
							<td>Form value formatting</td>
							<td><span class="badge bg-success">Safe</span></td>
						</tr>
					</tbody>
				</table>
			</div>
		</section>

		<!-- Why This Design -->
		<section class="mb-5">
			<h2 class="mb-4">Why Allow Raw HTML?</h2>

			<div class="row g-4 mb-4">
				<div class="col-md-6">
					<div class="card h-100 border-success">
						<div class="card-body">
							<h3 class="h5 card-title text-success">Benefits</h3>
							<ul class="mb-0">
								<li>Full control over rendering</li>
								<li>Rich content with images, icons, badges</li>
								<li>Complex layouts (flexbox, grid)</li>
								<li>Custom styling per item</li>
								<li>Interactive elements in options</li>
								<li>No limitations on creativity</li>
							</ul>
						</div>
					</div>
				</div>
				<div class="col-md-6">
					<div class="card h-100 border-warning">
						<div class="card-body">
							<h3 class="h5 card-title text-warning">Your Responsibility</h3>
							<ul class="mb-0">
								<li>Sanitize user-generated content</li>
								<li>Validate data from external APIs</li>
								<li>Use a sanitization library (DOMPurify, sanitize-html)</li>
								<li>Escape special characters when needed</li>
								<li>Review third-party data sources</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</section>

		<!-- Examples -->
		<section class="mb-5">
			<h2 class="mb-4">Sanitization Examples</h2>

			<div class="mb-4">
				<h3 class="h5">Using DOMPurify</h3>
				<CodeBlock
					codeContent={`import DOMPurify from 'dompurify';

const select = document.querySelector('web-multiselect');

// Sanitize user-generated content before rendering
select.renderOptionContentCallback = (item, context) => {
  // item.description comes from user input - MUST sanitize
  const safeDescription = DOMPurify.sanitize(item.description);

  return \`
    <div class="option-content">
      <strong>\${DOMPurify.sanitize(item.name)}</strong>
      <p>\${safeDescription}</p>
    </div>
  \`;
};`}
					languageType="javascript"
					titleText="Sanitizing with DOMPurify"
				/>
			</div>

			<div class="mb-4">
				<h3 class="h5">Simple Text Escaping</h3>
				<CodeBlock
					codeContent={`// Simple escape function for text-only content
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

select.getDisplayValueCallback = (item) => {
  // Escape if displaying user input
  return escapeHtml(item.userProvidedName);
};`}
					languageType="javascript"
					titleText="Simple HTML Escaping"
				/>
			</div>

			<div class="mb-4">
				<h3 class="h5">Safe Static Content</h3>
				<CodeBlock
					codeContent={`// If data is from YOUR database and trusted, no sanitization needed
select.renderOptionContentCallback = (item) => {
  // These values are from our controlled database
  return \`
    <div class="product">
      <img src="\${item.imageUrl}" alt="">
      <span>\${item.productName}</span>
      <span class="price">\${item.price}</span>
    </div>
  \`;
};`}
					languageType="javascript"
					titleText="Trusted Data (No Sanitization)"
				/>
			</div>
		</section>

		<!-- When to Sanitize -->
		<section class="mb-5">
			<h2 class="mb-4">When to Sanitize</h2>

			<div class="table-responsive">
				<table class="table table-bordered">
					<thead class="table-light">
						<tr>
							<th>Data Source</th>
							<th>Sanitization Required?</th>
							<th>Example</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>Your own database (controlled)</td>
							<td><span class="badge bg-secondary">Usually No</span></td>
							<td>Product catalog, predefined options</td>
						</tr>
						<tr>
							<td>User input (forms, comments)</td>
							<td><span class="badge bg-danger">Yes - Always</span></td>
							<td>User names, descriptions, tags</td>
						</tr>
						<tr>
							<td>External APIs</td>
							<td><span class="badge bg-warning text-dark">Yes - Recommended</span></td>
							<td>GitHub users, third-party data</td>
						</tr>
						<tr>
							<td>URL parameters</td>
							<td><span class="badge bg-danger">Yes - Always</span></td>
							<td>Search queries, filters from URL</td>
						</tr>
						<tr>
							<td>Static hardcoded values</td>
							<td><span class="badge bg-success">No</span></td>
							<td>Country list, status options</td>
						</tr>
					</tbody>
				</table>
			</div>
		</section>

		<!-- Important Notes -->
		<div class="mt-5 p-4 bg-light border rounded">
			<h3 class="h5 mb-3">Key Takeaways</h3>
			<ul class="mb-0">
				<li><strong>This is intentional:</strong> Raw HTML support is a feature, not a vulnerability</li>
				<li><strong>You control the data:</strong> Only you know if your data is trusted</li>
				<li><strong>Sanitize at the boundary:</strong> Clean data before it enters rendering callbacks</li>
				<li><strong>Use established libraries:</strong> DOMPurify, sanitize-html, or your framework's built-in sanitizer</li>
				<li><strong>When in doubt, sanitize:</strong> It's better to over-sanitize than to expose an XSS vulnerability</li>
			</ul>
		</div>
	</div>
</DocLayout>
