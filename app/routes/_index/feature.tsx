import FeatureCard from "./components/feature-card";
import medicalCheckup from "./assets/mdical-checkup.jpg";
import exhibition from "./assets/exhibition.jpg";
import internationalCongress from "./assets/international-congress.jpg";

export default function Feature() {
  return (
    <section className="max-w-7xl mx-auto px-8 w-full relative py-32">
      <div className="absolute inset-0 h-1 bg-gradient-to-r from-indigo-500 to-blue-500 w-[200px] mx-auto rounded-xl opacity-50"></div>
      <div className="absolute inset-0 h-1 bg-gradient-to-r from-indigo-500 to-blue-500 w-[200px] mx-auto rounded-xl blur"></div>
      <h2 className="mb-4 bg-gradient-to-r from-indigo-500 to-blue-500 bg-clip-text text-transparent text-4xl font-extrabold inline-block">
        Events
      </h2>
      <div className="mt-6 grid grid-cols-3 gap-x-8">
        <FeatureCard imageSrc={medicalCheckup} title="Free Medical Check-up" />
        <FeatureCard imageSrc={exhibition} title="Exhibition" />
        <FeatureCard
          imageSrc={internationalCongress}
          title="International Congress"
        />
      </div>
    </section>
  );
}
