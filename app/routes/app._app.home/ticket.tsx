import QRCode from "react-qr-code";

import logo from "~/assets/logo.png";

interface Props {
  id: string;
  name: string;
  ticketNumber: number;
}

export default function Ticket({ name, id, ticketNumber }: Props) {
  return (
    // <section className="w-full flex-grow bg-neutral-950 flex items-center justify-center p-4 py-10 rounded-2xl">
    <div className="flex w-full max-w-3xl text-neutral-900 h-64">
      {/* QR Code */}
      <div className="h-full bg-white flex flex-col gap-2 items-center justify-center rounded-l-3xl w-64 px-2">
        <h2 className="text-lg font-bold">INAHEF 2024</h2>

        <QRCode value={id} size={140} />
        <p className="text-center text-sm font-semibold">
          <span className="text-center text-sm font-semibold">{name}</span>
          {ticketNumber.toString().padStart(6, "0")}
        </p>
      </div>
      {/* Separator */}
      <div className="relative h-full flex flex-col items-center border-dashed justify-between border-2 bg-white border-neutral-900">
        <div className="absolute rounded-full w-8 h-8 bg-neutral-900 -top-5"></div>
        <div className="absolute rounded-full w-8 h-8 bg-neutral-900 -bottom-5"></div>
      </div>
      {/*  */}
      <div className="h-full py-8 px-10 bg-black flex-grow rounded-r-3xl flex flex-col relative overflow-hidden">
        <img
          alt="logo"
          src={logo}
          className="absolute -right-10 -rotate-12 opacity-5 -top-4 h-72 w-auto"
        />
        <div className="flex w-full justify-between items-center relative">
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-white">
              International Healthcare Engineering Forum 2024
            </span>
            <span className="text-neutral-500 text-sm">
              Embracing the Future: SMART Healthcare in 2030
            </span>
          </div>
        </div>
        <div className="w-full grid grid-cols-2 mt-auto relative">
          <div className="flex flex-col">
            <span className="text-xs text-neutral-400">Date</span>
            <span className="font-mono text-neutral-100">
              16-18 of September, 2024
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-neutral-400">Location</span>
            <span className="font-mono text-neutral-100">
              Jakarta, Indonesia
            </span>
          </div>
        </div>
      </div>
    </div>
    // </section>
  );
}
