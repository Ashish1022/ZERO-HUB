import Link from 'next/link'
import React from 'react'
import { Briefcase, Building, Calendar, CheckCircle, ChevronRight,  Globe, MapPin, Users } from 'lucide-react'

import { jobs } from '@/constants'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { JobForm } from './_components/job-form'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'

interface Props {
    params: Promise<{ id: string }>
}

const Page = async ({ params }: Props) => {

    const { id } = await params

    const job = jobs.find((j) => j.id === id);
    const relatedJobs = jobs.filter((j) => job?.relatedPositions.includes(j.id))

    return (
        <div className="flex flex-col min-h-screen">
            <section className="relative py-20 overflow-hidden border-b border-zinc-800">
                <div className="absolute inset-0  z-0" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-800/40 via-zinc-900/60 to-zinc-900/80 z-0" />
                <div className="container relative z-10 mx-auto px-2 sm:px-6">
                    <div className="flex flex-col max-w-4xl mx-auto">
                        <div className="mb-6">
                            <Link
                                href="/career"
                                className="inline-flex items-center text-sm text-zinc-400 hover:text-zinc-300 transition-colors"
                            >
                                <ChevronRight className="h-4 w-4 mr-1 rotate-180" />
                                Back to all positions
                            </Link>
                        </div>
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                            <div>
                                <div className="flex items-center gap-2 mb-2">
                                    <Badge variant="outline" className="bg-zinc-700/50 text-zinc-300 border-zinc-600">
                                        {job?.department}
                                    </Badge>
                                </div>
                                <h1 className="text-3xl md:text-4xl font-bold mb-2">{job?.title}</h1>
                                <p className="text-zinc-400">{job?.description}</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-full bg-zinc-800/80">
                                    <MapPin className="h-5 w-5 text-blue-400" />
                                </div>
                                <div>
                                    <p className="text-sm text-zinc-500">Location</p>
                                    <p className="font-medium">{job?.location}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-full bg-zinc-800/80">
                                    <Briefcase className="h-5 w-5 text-purple-400" />
                                </div>
                                <div>
                                    <p className="text-sm text-zinc-500">Employment Type</p>
                                    <p className="font-medium">{job?.type}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="py-12 bg-zinc-900">
                <div className="container mx-auto px-2 sm:px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                        <div className="lg:col-span-2">
                            <div className="mb-10">
                                <h2 className="text-2xl font-bold mb-4">About the Role</h2>
                                <p className="text-zinc-400 mb-6">{job?.about}</p>

                                <h3 className="text-xl font-semibold mb-3">Responsibilities</h3>
                                <ul className="space-y-2 mb-6">
                                    {job?.responsibilities.map((item, index) => (
                                        <li key={index} className="flex items-start gap-2">
                                            <CheckCircle className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                                            <span className="text-zinc-300">{item}</span>
                                        </li>
                                    ))}
                                </ul>

                                <h3 className="text-xl font-semibold mb-3">Requirements</h3>
                                <ul className="space-y-2 mb-6">
                                    {job?.requirements.map((item, index) => (
                                        <li key={index} className="flex items-start gap-2">
                                            <CheckCircle className="h-5 w-5 text-purple-400 mt-0.5 flex-shrink-0" />
                                            <span className="text-zinc-300">{item}</span>
                                        </li>
                                    ))}
                                </ul>

                                <h3 className="text-xl font-semibold mb-3">Nice to Have</h3>
                                <ul className="space-y-2 mb-6">
                                    {job?.niceToHave.map((item, index) => (
                                        <li key={index} className="flex items-start gap-2">
                                            <CheckCircle className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                                            <span className="text-zinc-300">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="mb-10">
                                <h2 className="text-2xl font-bold mb-4">About the Team</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 rounded-full bg-zinc-800/80">
                                            <Users className="h-5 w-5 text-blue-400" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-zinc-500">Team Size</p>
                                            <p className="font-medium">{job?.teamSize}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 rounded-full bg-zinc-800/80">
                                            <Building className="h-5 w-5 text-purple-400" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-zinc-500">Reports To</p>
                                            <p className="font-medium">{job?.manager}</p>
                                        </div>
                                    </div>
                                </div>
                                <p className="text-zinc-400">
                                    You&apos;ll be joining a collaborative team of talented professionals who are passionate about building
                                    great products. We value open communication, continuous learning, and a healthy work-life balance.
                                </p>
                            </div>
                            <div className="mb-10">
                                <h2 className="text-2xl font-bold mb-4">Our Hiring Process</h2>
                                <ol className="relative border-l border-zinc-700 ml-3 space-y-6">
                                    <li className="mb-6 ml-6">
                                        <span className="absolute flex items-center justify-center w-6 h-6 bg-zinc-800 rounded-full -left-3 ring-8 ring-zinc-900">
                                            <span className="text-xs font-medium text-zinc-300">1</span>
                                        </span>
                                        <h3 className="font-semibold text-lg">Application Review</h3>
                                        <p className="text-zinc-400">
                                            Our hiring team will review your application and get back to you within 1 week.
                                        </p>
                                    </li>
                                    <li className="mb-6 ml-6">
                                        <span className="absolute flex items-center justify-center w-6 h-6 bg-zinc-800 rounded-full -left-3 ring-8 ring-zinc-900">
                                            <span className="text-xs font-medium text-zinc-300">2</span>
                                        </span>
                                        <h3 className="font-semibold text-lg">Initial Interview</h3>
                                        <p className="text-zinc-400">
                                            A 30-minute video call with a hiring manager to discuss your experience and the role.
                                        </p>
                                    </li>
                                    <li className="mb-6 ml-6">
                                        <span className="absolute flex items-center justify-center w-6 h-6 bg-zinc-800 rounded-full -left-3 ring-8 ring-zinc-900">
                                            <span className="text-xs font-medium text-zinc-300">3</span>
                                        </span>
                                        <h3 className="font-semibold text-lg">Technical Assessment</h3>
                                        <p className="text-zinc-400">
                                            A take-home assignment or live coding session, depending on the role.
                                        </p>
                                    </li>
                                    <li className="mb-6 ml-6">
                                        <span className="absolute flex items-center justify-center w-6 h-6 bg-zinc-800 rounded-full -left-3 ring-8 ring-zinc-900">
                                            <span className="text-xs font-medium text-zinc-300">4</span>
                                        </span>
                                        <h3 className="font-semibold text-lg">Team Interviews</h3>
                                        <p className="text-zinc-400">
                                            Meet with 3-4 team members to dive deeper into your experience and fit.
                                        </p>
                                    </li>
                                    <li className="ml-6">
                                        <span className="absolute flex items-center justify-center w-6 h-6 bg-zinc-800 rounded-full -left-3 ring-8 ring-zinc-900">
                                            <span className="text-xs font-medium text-zinc-300">5</span>
                                        </span>
                                        <h3 className="font-semibold text-lg">Offer</h3>
                                        <p className="text-zinc-400">
                                            If all goes well, we&apos;ll extend an offer within a week of your final interview.
                                        </p>
                                    </li>
                                </ol>
                            </div>
                        </div>
                        <div className="lg:col-span-1">
                            <div className="sticky top-8">
                                <Card className="bg-zinc-800/50 border-zinc-700 mb-6">
                                    <CardContent className="p-6">
                                        <h3 className="text-xl font-bold mb-4">Apply for this Position</h3>
                                        <JobForm />
                                    </CardContent>
                                </Card>
                                <Card className="bg-zinc-800/50 border-zinc-700">
                                    <CardContent className="p-6">
                                        <h3 className="text-lg font-semibold mb-4">Job Details</h3>
                                        <div className="space-y-3">
                                            <div className="flex items-center gap-2">
                                                <Calendar className="h-4 w-4 text-zinc-500" />
                                                <span className="text-sm text-zinc-400">Posted on {job?.posted}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Globe className="h-4 w-4 text-zinc-500" />
                                                <span className="text-sm text-zinc-400">Applications accepted worldwide</span>
                                            </div>
                                            <Separator className="my-4 bg-zinc-700" />
                                            <div>
                                                <h4 className="text-sm font-medium mb-2">Share this job</h4>
                                                <div className="flex gap-2">
                                                    <Button variant="outline" size="icon" className="h-8 w-8">
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="16"
                                                            height="16"
                                                            viewBox="0 0 24 24"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            strokeWidth="2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            className="lucide lucide-linkedin"
                                                        >
                                                            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                                                            <rect width="4" height="12" x="2" y="9" />
                                                            <circle cx="4" cy="4" r="2" />
                                                        </svg>
                                                    </Button>
                                                    <Button variant="outline" size="icon" className="h-8 w-8">
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="16"
                                                            height="16"
                                                            viewBox="0 0 24 24"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            strokeWidth="2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            className="lucide lucide-twitter"
                                                        >
                                                            <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                                                        </svg>
                                                    </Button>
                                                    <Button variant="outline" size="icon" className="h-8 w-8">
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="16"
                                                            height="16"
                                                            viewBox="0 0 24 24"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            strokeWidth="2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            className="lucide lucide-mail"
                                                        >
                                                            <rect width="20" height="16" x="2" y="4" rx="2" />
                                                            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                                                        </svg>
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {relatedJobs.length > 0 && (
                <section className="py-12 bg-zinc-900/50 border-t border-zinc-800">
                    <div className="container mx-auto px-4 sm:px-6">
                        <div className="max-w-7xl mx-auto">
                            <h2 className="text-2xl font-bold mb-6">Related Positions</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {relatedJobs.map((relatedJob) => (
                                    <Link href={`/career/${relatedJob.id}`} key={relatedJob.id}>
                                        <Card className="bg-zinc-800/50 border-zinc-700 hover:bg-zinc-800/80 transition-all duration-200 h-full">
                                            <CardContent className="p-6">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <Badge variant="outline" className="bg-zinc-700/50 text-zinc-300 border-zinc-600">
                                                        {relatedJob.department}
                                                    </Badge>
                                                </div>
                                                <h3 className="text-lg font-semibold mb-2">{relatedJob.title}</h3>
                                                <p className="text-zinc-400 mb-4 text-sm">{relatedJob.description}</p>
                                                <div className="flex flex-wrap gap-4 text-sm text-zinc-500">
                                                    <div className="flex items-center gap-1">
                                                        <MapPin className="h-4 w-4" />
                                                        <span>{relatedJob.location}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <Briefcase className="h-4 w-4" />
                                                        <span>{relatedJob.type}</span>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            )}
        </div>
    )
}

export default Page