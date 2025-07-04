"use client"

import { useState, useEffect } from "react"
import type { Deck, CreateDeckData } from "@/lib/types"

export function useDecks() {
  const [decks, setDecks] = useState<Deck[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchDecks = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/decks")
      if (!response.ok) throw new Error("Error fetching decks")
      const json = await response.json()
      setDecks(json.data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error")
    } finally {
      setLoading(false)
    }
  }

  const createDeck = async (deckData: CreateDeckData) => {
    try {
      const response = await fetch("/api/decks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(deckData),
      })
      if (!response.ok) throw new Error("Error creating deck")
      await fetchDecks()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error")
    }
  }

  const deleteDeck = async (id: string) => {
    try {
      const response = await fetch(`/api/decks/${id}`, {
        method: "DELETE",
      })
      if (!response.ok) throw new Error("Error deleting deck")
      await fetchDecks()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error")
    }
  }

  const fetchDeckById = async (id: string) => {
    try {
      const response = await fetch(`/api/decks/${id}`)
      if (!response.ok) throw new Error("Error fetching deck")
      return await response.json()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error")
      return null
    }
  }



  useEffect(() => {
    fetchDecks()
  }, [])

  return { decks, loading, error, createDeck, deleteDeck, refetch: fetchDecks, fetchDeckById }
}
