export default function MediaAdmin() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Media Library</h1>
      <p className="text-gray-500 mb-8">Manage uploaded images, thumbnails, and gallery assets.</p>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-12 text-center">
        <div className="text-4xl mb-3">🖼️</div>
        <h3 className="text-lg font-bold text-gray-800 mb-1">Media Storage</h3>
        <p className="text-sm text-gray-500 max-w-md mx-auto mb-4">
          All images uploaded via project creation are automatically saved to <code className="bg-gray-100 px-2 py-0.5 rounded font-mono text-xs text-gray-700">/uploads/projects/</code>.
        </p>
      </div>
    </div>
  );
}
