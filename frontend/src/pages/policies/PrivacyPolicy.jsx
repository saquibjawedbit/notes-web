import React from 'react';
import { motion } from 'framer-motion';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8 } }
};

const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export function PrivacyPolicy() {
    return (
        <motion.div 
            className="min-h-screen bg-gradient-to-b mt-8 bg-black py-12 px-4 sm:px-6 lg:px-8"
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
                    Privacy Policy
                </motion.h1>
                
                <motion.section 
                    className="mb-8"
                    variants={sectionVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <h2 className="text-xl font-semibold mb-4 text-amber-300">Data Security</h2>
                    <p className="text-gray-300 mb-4">
                        We take your privacy seriously. All user data collected through our platform is encrypted using industry-standard encryption protocols. This includes:
                    </p>
                    <ul className="list-disc pl-5 text-gray-300 space-y-2">
                        <li>Personal information</li>
                        <li>Login credentials</li>
                        <li>Payment information</li>
                        <li>Usage data</li>
                    </ul>
                </motion.section>

                <motion.section 
                    className="mb-8"
                    variants={sectionVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <h2 className="text-xl font-semibold mb-4 text-amber-300">Purchase Policy</h2>
                    <motion.div 
                        className="bg-amber-900/30 border-l-4 border-amber-400 p-4 mb-4"
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                    >
                        <p className="text-amber-200">
                            <strong>Important:</strong> All purchases are final and non-refundable.
                        </p>
                    </motion.div>
                    <p className="text-gray-300">
                        By making a purchase, you acknowledge and agree that:
                    </p>
                    <ul className="list-disc pl-5 text-gray-300 space-y-2 mt-2">
                        <li>Content access is immediate upon successful payment</li>
                        <li>No refunds will be issued once the purchase is complete</li>
                        <li>Content access cannot be transferred to another account</li>
                    </ul>
                </motion.section>

                <motion.section 
                    className="mb-8"
                    variants={sectionVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <h2 className="text-xl font-semibold mb-4 text-amber-300">Data Collection</h2>
                    <p className="text-gray-300 mb-4">
                        We collect and process the following types of information:
                    </p>
                    <ul className="list-disc pl-5 text-gray-300 space-y-2">
                        <li>Email address for account creation and communication</li>
                        <li>Academic preferences and study materials access history</li>
                        <li>Payment records for purchased content</li>
                        <li>Usage statistics to improve our services</li>
                    </ul>
                </motion.section>

                <motion.section 
                    className="mb-8"
                    variants={sectionVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <h2 className="text-xl font-semibold mb-4 text-amber-300">Contact Information</h2>
                    <p className="text-gray-300">
                        For any questions regarding this privacy policy or our data practices, please contact us at:
                        <br />
                        <motion.a 
                            href="mailto:HR@hrsciencequest.com" 
                            className="text-amber-400 hover:underline inline-block"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            HR@hrsciencequest.com
                        </motion.a>
                    </p>
                </motion.section>

                <motion.footer 
                    className="text-sm text-amber-200/70 mt-8 pt-4 border-t border-amber-700/20"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                >
                    <p>Last updated: {new Date().toLocaleDateString()}</p>
                </motion.footer>
            </motion.div>
        </motion.div>
    );
}
