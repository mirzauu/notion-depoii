"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const agentCards = [
  {
    title: "Triage product feedback",
    href: "#bento-features",
    icon: "/assets/agent-mailbox.png",
    bgColor: "#097fe8",
  },
  {
    title: "Resolve support tickets in Slack",
    href: "#bento-features",
    icon: "/assets/agent-rock.png",
    bgColor: "#ffb110",
  },
  {
    title: "Respond to security alerts faster",
    href: "#bento-features",
    icon: "/assets/agent-sign.png",
    bgColor: "#f64932",
  },
  {
    title: "Automate weekly reporting",
    href: "#bento-features",
    icon: "/assets/agent-apple.png",
    bgColor: "#1aae39",
  },
  {
    title: "Create your own developer tools",
    href: "#bento-features",
    icon: "/assets/agent-lightbulb.png",
    badge: "/assets/agent-worker.png",
    bgColor: "#1313ba",
  },
];

export function CustomAgentsSection() {
  return (
    <section className="pb-20 bg-white">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <h3 className="text-[14px] text-black/55 font-normal mb-4">
          See what Notion can do
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {agentCards.map((agent, idx) => (
            <Link
              key={idx}
              href={agent.href}
              prefetch={false}
              className="group p-4 bg-[#f9f9f8] hover:bg-[#f3f2f1] border border-black/[0.06] rounded-xl flex flex-col justify-between transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm"
            >
              <div className="relative mb-3 flex items-center justify-between">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center p-1.5 shadow-sm"
                  style={{ backgroundColor: agent.bgColor }}
                >
                  <div className="relative w-full h-full">
                    <Image
                      src={agent.icon}
                      alt={agent.title}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>

                {agent.badge && (
                  <div className="w-5 h-5 relative -ml-3 mt-4">
                    <Image
                      src={agent.badge}
                      alt="Worker badge"
                      fill
                      className="object-contain"
                    />
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between gap-2 mt-auto">
                <span className="text-[14px] font-semibold text-black leading-snug group-hover:text-notion-blue-600 transition-colors">
                  {agent.title}
                </span>
                <ArrowRight className="w-4 h-4 text-black/40 group-hover:text-notion-blue-600 shrink-0 transition-transform group-hover:translate-x-0.5" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
