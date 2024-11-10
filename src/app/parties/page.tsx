import Link from "next/link";
import PartyCard from "@/src/components/custom/parties/parties-card";

export enum TabOptions {
  sample = "sample",
  test = "test",
  specification = "specification",
  specificationLimit = "specificationLimit",
}

export default function Parites() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 py-12 px-4 md:px-6">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold mb-6">Parties</h1>
          <PartyCard />
        </div>
      </main>
    </div>
  );
}
