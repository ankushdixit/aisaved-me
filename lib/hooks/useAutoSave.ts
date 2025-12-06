"use client";

import { useEffect, useRef, useState, useCallback } from "react";

const STORAGE_KEY = "aisaved-me-draft";
const DEBOUNCE_MS = 2000; // Increased debounce for better performance

export interface AutoSaveState {
  lastSaved: Date | null;
  isSaving: boolean;
}

export function useAutoSave<T>(
  getFormData: () => T,
  enabled: boolean = true
): AutoSaveState & {
  loadDraft: () => T | null;
  clearDraft: () => void;
  triggerSave: () => void;
} {
  const [state, setState] = useState<AutoSaveState>({
    lastSaved: null,
    isSaving: false,
  });

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const savingIndicatorTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Perform the actual save
  const doSave = useCallback(() => {
    if (!enabled) return;

    try {
      const data = getFormData();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      setState({
        lastSaved: new Date(),
        isSaving: false,
      });
    } catch {
      setState((prev) => ({ ...prev, isSaving: false }));
    }
  }, [enabled, getFormData]);

  // Trigger a debounced save
  const triggerSave = useCallback(() => {
    if (!enabled) return;

    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    if (savingIndicatorTimeoutRef.current) {
      clearTimeout(savingIndicatorTimeoutRef.current);
    }

    // Only show "saving" indicator after a short delay to avoid flickering
    savingIndicatorTimeoutRef.current = setTimeout(() => {
      setState((prev) => ({ ...prev, isSaving: true }));
    }, 500);

    timeoutRef.current = setTimeout(() => {
      if (savingIndicatorTimeoutRef.current) {
        clearTimeout(savingIndicatorTimeoutRef.current);
      }
      doSave();
    }, DEBOUNCE_MS);
  }, [enabled, doSave]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (savingIndicatorTimeoutRef.current) {
        clearTimeout(savingIndicatorTimeoutRef.current);
      }
    };
  }, []);

  // Load draft from localStorage
  const loadDraft = useCallback((): T | null => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored) as T;
      }
    } catch {
      // Ignore parse errors
    }
    return null;
  }, []);

  // Clear draft from localStorage
  const clearDraft = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      setState({
        lastSaved: null,
        isSaving: false,
      });
    } catch {
      // Ignore errors
    }
  }, []);

  return {
    ...state,
    loadDraft,
    clearDraft,
    triggerSave,
  };
}
