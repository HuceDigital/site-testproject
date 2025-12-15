import Link from 'next/link'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <section className="col-span-12 pt-20 pb-32">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Build Your Website in Minutes
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Create stunning websites with our intuitive drag-and-drop builder. Choose from dozens
            of pre-built components, customize to your heart's content, and deploy instantly to Vercel.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/builder"
              className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg"
            >
              Start Building
            </Link>
            <Link
              href="/admin"
              className="px-8 py-4 bg-white text-blue-600 border-2 border-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-semibold text-lg"
            >
              Login
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="col-span-12 py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">Why Choose Velen?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">🎨</div>
              <h3 className="text-xl font-semibold mb-3">Beautiful Components</h3>
              <p className="text-gray-600">
                Choose from 20+ professionally designed components. Headers, heroes, CTAs, features,
                and more - all fully customizable.
              </p>
            </div>

            <div className="p-8 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold mb-3">Lightning Fast</h3>
              <p className="text-gray-600">
                Built on Next.js and deployed to Vercel's edge network. Your sites load in
                milliseconds, anywhere in the world.
              </p>
            </div>

            <div className="p-8 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="text-xl font-semibold mb-3">One-Click Deploy</h3>
              <p className="text-gray-600">
                Hit deploy and watch your site go live. We handle GitHub repo creation, Vercel
                deployment, and everything in between.
              </p>
            </div>

            <div className="p-8 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-semibold mb-3">Full CMS Power</h3>
              <p className="text-gray-600">
                Every site gets its own Payload CMS instance. Manage content, users, and pages with
                a powerful admin panel.
              </p>
            </div>

            <div className="p-8 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">🎨</div>
              <h3 className="text-xl font-semibold mb-3">Custom Theming</h3>
              <p className="text-gray-600">
                Pick your colors, fonts, and styles. Every site is unique and matches your brand
                perfectly.
              </p>
            </div>

            <div className="p-8 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">📱</div>
              <h3 className="text-xl font-semibold mb-3">Mobile Responsive</h3>
              <p className="text-gray-600">
                All components are fully responsive. Your sites look amazing on desktop, tablet, and
                mobile devices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="col-span-12 py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">How It Works</h2>
          <div className="max-w-3xl mx-auto space-y-12">
            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                1
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Sign Up & Configure</h3>
                <p className="text-gray-600">
                  Create your account and enter the builder. Choose your site name, colors, and
                  fonts in just a few clicks.
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                2
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Select Components</h3>
                <p className="text-gray-600">
                  Browse our component library and add blocks to your page. Heroes, CTAs, features,
                  FAQs - drag and drop to build your perfect site.
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                3
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Customize Everything</h3>
                <p className="text-gray-600">
                  Adjust text, colors, images, and layouts. See your changes in real-time as you
                  build.
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                4
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Deploy & Launch</h3>
                <p className="text-gray-600">
                  Hit the deploy button. We create your GitHub repo, configure Vercel, and launch
                  your site. All in under 2 minutes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="col-span-12 py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Build Something Amazing?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of creators who trust Velen to bring their ideas to life.
          </p>
          <Link
            href="/builder"
            className="inline-block px-8 py-4 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-semibold text-lg"
          >
            Get Started Free
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="col-span-12 py-8 bg-gray-900 text-gray-400 text-center">
        <div className="container mx-auto px-4">
          <p>© 2025 Velen. Built with Payload CMS and Next.js.</p>
          <div className="mt-4 space-x-6">
            <Link href="/dashboard" className="hover:text-white transition-colors">
              Dashboard
            </Link>
            <Link href="/admin" className="hover:text-white transition-colors">
              Admin Panel
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
