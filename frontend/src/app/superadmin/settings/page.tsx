export default function SettingsAdmin() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Settings</h1>
      <p className="text-gray-500 mb-8">Manage admin preferences and portfolio configuration.</p>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8 max-w-xl space-y-6">
        <div>
          <h3 className="text-base font-bold text-gray-900 mb-1">Admin Account</h3>
          <p className="text-sm text-gray-500 mb-4">Current session details</p>
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 text-sm space-y-1 font-mono">
            <div>Username: admin</div>
            <div>Auth Type: JWT Token</div>
          </div>
        </div>
      </div>
    </div>
  );
}
