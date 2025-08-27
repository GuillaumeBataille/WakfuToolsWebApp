export default function FourPaneLayout() {
  return (
    <div className="h-screen flex flex-col">
      {/* Zone du haut */}
      <header className="bg-blue-200 p-4">
        En haut
      </header>

      {/* Zone centrale avec left, center, right */}
      <div className="flex flex-1">
        {/* Gauche */}
        <aside className="w-1/4 bg-green-200 p-4">
          À gauche
        </aside>

        {/* Centre */}
        <main className="flex-1 bg-yellow-200 p-4">
          Centre
        </main>

        {/* Droite */}
        <aside className="w-1/4 bg-red-200 p-4">
          À droite
        </aside>
      </div>
    </div>
  );
}
