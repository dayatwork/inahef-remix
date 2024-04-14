import { FaWhatsapp } from "react-icons/fa";

import { ContactForm } from "./components/contact-form";

export default function ContactUs() {
  return (
    <section className="max-w-7xl mx-auto px-8 w-full relative py-32 flex flex-col">
      <div className="absolute inset-0 h-1 bg-gradient-to-r from-indigo-500 to-blue-500 w-[200px] mx-auto rounded-xl opacity-50"></div>
      <div className="absolute inset-0 h-1 bg-gradient-to-r from-indigo-500 to-blue-500 w-[200px] mx-auto rounded-xl blur"></div>
      <h2 className="mb-4 bg-gradient-to-r from-indigo-500 to-blue-500 bg-clip-text text-transparent text-4xl font-extrabold inline-block">
        Contact Us
      </h2>
      <div className="mt-4 grid grid-cols-2 gap-10">
        <div>
          <p className="mb-8 px-0.5 leading-relaxed">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo
            doloremque optio aut officia necessitatibus in! Quia necessitatibus
            quidem ullam consequatur nesciunt vel rerum velit officiis. Veniam
            facere odit aperiam unde?
          </p>
          <ul className="flex flex-col gap-4">
            <li className="flex gap-2 items-center">
              <FaWhatsapp className="w-8 h-8" />
              <div className="flex gap-2">
                <a
                  href="https://wa.me/+6281267442466"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm md:text-base font-medium hover:text-indigo-500"
                >
                  +62 812-6744-2466 (Nadira)
                </a>
                <span>,</span>
                <a
                  href="https://wa.me/+6289678466465"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm md:text-base font-medium hover:text-indigo-500"
                >
                  +62 896-7846-6465 (Ziera)
                </a>
              </div>
            </li>
            <li className="flex gap-2 items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-mail w-8 h-8"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10z" />
                <path d="M3 7l9 6l9 -6" />
              </svg>
              <div className="flex gap-2">
                <a
                  href="mailto:admin@inahef.com"
                  className="text-sm md:text-base font-medium hover:text-indigo-500"
                >
                  admin@inahef.com
                </a>
                <span>,</span>
                <a
                  href="mailto:Ptpindo2023@gmail.com"
                  className="text-sm md:text-base font-medium hover:text-indigo-500"
                >
                  Ptpindo2023@gmail.com
                </a>
              </div>
            </li>
          </ul>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
