'use client'

import React, { createContext, useContext, useReducer, useEffect } from 'react'

interface BuilderState {
  currentStep: number
  siteData: {
    // Step 1: Site Basics
    siteName: string
    slug: string
    theme: {
      primaryColor: string
      secondaryColor: string
      accentColor: string
      fontFamily: string
    }
    // Step 2: Header
    headerConfig: {
      headerType: string
      showSearch: boolean
      navItems: Array<{ label: string; url: string }>
    }
    // Step 3: Hero
    heroConfig: {
      heroType: string
      heroData: any
    }
    // Step 4: Content Sections
    selectedBlocks: Array<{
      blockType: string
      blockConfig: any
      order: number
    }>
  }
  validationErrors: Record<string, string[]>
  isSaving: boolean
  siteId?: string
}

type BuilderAction =
  | { type: 'SET_STEP'; payload: number }
  | { type: 'UPDATE_SITE_DATA'; payload: Partial<BuilderState['siteData']> }
  | { type: 'SET_VALIDATION_ERRORS'; payload: Record<string, string[]> }
  | { type: 'SET_SAVING'; payload: boolean }
  | { type: 'SET_SITE_ID'; payload: string }
  | { type: 'RESET' }
  | { type: 'LOAD_DRAFT'; payload: BuilderState['siteData'] }

const builderReducer = (state: BuilderState, action: BuilderAction): BuilderState => {
  switch (action.type) {
    case 'SET_STEP':
      return { ...state, currentStep: action.payload }
    case 'UPDATE_SITE_DATA':
      return { ...state, siteData: { ...state.siteData, ...action.payload } }
    case 'SET_VALIDATION_ERRORS':
      return { ...state, validationErrors: action.payload }
    case 'SET_SAVING':
      return { ...state, isSaving: action.payload }
    case 'SET_SITE_ID':
      return { ...state, siteId: action.payload }
    case 'LOAD_DRAFT':
      return { ...state, siteData: action.payload }
    case 'RESET':
      return initialState
    default:
      return state
  }
}

const initialState: BuilderState = {
  currentStep: 1,
  siteData: {
    siteName: '',
    slug: '',
    theme: {
      primaryColor: '#3b82f6',
      secondaryColor: '#8b5cf6',
      accentColor: '#10b981',
      fontFamily: 'inter',
    },
    headerConfig: {
      headerType: 'default',
      showSearch: false,
      navItems: [],
    },
    heroConfig: {
      heroType: 'highImpact',
      heroData: {},
    },
    selectedBlocks: [],
  },
  validationErrors: {},
  isSaving: false,
}

interface BuilderContextType {
  state: BuilderState
  dispatch: React.Dispatch<BuilderAction>
  nextStep: () => void
  prevStep: () => void
  saveDraft: () => Promise<void>
  deploy: () => Promise<void>
  updateSiteData: (data: Partial<BuilderState['siteData']>) => void
}

const BuilderContext = createContext<BuilderContextType | undefined>(undefined)

export const BuilderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(builderReducer, initialState)

  // Load draft from localStorage on mount
  useEffect(() => {
    const draft = localStorage.getItem('velen-builder-draft')
    const siteId = localStorage.getItem('velen-builder-site-id')

    if (draft) {
      try {
        const parsedDraft = JSON.parse(draft)
        dispatch({ type: 'LOAD_DRAFT', payload: parsedDraft })
      } catch (error) {
        console.error('Failed to load draft:', error)
      }
    }

    if (siteId) {
      dispatch({ type: 'SET_SITE_ID', payload: siteId })
    }
  }, [])

  // Auto-save to localStorage whenever siteData changes
  useEffect(() => {
    localStorage.setItem('velen-builder-draft', JSON.stringify(state.siteData))
  }, [state.siteData])

  // Auto-save siteId to localStorage
  useEffect(() => {
    if (state.siteId) {
      localStorage.setItem('velen-builder-site-id', state.siteId)
    }
  }, [state.siteId])

  const nextStep = () => {
    if (state.currentStep < 4) {
      dispatch({ type: 'SET_STEP', payload: state.currentStep + 1 })
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const prevStep = () => {
    if (state.currentStep > 1) {
      dispatch({ type: 'SET_STEP', payload: state.currentStep - 1 })
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const updateSiteData = (data: Partial<BuilderState['siteData']>) => {
    dispatch({ type: 'UPDATE_SITE_DATA', payload: data })
  }

  const saveDraft = async () => {
    dispatch({ type: 'SET_SAVING', payload: true })

    try {
      const method = state.siteId ? 'PATCH' : 'POST'
      const url = state.siteId ? `/api/sites/${state.siteId}` : '/api/sites'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...state.siteData,
          deploymentStatus: 'draft',
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to save draft')
      }

      const data = await response.json()

      if (data.doc?.id) {
        dispatch({ type: 'SET_SITE_ID', payload: data.doc.id })
      }

      console.log('Draft saved successfully')
    } catch (error) {
      console.error('Failed to save draft:', error)
      alert('Failed to save draft. Please try again.')
    } finally {
      dispatch({ type: 'SET_SAVING', payload: false })
    }
  }

  const deploy = async () => {
    dispatch({ type: 'SET_SAVING', payload: true })

    try {
      // First, save/update the site
      await saveDraft()

      if (!state.siteId) {
        throw new Error('No site ID found')
      }

      // Then trigger deployment
      const response = await fetch('/api/deploy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ siteId: state.siteId }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Deployment failed')
      }

      const data = await response.json()

      if (data.success) {
        // Clear draft from localStorage
        localStorage.removeItem('velen-builder-draft')
        localStorage.removeItem('velen-builder-site-id')

        // Redirect to dashboard
        window.location.href = '/dashboard'
      }
    } catch (error) {
      console.error('Deployment failed:', error)
      alert(`Deployment failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      dispatch({ type: 'SET_SAVING', payload: false })
    }
  }

  const value: BuilderContextType = {
    state,
    dispatch,
    nextStep,
    prevStep,
    saveDraft,
    deploy,
    updateSiteData,
  }

  return <BuilderContext.Provider value={value}>{children}</BuilderContext.Provider>
}

export const useBuilder = () => {
  const context = useContext(BuilderContext)
  if (!context) {
    throw new Error('useBuilder must be used within BuilderProvider')
  }
  return context
}
