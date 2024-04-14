import WistiaPlayer from "~/components/wistia-player";

export default function AboutInahef() {
  return (
    <section className="max-w-7xl mx-auto px-8 w-full relative py-32">
      <div className="absolute inset-0 h-1 bg-gradient-to-r from-indigo-500 to-blue-500 w-[200px] mx-auto rounded-xl opacity-50"></div>
      <div className="absolute inset-0 h-1 bg-gradient-to-r from-indigo-500 to-blue-500 w-[200px] mx-auto rounded-xl blur"></div>
      <h2 className="mb-4 bg-gradient-to-r from-indigo-500 to-blue-500 bg-clip-text text-transparent text-4xl font-extrabold inline-block">
        INAHEF 2024
      </h2>
      <div className="mt-6 grid grid-cols-2 gap-20 items-start">
        <p className="text-lg leading-loose">
          An annual beacon of collaboration organized by the{" "}
          <a
            href="https://www.iahe.or.id/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-500 hover:text-blue-500"
          >
            Indonesian Association of Healthcare Engineering
          </a>
          , uniting various health professional associations in the pursuit of
          optimal and accessible building, electrical, mechanical, informatics,
          and waste management systems, as well as medical devices for
          healthcare facilities. This year, INAHEF will take place from
          September 16 to 18, 2024, in Jakarta, Indonesia. INAHEF’s mission
          aligns closely with the objectives of the Ministry of Health, focusing
          on preparing for and managing the comprehensive development of
          healthcare facilities in Indonesia from 2024 to 2029
        </p>
        <div className="relative">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-lg blur-lg opacity-40 group-hover:opacity-100 transition duration-200"></div>
          <div className="relative aspect-video w-full rounded-2xl overflow-hidden">
            <WistiaPlayer wrapper="inahef-video" videoId="orxdy5b59r" />
          </div>
        </div>
      </div>
    </section>
  );
}
