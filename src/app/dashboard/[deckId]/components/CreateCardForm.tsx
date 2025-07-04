"use client"

import type React from "react"
import { useState } from "react"
import { Plus, X } from "lucide-react"
import type { CreateCardData, CardType } from "@/lib/types"

interface CreateCardFormProps {
  onCreateCard: (cardData: CreateCardData) => Promise<void>
  deckId: string
}

const CARD_TYPES: { value: CardType; label: string; description: string }[] = [
  { value: "DEFINITION", label: "Definición", description: "Pregunta → Respuesta" },
  { value: "MULTIPLE_CHOICE", label: "Opción Múltiple", description: "Pregunta con opciones A, B, C, D" },
  { value: "TRUE_FALSE", label: "Verdadero/Falso", description: "Pregunta de verdadero o falso" },
  { value: "FILL_BLANK", label: "Completar", description: "Completar espacios en blanco" },
]

export default function CreateCardForm({ onCreateCard, deckId }: CreateCardFormProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [cardType, setCardType] = useState<CardType>("DEFINITION")
  const [front, setFront] = useState("")
  const [back, setBack] = useState("")
  const [options, setOptions] = useState(["", "", "", ""])
  const [correctAnswer, setCorrectAnswer] = useState(0)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!front.trim() || !back.trim()) return

    setLoading(true)
    try {
      const cardData: CreateCardData = {
        type: cardType,
        front: front.trim(),
        back: back.trim(),
        deckId,
      }

      if (cardType === "MULTIPLE_CHOICE") {
        cardData.options = options.filter((opt) => opt.trim())
        cardData.correct = [correctAnswer]
      } else if (cardType === "TRUE_FALSE") {
        cardData.correct = back.toLowerCase().includes("verdadero") || back.toLowerCase().includes("true")
      }

      await onCreateCard(cardData)

      // Reset form
      setFront("")
      setBack("")
      setOptions(["", "", "", ""])
      setCorrectAnswer(0)
      setIsOpen(false)
    } catch (error) {
      console.error("Error creating card:", error)
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="w-full p-6 border-2 border-dashed border-emerald-300 rounded-xl text-emerald-600 hover:border-emerald-400 hover:bg-emerald-50 transition-colors flex items-center justify-center gap-2"
      >
        <Plus className="w-6 h-6" />
        Agregar nueva tarjeta
      </button>
    )
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Nueva Tarjeta</h3>
        <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-600">
          <X className="w-6 h-6" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de tarjeta</label>
          <select
            value={cardType}
            onChange={(e) => setCardType(e.target.value as CardType)}
            className="w-full px-3 py-2 border text-gray-900 border-gray-400 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
          >
            {CARD_TYPES.map((type) => (
              <option key={type.value} value={type.value} className="text-gray-900 w-full px-3 py-2 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none">
                {type.label} - {type.description}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="front" className="block text-sm font-medium text-gray-700 mb-2">
            {cardType === "MULTIPLE_CHOICE" ? "Pregunta" : "Frente"}
          </label>
          <textarea
            id="front"
            value={front}
            onChange={(e) => setFront(e.target.value)}
            placeholder="Escribe la pregunta o el frente de la tarjeta..."
            rows={3}
            className="w-full px-3 py-2 text-gray-900 border border-gray-400 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none resize-none"
            required
          />
        </div>

        {cardType === "MULTIPLE_CHOICE" && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Opciones</label>
            {options.map((option, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="radio"
                  name="correct"
                  checked={correctAnswer === index}
                  onChange={() => setCorrectAnswer(index)}
                  className="mt-2"
                />
                <input
                  type="text"
                  value={option}
                  onChange={(e) => {
                    const newOptions = [...options]
                    newOptions[index] = e.target.value
                    setOptions(newOptions)
                  }}
                  placeholder={`Opción ${String.fromCharCode(65 + index)}`}
                  className="flex-1 px-3 py-2  text-gray-900 border border-gray-400 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                />
              </div>
            ))}
          </div>
        )}

        <div>
          <label htmlFor="back" className="block text-sm font-medium text-gray-700 mb-2">
            {cardType === "MULTIPLE_CHOICE" ? "Explicación" : "Respuesta"}
          </label>
          <textarea
            id="back"
            value={back}
            onChange={(e) => setBack(e.target.value)}
            placeholder={
              cardType === "MULTIPLE_CHOICE" ? "Explica por qué es correcta la respuesta..." : "Escribe la respuesta..."
            }
            rows={3}
            className="w-full px-3 py-2 text-gray-900 border border-gray-400 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none resize-none"
            required
          />
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={loading || !front.trim() || !back.trim()}
            className="flex-1 bg-emerald-600 text-white py-2 px-4 rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? "Creando..." : "Crear Tarjeta"}
          </button>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  )
}
