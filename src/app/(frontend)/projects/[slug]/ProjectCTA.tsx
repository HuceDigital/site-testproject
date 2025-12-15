import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export const ProjectCTA: React.FC = () => {
  // This is a simplified CTA component for the project page

  return (
    <div className="mt-16 mb-8 bg-white">
      <div className="container ">
        <div className=" p-4 flex flex-col gap-6">
          <div className="text-5xl font-sans flex items-center">
            <h2>Overtuigd? </h2>
          </div>
          <p className="text-xl">Neem gerust contact met ons op voor een vrijblijvende afspraak.</p>
          <div className="flex flex-col gap-8">
            <Link href="/contact">
              <Button>Neem contact op</Button>
            </Link>
          </div>
        </div>
      </div>
      <div className="container mt-8"></div>
    </div>
  )
}
