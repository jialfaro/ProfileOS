import AgenticFactory3DDemo from '@/components/ui/demo'

export const metadata = {
  title: 'Agentic Factory 3D — ProfileOS Demo',
  description: 'Interactive 3D workshop machine integration',
}

export default function FactoryPage() {
  return (
    <main className="w-full h-screen bg-black overflow-hidden">
      <AgenticFactory3DDemo />
    </main>
  )
}
