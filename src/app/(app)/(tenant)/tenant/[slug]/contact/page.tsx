import { Mail, MapPin, Phone, Send, Clock } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export default function ContactPage() {
    return (
        <div className="bg-gradient-to-b from-stone-50 to-white">
            <section className="relative py-16 md:py-24 overflow-hidden">
                <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover bg-center opacity-10"></div>

                <div className="absolute top-20 left-10 w-32 h-32 bg-amber-200/30 rounded-full blur-xl animate-pulse"></div>
                <div className="absolute bottom-32 right-16 w-24 h-24 bg-orange-200/40 rounded-full blur-lg animate-pulse delay-1000"></div>

                <div className="container relative px-4 md:px-6 mx-auto">
                    <div className="mx-auto max-w-3xl text-center">
                        <h1 className="mb-6 text-4xl font-bold tracking-tight text-stone-900 md:text-5xl">Get in Touch</h1>
                        <p className="mb-8 text-xl text-stone-600 leading-relaxed">
                            We&apos;d love to hear from you. Whether you have a question about our products, need help with an order, or
                            just want to say hello.
                        </p>
                    </div>
                </div>
            </section>

            <div className="container px-4 pb-16 md:px-6 md:pb-24 mx-auto">
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
                    <div>
                        <div className="rounded-2xl border border-stone-200 bg-white p-8 shadow-sm">
                            <h2 className="mb-6 text-2xl font-bold text-stone-900">Send us a Message</h2>

                            <form className="space-y-6">
                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="first-name" className="text-stone-900">
                                            First Name
                                        </Label>
                                        <Input
                                            id="first-name"
                                            placeholder="Enter your first name"
                                            className="rounded-lg border-stone-300 focus:border-amber-500"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="last-name" className="text-stone-900">
                                            Last Name
                                        </Label>
                                        <Input
                                            id="last-name"
                                            placeholder="Enter your last name"
                                            className="rounded-lg border-stone-300 focus:border-amber-500"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email" className="text-stone-900">
                                        Email
                                    </Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="Enter your email"
                                        className="rounded-lg border-stone-300 focus:border-amber-500"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="subject" className="text-stone-900">
                                        Subject
                                    </Label>
                                    <Input
                                        id="subject"
                                        placeholder="Enter the subject"
                                        className="rounded-lg border-stone-300 focus:border-amber-500"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="message" className="text-stone-900">
                                        Message
                                    </Label>
                                    <Textarea
                                        id="message"
                                        placeholder="Enter your message"
                                        rows={5}
                                        className="rounded-lg border-stone-300 focus:border-amber-500"
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full bg-stone-900 hover:bg-amber-600 text-white rounded-full py-6 transition-all duration-300 transform hover:scale-105"
                                >
                                    <Send className="h-4 w-4 mr-2" />
                                    Send Message
                                </Button>
                            </form>
                        </div>
                    </div>

                    <div className="space-y-8">
                        <div className="rounded-2xl border border-stone-200 bg-white p-8 shadow-sm">
                            <h2 className="mb-6 text-2xl font-bold text-stone-900">Contact Information</h2>

                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="rounded-full bg-amber-100 p-3">
                                        <Mail className="h-6 w-6 text-amber-600" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-stone-900">Email</p>
                                        <a
                                            href="mailto:hello@minima-store.com"
                                            className="text-stone-600 hover:text-amber-600 transition-colors"
                                        >
                                            hello@minima-store.com
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="rounded-full bg-amber-100 p-3">
                                        <Phone className="h-6 w-6 text-amber-600" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-stone-900">Phone</p>
                                        <a href="tel:+15551234567" className="text-stone-600 hover:text-amber-600 transition-colors">
                                            +1 (555) 123-4567
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="rounded-full bg-amber-100 p-3">
                                        <MapPin className="h-6 w-6 text-amber-600" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-stone-900">Address</p>
                                        <address className="not-italic text-stone-600">
                                            123 Design Street
                                            <br />
                                            San Francisco, CA 94103
                                            <br />
                                            United States
                                        </address>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-2xl border border-stone-200 bg-gradient-to-br from-amber-50 to-orange-50 p-8">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="rounded-full bg-amber-100 p-2">
                                    <Clock className="h-5 w-5 text-amber-600" />
                                </div>
                                <h2 className="text-xl font-bold text-stone-900">Store Hours</h2>
                            </div>

                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="font-medium text-stone-900">Monday - Friday</span>
                                    <span className="text-stone-600">9:00 AM - 6:00 PM</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-medium text-stone-900">Saturday</span>
                                    <span className="text-stone-600">10:00 AM - 5:00 PM</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-medium text-stone-900">Sunday</span>
                                    <span className="text-stone-600">Closed</span>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}
