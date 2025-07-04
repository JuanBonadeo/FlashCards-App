"use client"

import { useDecks } from "@/hooks/useDecks"
import DeckCard from "@/components/DeckCard"
import CreateDeckForm from "@/components/CreateDeckForm"
import LoadingSkeleton from "@/components/LoadingSkeleton"
import { BookOpen } from "lucide-react"

export default function DashboardClient() {
  const { decks, loading, error, createDeck, deleteDeck } = useDecks()

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
  console.log("Decks:", decks)
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <CreateDeckForm onCreateDeck={createDeck} />

      {Array.isArray(decks) && decks.map((deck) => (
        <DeckCard key={deck.id} deck={deck} onDelete={deleteDeck} />
      ))}


      {decks.length === 0 && (
        <div className="col-span-full text-center py-12 text-gray-500">
          <BookOpen className="w-12 h-12 mx-auto mb-4 text-gray-300" />
          <p>No tienes mazos aún. ¡Crea tu primer mazo para empezar!</p>
        </div>
      )}
    </div>
  )
}
