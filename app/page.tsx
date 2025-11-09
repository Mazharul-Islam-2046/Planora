import { AuthenticationDialog } from "@/components/ui/AuthenticationDialog";

export default function Home() {
  return (
    <>
      <div className="min-h-screen flex flex-col items-center gap-12 py-28">
        <div className="flex flex-col items-center gap-3">
          <h1 className="text-6xl font-semibold">Planora</h1>
          <p>An open source project for Managing your team&apos;s projects</p>
        </div>
        <AuthenticationDialog />
      </div>
    </>
  );
}
