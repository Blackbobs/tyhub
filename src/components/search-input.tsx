"use client";

import type React from "react";
import { useSearchStore } from "@/store/search-store";
import { useEffect, useRef } from "react";
import SearchResults from "./search-results";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export default function SearchInput() {
  const { searchQuery, setSearchQuery, isSearching, setIsSearching } =
    useSearchStore();
  const inputRef = useRef<HTMLInputElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    if (!isSearching && e.target.value.length > 0) {
      setIsSearching(true);
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    setIsSearching(false);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsSearching(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setIsSearching]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsSearching(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [setIsSearching]);

  return (
    <div className="relative w-full max-w-sm" ref={wrapperRef}>
      <div className="relative">
        <svg
          className="absolute left-2.5 top-3 h-4 w-4 text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <motion.input
          type="search"
          placeholder="Search products..."
          className="pl-8 pr-8 py-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#663399] focus:border-transparent"
          value={searchQuery}
          onChange={handleSearchChange}
          onFocus={() => searchQuery.length > 0 && setIsSearching(true)}
          ref={inputRef}
          whileFocus={{ boxShadow: "0 0 0 3px rgba(102, 51, 153, 0.2)" }}
        />
        {searchQuery.length > 0 && (
          <motion.button
            className="absolute right-0 top-0 h-full px-2 text-gray-400 hover:text-gray-600"
            onClick={clearSearch}
            initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.8 }}
            animate={prefersReducedMotion ? {} : { opacity: 1, scale: 1 }}
            exit={prefersReducedMotion ? {} : { opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            <span className="sr-only">Clear search</span>
          </motion.button>
        )}
      </div>
      <SearchResults />
    </div>
  );
}
