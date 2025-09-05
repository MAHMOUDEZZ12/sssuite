// src/components/diagrams/ExecutiveBrainMap.tsx
// A self-contained, responsive SVG diagram in your brand palette.
// Usage: <ExecutiveBrainMap className="w-full h-auto" />

import React from "react";

type Props = React.SVGProps<SVGSVGElement>;

export default function ExecutiveBrainMap(props: Props) {
  const lime = "#95FE54";
  const pink = "#F64A8B";
  const gray = "#7A7A7A";
  const base = "#000000";

  return (
    <svg
      viewBox="0 0 1200 800"
      role="img"
      aria-labelledby="title desc"
      {...props}
    >
      <title id="title">Super Sales Suite — Executive Brain Map</title>
      <desc id="desc">
        High-level architecture showing UI, AI Core, Event Bus, Services,
        Data, and Background Jobs.
      </desc>

      {/* Background */}
      <rect x="0" y="0" width="1200" height="800" fill={base} />

      {/* Outer ring label */}
      <text x="600" y="60" textAnchor="middle" fill={gray} fontSize="18">
        Super Sales Suite • AI-driven, event-based tools for real estate
      </text>

      {/* ----- UI Layer (Top) ----- */}
      <g>
        <rect
          x="120"
          y="100"
          width="960"
          height="90"
          rx="18"
          fill="#0A0A0A"
          stroke={gray}
          strokeWidth="2"
        />
        <text x="600" y="140" textAnchor="middle" fill="#EAEAEA" fontSize="20" fontWeight="600">
          User Interface (Next.js • Vercel)
        </text>
        <text x="600" y="165" textAnchor="middle" fill={gray} fontSize="14">
          Home • Onboarding (DeepSearch) • Dashboard (Tools) • Assistant Panel
        </text>
      </g>

      {/* ----- AI Core (Center) ----- */}
      <g>
        {/* Event Bus halo */}
        <circle cx="600" cy="400" r="220" fill="none" stroke={gray} strokeDasharray="6 8" />
        <text x="600" y="175" textAnchor="middle" fill={gray} fontSize="12">
          Event Bus & Orchestration
        </text>

        {/* Brain core */}
        <circle cx="600" cy="400" r="110" fill="#0F0F0F" stroke={lime} strokeWidth="2.5" />
        <text x="600" y="395" textAnchor="middle" fill={lime} fontSize="24" fontWeight="700">
          AI Core
        </text>
        <text x="600" y="420" textAnchor="middle" fill="#C7FFC2" fontSize="13">
          Intent → Plan → Actions → Review
        </text>
        <text x="600" y="444" textAnchor="middle" fill={gray} fontSize="12">
          (Multi-step Copilot • Text-to-Action Chains)
        </text>
      </g>

      {/* ----- Service Cluster (around the core) ----- */}
      {/* Projects */}
      <g>
        <rect x="330" y="260" width="180" height="70" rx="12" fill="#0F0F0F" stroke={gray} />
        <text x="420" y="300" textAnchor="middle" fill="#EAEAEA" fontSize="14" fontWeight="600">
          Projects Library
        </text>
        <text x="420" y="318" textAnchor="middle" fill={gray} fontSize="11">
          per market (city/dev focus)
        </text>
        {/* arrow to core */}
        <line x1="420" y1="330" x2="560" y2="360" stroke={gray} strokeWidth="1.5" />
      </g>

      {/* Brand */}
      <g>
        <rect x="690" y="260" width="180" height="70" rx="12" fill="#0F0F0F" stroke={gray} />
        <text x="780" y="300" textAnchor="middle" fill="#EAEAEA" fontSize="14" fontWeight="600">
          Brand Kit
        </text>
        <text x="780" y="318" textAnchor="middle" fill={gray} fontSize="11">
          logo • colors • contacts
        </text>
        <line x1="640" y1="360" x2="780" y2="330" stroke={gray} strokeWidth="1.5" />
      </g>

      {/* Creative */}
      <g>
        <rect x="260" y="470" width="210" height="80" rx="12" fill="#0F0F0F" stroke={gray} />
        <text x="365" y="505" textAnchor="middle" fill="#EAEAEA" fontSize="14" fontWeight="600">
          Creative Tools
        </text>
        <text x="365" y="525" textAnchor="middle" fill={gray} fontSize="11">
          PDF Rebrand • Social • Reels • Landing
        </text>
        <line x1="470" y1="500" x2="530" y2="450" stroke={gray} strokeWidth="1.5" />
      </g>

      {/* Ads */}
      <g>
        <rect x="730" y="470" width="210" height="80" rx="12" fill="#0F0F0F" stroke={gray} />
        <text x="835" y="505" textAnchor="middle" fill="#EAEAEA" fontSize="14" fontWeight="600">
          Ads Manager
        </text>
        <text x="835" y="525" textAnchor="middle" fill={gray} fontSize="11">
          Ad Creator • Precision Targeting • Copilots
        </text>
        <line x1="670" y1="450" x2="730" y2="500" stroke={gray} strokeWidth="1.5" />
      </g>

      {/* Comms */}
      <g>
        <rect x="500" y="520" width="200" height="80" rx="12" fill="#0F0F0F" stroke={gray} />
        <text x="600" y="555" textAnchor="middle" fill="#EAEAEA" fontSize="14" fontWeight="600">
          Comms & Outreach
        </text>
        <text x="600" y="575" textAnchor="middle" fill={gray} fontSize="11">
          Email • WhatsApp • IG Bot
        </text>
        <line x1="600" y1="510" x2="600" y2="458" stroke={gray} strokeWidth="1.5" />
      </g>

      {/* ----- Data & Jobs (Bottom) ----- */}
      <g>
        {/* Data store */}
        <rect x="140" y="650" width="440" height="90" rx="14" fill="#0A0A0A" stroke={gray} />
        <text x="360" y="685" textAnchor="middle" fill="#EAEAEA" fontSize="15" fontWeight="600">
          Data Layer (Firestore • Storage)
        </text>
        <text x="360" y="706" textAnchor="middle" fill={gray} fontSize="12">
          users • projects_catalog • projects_library • events • drafts
        </text>

        {/* Jobs */}
        <rect x="620" y="650" width="440" height="90" rx="14" fill="#0A0A0A" stroke={gray} />
        <text x="840" y="685" textAnchor="middle" fill="#EAEAEA" fontSize="15" fontWeight="600">
          Background Jobs (Cloud Functions)
        </text>
        <text x="840" y="706" textAnchor="middle" fill={gray} fontSize="12">
          generate library • sync brand • schedule chains • integrations
        </text>

        {/* connectors from services to data/jobs */}
        <line x1="365" y1="650" x2="365" y2="555" stroke={gray} strokeWidth="1" />
        <line x1="600" y1="650" x2="600" y2="600" stroke={gray} strokeWidth="1" />
        <line x1="835" y1="650" x2="835" y2="555" stroke={gray} strokeWidth="1" />
      </g>

      {/* ----- UI → AI Core arrows ----- */}
      <g stroke={pink} strokeWidth="2">
        <line x1="600" y1="190" x2="600" y2="280" />
        <polygon points="600,280 594,268 606,268" fill={pink} />
      </g>

      {/* ----- Branding footer ----- */}
      <text x="600" y="780" textAnchor="middle" fill={gray} fontSize="12">
        Colors: Lime {lime} • Pink {pink} • Gray {gray} • Base {base}
      </text>
    </svg>
  );
}
