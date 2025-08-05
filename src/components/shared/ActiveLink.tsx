"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

interface ActiveLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  activeClassName?: string;
  exactMatch?: boolean;
}

/**
 * ActiveLink component that highlights navigation links based on current route
 * 
 * @param href - The target URL
 * @param children - Link content (text, icons, etc.)
 * @param className - Base CSS classes
 * @param activeClassName - Additional classes when link is active
 * @param exactMatch - Whether to match exact path or just start of path
 */
export default function ActiveLink({ 
  href, 
  children, 
  className = "", 
  activeClassName = "bg-blue-600 text-white", 
  exactMatch = false 
}: ActiveLinkProps) {
  const pathname = usePathname();
  
  // Determine if this link is active
  const isActive = exactMatch 
    ? pathname === href 
    : pathname.startsWith(href);
  
  // Combine base classes with active classes
  const linkClasses = `${className} ${isActive ? activeClassName : ""}`.trim();
  
  return (
    <Link href={href} className={linkClasses}>
      {children}
    </Link>
  );
}
