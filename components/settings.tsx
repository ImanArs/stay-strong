"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ChevronRight, FileText, HelpCircle, Shield } from "lucide-react"

export default function Settings() {
  const [activeSection, setActiveSection] = useState<string | null>(null)

  const sections = [
    {
      id: "privacy",
      title: "Privacy Policy",
      icon: Shield,
      content: `
        # Privacy Policy
        
        ## Introduction
        
        At Stay Strong, we respect your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, and safeguard your information when you use our mobile application.
        
        ## Information We Collect
        
        Our app collects only the information necessary to provide you with a great experience:
        
        - **Exercise Records**: Your exercise records and performance history
        - **App Usage Data**: How you interact with the app to improve our service
        
        ## How We Use Your Information
        
        We use your information to:
        
        - Provide and maintain our service
        - Improve and personalize your experience
        - Develop new features based on how the app is used
        
        ## Data Storage
        
        All your exercise data is stored locally on your device using localStorage. We do not transmit or store your personal data on external servers.
        
        ## Changes to This Policy
        
        We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
      `,
    },
    {
      id: "terms",
      title: "Terms of Use",
      icon: FileText,
      content: `
        # Terms of Use
        
        ## Acceptance of Terms
        
        By accessing or using the Stay Strong app, you agree to be bound by these Terms of Use. If you do not agree to these terms, please do not use the app.
        
        ## User Content
        
        You retain all rights to your exercise data. By using the app, you grant us a license to use this data to provide and improve our services.
        
        ## Prohibited Activities
        
        You agree not to:
        
        - Use the app for any illegal purpose
        - Attempt to gain unauthorized access to any part of the app
        - Interfere with the proper working of the app
        
        ## Disclaimer of Warranties
        
        The app is provided "as is" without warranties of any kind, either express or implied.
        
        ## Limitation of Liability
        
        We shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the app.
        
        ## Changes to Terms
        
        We reserve the right to modify these terms at any time. Your continued use of the app after such changes constitutes your acceptance of the new terms.
      `,
    },
    {
      id: "support",
      title: "Support",
      icon: HelpCircle,
      content: `
        # Support
        
        ## Contact Us
        
        If you have any questions or suggestions about our app, do not hesitate to contact us.
        
        ## Email
        
        support@staystrong.app
        
        ## Frequently Asked Questions
        
        ### How do I reset my progress?
        
        You can clear your data by going to your device settings, finding the Stay Strong app, and clearing the app data/cache.
        
        ### Is my data backed up?
        
        Currently, all data is stored locally on your device. We recommend taking screenshots of your important records.
        
        ### How do I report a bug?
        
        Please email us with details about the bug, including your device model and operating system version.
        
        ## Feedback
        
        We love hearing from our users! If you have suggestions for new features or improvements, please let us know through the email above.
      `,
    },
  ]

  return (
    <div className="flex flex-col p-4">
      <AnimatePresence mode="wait">
        {activeSection ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="flex items-center mb-6">
              <Button variant="ghost" size="icon" className="mr-2" onClick={() => setActiveSection(null)}>
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <h2 className="text-xl font-bold">{sections.find((s) => s.id === activeSection)?.title}</h2>
            </div>

            <div className="bg-gray-800 rounded-xl p-4">
              <div className="prose prose-invert prose-sm max-w-none">
                <div
                  dangerouslySetInnerHTML={{
                    __html: sections.find((s) => s.id === activeSection)?.content || "",
                  }}
                />
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <header className="mb-6">
              <h1 className="text-2xl font-bold">Settings</h1>
              <p className="text-gray-400">App information and support</p>
            </header>

            <div className="space-y-3">
              {sections.map((section) => (
                <motion.div
                  key={section.id}
                  className="bg-gray-800 rounded-xl p-4 flex items-center"
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveSection(section.id)}
                >
                  <div className="w-10 h-10 rounded-lg bg-gray-700 flex items-center justify-center mr-3">
                    <section.icon className="h-5 w-5 text-green-500" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{section.title}</h3>
                  </div>
                  <Button variant="ghost" size="icon" className="ml-2">
                    <ChevronRight className="h-5 w-5 text-gray-500" />
                  </Button>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <p className="text-sm text-gray-500">Stay Strong v1.0.0</p>
              <p className="text-xs text-gray-600 mt-1">© 2024 Stay Strong App</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

