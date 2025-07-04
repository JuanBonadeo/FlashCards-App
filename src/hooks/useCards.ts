"use client"

import { useState, useEffect } from "react"
import type { Card, CreateCardData } from "@/lib/types"
import { Deck } from "@prisma/client"


export function useCards(deckId: string) {
  const [cards, setCards] = useState<Card[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [deck, setDeck] = useState<Deck | null>(null)

  const fetchDeckById = async (id: string) => {
    try {
      const response = await fetch(`/api/decks/${id}`)
      if (!response.ok) throw new Error("Error fetching deck")
      const json = await response.json()
      setDeck(json.data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error")
      return null
    }
  }
  const fetchCards = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/cards/by-deck/${deckId}`)
      if (!response.ok) throw new Error("Error fetching cards")
      const json = await response.json()
      setCards(json.data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error")
    } finally {
      setLoading(false)
    }
  }

  const createCard = async (cardData: CreateCardData) => {
    try {
      const response = await fetch("/api/cards", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cardData),
      })
      if (!response.ok) throw new Error("Error creating card")
      await fetchCards()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error")
    }
  }

  const deleteCard = async (id: string) => {
    try {
      const response = await fetch(`/api/cards/${id}`, {
        method: "DELETE",
      })
      if (!response.ok) throw new Error("Error deleting card")
      await fetchCards()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error")
    }
  }

  useEffect(() => {
    fetchDeckById(deckId)
    fetchCards()
  }, [deckId])

  return { cards, loading, error, deck, createCard, deleteCard, refetch: fetchCards }
}
