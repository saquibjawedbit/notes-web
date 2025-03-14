import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { duration: 0.8, opacity: 1 }
};

const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
};

export function TermsOfService() {
    return (
        <motion.div 
            className="min-h-screen bg-gradient-to-b bg-black mt-8 py-12 px-4 sm:px-6 lg:px-8"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            <motion.div 
                className="max-w-3xl mx-auto bg-gray-900 p-8 rounded-lg shadow-lg border border-amber-700/20"
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                <motion.h1 
                    className="text-4xl font-bold mb-8 bg-gradient-to-r from-amber-400 to-yellow-600 text-transparent bg-clip-text"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    Terms of Service
                </motion.h1>
                
                <motion.section 
                    className="mb-8"
                    variants={sectionVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    <h2 className="text-xl font-semibold mb-4 text-amber-300">1. Acceptance of Terms</h2>
                    <p className="text-gray-300 mb-4">
                        By accessing and using HR Science Quest, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
                    </p>
                </motion.section>

                <motion.section 
                    className="mb-8"
                    variants={sectionVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <h2 className="text-xl font-semibold mb-4 text-amber-300">2. Purchases and Payments</h2>
                    <motion.div 
                        className="bg-amber-900/30 border-l-4 border-amber-400 p-4 mb-4"
                        whileHover={{ scale: 1.01, x: 10 }}
                        transition={{ duration: 0.2 }}
                    >
                        <ul className="list-disc pl-5 text-amber-200 space-y-2">
                            <li>All purchases are final and non-refundable</li>
                            <li>Content access is granted immediately upon successful payment</li>
                            <li>Purchases cannot be transferred between accounts</li>
                            <li>Prices are subject to change without notice</li>
                        </ul>
                    </motion.div>
                </motion.section>

                <motion.section 
                    className="mb-8"
                    variants={sectionVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    <h2 className="text-xl font-semibold mb-4 text-amber-300">3. User Responsibilities</h2>
                    <p className="text-gray-300 mb-4">
                        Users agree to:
                    </p>
                    <ul className="list-disc pl-5 text-gray-300 space-y-2">
                        <li>Maintain the confidentiality of their account credentials</li>
                        <li>Not share or distribute purchased content</li>
                        <li>Use the content for personal educational purposes only</li>
                        <li>Not engage in unauthorized access or use of the platform</li>
                    </ul>
                </motion.section>

                <motion.section 
                    className="mb-8"
                    variants={sectionVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    <h2 className="text-xl font-semibold mb-4 text-amber-300">4. Intellectual Property</h2>
                    <p className="text-gray-300 mb-4">
                        All content provided on this platform is protected by copyright and other intellectual property laws. Users may not:
                    </p>
                    <ul className="list-disc pl-5 text-gray-300 space-y-2">
                        <li>Copy or reproduce any content without permission</li>
                        <li>Distribute or share purchased materials</li>
                        <li>Modify or create derivative works</li>
                        <li>Use content for commercial purposes</li>
                    </ul>
                </motion.section>

                <motion.section 
                    className="mb-8"
                    variants={sectionVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                >
                    <h2 className="text-xl font-semibold mb-4 text-amber-300">5. Account Termination</h2>
                    <p className="text-gray-300 mb-4">
                        We reserve the right to terminate or suspend accounts that violate these terms, with or without notice.
                    </p>
                </motion.section>

                <motion.section 
                    className="mb-8"
                    variants={sectionVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                >
                    <h2 className="text-xl font-semibold mb-4 text-amber-300">6. Limitation of Liability</h2>
                    <p className="text-gray-300 mb-4">
                        HR Science Quest is not liable for any indirect, incidental, or consequential damages arising from your use of our services.
                    </p>
                </motion.section>

                <motion.div 
                    className="mt-8 pt-4 border-t border-amber-700/20"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                >
                    <p className="text-sm text-gray-300">
                        For questions about these terms, please contact{' '}
                        <motion.a 
                            href="mailto:HR@hrsciencequest.com" 
                            className="text-amber-400 hover:underline inline-block"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                           HR@hrsciencequest.com
                        </motion.a>
                    </p>
                    <p className="text-sm text-amber-200/70 mt-2">
                        Last updated: {new Date().toLocaleDateString()}
                    </p>
                    <motion.div 
                        className="mt-4"
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.2 }}
                    >
                        <Link to="/privacy-policy" className="text-amber-400 hover:underline text-sm">
                            View Privacy Policy
                        </Link>
                    </motion.div>
                </motion.div>
            </motion.div>
        </motion.div>
    );
}
