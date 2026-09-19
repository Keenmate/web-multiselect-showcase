// Single source of truth for the API-reference pages (v2.0.0).
// Descriptions may contain inline HTML (rendered via {@html}).

export interface ApiRow {
	name: string;
	type: string;
	default?: string;
	description: string;
	/** e.g. "v2.0.0" — renders a small badge. */
	since?: string;
	deprecated?: boolean;
}

export interface ApiGroup {
	title: string;
	blurb?: string;
	rows: ApiRow[];
}

// ---------------------------------------------------------------------------
// HTML attributes (observed) grouped by concern
// ---------------------------------------------------------------------------
export const attributeGroups: ApiGroup[] = [
	{
		title: 'Data members',
		blurb: 'Tell the component which property of each option holds the value, label, icon, etc. Each has a callback counterpart (see Callbacks).',
		rows: [
			{ name: 'value-member', type: 'string', description: 'Property used as the option value / id.' },
			{ name: 'display-value-member', type: 'string', description: 'Property used as the visible label.' },
			{ name: 'search-value-member', type: 'string', description: 'Property matched against while searching.' },
			{ name: 'icon-member', type: 'string', description: 'Property holding an icon (emoji, glyph or markup).' },
			{ name: 'subtitle-member', type: 'string', description: 'Property holding a secondary line under the label.' },
			{ name: 'full-title-member', type: 'string', description: 'Property with a long / full title, shown on badges when <code>show-badge-full-title</code> is on.' },
			{ name: 'group-member', type: 'string', description: 'Property used to group options under headers.' },
			{ name: 'disabled-member', type: 'string', description: 'Property that marks an option disabled.' }
		]
	},
	{
		title: 'Tree members',
		blurb: 'Enabling any path source turns on tree mode. See the Tree page.',
		rows: [
			{ name: 'path-member', type: 'string', since: 'v2.0.0', description: 'Materialized dot-path per node (e.g. <code>"1.2.3"</code>). Enables tree mode.' },
			{ name: 'parent-path-member', type: 'string', since: 'v2.0.0', description: 'Property holding the parent path.' },
			{ name: 'level-member', type: 'string', since: 'v2.0.0', description: 'Property holding the depth level.' },
			{ name: 'has-children-member', type: 'string', since: 'v2.0.0', description: 'Property flagging nodes that have children.' },
			{ name: 'is-selectable-member', type: 'string', since: 'v2.0.0', description: 'Property marking a node selectable (false = no checkbox, skipped by keyboard).' },
			{ name: 'tree-path-separator', type: 'string', default: '.', since: 'v2.0.0', description: 'Separator between path segments.' },
			{ name: 'checkbox-mode', type: "'independent' | 'cascade'", default: 'independent', since: 'v2.0.0', description: 'Whether checking a node cascades to its subtree.' },
			{ name: 'cascade-select-policy', type: "'rolled-up' | 'leaves' | 'all'", default: 'rolled-up', since: 'v2.0.0', description: 'In cascade mode, which values are emitted.' }
		]
	},
	{
		title: 'Selection & behavior',
		rows: [
			{ name: 'multiple', type: 'boolean', default: 'true', description: 'Allow selecting more than one option.' },
			{ name: 'allow-groups', type: 'boolean', default: 'true', description: 'Enable grouping by <code>group-member</code>.' },
			{ name: 'show-checkboxes', type: 'boolean', default: 'true', description: 'Show checkboxes in the option rows.' },
			{ name: 'close-on-select', type: 'boolean', default: 'false', description: 'Close the dropdown after each selection.' },
			{ name: 'checkbox-align', type: "'top' | 'center' | 'bottom'", default: 'center', description: 'Vertical alignment of the checkbox in tall rows.' },
			{ name: 'allow-add-new', type: 'boolean', default: 'false', since: 'v2.0.0', description: 'Show an “Add …” prompt when a search yields no matches.' },
			{ name: 'overlay-group', type: 'string', since: 'v2.0.0', description: 'Coordinate “one overlay open at a time” across components sharing the group name.' }
		]
	},
	{
		title: 'Search',
		rows: [
			{ name: 'enable-search', type: 'boolean', default: 'true', description: 'Show the search input.' },
			{ name: 'search-mode', type: "'filter' | 'navigate'", default: 'filter', description: 'Filter hides non-matches; navigate keeps all rows and jumps between matches.' },
			{ name: 'search-input-mode', type: "'normal' | 'readonly' | 'hidden'", default: 'normal', description: 'Editable, read-only, or no search field.' },
			{ name: 'show-search-mode-toggle', type: 'boolean', default: 'false', since: 'v2.0.0', description: 'Show a filter/navigate toggle inside the fullscreen overlay.' },
			{ name: 'min-search-length', type: 'number', default: '0', description: 'Minimum characters before search fires.' },
			{ name: 'search-debounce', type: 'number (ms)', default: '0', description: 'Debounce delay for the async <code>searchCallback</code>.' },
			{ name: 'keep-options-on-search', type: 'boolean', default: 'true', description: 'Keep selected options visible while filtering.' },
			{ name: 'should-keep-search-on-close', type: 'boolean', default: 'true', description: 'Preserve the search term after closing.' }
		]
	},
	{
		title: 'Display of selected items',
		rows: [
			{ name: 'badges-display-mode', type: "'badges' | 'count' | 'compact' | 'partial' | 'none'", default: 'badges', description: 'How selected items are represented.' },
			{ name: 'badges-position', type: "'top' | 'bottom' | 'left' | 'right'", default: 'bottom', description: 'Where the badge area sits relative to the input.' },
			{ name: 'badges-threshold', type: 'number', description: 'Collapse to count/partial once this many are selected.' },
			{ name: 'badges-threshold-mode', type: "'count' | 'partial'", default: 'count', description: 'How the threshold collapses badges.' },
			{ name: 'badges-max-visible', type: 'number', description: 'In partial mode, how many badges before “+X more”.' },
			{ name: 'collapse-badges-below', type: 'number (px)', since: 'v2.0.0', description: 'Force count mode when the control’s own box is narrower than this — container-responsive, not viewport.' },
			{ name: 'show-counter', type: 'boolean', default: 'false', description: 'Show a selected-count indicator in the input.' },
			{ name: 'show-clear', type: 'boolean', default: 'false', since: 'v2.0.0', description: 'Show an inline ✕ clear button inside the input.' },
			{ name: 'show-badge-full-title', type: 'boolean', default: 'false', description: 'Use the full title on badges.' },
			{ name: 'enable-selected-popover', type: 'boolean', default: 'true', since: 'v2.0.0', description: 'Allow the selected-items popover to open (set false when you render your own selection UI).' }
		]
	},
	{
		title: 'Placeholders & text',
		rows: [
			{ name: 'search-placeholder', type: 'string', default: 'Search...', description: 'Placeholder for the search field.' },
			{ name: 'select-placeholder', type: 'string', default: 'Pick an option...', description: 'Shown when nothing is selected / search disabled.' },
			{ name: 'empty-message', type: 'string', default: 'No results found', description: 'Shown when a search yields no matches.' },
			{ name: 'no-data-placeholder', type: 'string', description: 'Shown when there are no options at all.' },
			{ name: 'loading-message', type: 'string', default: 'Loading...', description: 'Shown while options are loading.' },
			{ name: 'search-hint', type: 'string', description: 'Small hint text under the search field.' },
			{ name: 'add-new-text', type: 'string', default: 'Add "{value}"', since: 'v2.0.0', description: 'Template for the add-new prompt; <code>{value}</code> is the typed text.' },
			{ name: 'add-new-pending-text', type: 'string', default: 'Adding "{value}"…', since: 'v2.0.0', description: 'Template while an async <code>addNewCallback</code> runs.' },
			{ name: 'remove-button-tooltip-text', type: 'string', description: 'Format string for the badge remove tooltip; <code>{0}</code> = item name.' }
		]
	},
	{
		title: 'Form integration',
		rows: [
			{ name: 'name', type: 'string', description: 'Form field name for the auto-created hidden input(s).' },
			{ name: 'value-format', type: "'json' | 'csv' | 'array'", default: 'json', description: 'Serialization: <code>["a","b"]</code>, <code>a,b</code>, or repeated <code>name[]</code> inputs.' },
			{ name: 'initial-values', type: 'JSON array | CSV', description: 'Initial selection (element-only). Accepts <code>["a","b"]</code> or <code>a,b</code>.' }
		]
	},
	{
		title: 'Declarative data (element-only)',
		rows: [
			{ name: 'data-options', type: 'string', description: 'Option data as an attribute, parsed per <code>data-options-format</code>.' },
			{ name: 'data-options-format', type: "'json' | 'csv' | 'plain'", default: 'json', description: 'How <code>data-options</code> is parsed.' },
			{ name: 'data-options-splitter', type: 'string', default: ',', description: 'Field delimiter for CSV/plain (supports <code>\\t \\n \\r</code>).' },
			{ name: 'data-options-row-splitter', type: 'string', default: 'newline', description: 'Row delimiter for CSV/plain.' }
		]
	},
	{
		title: 'Responsive & presentation',
		rows: [
			{ name: 'mobile-presentation', type: "'auto' | 'floating' | 'fullscreen'", default: 'auto', since: 'v2.0.0', description: 'Anchored dropdown vs full-screen sheet (element-only).' },
			{ name: 'fullscreen-autofocus', type: 'boolean', default: 'false', description: 'Focus the search field when the fullscreen sheet opens.' },
			{ name: 'lock-placement', type: 'boolean', default: 'true', description: 'Lock the dropdown placement after first open.' },
			{ name: 'dropdown-min-width', type: 'CSS length', description: 'Minimum dropdown width.' },
			{ name: 'dropdown-max-width', type: 'CSS length', description: 'Maximum dropdown width.' },
			{ name: 'dropdown-width', type: 'CSS length', description: 'Sugar for <code>--ms-dropdown-width</code> (element-only).' },
			{ name: 'max-height', type: 'CSS length', default: '20rem', description: 'Max dropdown height before scrolling.' },
			{ name: 'selected-popover-width', type: 'CSS length', since: 'v2.0.0', description: 'Fixed popover width. Defaults to the field width.' }
		]
	},
	{
		title: 'Virtual scrolling',
		rows: [
			{ name: 'enable-virtual-scroll', type: 'boolean', default: 'false', description: 'Force virtual scrolling on.' },
			{ name: 'virtual-scroll-threshold', type: 'number', default: '100', description: 'Option count that auto-enables virtual scrolling.' },
			{ name: 'option-height', type: 'number (px)', default: '50', description: 'Fixed row height used by virtual scroll.' },
			{ name: 'badge-height', type: 'number (px)', default: '36', description: 'Fixed badge height for popover virtual scroll.' },
			{ name: 'virtual-scroll-buffer', type: 'number', default: '10', description: 'Extra rows rendered above/below the viewport.' }
		]
	},
	{
		title: 'Tooltips',
		rows: [
			{ name: 'enable-option-tooltips', type: 'boolean', default: 'false', description: 'Enable tooltips on option rows.' },
			{ name: 'enable-badge-tooltips', type: 'boolean', default: 'false', description: 'Enable tooltips on badges.' },
			{ name: 'option-tooltip-placement', type: 'Placement', default: 'top-start', description: 'Floating-UI placement for option tooltips.' },
			{ name: 'badge-tooltip-placement', type: 'Placement', default: 'top', description: 'Floating-UI placement for badge tooltips.' },
			{ name: 'option-tooltip-follow-cursor', type: 'boolean', default: 'false', description: 'Option tooltip tracks the pointer.' },
			{ name: 'option-tooltip-delay / badge-tooltip-delay', type: 'number (ms)', default: '100', description: 'Show delay.' },
			{ name: 'option-tooltip-offset / badge-tooltip-offset', type: 'number (px)', default: '8', description: 'Gap between anchor and tooltip.' }
		]
	},
	{
		title: 'Action bar',
		rows: [
			{ name: 'actions-position', type: "'top' | 'bottom'", default: 'top', description: 'Where the action-button bar sits in the dropdown.' },
			{ name: 'actions-layout', type: "'nowrap' | 'wrap'", default: 'nowrap', description: 'Whether buttons wrap onto new rows.' },
			{ name: 'actions-align', type: "'stretch' | 'left' | 'right' | 'center' | 'space-between'", default: 'stretch', description: 'Horizontal alignment of the buttons.' },
			{ name: 'sticky-actions', type: 'boolean', default: 'true', description: 'Keep the action bar pinned while the list scrolls.' }
		]
	}
];

// ---------------------------------------------------------------------------
// Events
// ---------------------------------------------------------------------------
export const events: ApiRow[] = [
	{ name: 'select', type: 'CustomEvent<MultiSelectEventDetail>', description: 'An option was selected via the UI. <code>detail.option</code>, <code>detail.selectedOptions</code>, <code>detail.selectedValues</code>.' },
	{ name: 'deselect', type: 'CustomEvent<MultiSelectEventDetail>', description: 'An option was deselected via the UI.' },
	{ name: 'change', type: 'CustomEvent<MultiSelectEventDetail>', description: 'The selection set changed (no single <code>option</code>).' },
	{ name: 'add', type: 'CustomEvent<MultiSelectEventDetail>', since: 'v2.0.0', description: 'The user committed the add-new prompt. <code>detail.value</code> is the typed text; <code>detail.option</code> is the created option if <code>addNewCallback</code> produced one.' }
];

// ---------------------------------------------------------------------------
// Public methods / JS API
// ---------------------------------------------------------------------------
export const methodGroups: ApiGroup[] = [
	{
		title: 'Selection',
		rows: [
			{ name: 'getSelected()', type: '() => T[]', description: 'Currently selected option objects.' },
			{ name: 'setSelected(values, opts?)', type: '(values, { notify? }) => void', description: 'Set selected values. <code>notify: true</code> fires <code>change</code>.' },
			{ name: 'getValue()', type: '() => string | number | (…)[] | null', description: 'Serialized value per <code>value-format</code>.' },
			{ name: 'selectedValue', type: 'getter', description: 'Read-only serialized value.' },
			{ name: 'selectedItem', type: 'getter', description: 'First selected option (single-select) or null.' },
			{ name: 'clearAll()', type: '() => void', description: 'Clear the selection (used by form reset).' }
		]
	},
	{
		title: 'Dropdown',
		blurb: 'Imperative open/close added in v2.0.0.',
		rows: [
			{ name: 'open()', type: '() => void', since: 'v2.0.0', description: 'Open the dropdown (flushes pending property writes first).' },
			{ name: 'close()', type: '() => void', since: 'v2.0.0', description: 'Close the dropdown.' },
			{ name: 'toggle()', type: '() => void', since: 'v2.0.0', description: 'Toggle open/closed.' },
			{ name: 'isOpen', type: 'getter/setter', since: 'v2.0.0', description: 'Read or assign the open state.' }
		]
	},
	{
		title: 'Search & scroll',
		blurb: 'The search-text control and scroll-to API are new in v2.0.0.',
		rows: [
			{ name: 'searchText', type: 'getter', since: 'v2.0.0', description: 'Current search-box text.' },
			{ name: 'search(term)', type: '(term: string) => void', since: 'v2.0.0', description: 'Set the search text and filter as if typed (runs beforeSearch / min-length / async). Does not open the dropdown.' },
			{ name: 'clearSearch()', type: '() => void', since: 'v2.0.0', description: 'Clear the search and restore the full list.' },
			{ name: 'scrollToIndex(i, opts?)', type: '(i, { block? }) => boolean', since: 'v2.0.0', description: 'Scroll to the option at index in the filtered list.' },
			{ name: 'scrollToValue(v, opts?)', type: '(v, { block? }) => boolean', since: 'v2.0.0', description: 'Scroll to the option with this value (false if filtered out / under a collapsed branch).' },
			{ name: 'scrollToGroup(name, opts?)', type: '(name, { block? }) => boolean', since: 'v2.0.0', description: 'Scroll to a group header / first group option.' }
		]
	},
	{
		title: 'Messaging & lifecycle',
		rows: [
			{ name: 'showMessage(content, opts?)', type: '(content, { variant?, duration?, placement? }) => void', since: 'v2.0.0', description: 'Show a transient toast (visible even in the fullscreen overlay).' },
			{ name: 'hideMessage()', type: '() => void', since: 'v2.0.0', description: 'Dismiss the transient message.' },
			{ name: 'setPresentation(mode)', type: "('floating' | 'fullscreen') => void", description: 'Switch presentation mode programmatically.' },
			{ name: 'destroy()', type: '() => void', description: 'Clean up (called automatically on disconnect).' }
		]
	}
];

// ---------------------------------------------------------------------------
// Callbacks (property-only)
// ---------------------------------------------------------------------------
export const callbackGroups: ApiGroup[] = [
	{
		title: 'Data extraction',
		blurb: 'Callback counterparts to the *-member attributes — use for computed values.',
		rows: [
			{ name: 'getValueCallback', type: '(item) => string | number', description: 'Compute the value/id.' },
			{ name: 'getDisplayValueCallback', type: '(item) => string', description: 'Compute the label.' },
			{ name: 'getSearchValueCallback', type: '(item) => string', description: 'Compute the searchable text.' },
			{ name: 'getIconCallback', type: '(item) => string', description: 'Compute the icon.' },
			{ name: 'getSubtitleCallback', type: '(item) => string', description: 'Compute the subtitle.' },
			{ name: 'getGroupCallback', type: '(item) => string', description: 'Compute the group name.' },
			{ name: 'getDisabledCallback', type: '(item) => boolean', description: 'Compute disabled state.' },
			{ name: 'getFullTitleCallback', type: '(item) => string', description: 'Compute the full/long title.' },
			{ name: 'getBadgeDisplayCallback', type: '(item) => string', description: 'Compute badge text (separate from the label).' }
		]
	},
	{
		title: 'Rendering (may emit raw HTML)',
		blurb: 'These receive a presentation-aware context (<code>isFullscreen</code>, tree metadata) in v2.0.0.',
		rows: [
			{ name: 'renderOptionContentCallback', type: '(item, ctx) => string | HTMLElement', description: 'Custom option-row content.' },
			{ name: 'renderBadgeContentCallback', type: '(item, ctx) => string | HTMLElement', description: 'Custom content inside the built-in badge pill.' },
			{ name: 'renderBadgeCallback', type: '(item, ctx) => string | HTMLElement | null', since: 'v2.0.0', description: 'Own the whole badge markup. Return null to fall back to the default pill; use <code>data-action="remove"</code> for the remove control.' },
			{ name: 'renderSelectedItemContentCallback', type: '(item) => string | HTMLElement', description: 'Custom selected item in the popover.' },
			{ name: 'renderSelectedContentCallback', type: '(item) => string', description: 'Custom single-select display.' },
			{ name: 'renderGroupLabelContentCallback', type: '(groupName) => string | HTMLElement', description: 'Custom group header.' },
			{ name: 'getBadgeClassCallback', type: '(item) => string | string[]', description: 'Extra CSS classes for badges.' },
			{ name: 'getSelectedItemClassCallback', type: '(item) => string | string[]', description: 'Extra CSS classes for popover items.' },
			{ name: 'customStylesCallback', type: '() => string', description: 'Inject a CSS string into the shadow root.' }
		]
	},
	{
		title: 'Search & selection hooks',
		rows: [
			{ name: 'searchCallback', type: '(term, signal?) => Promise<T[]>', description: 'Async search. Wire the <code>AbortSignal</code> into fetch to cancel.' },
			{ name: 'beforeSearchCallback', type: '(term) => string | null', description: 'Pre-process the term; return null to veto.' },
			{ name: 'beforeSelectCallback', type: '(option, selected) => boolean | string | void', description: 'Veto a selection (false), or veto + toast (string).' },
			{ name: 'beforeDeselectCallback', type: '(option, selected) => boolean | string | void', description: 'Veto a deselection (false), or veto + toast (string).' },
			{ name: 'onSelect / onDeselect / onChange', type: '(e: CustomEvent) => void', description: 'Fire-and-forget handlers. <strong>v2.0.0:</strong> now receive a <code>CustomEvent</code>, not a bare option.' },
			{ name: 'getCounterCallback', type: '(count, moreCount?) => string', description: 'Format the selected-count label (i18n / pluralization).' },
			{ name: 'keydownCallback', type: '(ctx) => boolean | void', since: 'v2.0.0', description: 'Intercept keydown before built-in handling; return true to suppress. <code>ctx.controller</code> exposes focus/select helpers.' }
		]
	},
	{
		title: 'Add-new creation (v2.0.0)',
		rows: [
			{ name: 'addNewCallback', type: '(value) => T | null | Promise<T | null>', since: 'v2.0.0', description: 'Create a new option from the typed text (async & cancelable; return null/undefined to abort). The returned option flows through the get*/render* callbacks.' },
			{ name: 'getAddNewTextCallback', type: '(value) => string', since: 'v2.0.0', description: 'Compute the add-new prompt label (plain text). Takes precedence over <code>add-new-text</code>.' },
			{ name: 'onAddNew', type: '(detail) => void', since: 'v2.0.0', description: 'Fires when the user commits creation.' }
		]
	}
];

// ---------------------------------------------------------------------------
// CSS variables (selected, grouped)
// ---------------------------------------------------------------------------
export const cssVarGroups: ApiGroup[] = [
	{
		title: 'Scaling & typography',
		blurb: '<code>--ms-rem</code> bridges to <code>--base-rem</code> (default 10px) — one knob rescales everything.',
		rows: [
			{ name: '--ms-rem', type: 'length', default: 'var(--base-rem, 10px)', description: 'Global sizing unit. Font sizes are unitless multipliers of this.' },
			{ name: '--ms-font-family', type: 'font', description: 'Component font family (inherits <code>--base-font-family</code>).' },
			{ name: '--ms-input-font-size', type: 'multiplier', description: 'Input font size (× <code>--ms-rem</code>).' }
		]
	},
	{
		title: 'Input / field',
		rows: [
			{ name: '--ms-input-bg', type: 'color', description: 'Field background.' },
			{ name: '--ms-input-border-color', type: 'color', description: 'Field border.' },
			{ name: '--ms-input-border-color-focus', type: 'color', description: 'Field border on focus.' },
			{ name: '--ms-input-border-radius', type: 'length', description: 'Field corner radius.' },
			{ name: '--ms-input-padding-h', type: 'length', since: 'v2.0.0', description: 'Horizontal field padding (replaces removed <code>--ms-input-padding*</code>).' },
			{ name: '--ms-input-gap', type: 'length', since: 'v2.0.0', description: 'Spacing between input, counter, clear and toggle.' },
			{ name: '--ms-input-current-width', type: 'length', description: 'Resolved field width (drives dropdown/popover default width).' }
		]
	},
	{
		title: 'Options & dropdown',
		rows: [
			{ name: '--ms-dropdown-bg', type: 'color', description: 'Dropdown background.' },
			{ name: '--ms-dropdown-width', type: 'length', description: 'Dropdown width (see <code>dropdown-width</code>).' },
			{ name: '--ms-option-bg-hover', type: 'color', description: 'Option background on hover/focus.' },
			{ name: '--ms-option-bg-selected', type: 'color', description: 'Selected option background.' },
			{ name: '--ms-option-min-height', type: 'length', description: 'Minimum option row height.' },
			{ name: '--ms-tree-indent', type: 'length', since: 'v2.0.0', description: 'Indent step per tree level.' },
			{ name: '--ms-tree-base-indent', type: 'length', since: 'v2.0.0', description: 'Indent of the first tree level.' }
		]
	},
	{
		title: 'Badges & tooltips',
		rows: [
			{ name: '--ms-badge-bg', type: 'color', description: 'Badge background.' },
			{ name: '--ms-badge-text-color', type: 'color', description: 'Badge text color.' },
			{ name: '--ms-tooltip-bg', type: 'color', description: 'Shared tooltip background.' },
			{ name: '--ms-option-tooltip-bg', type: 'color', description: 'Option tooltip background (overrides shared).' },
			{ name: '--ms-option-tooltip-max-width', type: 'length', description: 'Option tooltip max width.' }
		]
	},
	{
		title: 'Icons (base contract, v2.0.0)',
		blurb: 'Each glyph flows from a <code>--base-icon-*</code> counterpart with a Lucide SVG fallback, so a theme can reskin all KeenMate components at once.',
		rows: [
			{ name: '--ms-icon-chevron', type: 'image', since: 'v2.0.0', description: 'Dropdown toggle chevron.' },
			{ name: '--ms-icon-check / --ms-icon-indeterminate', type: 'image', since: 'v2.0.0', description: 'Checkbox check / dash (mask glyphs).' },
			{ name: '--ms-icon-clear / --ms-icon-remove', type: 'image', since: 'v2.0.0', description: 'Clear button / badge remove.' },
			{ name: '--ms-icon-search / --ms-icon-filter', type: 'image', since: 'v2.0.0', description: 'Search / filter glyphs (fullscreen toggle).' },
			{ name: '--ms-add-new-*', type: 'various', since: 'v2.0.0', description: 'Add-new prompt row styling (<code>--ms-icon-add-new</code> glyph).' }
		]
	}
];

// ---------------------------------------------------------------------------
// v1 → v2 breaking changes / migration
// ---------------------------------------------------------------------------
export interface MigrationItem {
	title: string;
	body: string;
}

export const breakingChanges: MigrationItem[] = [
	{
		title: 'Event handler properties now receive a CustomEvent',
		body: '<code>onSelect</code>/<code>onDeselect</code>/<code>onChange</code> used to receive the bare option. They now receive a <code>CustomEvent&lt;MultiSelectEventDetail&gt;</code>. Read <code>e.detail.option</code>, <code>e.detail.selectedOptions</code>, <code>e.detail.selectedValues</code>. The native <code>addEventListener(\'select\', …)</code> path is unchanged.'
	},
	{
		title: 'Field-shell input redesign removed several CSS variables',
		body: 'The input is now a flex field with real sibling controls (counter, clear, chevron). Removed: <code>--ms-input-padding</code>, <code>--ms-input-padding-right</code>, <code>--ms-toggle-right</code>, <code>--ms-counter-offset</code>, <code>--ms-input-clear-inset</code>, <code>--ms-input-clear-gutter</code>, <code>--ms-transform-center-y</code>. Use <code>--ms-input-padding-h</code> and <code>--ms-input-gap</code> instead.'
	},
	{
		title: 'Checkbox check/dash are now mask glyphs',
		body: 'Rendered from <code>--ms-icon-check</code>/<code>--ms-icon-indeterminate</code> rather than rotated borders. <code>--ms-checkbox-checkmark-thickness</code> is now a no-op (stroke is baked into the SVG).'
	},
	{
		title: 'Selected popover defaults to the field width',
		body: 'Previously a fixed 32rem. Set <code>selected-popover-width</code> / <code>--ms-selected-popover-width</code> to restore a fixed width.'
	},
	{
		title: 'Sizing bridges to the base layer',
		body: '<code>--ms-rem</code> is now <code>var(--base-rem, 10px)</code> and icons flow from <code>--base-icon-*</code>. No change if you don’t use a base layer; a theme can now rescale/reskin everything centrally.'
	}
];
