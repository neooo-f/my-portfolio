"use client";

import React from "react";
import SectionHeading from "./section-heading";
import { motion } from "framer-motion";
import { useSectionInView } from "@/lib/hooks";

type Props = {
  t: {
    heading: string;
    description: string[];
  };
};

export default function About({ t }: Props) {
  const { ref } = useSectionInView("About");

  return (
    <motion.section
      ref={ref}
      className="mb-28 max-w-[45rem] text-center leading-8 sm:mb-40 scroll-mt-28"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.175 }}
      id="about"
    >
      <SectionHeading>{t.heading}</SectionHeading>
      <p className="mb-3">
        {t.description[0]}{" "}
        <span className="font-medium">{t.description[1]}</span>
        {t.description[2]}{" "}
        <span className="font-medium">{t.description[3]}</span>{" "}
        <span className="italic">{t.description[4]}</span> {t.description[5]}{" "}
        <span className="underline">{t.description[6]}</span> {t.description[7]}{" "}
        <span className="font-medium">{t.description[8]}</span>
        {t.description[9]}
      </p>

      <p>
        <span className="italic">{t.description[10]}</span>
        {t.description[11]}{" "}
        <span className="font-medium">{t.description[12]}</span>
      </p>
    </motion.section>
  );
}
