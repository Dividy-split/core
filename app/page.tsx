import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-zinc-100 dark:from-zinc-950 dark:to-zinc-900">
      {/* Header */}
      <header className="border-b bg-white/50 backdrop-blur-sm dark:bg-zinc-950/50">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="text-xl font-bold">YourBrand</div>
          <nav className="flex gap-6">
            <a href="#features" className="text-sm font-medium hover:underline">
              Features
            </a>
            <a href="#about" className="text-sm font-medium hover:underline">
              About
            </a>
            <a href="#contact" className="text-sm font-medium hover:underline">
              Contact
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-24 text-center">
        <Badge className="mb-4">New Release</Badge>
        <h1 className="mb-6 text-5xl font-bold tracking-tight md:text-6xl">
          Welcome to Your
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {" "}
            Amazing Platform
          </span>
        </h1>
        <p className="mx-auto mb-8 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
          Build faster, scale better, and deliver exceptional experiences with
          our cutting-edge platform. Get started today and transform the way you
          work.
        </p>
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Button size="lg" className="text-base">
            Get Started
          </Button>
          <Button size="lg" variant="outline" className="text-base">
            Learn More
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4 py-16">
        <h2 className="mb-12 text-center text-3xl font-bold">Key Features</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Fast & Reliable</CardTitle>
              <CardDescription>
                Lightning-fast performance with 99.9% uptime
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Our infrastructure is built to handle millions of requests with
                minimal latency and maximum reliability.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Easy to Use</CardTitle>
              <CardDescription>
                Intuitive interface designed for everyone
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Get up and running in minutes with our simple setup process and
                comprehensive documentation.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Secure by Default</CardTitle>
              <CardDescription>
                Enterprise-grade security built-in
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Your data is protected with industry-standard encryption and
                regular security audits.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Scalable</CardTitle>
              <CardDescription>Grows with your business needs</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                From startups to enterprises, our platform scales seamlessly to
                match your growth trajectory.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>24/7 Support</CardTitle>
              <CardDescription>We're here whenever you need us</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Our dedicated support team is available around the clock to help
                you succeed.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Analytics</CardTitle>
              <CardDescription>Insights that drive decisions</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Powerful analytics and reporting tools to help you understand
                and optimize your performance.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl">Ready to Get Started?</CardTitle>
            <CardDescription className="text-zinc-100">
              Join thousands of users who are already transforming their
              workflow
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Button size="lg" variant="secondary" className="text-base">
              Start Free Trial
            </Button>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white dark:bg-zinc-950">
        <div className="container mx-auto px-4 py-8">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <h3 className="mb-4 font-semibold">Product</h3>
              <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
                <li>
                  <a href="#" className="hover:underline">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Security
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 font-semibold">Company</h3>
              <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
                <li>
                  <a href="#" className="hover:underline">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Careers
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 font-semibold">Resources</h3>
              <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
                <li>
                  <a href="#" className="hover:underline">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Community
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 font-semibold">Legal</h3>
              <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
                <li>
                  <a href="#" className="hover:underline">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Terms
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Cookie Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t pt-8 text-center text-sm text-zinc-600 dark:text-zinc-400">
            © 2024 YourBrand. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
