"use client"

import { useState } from "react"
import { BookOpen, Trash2, Play, Edit } from "lucide-react"
import type { Deck } from "@/lib/types"
import Link from "next/link"
import { ConfirmModal } from "./ui/ConfirmModal"

interface DeckCardProps {
  deck: Deck
  onDelete: (id: string) => Promise<void>
}

export default function DeckCard({ deck, onDelete }: DeckCardProps) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [deleting, setDeleting] = useState(false)

  const handleDelete = async () => {
    setDeleting(true)
    try {
      await onDelete(deck.id)
    } catch (error) {
      console.error("Error deleting deck:", error)
    } finally {
      setDeleting(false)
      setShowDeleteConfirm(false)
    }
  }

  const cardCount = deck._count?.cards || 0
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: deck.color + "20" }}
          >
            <BookOpen className="w-5 h-5" style={{ color: deck.color }} />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{deck.name}</h3>
            <p className="text-sm text-gray-500">{cardCount} tarjetas</p>
            {deck.description && <p className="text-xs text-gray-400 mt-1">{deck.description}</p>}
          </div>
        </div>

        <div className="flex gap-1">
          <Link
            href={`/dashboard/${deck.id}/edit`}
            className="text-gray-400 hover:text-emerald-500 transition-colors p-1"
          >
            <Edit className="w-4 h-4" />
          </Link>
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="text-gray-400 hover:text-red-500 transition-colors p-1"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex gap-2">
        <Link
          href={`/dashboard/${deck.id}`}
          className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors text-center text-sm font-medium"
        >
          Ver Mazo
        </Link>
        <Link
          href={`/study/${deck.id}`}
          className="flex-1 text-white py-2 px-4 rounded-lg hover:opacity-90 transition-colors text-center text-sm font-medium flex items-center justify-center gap-2"
          style={{ backgroundColor: deck.color }}
        >
          <Play className="w-4 h-4" />
          Estudiar
        </Link>
      </div>

      {showDeleteConfirm && (
        <ConfirmModal
          open={showDeleteConfirm}
          title="¿Eliminar mazo?"
          message="Esta acción no se puede deshacer. Se eliminarán todas las tarjetas del mazo"
          resourceName={deck.name}
          confirmLabel="Eliminar"
          cancelLabel="Cancelar"
          onConfirm={handleDelete}
          onClose={() => setShowDeleteConfirm(false)}
          loading={deleting}
        />

      )}

    </div>
  )
}
