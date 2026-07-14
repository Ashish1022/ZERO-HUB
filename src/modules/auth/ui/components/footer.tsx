import Link from "next/link"

export const Footer = () => {
    return (
        <footer className="border-t border-zinc-800 py-6 backdrop-blur-sm mt-12">
            <div className="container mx-auto px-2 md:px-6">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="text-zinc-400 text-sm mb-4 md:mb-0">© 2025 ZERO | HUB. All rights reserved.</div>
                    <div className="flex space-x-6 text-zinc-400 text-sm">
                        <Link href="#" className="hover:text-white transition-colors">
                            Terms
                        </Link>
                        <Link href="#" className="hover:text-white transition-colors">
                            Privacy
                        </Link>
                        <Link href="#" className="hover:text-white transition-colors">
                            Security
                        </Link>
                        <Link href="#" className="hover:text-white transition-colors">
                            Contact
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}