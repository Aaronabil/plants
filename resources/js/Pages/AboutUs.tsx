"use client"
import React, { forwardRef, useRef } from "react";
import { Head } from "@inertiajs/react";
import GuestLayout from "@/Layouts/GuestLayout";
import { motion } from "framer-motion";
import { AnimatedBeam } from "@/Components/ui/animated-beam";
import { ArrowUpRight, Github, Linkedin, Instagram, User } from "lucide-react";
import { cn } from "@/lib/utils"
import LogoPlants from "@/Components/Logo";

const teamMembers = [
  {
    name: "Muhamad Nabil Faiz Amrullah",
    role: "Full Stack Developer",
    image: "/alicia.jpeg",
    portfolio: "https://aaronabil.vercel.app",
    github: "https://github.com/Aaronabil",
    linkedin: "https://linkedin.com/in/muhamad-nabil-faiz-amrullah",
    instagram: "https://instagram.com/abilvett"
  },
  {
    name: "Alyssa Nurul Hidayat",
    role: "UI/UX Designer",
    image: "/alyssa.jpeg",
    github: "https://github.com/alyssour",
    linkedin: "https://linkedin.com/in/alyssa-nurul-hidayat-66b08634b",
    instagram: "https://instagram.com/alyssanrl"
  },
  {
    name: "Ahmad Muqarrobin",
    role: "Dev Ops",
    image: "/robin.jpeg",
    github: "https://github.com/IsFaktuear",
    linkedin: "https://linkedin.com/in/ahmad-muqarrobin-3848b8368",
    instagram: "https://www.instagram.com/tahugejroth"
  },
];

const Circle = forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "z-10 flex size-12 items-center justify-center rounded-full border-2 bg-white p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]",
        className
      )}
    >
      {children}
    </div>
  )
})

Circle.displayName = "Circle"

export default function AboutUs() {
  const containerRef = useRef<HTMLDivElement>(null)
  const div1Ref = useRef<HTMLDivElement>(null)
  const div2Ref = useRef<HTMLDivElement>(null)
  return (
    <GuestLayout>
      <Head title="About Us" />

      <div className="bg-white min-h-screen py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-green-600 font-semibold tracking-wide text-sm md:text-base mb-3"
          >
            Our creative team
          </motion.h2>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight mb-6"
          >
            Team Behind Yestera
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-3xl mx-auto text-xl text-gray-500 font-light"
          >
            Meet the handsome and beautiful person who made the project yesterday.
          </motion.p>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              className="relative group h-96 group rounded-2xl overflow-hidden"
            >
              <div className="absolute inset-0 w-full h-full">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Dark Glass Card */}
              <div className="absolute bottom-4 left-4 right-4 bg-black/30 backdrop-blur-md border border-white/10 p-5 rounded-2xl shadow-xl transform transition-all duration-300">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-lg font-bold text-white leading-tight">{member.name}</h3>
                    <p className="text-gray-300 text-sm font-medium mt-1">{member.role}</p>
                  </div>
                  <a
                    href={member.portfolio}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white/20 p-2 rounded-full cursor-pointer hover:bg-white/30 transition-colors block"
                  >
                    <ArrowUpRight className="w-4 h-4 text-white" />
                  </a>
                </div>

                <div className="flex space-x-3 mt-4">
                  <a href={member.github} target="_blank" className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors">
                    <Github className="w-4 h-4 text-white" />
                  </a>
                  <a href={member.linkedin} target="_blank" className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors">
                    <Linkedin className="w-4 h-4 text-white" />
                  </a>
                  <a href={member.instagram} target="_blank" className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors">
                    <Instagram className="w-4 h-4 text-white" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Beam */}
      <div
        className="relative flex w-full max-w-full items-center justify-center overflow-hidden p-10"
        ref={containerRef}
      >
        <div className="flex size-full flex-col items-stretch justify-between gap-10">
          <div className="flex flex-row justify-between">
            <Circle ref={div1Ref}>
              <User />
            </Circle>
            <Circle ref={div2Ref}>
              <LogoPlants />
            </Circle>
          </div>
        </div>
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={div1Ref}
          toRef={div2Ref}
          startYOffset={10}
          endYOffset={10}
          curvature={-20}
          gradientStartColor="green"
          gradientStopColor="emerald"
        />
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={div1Ref}
          toRef={div2Ref}
          startYOffset={-10}
          endYOffset={-10}
          curvature={20}
          reverse
          gradientStartColor="green"
          gradientStopColor="gray"
        />
      </div>
    </GuestLayout>
  );
}