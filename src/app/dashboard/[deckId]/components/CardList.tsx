"use client"

import { useState } from "react"
import type { Card } from "@/lib/types"
import { Trash2, Eye, EyeOff, CheckCircle } from "lucide-react"
import { ConfirmModal } from "@/components/ui/ConfirmModal"

interface CardListProps {
  cards: Card[]
  onDeleteCard: (id: string) => Promise<void>
}

export default function CardList({ cards, onDeleteCard }: CardListProps) {
  const [showAnswers, setShowAnswers] = useState<Record<string, boolean>>({})
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)
  const [deleting, setDeleting] = useState(false)

  const toggleAnswer = (cardId: string) => {
    setShowAnswers((prev) => ({
      ...prev,
      [cardId]: !prev[cardId],
    }))
  }

  const handleDelete = async (cardId: string) => {
    setDeleting(true)
    try {
      await onDeleteCard(cardId)
    } catch (error) {
      console.error("Error deleting card:", error)
    } finally {
      setDeleting(false)
      setDeleteConfirm(null)
    }
  }

  const renderCardContent = (card: Card) => {
    switch (card.type) {
      case "MULTIPLE_CHOICE":
        return (
          <div>
            <div className="mb-3">
              <h3 className="font-medium text-gray-900 mb-2">Pregunta:</h3>
              <p className="text-gray-700">{card.front}</p>
            </div>

            {card.options && (
              <div className="mb-3">
                <h4 className="font-medium text-gray-900 mb-2">Opciones:</h4>
                <div className="space-y-1">
                  {card.options.map((option, index) => (
                    <div key={index} className="flex items-center gap-2">
                      {Array.isArray(card.correct) && card.correct.includes(index) ? (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      ) : (
                        <div className="w-4 h-4 rounded-full border border-gray-300" />
                      )}
                      <span className="text-sm text-gray-600">
                        {String.fromCharCode(65 + index)}. {option}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="mb-3">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="font-medium text-gray-900">Explicación:</h3>
                <button
                  onClick={() => toggleAnswer(card.id)}
                  className="text-emerald-600 hover:text-emerald-700 transition-colors"
                >
                  {showAnswers[card.id] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {showAnswers[card.id] ? (
                <p className="text-gray-700">{card.back}</p>
              ) : (
                <p className="text-gray-400 italic">Haz clic en el ojo para ver la explicación</p>
              )}
            </div>
          </div>
        )

      case "TRUE_FALSE":
        return (
          <div>
            <div className="mb-3">
              <h3 className="font-medium text-gray-900 mb-2">Pregunta:</h3>
              <p className="text-gray-700">{card.front}</p>
            </div>


            <div className="mb-3">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="font-medium text-gray-900">Respuesta:</h3>
                <button
                  onClick={() => toggleAnswer(card.id)}
                  className="text-emerald-600 hover:text-emerald-700 transition-colors"
                >
                  {showAnswers[card.id] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {showAnswers[card.id] ? (
                <p className="text-gray-700">{card.back}</p>
              ) : (
                <p className="text-gray-400 italic">Haz clic en el ojo para ver la explicación</p>
              )}
            </div>
          </div>
        )

      default:
        return (
          <div>
            <div className="mb-3">
              <h3 className="font-medium text-gray-900 mb-2">Pregunta:</h3>
              <p className="text-gray-700">{card.front}</p>
            </div>

            <div className="mb-3">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="font-medium text-gray-900">Respuesta:</h3>
                <button
                  onClick={() => toggleAnswer(card.id)}
                  className="text-emerald-600 hover:text-emerald-700 transition-colors"
                >
                  {showAnswers[card.id] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {showAnswers[card.id] ? (
                <p className="text-gray-700">{card.back}</p>
              ) : (
                <p className="text-gray-400 italic">Haz clic en el ojo para ver la respuesta</p>
              )}
            </div>
          </div>
        )
    }
  }

  if (cards.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Eye className="w-8 h-8 text-gray-300" />
        </div>
        <p>No hay tarjetas en este mazo aún.</p>
        <p className="text-sm">¡Agrega tu primera tarjeta para empezar!</p>
      </div>
    )
  }

  return (
      <>

      <div className="space-y-3">
        {cards.map((card) => (
          <div key={card.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs rounded-full">
                    {card.type.replace("_", " ")}
                  </span>
                  {card.timesReviewed > 0 && (
                    <span className="text-xs text-gray-500">Revisada {card.timesReviewed} veces</span>
                  )}
                </div>

                {renderCardContent(card)}
              </div>

              <button
                onClick={() => setDeleteConfirm(card.id)}
                className="text-gray-400 hover:text-red-500 transition-colors ml-4"
              >
                <Trash2 className="w-6 h-6" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {deleteConfirm && (
        <ConfirmModal
          open={!!deleteConfirm}
          title="¿Eliminar tarjeta?"
          message="Esta acción no se puede deshacer."
          resourceName={cards.find((c) => c.id === deleteConfirm)?.front || "Tarjeta"}
          confirmLabel="Eliminar"
          cancelLabel="Cancelar"
          onConfirm={() => handleDelete(deleteConfirm)}
          onClose={() => setDeleteConfirm(null)}
          loading={deleting}
        />
      )}
        
   </>
  )
}
