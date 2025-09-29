"use client";

import { useState, useEffect, ReactNode } from "react";
import { Button } from "./button";

interface SearchProps {
  placeholder?: string;
  onSearch: (query: string) => void;
  debounceMs?: number;
  className?: string;
}

export function SearchInput({
  placeholder = "Search...",
  onSearch,
  debounceMs = 300,
  className = "",
}: SearchProps) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(query);
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [query, onSearch, debounceMs]);

  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <SearchIcon className="h-5 w-5 text-gray-400" />
      </div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
      />
      {query && (
        <button
          onClick={() => setQuery("")}
          className="absolute inset-y-0 right-0 pr-3 flex items-center"
        >
          <XIcon className="h-4 w-4 text-gray-400 hover:text-gray-600" />
        </button>
      )}
    </div>
  );
}

interface FilterOption {
  value: string;
  label: string;
  count?: number;
}

interface FilterGroupProps {
  title: string;
  options: FilterOption[];
  selectedValues: string[];
  onSelectionChange: (values: string[]) => void;
  multiSelect?: boolean;
}

export function FilterGroup({
  title,
  options,
  selectedValues,
  onSelectionChange,
  multiSelect = true,
}: FilterGroupProps) {
  const handleOptionChange = (value: string, checked: boolean) => {
    if (multiSelect) {
      if (checked) {
        onSelectionChange([...selectedValues, value]);
      } else {
        onSelectionChange(selectedValues.filter((v) => v !== value));
      }
    } else {
      onSelectionChange(checked ? [value] : []);
    }
  };

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium text-gray-900">{title}</h3>
      <div className="space-y-2">
        {options.map((option) => (
          <label key={option.value} className="flex items-center">
            <input
              type={multiSelect ? "checkbox" : "radio"}
              name={multiSelect ? undefined : title}
              checked={selectedValues.includes(option.value)}
              onChange={(e) =>
                handleOptionChange(option.value, e.target.checked)
              }
              className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="ml-2 text-sm text-gray-700">
              {option.label}
              {option.count !== undefined && (
                <span className="ml-1 text-gray-500">({option.count})</span>
              )}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}

interface SortOption {
  value: string;
  label: string;
}

interface SortSelectProps {
  options: SortOption[];
  value: string;
  onChange: (value: string) => void;
  orderValue: "asc" | "desc";
  onOrderChange: (order: "asc" | "desc") => void;
}

export function SortSelect({
  options,
  value,
  onChange,
  orderValue,
  onOrderChange,
}: SortSelectProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-gray-600">Sort by:</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="text-sm border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <Button
        variant="outline"
        size="sm"
        onClick={() => onOrderChange(orderValue === "asc" ? "desc" : "asc")}
        className="px-2"
      >
        {orderValue === "asc" ? "↑" : "↓"}
      </Button>
    </div>
  );
}

interface SearchAndFilterProps {
  searchPlaceholder?: string;
  onSearch: (query: string) => void;
  filterGroups?: Array<{
    title: string;
    options: FilterOption[];
    selectedValues: string[];
    onSelectionChange: (values: string[]) => void;
    multiSelect?: boolean;
  }>;
  sortOptions?: SortOption[];
  sortValue?: string;
  onSortChange?: (value: string) => void;
  sortOrder?: "asc" | "desc";
  onSortOrderChange?: (order: "asc" | "desc") => void;
  children?: ReactNode;
}

export function SearchAndFilter({
  searchPlaceholder = "Search...",
  onSearch,
  filterGroups = [],
  sortOptions = [],
  sortValue = "",
  onSortChange = () => {},
  sortOrder = "desc",
  onSortOrderChange = () => {},
  children,
}: SearchAndFilterProps) {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="space-y-4">
      {/* Search and Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <SearchInput
          placeholder={searchPlaceholder}
          onSearch={onSearch}
          className="flex-1 max-w-md"
        />

        <div className="flex items-center gap-2">
          {sortOptions.length > 0 && (
            <SortSelect
              options={sortOptions}
              value={sortValue}
              onChange={onSortChange}
              orderValue={sortOrder}
              onOrderChange={onSortOrderChange}
            />
          )}

          {filterGroups.length > 0 && (
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="whitespace-nowrap"
            >
              Filters {showFilters ? "▼" : "▶"}
            </Button>
          )}
        </div>
      </div>

      {/* Filters */}
      {showFilters && filterGroups.length > 0 && (
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filterGroups.map((group, index) => (
              <FilterGroup
                key={index}
                title={group.title}
                options={group.options}
                selectedValues={group.selectedValues}
                onSelectionChange={group.onSelectionChange}
                multiSelect={group.multiSelect ?? true}
              />
            ))}
          </div>
        </div>
      )}

      {/* Results */}
      {children}
    </div>
  );
}

// Icons
function SearchIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );
}
