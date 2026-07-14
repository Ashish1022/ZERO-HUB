"use client"

import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Mail } from 'lucide-react'

import { Github, Linkedin, Twitter } from '@/components/brand-icons'
import { stats, team } from '@/constants'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const AboutPage = () => {

    return (
        <div className='min-h-screen'>
            <section className="relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.1),transparent_50%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(168,85,247,0.1),transparent_50%)]" />
                <div className="container relative py-24 lg:py-32 mx-auto px-2 md:px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="mx-auto max-w-4xl text-center"
                    >
                        <motion.div
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="mb-8"
                        >
                            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
                                Building the{" "}
                                <span className="bg-linear-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                                    Future
                                </span>{" "}
                                of Work
                            </h1>
                        </motion.div>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="mx-auto max-w-2xl text-md text-zinc-400 leading-relaxed text-justify"
                        >
                            We&apos;re on a mission to empower businesses worldwide with intelligent automation and seamless workflows that
                            drive growth and innovation.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                            className="mt-12 flex flex-wrap justify-center gap-8"
                        >
                            {stats.map((stat, index) => (
                                <motion.div
                                    key={stat.label}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                                    className="text-center"
                                >
                                    <div className="flex items-center justify-center mb-2">
                                        <stat.icon className="h-6 w-6 text-blue-400 mr-2" />
                                        <div className="text-3xl font-bold text-white">{stat.value}</div>
                                    </div>
                                    <div className="text-sm text-zinc-400">{stat.label}</div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>
            </section>
            <section className="py-24 bg-gradient-to-b from-zinc-950 to-zinc-900 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(120,119,198,0.05),transparent_50%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(168,85,247,0.05),transparent_50%)]" />

                <div className="container relative mx-auto px-2 md:px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center mb-20"
                    >
                        <h2 className="text-3xl font-bold text-white sm:text-4xl mb-4">Meet Our Team</h2>
                        <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
                            The passionate people behind ZERO | HUB who make innovation possible every day
                        </p>
                    </motion.div>

                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 container mx-auto">
                        {team.map((member, index) => (
                            <motion.div
                                key={member.name}
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ duration: 0.8, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="group"
                            >
                                <Card className="bg-gradient-to-br from-zinc-900/90 to-zinc-800/50 border-zinc-700/50 hover:border-zinc-600/50 transition-all duration-500 overflow-hidden backdrop-blur-sm h-full">
                                    <CardContent className="p-0">
                                        <div className="relative overflow-hidden">
                                            <motion.div
                                                whileHover={{ scale: 1.1 }}
                                                transition={{ duration: 0.6, ease: "easeOut" }}
                                                className="relative"
                                            >
                                                <Image
                                                    src={member.image || "/placeholder.png"}
                                                    alt={member.name}
                                                    className="h-80 w-full object-center"
                                                    width={360}
                                                    height={360}
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/90 via-zinc-900/20 to-transparent" />

                                                <div
                                                    className="absolute bottom-4 left-4 right-4 flex justify-center gap-3"
                                                >
                                                    {member.social.linkedin && (
                                                        <motion.a
                                                            whileHover={{ scale: 1.2, rotate: 5 }}
                                                            whileTap={{ scale: 0.9 }}
                                                            href={member.social.linkedin}
                                                            className="p-2 bg-zinc-900/80 backdrop-blur-sm rounded-full text-zinc-400 hover:text-blue-400 hover:bg-blue-500/20 transition-all duration-300 border border-zinc-700/50"
                                                        >
                                                            <Linkedin className="h-4 w-4" />
                                                        </motion.a>
                                                    )}
                                                    {member.social.twitter && (
                                                        <motion.a
                                                            whileHover={{ scale: 1.2, rotate: -5 }}
                                                            whileTap={{ scale: 0.9 }}
                                                            href={member.social.twitter}
                                                            className="p-2 bg-zinc-900/80 backdrop-blur-sm rounded-full text-zinc-400 hover:text-blue-400 hover:bg-blue-500/20 transition-all duration-300 border border-zinc-700/50"
                                                        >
                                                            <Twitter className="h-4 w-4" />
                                                        </motion.a>
                                                    )}
                                                    {member.social.github && (
                                                        <motion.a
                                                            whileHover={{ scale: 1.2, rotate: 5 }}
                                                            whileTap={{ scale: 0.9 }}
                                                            href={member.social.github}
                                                            className="p-2 bg-zinc-900/80 backdrop-blur-sm rounded-full text-zinc-400 hover:text-blue-400 hover:bg-blue-500/20 transition-all duration-300 border border-zinc-700/50"
                                                        >
                                                            <Github className="h-4 w-4" />
                                                        </motion.a>
                                                    )}
                                                    {member.social.email && (
                                                        <motion.a
                                                            whileHover={{ scale: 1.2, rotate: -5 }}
                                                            whileTap={{ scale: 0.9 }}
                                                            href={`mailto:${member.social.email}`}
                                                            className="p-2 bg-zinc-900/80 backdrop-blur-sm rounded-full text-zinc-400 hover:text-blue-400 hover:bg-blue-500/20 transition-all duration-300 border border-zinc-700/50"
                                                        >
                                                            <Mail className="h-4 w-4" />
                                                        </motion.a>
                                                    )}
                                                </div>
                                            </motion.div>
                                        </div>

                                        <div className="p-8">
                                            <div className="text-center mb-6">
                                                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors duration-300">
                                                    {member.name}
                                                </h3>
                                                <div className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full border border-blue-500/30">
                                                    <span className="text-blue-400 font-medium text-sm">{member.role}</span>
                                                </div>
                                            </div>

                                            <div className="mt-6 mx-auto h-1 w-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-60 group-hover:opacity-100 group-hover:w-24 transition-all duration-500" />
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
            <section className="py-24 bg-gradient-to-r from-blue-900/20 via-purple-900/20 to-pink-900/20">
                <div className="container mx-auto px-2 md:px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="mx-auto max-w-4xl text-center"
                    >
                        <h2 className="text-3xl font-bold text-white sm:text-4xl mb-4">Join Our Journey</h2>
                        <p className="text-xl text-zinc-400 mb-8">
                            Ready to be part of the future of work? We&apos;re always looking for talented individuals who share our
                            passion for innovation.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Button
                                    size="lg"
                                    className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0"
                                    asChild
                                >
                                    <Link href={'/career'}>
                                        View Open Positions
                                    </Link>
                                </Button>
                            </motion.div>

                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white"
                                    asChild
                                >
                                    <Link href={'/contact'}>
                                        Contact Us
                                    </Link>
                                </Button>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    )
}

export default AboutPage