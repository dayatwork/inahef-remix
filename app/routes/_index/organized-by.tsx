import iaheLogo from "./assets/ptpi.png";
import kanLogo from "./assets/kan.png";
import kemenkesLogo from "./assets/kemenkes.png";
import ifheLogo from "./assets/ifhe.png";

export default function OrganizeBy() {
  return (
    <section className="max-w-7xl mx-auto px-8 w-full relative py-32 flex flex-col">
      <div className="absolute inset-0 h-1 bg-gradient-to-r from-indigo-500 to-blue-500 w-[200px] mx-auto rounded-xl opacity-50"></div>
      <div className="absolute inset-0 h-1 bg-gradient-to-r from-indigo-500 to-blue-500 w-[200px] mx-auto rounded-xl blur"></div>
      <h2 className="mb-4 bg-gradient-to-r from-indigo-500 to-blue-500 bg-clip-text text-transparent text-4xl font-extrabold inline-block">
        Organized By
      </h2>
      <div className="mt-8 flex gap-16">
        <div className="bg-white p-4 rounded-2xl relative w-[200px] shrink-0">
          <div className="absolute inset-0 bg-gradient-to-br from-white to-white/15 blur"></div>
          <img
            src={iaheLogo}
            alt="Logo IAHE"
            width={200}
            className="relative"
          />
        </div>
        <div>
          <h3 className="text-xl font-semibold">
            Indonesian Association of Healthcare Engineering (IAHE)
          </h3>
          <p className="mt-4 text-neutral-400">
            The International Association of Healthcare Engineering (IAHE) is a
            professional organization comprising technical experts and
            corporations involved in the construction, operation, and
            maintenance of hospitals in Indonesia. Established on October 3,
            2019, in Jakarta, the association was ratified by the Ministry of
            Law and Human Rights under the number AHU-0011147.AH.01.07. IAHE
            serves as a platform for engineering experts and hospital
            institutions to initiate and drive the establishment of policies,
            human resources, management systems, and collaborations aimed at
            realizing safe, high-quality, secure, environmentally friendly, and
            affordable hospitals in Indonesia (SMART).
          </p>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-20 mt-16">
        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-bold text-white">Member of</h3>
          <div className="flex items-center justify-center bg-white rounded-lg h-24 px-8 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-white to-white/15 blur"></div>
            <img
              alt="IFHE Logo"
              src={ifheLogo}
              width={160}
              className="relative"
            />
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-bold text-white">Accredited by</h3>
          <div className="flex items-center justify-center bg-white rounded-lg h-24 px-8 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-white to-white/15 blur"></div>
            <img
              alt="KAN Logo"
              src={kanLogo}
              width={160}
              className="relative"
            />
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-bold text-white">Partner of</h3>
          <div className="flex items-center justify-center bg-white rounded-lg h-24 px-8 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-white to-white/15 blur"></div>
            <img
              alt="Kemenkes Logo"
              src={kemenkesLogo}
              width={160}
              className="relative"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
