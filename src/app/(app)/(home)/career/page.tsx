"use client"

import React, { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent } from '@/components/ui/card'
import { Briefcase, ChevronRight, MapPin, LucideIcon } from 'lucide-react'
import { benefits, jobs } from '@/constants'
import Link from 'next/link'

interface Job {
    id: string;
    title: string;
    department: string;
    type: string;
    location: string;
    posted: string;
    description: string;
    requirements: string[];
}

interface Benefit {
    icon: LucideIcon;
    title: string;
    description: string;
}

type JobType = 'all' | 'full-time' | 'part-time' | 'internship';
type Department = 'all' | 'engineering' | 'design' | 'marketing' | 'sales';

const CareersPage: React.FC = () => {
    const [selectedJobType, setSelectedJobType] = useState<JobType>("all");
    const [activeTab, setActiveTab] = useState<Department>("all");

    const jobTypeMap: Record<Exclude<JobType, 'all'>, Job['type']> = {
        "full-time": "Full-time",
        "part-time": "Part-time",
        "internship": "Internship"
    } as const;

    const filterJobs = (department: Department): Job[] => {
        let filteredJobs: Job[] = [...jobs];

        if (department !== "all") {
            const departmentMap: Record<Exclude<Department, 'all'>, Job['department']> = {
                "engineering": "Engineering",
                "design": "Design",
                "marketing": "Marketing",
                "sales": "Sales"
            };

            const targetDepartment = departmentMap[department];
            filteredJobs = filteredJobs.filter((job: Job) =>
                job.department === targetDepartment
            );
        }

        if (selectedJobType !== "all") {
            const targetType = jobTypeMap[selectedJobType];
            filteredJobs = filteredJobs.filter((job: Job) =>
                job.type === targetType
            );
        }

        return filteredJobs;
    };

    const JobCard: React.FC<{ job: Job }> = ({ job }) => (
        <Link href={`career/${job.id}`}>
            <Card className="bg-zinc-800/50 border-zinc-700 hover:bg-zinc-800/80 transition-all duration-200 cursor-pointer overflow-hidden group">
                <CardContent className="p-4 sm:p-6">
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                            <div className="flex-1 min-w-0">
                                <div className="flex flex-col xs:flex-row xs:items-center gap-2 mb-2">
                                    <Badge variant="outline" className="bg-zinc-700/50 text-zinc-300 border-zinc-600 w-fit">
                                        {job.department}
                                    </Badge>
                                    <span className="text-xs text-zinc-500">Posted {job.posted}</span>
                                </div>
                                <h3 className="text-lg sm:text-xl font-semibold mb-2 group-hover:text-blue-400 transition-colors break-words">
                                    {job.title}
                                </h3>
                                <p className="text-zinc-400 mb-3 text-sm sm:text-base">{job.description}</p>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {job.requirements.slice(0, 1).map((req: string, i: number) => (
                                <Badge key={i} variant="secondary" className="bg-zinc-700/50 text-xs overflow-hidden">
                                    {req}
                                </Badge>
                            ))}
                        </div>

                        <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-3 pt-2 border-t border-zinc-700/50">
                            <div className="flex flex-col xs:flex-row xs:items-center gap-2 xs:gap-4 text-sm text-zinc-400">
                                <div className="flex items-center gap-1">
                                    <MapPin className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                                    <span className="truncate">{job.location}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Briefcase className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                                    <span>{job.type}</span>
                                </div>
                            </div>
                            <div className="flex items-center text-blue-400 font-medium text-sm">
                                <span>View Position</span>
                                <ChevronRight className="h-4 w-4 ml-1" />
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </Link>
    );

    const EmptyState: React.FC<{ message: string }> = ({ message }) => (
        <div className="text-center py-12">
            <p className="text-zinc-400">{message}</p>
        </div>
    );

    const JobsList: React.FC<{ department: Department; emptyMessage: string }> = ({
        department,
        emptyMessage
    }) => {
        const filteredJobs = filterJobs(department);

        return (
            <div className="grid gap-4 sm:gap-6">
                {filteredJobs.length > 0 ? (
                    filteredJobs.map((job: Job) => (
                        <JobCard key={job.id} job={job} />
                    ))
                ) : (
                    <EmptyState message={emptyMessage} />
                )}
            </div>
        );
    };

    return (
        <div className="flex flex-col min-h-screen">
            <section className="relative py-16 sm:py-20 lg:py-24 overflow-hidden">
                <div className="container relative z-10 mx-auto px-2 sm:px-6">
                    <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
                        <div className="mb-6">
                            <Badge
                                variant="outline"
                                className="px-3 py-1 text-sm bg-zinc-800/50 backdrop-blur-sm border-zinc-700 text-zinc-300"
                            >
                                <span className="mr-2 bg-green-500 w-2 h-2 rounded-full inline-block" aria-hidden="true" />
                                We&apos;re hiring!
                            </Badge>
                        </div>

                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight">
                            Join Our Team and{" "}
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-500">
                                Make an Impact
                            </span>
                        </h1>

                        <p className="text-lg sm:text-xl text-zinc-400 mb-8 max-w-3xl leading-relaxed">
                            We&apos;re building the future of ecommerce platforms with a team of passionate, talented individuals. Join us on
                            our mission to transform how businesses operate.
                        </p>
                    </div>
                </div>
            </section>

            <section className="py-12 sm:py-16 lg:py-20 bg-zinc-900">
                <div className="container mx-auto px-2 sm:px-6">
                    <div className="max-w-4xl mx-auto text-center mb-8 sm:mb-12">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Open Positions</h2>
                        <p className="text-zinc-400 text-base sm:text-lg">Join our team and help us build the future of SaaS platforms.</p>
                    </div>

                    <div className="mb-8">
                        <Tabs value={activeTab} onValueChange={(value: string) => setActiveTab(value as Department)} className="w-full">
                            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4 mb-6">
                                <div className="w-full lg:w-auto overflow-x-auto">
                                    <TabsList className="bg-zinc-800/50 w-full lg:w-auto min-w-max">
                                        <TabsTrigger value="all" className="text-xs sm:text-sm">All Departments</TabsTrigger>
                                        <TabsTrigger value="engineering" className="text-xs sm:text-sm">Engineering</TabsTrigger>
                                        <TabsTrigger value="design" className="text-xs sm:text-sm">Design</TabsTrigger>
                                        <TabsTrigger value="marketing" className="text-xs sm:text-sm">Marketing</TabsTrigger>
                                        <TabsTrigger value="sales" className="text-xs sm:text-sm">Sales</TabsTrigger>
                                    </TabsList>
                                </div>

                                <div className="w-full sm:w-auto">
                                    <Select value={selectedJobType} onValueChange={(value: string) => setSelectedJobType(value as JobType)}>
                                        <SelectTrigger className="w-full sm:w-[180px] bg-zinc-800/50 border-zinc-700">
                                            <SelectValue placeholder="All Types" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-zinc-800 border-zinc-700">
                                            <SelectItem value="all">All Types</SelectItem>
                                            <SelectItem value="full-time">Full-time</SelectItem>
                                            <SelectItem value="part-time">Part-time</SelectItem>
                                            <SelectItem value="contract">Contract</SelectItem>
                                            <SelectItem value="internship">Internships</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <TabsContent value="all" className="mt-0">
                                <JobsList department="all" emptyMessage="No positions found matching your criteria." />
                            </TabsContent>

                            <TabsContent value="engineering" className="mt-0">
                                <JobsList department="engineering" emptyMessage="No engineering positions found matching your criteria." />
                            </TabsContent>

                            <TabsContent value="design" className="mt-0">
                                <JobsList department="design" emptyMessage="No design positions found matching your criteria." />
                            </TabsContent>

                            <TabsContent value="marketing" className="mt-0">
                                <JobsList department="marketing" emptyMessage="No marketing positions found matching your criteria." />
                            </TabsContent>

                            <TabsContent value="sales" className="mt-0">
                                <JobsList department="sales" emptyMessage="No sales positions found matching your criteria." />
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </section>

            <section className="py-12 sm:py-16 lg:py-20 border-t border-zinc-800">
                <div className="container mx-auto px-2 sm:px-6">
                    <div className="max-w-4xl mx-auto text-center mb-8 sm:mb-12">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Benefits & Perks</h2>
                        <p className="text-zinc-400 text-base sm:text-lg">We take care of our team with competitive compensation and great benefits.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                        {benefits.map((benefit: Benefit, index: number) => {
                            const IconComponent = benefit.icon;
                            return (
                                <Card
                                    key={index}
                                    className="bg-zinc-800/50 border-zinc-700 hover:bg-zinc-800/80 transition-all duration-200"
                                >
                                    <CardContent className="p-4 sm:p-6">
                                        <div className="flex items-start gap-3 sm:gap-4">
                                            <div className="p-2 sm:p-3 rounded-full bg-zinc-700/50 backdrop-blur-sm flex-shrink-0">
                                                <IconComponent className="h-4 w-4 sm:h-5 sm:w-5" />
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <h3 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2">{benefit.title}</h3>
                                                <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">{benefit.description}</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default CareersPage;