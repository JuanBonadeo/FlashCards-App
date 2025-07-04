
import DeckViewClient from "./components/DeckViewClient"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"



export default async function DeckViewPage({params}: {params: Promise<{ deckId: string }>}) { 
  const { deckId } = await params;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al Dashboard
          </Link>

         
        </div>

         <DeckViewClient deckId={deckId} />
      </div>
    </div>
  )
}
