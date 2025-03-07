"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  ChevronRight,
  FileText,
  HelpCircle,
  Shield,
} from "lucide-react";

export default function Settings() {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const sections = [
    {
      id: "privacy",
      title: "Privacy Policy",
      icon: Shield,
      content: `<iframe 
        src="https://www.privacypolicies.com/live/283448f4-d7a9-4f0d-b767-841fb1daeb7d" 
        width="100%" 
        height="400px" 
        style="border:none; border-radius: 12px;"
      ></iframe>`,
    },
    {
      id: "terms",
      title: "Terms of Use",
      icon: FileText,
      content: `
      <iframe 
        src="https://www.privacypolicies.com/live/b67c2c38-fcf9-4e57-a142-f12523c7f0a1" 
        width="100%" 
        height="400px" 
        style="border:none; border-radius: 12px;"
      ></iframe>
      `,
    },
    {
      id: "support",
      title: "Support",
      icon: HelpCircle,
      content: `
      <iframe 
        src="https://form.123formbuilder.com/6817350/contact-form" 
        width="100%" 
        height="400px" 
        style="border:none; border-radius: 12px;"
      ></iframe>`,
    },
  ];

  return (
    <div className="flex flex-col p-4">
      <AnimatePresence mode="wait">
        {activeSection ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="flex items-center mb-6">
              <Button
                variant="ghost"
                size="icon"
                className="mr-2"
                onClick={() => setActiveSection(null)}
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <h2 className="text-xl font-bold">
                {sections.find((s) => s.id === activeSection)?.title}
              </h2>
            </div>

            <div className="bg-gray-800 rounded-[12px]">
              <div className="prose prose-invert prose-sm max-w-none">
                <div
                  dangerouslySetInnerHTML={{
                    __html:
                      sections.find((s) => s.id === activeSection)?.content ||
                      "",
                  }}
                />
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
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
              <p className="text-xs text-gray-600 mt-1">
                © 2024 Stay Strong App
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
