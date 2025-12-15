'use client'

import React from 'react'
import { BuilderProvider, useBuilder } from './context/BuilderContext'
import Step1SiteBasics from './steps/Step1SiteBasics'
import Step2Header from './steps/Step2Header'
import Step3Hero from './steps/Step3Hero'
import Step4Content from './steps/Step4Content'

const steps = [
  { number: 1, title: 'Site Basics', component: Step1SiteBasics },
  { number: 2, title: 'Header', component: Step2Header },
  { number: 3, title: 'Hero Section', component: Step3Hero },
  { number: 4, title: 'Content Sections', component: Step4Content },
]

function BuilderContent() {
  const { state, nextStep, prevStep, saveDraft, deploy } = useBuilder()
  const CurrentStepComponent = steps[state.currentStep - 1].component

  const canProceed = () => {
    const { siteData } = state

    switch (state.currentStep) {
      case 1:
        return siteData.siteName.trim() !== '' && siteData.slug.trim() !== ''
      case 2:
        return true // Header is optional
      case 3:
        return true // Hero is optional
      case 4:
        return siteData.selectedBlocks.length > 0
      default:
        return true
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Progress Bar */}
      <div className="sticky top-0 z-50 bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, idx) => (
              <React.Fragment key={step.number}>
                <div className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                      state.currentStep >= step.number
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    {step.number}
                  </div>
                  <span className="ml-2 text-sm font-medium hidden sm:inline">
                    {step.title}
                  </span>
                </div>
                {idx < steps.length - 1 && (
                  <div
                    className={`flex-1 h-1 mx-4 transition-all ${
                      state.currentStep > step.number ? 'bg-blue-500' : 'bg-gray-200'
                    }`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Step Indicator */}
          <div className="text-center text-sm text-gray-600">
            Step {state.currentStep} of {steps.length}
          </div>
        </div>
      </div>

      {/* Step Content */}
      <div className="container mx-auto px-4 py-12">
        <CurrentStepComponent />

        {/* Navigation Buttons */}
        <div className="max-w-6xl mx-auto mt-12 flex items-center justify-between gap-4">
          <button
            onClick={prevStep}
            disabled={state.currentStep === 1}
            className="px-6 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            ← Previous
          </button>

          <button
            onClick={saveDraft}
            disabled={state.isSaving}
            className="px-6 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 transition-all"
          >
            {state.isSaving ? 'Saving...' : '💾 Save Draft'}
          </button>

          {state.currentStep < 4 ? (
            <button
              onClick={nextStep}
              disabled={!canProceed()}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              Next →
            </button>
          ) : (
            <button
              onClick={deploy}
              disabled={state.isSaving || !canProceed()}
              className="px-8 py-3 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg"
            >
              {state.isSaving ? 'Deploying...' : '🚀 Deploy Site'}
            </button>
          )}
        </div>

        {/* Validation Message */}
        {!canProceed() && (
          <div className="max-w-6xl mx-auto mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              {state.currentStep === 1 && 'Please fill in the site name and slug to continue.'}
              {state.currentStep === 4 &&
                siteData.selectedBlocks.length === 0 &&
                'Please add at least one content block to your page.'}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default function BuilderPage() {
  return (
    <div className="col-span-12">
      <BuilderProvider>
        <BuilderContent />
      </BuilderProvider>
    </div>
  )
}
