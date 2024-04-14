import { MetaFunction } from "@remix-run/node";

import Hero from "./hero";
import AboutInahef from "./about-inahef";
import Feature from "./feature";
import Schedule from "./schedule";
import OrganizeBy from "./organized-by";
import ContactUs from "./contact-us";
import Footer from "./footer";

export const meta: MetaFunction = () => {
  return [
    { title: "International Healthcare Engineering Forum 2024" },
    {
      name: "Embracing the Future : SMART Healthcare in 2030",
      content: "Welcome to INAHEF 2024!",
    },
  ];
};

export default function IndexPage() {
  return (
    <>
      <Hero />
      <AboutInahef />
      <Feature />
      <Schedule />
      <OrganizeBy />
      <ContactUs />
      <Footer />
    </>
  );
}
