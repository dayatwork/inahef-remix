import { cn } from "~/lib/utils";

interface Day {
  date: React.ReactNode;
  dateTime: string;
  summary: string;
  timeSlots: Array<{
    name: string;
    description: string | null;
    start: string;
    end: string;
  }>;
}

const schedule: Array<Day> = [
  {
    date: "September 16",
    dateTime: "2024-09-16",
    summary:
      "The first day of the conference is focused on dark patterns for ecommerce.",
    timeSlots: [
      {
        name: "Steven McHail",
        description: "Not so one-time payments",
        start: "9:00AM",
        end: "10:00AM",
      },
      {
        name: "Jaquelin Isch",
        description: "The finer print",
        start: "10:00AM",
        end: "11:00AM",
      },
      {
        name: "Dianne Guilianelli",
        description: "Post-purchase blackmail",
        start: "11:00AM",
        end: "12:00PM",
      },
      {
        name: "Lunch",
        description: null,
        start: "12:00PM",
        end: "1:00PM",
      },
      {
        name: "Ronni Cantadore",
        description: "Buy or die",
        start: "1:00PM",
        end: "2:00PM",
      },
      {
        name: "Erhart Cockrin",
        description: "In-person cancellation",
        start: "2:00PM",
        end: "3:00PM",
      },
      {
        name: "Parker Johnson",
        description: "The pay/cancel switcheroo",
        start: "3:00PM",
        end: "4:00PM",
      },
    ],
  },
  {
    date: "September 17",
    dateTime: "2024-09-17",
    summary:
      "Next we spend the day talking about deceiving people with technology.",
    timeSlots: [
      {
        name: "Damaris Kimura",
        description: "The invisible card reader",
        start: "9:00AM",
        end: "10:00AM",
      },
      {
        name: "Ibrahim Frasch",
        description: "Stealing fingerprints",
        start: "10:00AM",
        end: "11:00AM",
      },
      {
        name: "Cathlene Burrage",
        description: "Voting machines",
        start: "11:00AM",
        end: "12:00PM",
      },
      {
        name: "Lunch",
        description: null,
        start: "12:00PM",
        end: "1:00PM",
      },
      {
        name: "Rinaldo Beynon",
        description: "Blackhat SEO that works",
        start: "1:00PM",
        end: "2:00PM",
      },
      {
        name: "Waylon Hyden",
        description: "Turning your audience into a botnet",
        start: "2:00PM",
        end: "3:00PM",
      },
      {
        name: "Giordano Sagucio",
        description: "Fly phishing",
        start: "3:00PM",
        end: "4:00PM",
      },
    ],
  },
  {
    date: "September 18",
    dateTime: "2024-09-18",
    summary:
      "We close out the event previewing new techniques that are still in development.",
    timeSlots: [
      {
        name: "Andrew Greene",
        description: "Neuralink dark patterns",
        start: "9:00AM",
        end: "10:00AM",
      },
      {
        name: "Heather Terry",
        description: "DALL-E for passports",
        start: "10:00AM",
        end: "11:00AM",
      },
      {
        name: "Piers Wilkins",
        description: "Quantum password cracking",
        start: "11:00AM",
        end: "12:00PM",
      },
      {
        name: "Lunch",
        description: null,
        start: "12:00PM",
        end: "1:00PM",
      },
      {
        name: "Gordon Sanderson",
        description: "SkyNet is coming",
        start: "1:00PM",
        end: "2:00PM",
      },
      {
        name: "Kimberly Parsons",
        description: "Dark patterns for the metaverse",
        start: "2:00PM",
        end: "3:00PM",
      },
      {
        name: "Richard Astley",
        description: "Knowing the game and playing it",
        start: "3:00PM",
        end: "4:00PM",
      },
    ],
  },
];

function DaySummary({ day }: { day: Day }) {
  return (
    <>
      <h3 className="text-2xl font-semibold tracking-tight text-white">
        <time dateTime={day.dateTime}>{day.date}</time>
      </h3>
      <p className="mt-1.5 text-base tracking-tight  text-neutral-400">
        {day.summary}
      </p>
    </>
  );
}

function TimeSlots({ day, className }: { day: Day; className?: string }) {
  return (
    <ol
      className={cn(
        className,
        "space-y-8 bg-white/5 px-10 py-14 text-center shadow-xl shadow-indigo-900/5 backdrop-blur rounded-3xl"
      )}
    >
      {day.timeSlots.map((timeSlot, timeSlotIndex) => (
        <li
          key={timeSlot.start}
          aria-label={`${timeSlot.name} talking about ${timeSlot.description} at ${timeSlot.start} - ${timeSlot.end} PST`}
        >
          {timeSlotIndex > 0 && (
            <div className="mx-auto mb-8 h-px w-48 bg-indigo-400/10" />
          )}
          <h4 className="text-lg font-semibold tracking-tight text-indigo-400">
            {timeSlot.name}
          </h4>
          {timeSlot.description && (
            <p className="mt-1 tracking-tight text-indigo-600">
              {timeSlot.description}
            </p>
          )}
          <p className="mt-1 font-mono text-sm text-neutral-400">
            <time dateTime={`${day.dateTime}T${timeSlot.start}-08:00`}>
              {timeSlot.start}
            </time>{" "}
            -{" "}
            <time dateTime={`${day.dateTime}T${timeSlot.end}-08:00`}>
              {timeSlot.end}
            </time>{" "}
            PST
          </p>
        </li>
      ))}
    </ol>
  );
}

export default function Schedule() {
  return (
    <section className="max-w-7xl mx-auto px-8 w-full relative py-32">
      <div className="absolute inset-0 h-1 bg-gradient-to-r from-indigo-500 to-blue-500 w-[200px] mx-auto rounded-xl opacity-50"></div>
      <div className="absolute inset-0 h-1 bg-gradient-to-r from-indigo-500 to-blue-500 w-[200px] mx-auto rounded-xl blur"></div>
      <h2 className="mb-4 bg-gradient-to-r from-indigo-500 to-blue-500 bg-clip-text text-transparent text-4xl font-extrabold inline-block">
        Schedule
      </h2>
      <div className="mt-6 grid grid-cols-3 gap-x-8">
        {schedule.map((day) => (
          <section key={day.dateTime}>
            <DaySummary day={day} />
            <TimeSlots day={day} className="mt-10" />
          </section>
        ))}
      </div>
    </section>
  );
}
