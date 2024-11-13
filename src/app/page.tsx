import Link from "next/link";
import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { ClipboardList, FlaskConical, LineChart, Users } from "lucide-react";

export default function Home() {
  return (
    <main className="flex-1">
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
        <div className="container px-4 md:px-6 ">
          <div className="flex flex-col items-center space-y-4 text-center ">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none ">
                Welcome to Your Lab Management System
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                Streamline your lab operations, manage samples efficiently, and
                analyze results with ease.
              </p>
            </div>
            <div className="space-x-4">
              <Button asChild>
                <Link href="/">Manage Samples</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/">Explore Features</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32 flex items-center justify-center">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
            Key Features
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FlaskConical className="h-6 w-6" />
                  <span>Sample Management</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Efficiently track and manage all your lab samples in one
                  place.
                </CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <ClipboardList className="h-6 w-6" />
                  <span>Test Procedures</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Standardize and document your lab&apos;s testing procedures
                  for consistency.
                </CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <LineChart className="h-6 w-6" />
                  <span>Result Analysis</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Analyze and visualize test results with powerful built-in
                  tools.
                </CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-6 w-6" />
                  <span>Team Collaboration</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Facilitate seamless communication and data sharing among lab
                  members.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Ready to Optimize Your Lab Operations?
              </h2>
              <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                Start managing your samples, streamlining processes, and
                improving collaboration today.
              </p>
            </div>
            <Button asChild size="lg">
              <Link href="/">Get Started Now</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
