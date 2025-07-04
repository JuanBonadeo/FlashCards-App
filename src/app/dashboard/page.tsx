
import DashboardClient from "./components/DashboardClient"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Mis Mazos de Estudio</h1>
          <p className="text-gray-600">Organiza y estudia tus flashcards de manera eficiente</p>
        </div>

        <DashboardClient />
      </div>
    </div>
  )
}
