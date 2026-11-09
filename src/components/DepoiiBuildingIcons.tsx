"use client";

import React from "react";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  size?: number;
}

/**
 * 1. LogisticsWarehouseIcon
 * Notion-style playful distribution hub with rooftop HVAC unit and loading dock doors
 */
export function LogisticsWarehouseIcon({ className = "w-6 h-6", size, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      width={size}
      height={size}
      {...props}
    >
      {/* Rooftop Commercial HVAC Unit */}
      <rect
        x="14"
        y="11"
        width="15"
        height="7"
        rx="2"
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line x1="19" y1="14.5" x2="24" y2="14.5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />

      {/* Rooftop Exhaust Flue */}
      <line x1="42" y1="13" x2="42" y2="18" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <circle cx="42" cy="11" r="2" fill="currentColor" />

      {/* Main Flat-Roof Warehouse Body */}
      <rect
        x="7"
        y="18"
        width="50"
        height="38"
        rx="4"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Parapet Roofline Eave */}
      <line x1="5" y1="18" x2="59" y2="18" stroke="currentColor" strokeWidth="3.8" strokeLinecap="round" />

      {/* Notion-Style Friendly Character Eyes */}
      <circle cx="23" cy="29" r="2.8" fill="currentColor" />
      <circle cx="41" cy="29" r="2.8" fill="currentColor" />

      {/* Left Loading Dock Door */}
      <rect
        x="14"
        y="38"
        width="14"
        height="18"
        rx="2"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line x1="17" y1="43" x2="25" y2="43" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="17" y1="48" x2="25" y2="48" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />

      {/* Right Loading Dock Door */}
      <rect
        x="36"
        y="38"
        width="14"
        height="18"
        rx="2"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line x1="39" y1="43" x2="47" y2="43" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="39" y1="48" x2="47" y2="48" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

/**
 * 2. SawtoothFactoryIcon
 * Notion-style industrial heavy manufacturing plant with sawtooth roofline & puffing chimney
 */
export function SawtoothFactoryIcon({ className = "w-6 h-6", size, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      width={size}
      height={size}
      {...props}
    >
      {/* Chimney & Playful Smoke Puff */}
      <rect
        x="45"
        y="11"
        width="8"
        height="13"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Smoke puffs */}
      <circle cx="49" cy="6" r="2" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="53" cy="3" r="1.5" fill="currentColor" />

      {/* Classic Industrial Sawtooth Roof & Facade */}
      <path
        d="M 9 56 L 9 26 L 19 16 L 19 26 L 31 16 L 31 26 L 43 16 L 43 26 L 55 26 L 55 56 Z"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Notion-Style Friendly Character Eyes */}
      <circle cx="21" cy="34" r="2.8" fill="currentColor" />
      <circle cx="39" cy="34" r="2.8" fill="currentColor" />

      {/* Central Rolling Factory Bay Door */}
      <rect
        x="23"
        y="42"
        width="18"
        height="14"
        rx="2"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line x1="26" y1="46" x2="38" y2="46" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="26" y1="50" x2="38" y2="50" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

/**
 * 3. CommercialFlexIcon
 * Notion-style modern commercial flex & R&D building with parapet roof & rooftop hatch
 */
export function CommercialFlexIcon({ className = "w-6 h-6", size, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      width={size}
      height={size}
      {...props}
    >
      {/* Rooftop Service Access Hatch & Ladder Top */}
      <path
        d="M 15 17 L 15 12 C 15 10 22 10 22 12 L 22 17"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line x1="17" y1="14" x2="20" y2="14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />

      {/* Satellite Dish on Flex Roof */}
      <path
        d="M 46 11 A 5 5 0 0 1 51 16"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <line x1="48.5" y1="13.5" x2="44" y2="17" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />

      {/* Main Commercial Flex Building Box */}
      <rect
        x="8"
        y="17"
        width="48"
        height="39"
        rx="3.5"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Parapet Roofline Eave */}
      <line x1="6" y1="17" x2="58" y2="17" stroke="currentColor" strokeWidth="3.8" strokeLinecap="round" />

      {/* Upper Floor Office Windows */}
      <rect x="15" y="24" width="9" height="7" rx="1.5" stroke="currentColor" strokeWidth="2.5" />
      <rect x="40" y="24" width="9" height="7" rx="1.5" stroke="currentColor" strokeWidth="2.5" />

      {/* Notion-Style Friendly Character Eyes between floors */}
      <circle cx="27" cy="37" r="2.5" fill="currentColor" />
      <circle cx="37" cy="37" r="2.5" fill="currentColor" />

      {/* Commercial Glass Entry Double Doors */}
      <rect
        x="23"
        y="42"
        width="18"
        height="14"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line x1="32" y1="42" x2="32" y2="56" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

/**
 * 4. CargoTerminalIcon
 * Notion-style port logistics hangar with arched barrel roof & crane hook
 */
export function CargoTerminalIcon({ className = "w-6 h-6", size, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      width={size}
      height={size}
      {...props}
    >
      {/* Heavy Gantry Crane Arm on Top */}
      <path
        d="M 26 8 L 44 8 L 42 16 L 38 16"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="44" cy="11" r="1.5" fill="currentColor" />

      {/* Arched Barrel Roof Hangar Profile */}
      <path
        d="M 8 56 L 8 28 C 8 16 20 15 32 15 C 44 15 56 16 56 28 L 56 56 Z"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Arch Support Ribs */}
      <path
        d="M 16 26 C 22 20 42 20 48 26"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* Notion-Style Friendly Character Eyes */}
      <circle cx="24" cy="34" r="2.8" fill="currentColor" />
      <circle cx="40" cy="34" r="2.8" fill="currentColor" />

      {/* Wide Aircraft / Freight Hangar Doors */}
      <path
        d="M 16 56 L 16 42 C 16 40 48 40 48 42 L 48 56"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line x1="32" y1="40" x2="32" y2="56" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

/**
 * 5. AgingRoofSatelliteIcon
 * Notion-style playful satellite with Depoii vortex scanner examining a roof
 */
export function AgingRoofSatelliteIcon({ className = "w-6 h-6", size, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      width={size}
      height={size}
      {...props}
    >
      {/* Satellite Solar Wings */}
      <rect x="4" y="24" width="13" height="16" rx="2" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
      <line x1="10.5" y1="24" x2="10.5" y2="40" stroke="currentColor" strokeWidth="2" />
      <line x1="4" y1="32" x2="17" y2="32" stroke="currentColor" strokeWidth="2" />

      <rect x="47" y="24" width="13" height="16" rx="2" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
      <line x1="53.5" y1="24" x2="53.5" y2="40" stroke="currentColor" strokeWidth="2" />
      <line x1="47" y1="32" x2="60" y2="32" stroke="currentColor" strokeWidth="2" />

      {/* Wing Connectors */}
      <line x1="17" y1="32" x2="22" y2="32" stroke="currentColor" strokeWidth="3" />
      <line x1="42" y1="32" x2="47" y2="32" stroke="currentColor" strokeWidth="3" />

      {/* Satellite Main Body with Friendly Eyes */}
      <rect x="22" y="20" width="20" height="24" rx="4" stroke="currentColor" strokeWidth="3.5" strokeLinejoin="round" />
      <circle cx="28" cy="30" r="2.5" fill="currentColor" />
      <circle cx="36" cy="30" r="2.5" fill="currentColor" />

      {/* Optical Downlink Lens */}
      <path d="M 28 44 L 25 51 L 39 51 L 36 44" stroke="currentColor" strokeWidth="2.8" strokeLinejoin="round" />
      <ellipse cx="32" cy="51" rx="7" ry="2.5" stroke="currentColor" strokeWidth="2.5" />

      {/* Playful Radar Beam Waves */}
      <path d="M 24 57 C 28 60 36 60 40 57" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

/**
 * Helper component that renders the appropriate playful Notion-style building icon
 * based on the property category string.
 */
export function DepoiiBuildingCategoryIcon({
  category,
  className = "w-5 h-5 text-white",
  size,
  ...props
}: {
  category: string;
  className?: string;
  size?: number;
} & React.SVGProps<SVGSVGElement>) {
  switch (category) {
    case "Logistics Hub":
    case "Distribution Center":
    case "Warehouse":
      return <LogisticsWarehouseIcon className={className} size={size} {...props} />;
    case "Heavy Manufacturing":
    case "Manufacturing Plant":
    case "Industrial":
      return <SawtoothFactoryIcon className={className} size={size} {...props} />;
    case "Port Logistics":
    case "Cargo Terminal":
    case "Freight Hangar":
      return <CargoTerminalIcon className={className} size={size} {...props} />;
    case "Commercial Flex":
    case "Commercial Flex Park":
    case "Flex Industrial":
    case "R&D Flex":
    default:
      return <CommercialFlexIcon className={className} size={size} {...props} />;
  }
}

