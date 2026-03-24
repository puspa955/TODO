// import RichSelect from "@/app/components/RichSelect";
import React, { useState } from "react";
import { RichSelect } from '@ankamala/ui-libraries/richselect';

const options = [
  { label: "Source", path: "source" },
  { label: "Name", path: "name" },
  { label: "GBP Rank", path: "source.gbp.rank" },
  { label: "Category", path: "category" },
  { label: "Rating", path: "rating" },
  { label: "Price", path: "price" },
  { label: "Location", path: "location" },
  { label: "Reviews", path: "reviews" },
];

const groupedOptions = [
  {
    label: "Basic Info",
    options: [
      { label: "Name", path: "name" },
      { label: "Category", path: "category" },
    ],
  },
  {
    label: "Metrics",
    options: [
      { label: "Rating", path: "rating" },
      { label: "Price", path: "price" },
      { label: "Reviews", path: "reviews" },
    ],
  },
  { label: "Source", path: "source" },
];

const tooltipMap = {
  "source": "The original data source",
  "name": "Filter by business name",
  "source.gbp.rank": "Google Business Profile rank",
  "category": "Business category",
  "rating": "Average star rating",
  "price": "Price level indicator",
  "location": "Geographic location",
  "reviews": "Total number of reviews",
};

export default function Example() {
  const [singleSelected, setSingleSelected] = useState(options[0]);
  const [multiSelected, setMultiSelected] = useState([]);
  const [multiSummarySelected, setMultiSummarySelected] = useState([]);
  const [multiAlwaysSelected, setMultiAlwaysSelected] = useState([]);
  const [groupedSelected, setGroupedSelected] = useState(null);
  const [tooltipSelected, setTooltipSelected] = useState(null);
  const [noSearchSelected, setNoSearchSelected] = useState(null);
  const [smallSelected, setSmallSelected] = useState(null);
  const [noShadowSelected, setNoShadowSelected] = useState(null);
  const [customSearchSelected, setCustomSearchSelected] = useState(null);

  return (
    <div className="p-10 bg-gray-100 min-h-screen flex flex-col gap-8">
      <h1 className="text-2xl font-bold">🧩 RichSelect — Full Props Example</h1>

      <div className="bg-white p-6 rounded shadow flex flex-col gap-8">

        {/* 1. Single Select — basic */}
        <Section title="1. Single Select" description="Basic single option selection.">
          <RichSelect
            selected={singleSelected}
            onSelect={setSingleSelected}
            options={options}
            trigger={(selected) => (
              <button className="flex items-center gap-2 border px-3 py-1 rounded-md text-sm text-gray-600">
                {selected?.label || "Select..."}
              </button>
            )}
          />
          <Pre value={singleSelected} />
        </Section>

        {/* 2. Multi Select — summary auto (>6 options) */}
        <Section title="2. Multi Select" description="showSelectedSummary=true — summary appears automatically when options > 6.">
          <RichSelect
            multiple
            showSelectedSummary
            selected={multiSummarySelected}
            onSelect={setMultiSummarySelected}
            options={options}
            trigger={(selected) => (
              <button className="flex items-center gap-2 border px-3 py-1 rounded-md text-sm text-gray-600">
                {selected.length > 0 ? `${selected.length} selected` : "Select fields"}
              </button>
            )}
          />
          <Pre value={multiSummarySelected} />
        </Section>

        {/* 3. Multi Select — showSelectedSummary="always" */}
        <Section title='3. Multi Select — showSelectedSummary="always"' description="Forces the selected summary to always show regardless of options count.">
          <RichSelect
            multiple
            showSelectedSummary="always"
            selected={multiAlwaysSelected}
            onSelect={setMultiAlwaysSelected}
            options={options.slice(0, 4)}
            trigger={(selected) => (
              <button className="flex items-center gap-2 border px-3 py-1 rounded-md text-sm text-gray-600">
                {selected.length > 0 ? `${selected.length} selected` : "Select fields"}
              </button>
            )}
          />
          <Pre value={multiAlwaysSelected} />
        </Section>

        {/* 4. Grouped Options */}
        <Section title="4. Grouped Options" description="Options nested under group labels using the options key.">
          <RichSelect
            selected={groupedSelected}
            onSelect={setGroupedSelected}
            options={groupedOptions}
            trigger={(selected) => (
              <button className="flex items-center gap-2 border px-3 py-1 rounded-md text-sm text-gray-600">
                {selected?.label || "Select grouped..."}
              </button>
            )}
          />
          <Pre value={groupedSelected} />
        </Section>

        {/* 5. optionTooltip — object */}
        <Section title="5. Option Tooltip (object)" description="Pass an object keyed by path to show tooltips per option.">
          <RichSelect
            selected={tooltipSelected}
            onSelect={setTooltipSelected}
            options={options}
            optionTooltip={tooltipMap}
            trigger={(selected) => (
              <button className="flex items-center gap-2 border px-3 py-1 rounded-md text-sm text-gray-600">
                {selected?.label || "Hover options for tooltips"}
              </button>
            )}
          />
          <Pre value={tooltipSelected} />
        </Section>

        {/* 6. optionTooltip — function */}
        <Section title="6. Option Tooltip (function)" description="Pass a function (option) => string for dynamic tooltips.">
          <RichSelect
            selected={tooltipSelected}
            onSelect={setTooltipSelected}
            options={options}
            optionTooltip={(option) => `Filter by: ${option.label}`}
            trigger={(selected) => (
              <button className="flex items-center gap-2 border px-3 py-1 rounded-md text-sm text-gray-600">
                {selected?.label || "Hover options for tooltips"}
              </button>
            )}
          />
        </Section>

        {/* 7. isSearchable=false */}
        <Section title="7. No Search" description="isSearchable=false — hides the search input.">
          <RichSelect
            isSearchable={false}
            selected={noSearchSelected}
            onSelect={setNoSearchSelected}
            options={options}
            trigger={(selected) => (
              <button className="flex items-center gap-2 border px-3 py-1 rounded-md text-sm text-gray-600">
                {selected?.label || "No search input"}
              </button>
            )}
          />
          <Pre value={noSearchSelected} />
        </Section>

        {/* 8. isSmall=true */}
        <Section title="8. Small Trigger" description="isSmall=true — compact trigger with no border.">
          <RichSelect
            isSmall
            selected={smallSelected}
            onSelect={setSmallSelected}
            options={options}
            trigger={(selected) => (
              <button className="flex items-center gap-2 text-sm text-gray-600">
                {selected?.label || "Small trigger"}
              </button>
            )}
          />
          <Pre value={smallSelected} />
        </Section>

        {/* 9. isShadow=false */}
        <Section title="9. No Shadow" description="isShadow=false — removes the popover drop shadow.">
          <RichSelect
            isShadow={false}
            selected={noShadowSelected}
            onSelect={setNoShadowSelected}
            options={options}
            trigger={(selected) => (
              <button className="flex items-center gap-2 border px-3 py-1 rounded-md text-sm text-gray-600">
                {selected?.label || "No shadow popover"}
              </button>
            )}
          />
          <Pre value={noShadowSelected} />
        </Section>

        {/* 10. Custom searchFields */}
        <Section title="10. Custom searchFields" description="searchFields={['label', 'path']} — search matches against both label and path.">
          <RichSelect
            searchFields={['label', 'path']}
            selected={customSearchSelected}
            onSelect={setCustomSearchSelected}
            options={options}
            searchPlaceholder="Search by label or path..."
            trigger={(selected) => (
              <button className="flex items-center gap-2 border px-3 py-1 rounded-md text-sm text-gray-600">
                {selected?.label || "Search by path too"}
              </button>
            )}
          />
          <Pre value={customSearchSelected} />
        </Section>

        {/* 11. Trigger using --rs-* theme variables */}
        <Section title="11. Theme-aware Trigger" description="Trigger button using --rs-* CSS variables to match the RichSelect theme.">
          <RichSelect
            selected={singleSelected}
            onSelect={setSingleSelected}
            options={options}
            trigger={(selected) => (
              <button
                className="flex items-center gap-2 border px-3 py-1 rounded-md text-sm"
                style={{
                  color: 'var(--rs-text, #111827)',
                  borderColor: 'var(--rs-border, #f3f4f6)',
                  backgroundColor: 'var(--rs-bg, #ffffff)',
                }}
              >
                {selected?.label || "Theme-aware trigger"}
              </button>
            )}
          />
        </Section>

      </div>
    </div>
  );
}

// ── Helpers ──

function Section({ title, description, children }) {
  return (
    <div className="flex flex-col gap-2 border-b pb-6 last:border-none last:pb-0">
      <p className="text-sm font-bold text-gray-700">{title}</p>
      {description && <p className="text-xs text-gray-400">{description}</p>}
      <div className="flex flex-wrap gap-4 items-start mt-1">
        {children}
      </div>
    </div>
  );
}

function Pre({ value }) {
  if (!value || (Array.isArray(value) && value.length === 0)) return null;
  return (
    <pre className="text-xs bg-gray-50 border p-2 rounded max-w-xs overflow-auto">
      {JSON.stringify(value, null, 2)}
    </pre>
  );
}