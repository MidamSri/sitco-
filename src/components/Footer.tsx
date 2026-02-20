import Link from 'next/link';

const footerLinks = [
    { href: '/', label: 'Home' },
    { href: '/products', label: 'Products' },
    { href: '/capabilities', label: 'Capabilities' },
    { href: '/contact', label: 'Contact' },
    { href: '/request-quote', label: 'Request Quote' },
];

export default function Footer() {
    return (
        <footer className="bg-charcoal border-t border-white/5">
            {/* Large text section */}
            <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
                <p className="text-4xl md:text-5xl lg:text-6xl font-bold text-white/30 tracking-tighter leading-tight select-none">
                    Manufacturing
                    <br />
                    Excellence.
                </p>
            </div>

            <div className="border-t border-white/5">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {/* Brand */}
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center font-bold text-charcoal text-lg">
                                    S
                                </div>
                                <div>
                                    <span className="font-bold text-lg text-white tracking-tight">SITCO</span>
                                    <span className="block text-[10px] tracking-[0.2em] uppercase text-white/30">
                                        Transformer Radiators
                                    </span>
                                </div>
                            </div>
                            <p className="text-sm leading-relaxed text-white/25 max-w-xs mt-4">
                                Precision manufacturing of high-performance transformer radiators from Vadodara, Gujarat.
                            </p>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h3 className="font-bold text-white/50 text-xs uppercase tracking-[0.2em] mb-5">Navigation</h3>
                            <ul className="space-y-3">
                                {footerLinks.map((link) => (
                                    <li key={link.href}>
                                        <Link
                                            href={link.href}
                                            className="text-sm text-white/25 hover:text-accent transition-colors duration-300 hover:pl-2"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Contact */}
                        <div>
                            <h3 className="font-bold text-white/50 text-xs uppercase tracking-[0.2em] mb-5">Contact</h3>
                            <div className="space-y-4 text-sm">
                                <div>
                                    <p className="text-white/20 text-xs uppercase tracking-wider mb-1">Contact Person</p>
                                    <p className="text-white/50">Shatrughan Vishwakarma</p>
                                </div>
                                <div>
                                    <p className="text-white/20 text-xs uppercase tracking-wider mb-1">Location</p>
                                    <p className="text-white/50">
                                        Block No:- 490, Plot No. 2,<br />
                                        Manjusar, Vadodara, Gujarat
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-white/5">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-white/15">
                        &copy; {new Date().getFullYear()} SITCO — Transformer Radiators
                    </p>
                    <p className="text-xs text-white/15">
                        Precision Manufacturing in Gujarat
                    </p>
                </div>
            </div>
        </footer>
    );
}
