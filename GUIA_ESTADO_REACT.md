# Guía: Manejo de Estado en React

## 📚 Índice
1. [¿Qué es el Estado?](#qué-es-el-estado)
2. [useState - Estado Local](#usestate---estado-local)
3. [useEffect - Efectos Secundarios](#useeffect---efectos-secundarios)
4. [Ejemplos Prácticos](#ejemplos-prácticos)
5. [Mejores Prácticas](#mejores-prácticas)

---

## ¿Qué es el Estado?

El **estado** en React es un objeto que contiene datos que pueden cambiar durante el ciclo de vida de un componente. Cuando el estado cambia, React automáticamente re-renderiza el componente para reflejar los nuevos valores.

### Características del Estado
- ✅ **Reactivo**: Cuando cambia, el componente se re-renderiza
- ✅ **Local**: Cada componente tiene su propio estado
- ✅ **Inmutable**: No se modifica directamente, se reemplaza
- ✅ **Asíncrono**: Las actualizaciones pueden ser agrupadas

---

## useState - Estado Local

`useState` es el hook más básico para manejar estado en componentes funcionales.

### Sintaxis Básica

```tsx
import { useState } from 'react'

function MiComponente() {
  // Declaración: [valorActual, funcionParaActualizar] = useState(valorInicial)
  const [contador, setContador] = useState(0)
  
  return (
    <div>
      <p>Contador: {contador}</p>
      <button onClick={() => setContador(contador + 1)}>
        Incrementar
      </button>
    </div>
  )
}
```

### Conceptos Clave

#### 1. **Declaración del Estado**
```tsx
const [estado, setEstado] = useState(valorInicial)
```
- `estado`: Variable que contiene el valor actual
- `setEstado`: Función para actualizar el estado
- `valorInicial`: Valor inicial del estado (puede ser cualquier tipo)

#### 2. **Tipos de Valores Iniciales**

```tsx
// Primitivos
const [nombre, setNombre] = useState('Juan')
const [edad, setEdad] = useState(25)
const [activo, setActivo] = useState(true)

// Objetos
const [usuario, setUsuario] = useState({
  nombre: 'María',
  email: 'maria@example.com'
})

// Arrays
const [items, setItems] = useState(['item1', 'item2'])

// Función inicializadora (para cálculos costosos)
const [datos, setDatos] = useState(() => {
  return calcularDatosIniciales()
})
```

#### 3. **Actualización del Estado**

```tsx
// ❌ INCORRECTO - No modificar directamente
contador = contador + 1

// ✅ CORRECTO - Usar la función set
setContador(contador + 1)

// ✅ CORRECTO - Usar función de actualización (recomendado)
setContador(prevContador => prevContador + 1)
```

#### 4. **Actualización de Objetos**

```tsx
const [usuario, setUsuario] = useState({
  nombre: 'Juan',
  edad: 25,
  ciudad: 'Madrid'
})

// ❌ INCORRECTO - Mutación directa
usuario.edad = 26

// ✅ CORRECTO - Crear nuevo objeto con spread operator
setUsuario({
  ...usuario,
  edad: 26
})

// ✅ CORRECTO - Actualizar múltiples propiedades
setUsuario(prev => ({
  ...prev,
  edad: 26,
  ciudad: 'Barcelona'
}))
```

#### 5. **Actualización de Arrays**

```tsx
const [items, setItems] = useState(['A', 'B', 'C'])

// Agregar elemento
setItems([...items, 'D'])
setItems(prev => [...prev, 'D'])

// Eliminar elemento
setItems(items.filter(item => item !== 'B'))

// Actualizar elemento
setItems(items.map(item => 
  item === 'B' ? 'B-modificado' : item
))

// Limpiar array
setItems([])
```

---

## useEffect - Efectos Secundarios

`useEffect` permite ejecutar código después de que el componente se renderiza. Es útil para operaciones como:
- Llamadas a APIs
- Suscripciones
- Manipulación del DOM
- Timers

### Sintaxis Básica

```tsx
import { useEffect } from 'react'

useEffect(() => {
  // Código que se ejecuta después del render
  
  return () => {
    // Función de limpieza (opcional)
  }
}, [dependencias])
```

### Casos de Uso

#### 1. **Ejecutar una vez al montar el componente**

```tsx
useEffect(() => {
  console.log('Componente montado')
  // Cargar datos iniciales
}, []) // Array vacío = solo se ejecuta una vez
```

#### 2. **Ejecutar cuando cambia una dependencia**

```tsx
const [contador, setContador] = useState(0)

useEffect(() => {
  console.log(`El contador cambió a: ${contador}`)
}, [contador]) // Se ejecuta cada vez que contador cambia
```

#### 3. **Múltiples dependencias**

```tsx
const [nombre, setNombre] = useState('')
const [edad, setEdad] = useState(0)

useEffect(() => {
  console.log(`Datos actualizados: ${nombre}, ${edad}`)
}, [nombre, edad]) // Se ejecuta cuando cualquiera cambia
```

#### 4. **Función de limpieza**

```tsx
useEffect(() => {
  // Crear suscripción o timer
  const timer = setInterval(() => {
    console.log('Tick')
  }, 1000)
  
  // Limpiar al desmontar o antes de re-ejecutar
  return () => {
    clearInterval(timer)
  }
}, [])
```

#### 5. **Fetch de datos**

```tsx
const [datos, setDatos] = useState(null)
const [cargando, setCargando] = useState(true)
const [error, setError] = useState(null)

useEffect(() => {
  const fetchDatos = async () => {
    try {
      setCargando(true)
      const response = await fetch('https://api.example.com/datos')
      const json = await response.json()
      setDatos(json)
    } catch (err) {
      setError(err.message)
    } finally {
      setCargando(false)
    }
  }
  
  fetchDatos()
}, []) // Solo al montar
```

---

## Ejemplos Prácticos

### Ejemplo 1: Contador Simple

```tsx
function Contador() {
  const [count, setCount] = useState(0)
  
  return (
    <div>
      <p>Has hecho clic {count} veces</p>
      <button onClick={() => setCount(count + 1)}>
        Incrementar
      </button>
      <button onClick={() => setCount(count - 1)}>
        Decrementar
      </button>
      <button onClick={() => setCount(0)}>
        Resetear
      </button>
    </div>
  )
}
```

### Ejemplo 2: Formulario Controlado

```tsx
function Formulario() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    mensaje: ''
  })
  
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Datos enviados:', formData)
  }
  
  return (
    <form onSubmit={handleSubmit}>
      <input
        name="nombre"
        value={formData.nombre}
        onChange={handleChange}
        placeholder="Nombre"
      />
      <input
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
      />
      <textarea
        name="mensaje"
        value={formData.mensaje}
        onChange={handleChange}
        placeholder="Mensaje"
      />
      <button type="submit">Enviar</button>
    </form>
  )
}
```

### Ejemplo 3: Toggle/Switch

```tsx
function Toggle() {
  const [activo, setActivo] = useState(false)
  
  return (
    <div>
      <p>Estado: {activo ? 'Activo' : 'Inactivo'}</p>
      <button onClick={() => setActivo(!activo)}>
        {activo ? 'Desactivar' : 'Activar'}
      </button>
    </div>
  )
}
```

### Ejemplo 4: Lista con Agregar/Eliminar

```tsx
function ListaTareas() {
  const [tareas, setTareas] = useState([])
  const [nuevaTarea, setNuevaTarea] = useState('')
  
  const agregarTarea = () => {
    if (nuevaTarea.trim()) {
      setTareas([...tareas, {
        id: Date.now(),
        texto: nuevaTarea,
        completada: false
      }])
      setNuevaTarea('')
    }
  }
  
  const eliminarTarea = (id) => {
    setTareas(tareas.filter(tarea => tarea.id !== id))
  }
  
  const toggleTarea = (id) => {
    setTareas(tareas.map(tarea =>
      tarea.id === id
        ? { ...tarea, completada: !tarea.completada }
        : tarea
    ))
  }
  
  return (
    <div>
      <input
        value={nuevaTarea}
        onChange={(e) => setNuevaTarea(e.target.value)}
        placeholder="Nueva tarea"
      />
      <button onClick={agregarTarea}>Agregar</button>
      
      <ul>
        {tareas.map(tarea => (
          <li key={tarea.id}>
            <input
              type="checkbox"
              checked={tarea.completada}
              onChange={() => toggleTarea(tarea.id)}
            />
            <span style={{
              textDecoration: tarea.completada ? 'line-through' : 'none'
            }}>
              {tarea.texto}
            </span>
            <button onClick={() => eliminarTarea(tarea.id)}>
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
```

### Ejemplo 5: Reloj con useEffect

```tsx
function Reloj() {
  const [hora, setHora] = useState(new Date())
  
  useEffect(() => {
    const timer = setInterval(() => {
      setHora(new Date())
    }, 1000)
    
    // Limpieza al desmontar
    return () => clearInterval(timer)
  }, [])
  
  return (
    <div>
      <h2>Hora actual:</h2>
      <p>{hora.toLocaleTimeString()}</p>
    </div>
  )
}
```

---

## Mejores Prácticas

### ✅ DO (Hacer)

1. **Usar nombres descriptivos**
   ```tsx
   const [isLoading, setIsLoading] = useState(false)
   const [userData, setUserData] = useState(null)
   ```

2. **Inicializar con el tipo correcto**
   ```tsx
   const [items, setItems] = useState([]) // Array vacío
   const [user, setUser] = useState(null) // null para objetos opcionales
   ```

3. **Usar función de actualización para estados dependientes**
   ```tsx
   setCount(prev => prev + 1) // ✅ Correcto
   ```

4. **Agrupar estado relacionado**
   ```tsx
   const [formData, setFormData] = useState({
     nombre: '',
     email: '',
     telefono: ''
   })
   ```

5. **Especificar dependencias correctamente en useEffect**
   ```tsx
   useEffect(() => {
     // código
   }, [dependency1, dependency2])
   ```

### ❌ DON'T (No hacer)

1. **No mutar el estado directamente**
   ```tsx
   // ❌ Incorrecto
   state.value = newValue
   
   // ✅ Correcto
   setState({ ...state, value: newValue })
   ```

2. **No usar estado para valores derivados**
   ```tsx
   // ❌ Incorrecto
   const [items, setItems] = useState([])
   const [itemCount, setItemCount] = useState(0)
   
   // ✅ Correcto
   const [items, setItems] = useState([])
   const itemCount = items.length // Calculado
   ```

3. **No olvidar las dependencias en useEffect**
   ```tsx
   // ❌ Incorrecto - falta dependencia
   useEffect(() => {
     console.log(count)
   }, [])
   
   // ✅ Correcto
   useEffect(() => {
     console.log(count)
   }, [count])
   ```

4. **No crear múltiples estados para lo mismo**
   ```tsx
   // ❌ Incorrecto
   const [firstName, setFirstName] = useState('')
   const [lastName, setLastName] = useState('')
   const [email, setEmail] = useState('')
   
   // ✅ Mejor
   const [user, setUser] = useState({
     firstName: '',
     lastName: '',
     email: ''
   })
   ```

---

## Errores Comunes

### 1. Actualización directa del estado
```tsx
// ❌ Error
const [user, setUser] = useState({ name: 'Juan' })
user.name = 'Pedro' // No funciona

// ✅ Solución
setUser({ ...user, name: 'Pedro' })
```

### 2. Usar estado anterior sin función
```tsx
// ❌ Puede causar problemas
setCount(count + 1)
setCount(count + 1) // No suma 2, suma 1

// ✅ Solución
setCount(prev => prev + 1)
setCount(prev => prev + 1) // Suma 2 correctamente
```

### 3. useEffect sin dependencias correctas
```tsx
// ❌ Error - loop infinito
useEffect(() => {
  setData(fetchData())
}) // Sin array de dependencias

// ✅ Solución
useEffect(() => {
  setData(fetchData())
}, []) // Array vacío
```

### 4. No limpiar efectos
```tsx
// ❌ Error - memory leak
useEffect(() => {
  const timer = setInterval(() => {}, 1000)
}) // No se limpia

// ✅ Solución
useEffect(() => {
  const timer = setInterval(() => {}, 1000)
  return () => clearInterval(timer)
}, [])
```

---

## Recursos Adicionales

- [Documentación oficial de React - useState](https://react.dev/reference/react/useState)
- [Documentación oficial de React - useEffect](https://react.dev/reference/react/useEffect)
- [React Hooks - Guía completa](https://react.dev/learn/state-a-components-memory)

---

## Próximos Pasos

Una vez domines `useState` y `useEffect`, puedes explorar:
- `useReducer` - Para estado complejo
- `useContext` - Para compartir estado entre componentes
- `useMemo` y `useCallback` - Para optimización
- Librerías de estado global (Zustand, Redux, Jotai)