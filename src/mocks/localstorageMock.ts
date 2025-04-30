import { vi } from 'vitest';

// Mock manual de localStorage
const localStorageMock = (() => {
    let store: Record<string, string> = {}
    return {
      getItem: vi.fn((key: string) => store[key] || null),
      setItem: vi.fn((key: string, value: string) => {
        store[key] = value.toString()
      }),
      clear: vi.fn(() => {
        store = {}
      }),
      removeItem: vi.fn((key: string) => {
        delete store[key]
      })
    }
  })()
  
  // Reemplaza localStorage en el entorno global
  Object.defineProperty(window, 'localStorage', {
    value: localStorageMock
  })
  