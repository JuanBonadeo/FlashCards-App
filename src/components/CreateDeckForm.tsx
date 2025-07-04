"use client"

import type React from "react"
import { useState } from "react"
import { Plus, X, Palette } from "lucide-react"
import type { CreateDeckData } from "@/lib/types"

interface CreateDeckFormProps {
  onCreateDeck: (deckData: CreateDeckData) => Promise<void>
}

const DECK_COLORS = [
  { name: "Verde", value: "#10B981" },
  { name: "Azul", value: "#3B82F6" },
  { name: "Rojo", value: "#EF4444" },
  { name: "Amarillo", value: "#F59E0B" },
  { name: "Púrpura", value: "#8B5CF6" },
  { name: "Rosa", value: "#EC4899" },
]

export default function CreateDeckForm({ onCreateDeck }: CreateDeckFormProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [selectedColor, setSelectedColor] = useState(DECK_COLORS[0].value)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return

    setLoading(true)
    try {
      await onCreateDeck({
        name: name.trim(),
        description: description.trim() || undefined,
        color: selectedColor,
      })
      setName("")
      setDescription("")
      setSelectedColor(DECK_COLORS[0].value)
      setIsOpen(false)
    } catch (error) {
      console.error("Error creating deck:", error)
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
        <Plus className="w-5 h-5" />
        Crear nuevo mazo
      </button>
    )
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Nuevo Mazo</h3>
        <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-600">
          <X className="w-5 h-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="deck-name" className="block text-sm font-medium text-gray-700 mb-2">
            Nombre del mazo
          </label>
          <input
            id="deck-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ej: Vocabulario en Inglés"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
            required
          />
        </div>

        <div>
          <label htmlFor="deck-description" className="block text-sm font-medium text-gray-700 mb-2">
            Descripción (opcional)
          </label>
          <textarea
            id="deck-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe el contenido del mazo..."
            rows={2}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Palette className="w-4 h-4 inline mr-1" />
            Color del mazo
          </label>
          <div className="flex gap-2">
            {DECK_COLORS.map((color) => (
              <button
                key={color.value}
                type="button"
                onClick={() => setSelectedColor(color.value)}
                className={`w-8 h-8 rounded-full border-2 transition-all ${
                  selectedColor === color.value ? "border-gray-400 scale-110" : "border-gray-200"
                }`}
                style={{ backgroundColor: color.value }}
                title={color.name}
              />
            ))}
          </div>
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={loading || !name.trim()}
            className="flex-1 bg-emerald-600 text-white py-2 px-4 rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? "Creando..." : "Crear Mazo"}
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
