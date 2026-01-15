import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { SignInButton, SignUpButton } from '@clerk/nextjs'
import { Button } from "@/components/ui/button"
import { Link2, Zap, BarChart3, Shield } from 'lucide-react'

export default async function Home() {
  // Check authentication, but handle gracefully if Clerk isn't configured
  let userId: string | null = null
  try {
    const authResult = await auth()
    userId = authResult.userId
  } catch {
    // Clerk not configured - continue to show landing page
  }
  
  if (userId) {
    redirect('/dashboard')
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 to-black">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            Shorten Links, Amplify Your Reach
          </h1>
          <p className="text-xl md:text-2xl text-zinc-400 mb-8 max-w-2xl mx-auto">
            Create short, memorable links in seconds. Track performance, manage campaigns, and share with confidence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <SignUpButton mode="modal">
              <Button size="lg" className="w-full sm:w-auto text-lg px-8">
                Get Started Free
              </Button>
            </SignUpButton>
            <SignInButton mode="modal">
              <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg px-8">
                Sign In
              </Button>
            </SignInButton>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
            Everything You Need in a Link Shortener
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 hover:border-zinc-700 transition-colors">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                <Link2 className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Quick & Easy
              </h3>
              <p className="text-zinc-400">
                Create shortened links instantly with our simple interface. No hassle, just paste and go.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 hover:border-zinc-700 transition-colors">
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Lightning Fast
              </h3>
              <p className="text-zinc-400">
                Blazing fast redirects powered by modern infrastructure. Your links work instantly, every time.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 hover:border-zinc-700 transition-colors">
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-4">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Analytics & Insights
              </h3>
              <p className="text-zinc-400">
                Track clicks, measure engagement, and understand your audience with detailed analytics.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 hover:border-zinc-700 transition-colors">
              <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Secure & Reliable
              </h3>
              <p className="text-zinc-400">
                Your links are protected with enterprise-grade security. Always available, always reliable.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of users who trust our platform for their link shortening needs.
          </p>
          <SignUpButton mode="modal">
            <Button size="lg" variant="secondary" className="text-lg px-8">
              Create Your Account
            </Button>
          </SignUpButton>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 border-t border-zinc-800">
        <div className="text-center text-zinc-500">
          <p>&copy; 2026 Link Shortener. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
