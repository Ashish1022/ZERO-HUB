"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { ContactForm } from './_components/contact-form'
import { Clock, MapPin } from 'lucide-react'
import { supportOptions } from '@/constants'

const ContactPage = () => {
    return (
        <div className="min-h-screen relative">
            <section className="relative py-24 md:py-32">
                <div className="container relative z-10 mx-auto px-2 md:px-6">
                    <motion.div
                        className="text-center max-w-4xl mx-auto mb-16"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 flex items-center justify-center">
                            <span className="bg-linear-to-r from-white via-white to-zinc-400 bg-clip-text text-transparent">
                                Get in
                            </span>
                            <br />
                            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                                Touch
                            </span>
                        </h1>
                        <p className="text-xl text-zinc-400 leading-relaxed">
                            Have questions? Need support? Want to discuss a custom solution?
                            <span className="text-white font-medium"> We&apos;re here to help.</span>
                        </p>
                    </motion.div>
                </div>
            </section>
            <section className="py-16 bg-zinc-950">
                <div className="container mx-auto px-2 md:px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
                            <h2 className="text-3xl font-bold text-white mb-6">Send us a message</h2>
                            <p className="text-zinc-400 mb-8">
                                Fill out the form below and we&apos;ll get back to you as soon as possible.
                            </p>
                            <ContactForm />
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <h2 className="text-3xl font-bold text-white mb-6">Support Options</h2>
                            <p className="text-zinc-400 mb-8">Choose the best way to get help based on your needs.</p>

                            <div className="space-y-6 mb-12">
                                {supportOptions.map((option) => (
                                    <div
                                        key={option.title}
                                        className="bg-gradient-to-br from-zinc-900/60 to-zinc-900/30 border border-zinc-800/50 rounded-xl p-6 backdrop-blur-sm"
                                    >
                                        <div className="flex items-start gap-4">
                                            <div className="text-blue-400 mt-1">
                                                <option.icon className='h-4 w-4' />
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="font-semibold text-white mb-2">{option.title}</h3>
                                                <p className="text-zinc-400 text-sm mb-3">{option.description}</p>
                                                <div className="flex items-center gap-2">
                                                    <Clock className="h-4 w-4 text-zinc-500" />
                                                    <span className="text-zinc-500 text-sm">{option.availability}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="bg-gradient-to-br from-zinc-900/60 to-zinc-900/30 border border-zinc-800/50 rounded-xl p-6 backdrop-blur-sm">
                                <h3 className="font-semibold text-white mb-4 flex items-center">
                                    <MapPin className="h-5 w-5 mr-2 text-blue-400" />
                                    Our Office
                                </h3>
                                <div className="text-zinc-400 space-y-1">
                                    <p>123 Innovation Drive</p>
                                    <p>San Francisco, CA 94105</p>
                                    <p>United States</p>
                                </div>
                                <div className="mt-4 pt-4 border-t border-zinc-800">
                                    <p className="text-sm text-zinc-500">Office hours: Monday - Friday, 9:00 AM - 6:00 PM PST</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default ContactPage