"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Link as CLink, DarkModeButton, NavButton } from "@/components";
import { navbarSection } from "@/lib/content/navbar";
import { author } from "@/lib/content/portfolio";
import useWindowWidth from "@/lib/hooks/use-window-width";
import { SECTION_IDS } from "@/lib/utils/config";
import { fadeIn, slideIn } from "@/styles/animations";
import { Button } from "../animate-ui/components/buttons/button";
import type { NavItemsProps } from "./types";

const hideNavWhileScrolling = ({
  id = "navbar",
  offset = 100,
  when = true,
}: {
  id?: string;
  offset?: number;
  when: boolean;
}) => {
  const nav = document.getElementById(id);
  if (!nav) return;

  let prevScrollPos = window.pageYOffset;

  window.onscroll = () => {
    if (when) {
      const curScrollPos = window.pageYOffset;
      if (prevScrollPos < curScrollPos) nav.style.top = `-${offset}px`;
      else nav.style.top = "0";
      prevScrollPos = curScrollPos;
    }
  };
};

const NavItem = ({ href, children, onClick, index, delay }: NavItemsProps) => {
  return (
    <motion.li
      className="group"
      variants={slideIn({ delay: delay + index / 10, direction: "down" })}
      initial="hidden"
      animate="show"
    >
      <CLink
        href={href || `/#${children}`}
        className="block p-2 duration-500 hover:text-accent"
        onClick={onClick}
        withPadding
      >
        {children}
      </CLink>
    </motion.li>
  );
};

export const Navbar = () => {
  const { navLinks } = navbarSection;
  const [navbarCollapsed, setNavbarCollapsed] = useState(false);
  const id = "navbar";
  const windowWidth = useWindowWidth();
  const ANIMATION_DELAY = windowWidth <= 1000 ? 0 : 0.8;

  useEffect(() => {
    hideNavWhileScrolling({ when: !navbarCollapsed });
  }, [navbarCollapsed]);

  return (
    <motion.header
      variants={fadeIn(0.5)}
      initial="hidden"
      animate="show"
      id={id}
      className="fixed inset-x-0 top-0 right-0 z-50 flex items-end justify-between px-8 py-4 duration-500 md:px-6 xl:px-12 backdrop-blur-lg"
    >
      <h1 className="relative text-2xl capitalize font-agustina text-accent group top-1">
        <Link href={`/#${SECTION_IDS.HERO}`} className="block">
          {author.name}
          <div className="absolute bottom-1.5 left-0 h-[1px] w-0 group-hover:w-full bg-accent duration-300"></div>
        </Link>
      </h1>

      <NavButton
        onClick={() => {
          setNavbarCollapsed((prev) => !prev);
        }}
        navbarCollapsed={navbarCollapsed}
        className="md:invisible"
      />

      {(navbarCollapsed || windowWidth >= 1000) && (
        <nav className="capitalize absolute text-sm duration-200 md:bg-transparent z-50 w-[90%] left-1/2 -translate-x-1/2 top-full h-max rounded-xl shadow-xl p-6 bg-bg-secondary md:blocks md:static md:w-auto md:left-auto md:transform-none md:top-auto md:rounded-none md:shadow-none md:p-0 md:h-auto">
          <ul className="flex flex-col items-stretch gap-3 list-style-none lg:gap-5 xl:gap-6 md:flex-row md:items-center">
            {navLinks.map(({ name, url }, index) => (
              <NavItem
                key={index + name}
                href={url}
                index={index}
                delay={ANIMATION_DELAY}
                onClick={() => setNavbarCollapsed(false)}
              >
                {name}
              </NavItem>
            ))}

            <div className="flex items-center justify-between gap-5 xl:gap-6">
              <Button
                type="button"
                variant="outline"
                hoverScale={1}
                tapScale={0.95}
                onClick={() => window.open("/resume.pdf", "_blank")}
                className="bg-transparent border-accent text-accent hover:text-white"
              >
                Resume
              </Button>
              <DarkModeButton
                onClick={() => setNavbarCollapsed(false)}
                variants={slideIn({
                  delay: ANIMATION_DELAY,
                  direction: "down",
                })}
                initial="hidden"
                animate="show"
              />
            </div>
          </ul>
        </nav>
      )}
    </motion.header>
  );
};
