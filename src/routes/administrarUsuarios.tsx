import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/administrarUsuarios')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* SIDEBAR - LEFT PANEL */}
      <aside className="w-80 bg-white border-r border-gray-200 flex flex-col">
        {/* Sidebar Header */}
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Panel de Usuarios</h2>
          <button className="w-full bg-[#2E7D32] hover:bg-[#1B5E20] text-white font-medium py-3 px-4 rounded-xl transition-colors duration-200 flex items-center justify-center gap-2">
            <span className="text-xl">+</span>
            <span>Nuevo Usuario</span>
          </button>
        </div>

        {/* User List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {/* User Item 1 - Active */}
          <div className="p-4 rounded-xl bg-green-50 border-l-4 border-[#2E7D32] hover:bg-green-100 cursor-pointer transition-colors duration-200">
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-semibold text-gray-800">María González</h3>
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            </div>
            <span className="text-xs bg-[#2E7D32] text-white px-2 py-1 rounded-full">Administrador</span>
          </div>

          {/* User Item 2 */}
          <div className="p-4 rounded-xl bg-white hover:bg-gray-50 cursor-pointer transition-colors duration-200">
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-semibold text-gray-800">Carlos Ramírez</h3>
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            </div>
            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">Coordinador</span>
          </div>

          {/* User Item 3 */}
          <div className="p-4 rounded-xl bg-white hover:bg-gray-50 cursor-pointer transition-colors duration-200">
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-semibold text-gray-800">Ana Martínez</h3>
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            </div>
            <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">Voluntario</span>
          </div>

          {/* User Item 4 */}
          <div className="p-4 rounded-xl bg-white hover:bg-gray-50 cursor-pointer transition-colors duration-200">
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-semibold text-gray-800">Luis Fernández</h3>
              <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
            </div>
            <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">Voluntario</span>
          </div>

          {/* User Item 5 */}
          <div className="p-4 rounded-xl bg-white hover:bg-gray-50 cursor-pointer transition-colors duration-200">
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-semibold text-gray-800">Sofia López</h3>
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            </div>
            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">Coordinador</span>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* TOP HEADER */}
        <header className="bg-white border-b border-gray-200 p-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Administrar Usuarios</h1>
            <p className="text-gray-600 mb-6">Gestiona los usuarios del sistema, sus roles y permisos</p>
            
            {/* Search and Filters */}
            <div className="flex gap-4 items-center">
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Buscar usuarios por nombre o email..."
                  className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2E7D32] focus:border-transparent"
                />
                <svg className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              
              <select className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2E7D32] focus:border-transparent bg-white">
                <option>Todos los roles</option>
                <option>Administrador</option>
                <option>Coordinador</option>
                <option>Voluntario</option>
              </select>
              
              <select className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2E7D32] focus:border-transparent bg-white">
                <option>Todos los estados</option>
                <option>Activo</option>
                <option>Inactivo</option>
              </select>
            </div>
          </div>
        </header>

        {/* USERS GRID */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* User Card 1 */}
            <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 p-6 border border-gray-200">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-[#2E7D32] rounded-full flex items-center justify-center text-white font-bold text-lg">
                  MG
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 text-lg">María González</h3>
                  <p className="text-sm text-gray-600">maria.gonzalez@email.com</p>
                </div>
              </div>
              
              <div className="flex gap-2 mb-4">
                <span className="text-xs bg-[#2E7D32] text-white px-3 py-1 rounded-full font-medium">Administrador</span>
                <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium">Activo</span>
              </div>
              
              <div className="flex gap-2">
                <button className="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-700 font-medium py-2 px-4 rounded-lg transition-colors duration-200">
                  Editar
                </button>
                <button className="flex-1 bg-red-50 hover:bg-red-100 text-red-700 font-medium py-2 px-4 rounded-lg transition-colors duration-200">
                  Eliminar
                </button>
              </div>
            </div>

            {/* User Card 2 */}
            <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 p-6 border border-gray-200">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  CR
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 text-lg">Carlos Ramírez</h3>
                  <p className="text-sm text-gray-600">carlos.ramirez@email.com</p>
                </div>
              </div>
              
              <div className="flex gap-2 mb-4">
                <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">Coordinador</span>
                <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium">Activo</span>
              </div>
              
              <div className="flex gap-2">
                <button className="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-700 font-medium py-2 px-4 rounded-lg transition-colors duration-200">
                  Editar
                </button>
                <button className="flex-1 bg-red-50 hover:bg-red-100 text-red-700 font-medium py-2 px-4 rounded-lg transition-colors duration-200">
                  Eliminar
                </button>
              </div>
            </div>

            {/* User Card 3 */}
            <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 p-6 border border-gray-200">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  AM
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 text-lg">Ana Martínez</h3>
                  <p className="text-sm text-gray-600">ana.martinez@email.com</p>
                </div>
              </div>
              
              <div className="flex gap-2 mb-4">
                <span className="text-xs bg-purple-100 text-purple-700 px-3 py-1 rounded-full font-medium">Voluntario</span>
                <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium">Activo</span>
              </div>
              
              <div className="flex gap-2">
                <button className="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-700 font-medium py-2 px-4 rounded-lg transition-colors duration-200">
                  Editar
                </button>
                <button className="flex-1 bg-red-50 hover:bg-red-100 text-red-700 font-medium py-2 px-4 rounded-lg transition-colors duration-200">
                  Eliminar
                </button>
              </div>
            </div>

            {/* User Card 4 */}
            <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 p-6 border border-gray-200">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  LF
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 text-lg">Luis Fernández</h3>
                  <p className="text-sm text-gray-600">luis.fernandez@email.com</p>
                </div>
              </div>
              
              <div className="flex gap-2 mb-4">
                <span className="text-xs bg-purple-100 text-purple-700 px-3 py-1 rounded-full font-medium">Voluntario</span>
                <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full font-medium">Inactivo</span>
              </div>
              
              <div className="flex gap-2">
                <button className="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-700 font-medium py-2 px-4 rounded-lg transition-colors duration-200">
                  Editar
                </button>
                <button className="flex-1 bg-red-50 hover:bg-red-100 text-red-700 font-medium py-2 px-4 rounded-lg transition-colors duration-200">
                  Eliminar
                </button>
              </div>
            </div>

            {/* User Card 5 */}
            <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 p-6 border border-gray-200">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-pink-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  SL
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 text-lg">Sofia López</h3>
                  <p className="text-sm text-gray-600">sofia.lopez@email.com</p>
                </div>
              </div>
              
              <div className="flex gap-2 mb-4">
                <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">Coordinador</span>
                <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium">Activo</span>
              </div>
              
              <div className="flex gap-2">
                <button className="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-700 font-medium py-2 px-4 rounded-lg transition-colors duration-200">
                  Editar
                </button>
                <button className="flex-1 bg-red-50 hover:bg-red-100 text-red-700 font-medium py-2 px-4 rounded-lg transition-colors duration-200">
                  Eliminar
                </button>
              </div>
            </div>

            {/* User Card 6 */}
            <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 p-6 border border-gray-200">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-teal-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  JM
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 text-lg">Juan Morales</h3>
                  <p className="text-sm text-gray-600">juan.morales@email.com</p>
                </div>
              </div>
              
              <div className="flex gap-2 mb-4">
                <span className="text-xs bg-purple-100 text-purple-700 px-3 py-1 rounded-full font-medium">Voluntario</span>
                <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium">Activo</span>
              </div>
              
              <div className="flex gap-2">
                <button className="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-700 font-medium py-2 px-4 rounded-lg transition-colors duration-200">
                  Editar
                </button>
                <button className="flex-1 bg-red-50 hover:bg-red-100 text-red-700 font-medium py-2 px-4 rounded-lg transition-colors duration-200">
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* SIDE PANEL - RIGHT (User Detail Preview) */}
      <aside className="w-96 bg-white border-l border-gray-200 p-6 overflow-y-auto">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Detalles del Usuario</h2>
        
        {/* User Avatar and Name */}
        <div className="text-center mb-6">
          <div className="w-24 h-24 bg-[#2E7D32] rounded-full flex items-center justify-center text-white font-bold text-3xl mx-auto mb-4">
            MG
          </div>
          <h3 className="text-2xl font-bold text-gray-900">María González</h3>
          <p className="text-gray-600">maria.gonzalez@email.com</p>
        </div>

        {/* User Details */}
        <div className="space-y-4">
          <div className="bg-gray-50 rounded-xl p-4">
            <label className="text-sm font-semibold text-gray-600 block mb-1">Nombre Completo</label>
            <p className="text-gray-900 font-medium">María González</p>
          </div>

          <div className="bg-gray-50 rounded-xl p-4">
            <label className="text-sm font-semibold text-gray-600 block mb-1">Email</label>
            <p className="text-gray-900 font-medium">maria.gonzalez@email.com</p>
          </div>

          <div className="bg-gray-50 rounded-xl p-4">
            <label className="text-sm font-semibold text-gray-600 block mb-1">Rol</label>
            <span className="inline-block text-xs bg-[#2E7D32] text-white px-3 py-1 rounded-full font-medium">Administrador</span>
          </div>

          <div className="bg-gray-50 rounded-xl p-4">
            <label className="text-sm font-semibold text-gray-600 block mb-1">Estado</label>
            <span className="inline-block text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium">Activo</span>
          </div>

          <div className="bg-gray-50 rounded-xl p-4">
            <label className="text-sm font-semibold text-gray-600 block mb-1">Último Acceso</label>
            <p className="text-gray-900 font-medium">01 Mayo 2026, 14:30</p>
          </div>

          <div className="bg-gray-50 rounded-xl p-4">
            <label className="text-sm font-semibold text-gray-600 block mb-1">Fecha de Registro</label>
            <p className="text-gray-900 font-medium">15 Enero 2026</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 space-y-3">
          <button className="w-full bg-[#2E7D32] hover:bg-[#1B5E20] text-white font-medium py-3 px-4 rounded-xl transition-colors duration-200">
            Editar Usuario
          </button>
          <button className="w-full bg-red-50 hover:bg-red-100 text-red-700 font-medium py-3 px-4 rounded-xl transition-colors duration-200">
            Eliminar Usuario
          </button>
        </div>
      </aside>

      {/* MODAL - Create/Edit User (Hidden by default) */}
      <div className="hidden fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto m-4">
          {/* Modal Header */}
          <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-2xl">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Crear Nuevo Usuario</h2>
              <button className="text-gray-400 hover:text-gray-600 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Modal Body */}
          <div className="p-6 space-y-6">
            {/* Avatar Selection */}
            <div className="text-center">
              <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center text-gray-400 font-bold text-3xl mx-auto mb-4 cursor-pointer hover:bg-gray-300 transition-colors">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <p className="text-sm text-gray-600">Click para subir foto</p>
            </div>

            {/* Form Fields */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Nombre Completo</label>
                <input
                  type="text"
                  placeholder="Ingrese el nombre completo"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2E7D32] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  placeholder="usuario@email.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2E7D32] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Contraseña</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2E7D32] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Confirmar Contraseña</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2E7D32] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Rol</label>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2E7D32] focus:border-transparent bg-white">
                  <option>Seleccione un rol</option>
                  <option>Administrador</option>
                  <option>Coordinador</option>
                  <option>Voluntario</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Estado</label>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2E7D32] focus:border-transparent bg-white">
                  <option>Activo</option>
                  <option>Inactivo</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Teléfono (Opcional)</label>
                <input
                  type="tel"
                  placeholder="+506 1234-5678"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2E7D32] focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 p-6 rounded-b-2xl flex gap-3">
            <button className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-3 px-4 rounded-xl transition-colors duration-200">
              Cancelar
            </button>
            <button className="flex-1 bg-[#2E7D32] hover:bg-[#1B5E20] text-white font-medium py-3 px-4 rounded-xl transition-colors duration-200">
              Crear Usuario
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Made with Bob
