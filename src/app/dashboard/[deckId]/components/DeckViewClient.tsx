"use client"

import { useCards } from "@/hooks/useCards"
import CreateCardForm from "./CreateCardForm"
import CardList from "./CardList"
import LoadingSkeleton from "@/components/LoadingSkeleton"
import { Link, Play } from "lucide-react"

interface DeckViewClientProps {
  deckId: string
}

export default function DeckViewClient({ deckId }: DeckViewClientProps) {
  const { cards, loading, error, createCard, deleteCard, deck } = useCards(deckId)


  if (loading) {
    return <LoadingSkeleton />
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-600 mb-4">Error: {error}</div>
        <button
          onClick={() => window.location.reload()}
          className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
        >
          Reintentar
        </button>
      </div>
    )
  }

  return (
    <>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{deck?.name}</h1>
            {deck?.description && <p className="text-gray-600 mb-2">{deck.description}</p>}
          </div>

          <Link
          href={`/study/${deck?.id}`}
          className="inline-flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
          style={{ backgroundColor: deck?.color || "#10B981" }}
        >
          <Play className="w-4 h-4" />
          Estudiar
        </Link>
        </div>
      </div>
      <div className="space-y-6">

        <CreateCardForm onCreateCard={createCard} deckId={deckId} />
        <CardList cards={cards} onDeleteCard={deleteCard} />
      </div>
    </>
  )
}
