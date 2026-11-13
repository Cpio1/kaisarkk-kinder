"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { useLang } from "@/components/Providers";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";
import { whatsappLink } from "@/lib/site";

/** Плавающая кнопка WhatsApp — только на мобильных; скрывается в разделе контактов. */
export function FloatingWhatsApp() {
  const { t } = useLang();
  const [show, setShow] = useState(false);
  useEffect(() => {
    const contacts = document.getElementById("contacts");
    const on = () => {
      const pastHero = window.scrollY > window.innerHeight * 0.9;
      const inContacts = contacts ? contacts.getBoundingClientRect().top < window.innerHeight * 0.8 : false;
      setShow(pastHero && !inContacts);
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => {
      window.removeEventListener("scroll", on);
      window.removeEventListener("resize", on);
    };
  }, []);

  return (
    <AnimatePresence>
      {show ? (
        <motion.a
          key="fab"
          href={whatsappLink(t.wa.message)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${t.wa.floating} ${t.contacts.newTab}`}
          initial={{ opacity: 0, scale: 0.4, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.4, y: 20 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="fixed right-4 bottom-[max(16px,env(safe-area-inset-bottom))] z-40 grid size-14 place-items-center rounded-full border-2 border-ink bg-[#2fbf71] text-white shadow-[0_4px_0_0_rgb(42_44_51/0.9)] lg:hidden"
        >
          <span className="absolute inset-0 animate-ping rounded-full bg-[#2fbf71] opacity-30 [animation-duration:2.4s]" aria-hidden="true" />
          <WhatsAppIcon size={28} className="relative" />
        </motion.a>
      ) : null}
    </AnimatePresence>
  );
}
