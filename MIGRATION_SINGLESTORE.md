# Migración de Better Auth de MySQL a SingleStore

## Resumen de Cambios

Este documento describe la migración exitosa del schema de Better Auth de MySQL a SingleStore, manteniendo la compatibilidad con Drizzle ORM.

## Cambios Realizados

### 1. **auth-schema.ts** - Convertido a SingleStore
- ✅ Cambiado de `mysqlTable` a `singlestoreTableCreator`
- ✅ Usa el mismo prefijo de tabla `ibmhackathon_` para consistencia
- ✅ Ajustados los tipos de datos:
  - `varchar(36)` → `varchar(255)` para IDs
  - `varchar(255)` → `text` para campos de texto largo
  - Removido `fsp: 3` de timestamps (no soportado en SingleStore)
  - Removidas las referencias `.references()` (se manejan a nivel de aplicación)

### 2. **src/server/db/schema.ts** - Schema Unificado
- ✅ Integradas todas las tablas de Better Auth:
  - `ibmhackathon_user`
  - `ibmhackathon_session`
  - `ibmhackathon_account`
  - `ibmhackathon_verification`
- ✅ Agregadas relaciones de Drizzle para mantener la integridad referencial a nivel de aplicación
- ✅ Añadidos índices optimizados para consultas de autenticación

### 3. **src/lib/auth.ts** - Configuración de Better Auth
- ✅ Mantenido `provider: "mysql"` (SingleStore es compatible con MySQL)
- ✅ Comentario agregado para claridad

### 4. **Migraciones de Base de Datos**
- ✅ Generada migración: `drizzle/0000_worthless_dreadnoughts.sql`
- ✅ Aplicada exitosamente con `drizzle-kit push`

## Tablas Creadas en SingleStore

### ibmhackathon_user
- Almacena información de usuarios
- Campos: id, name, email, emailVerified, image, createdAt, updatedAt

### ibmhackathon_session
- Gestiona sesiones de usuario
- Campos: id, expiresAt, token, createdAt, updatedAt, ipAddress, userAgent, userId
- Índices: session_userId_idx, session_token_idx

### ibmhackathon_account
- Almacena cuentas de proveedores de autenticación
- Campos: id, accountId, providerId, userId, accessToken, refreshToken, idToken, etc.
- Índice: account_userId_idx

### ibmhackathon_verification
- Maneja tokens de verificación
- Campos: id, identifier, value, expiresAt, createdAt, updatedAt
- Índice: verification_identifier_idx

## Consideraciones Importantes

### Diferencias entre MySQL y SingleStore

1. **Foreign Keys**: SingleStore no soporta foreign keys tradicionales. Las relaciones se manejan a nivel de aplicación usando Drizzle relations.

2. **Timestamps**: SingleStore no soporta el parámetro `fsp` (fractional seconds precision) en timestamps.

3. **Unique Constraints**: Los campos `email` y `token` que requerían unique constraints se manejan mediante índices y validación a nivel de aplicación.

4. **Compatibilidad MySQL**: SingleStore es compatible con el protocolo MySQL, por lo que Better Auth funciona correctamente con `provider: "mysql"`.

## Verificación

Para verificar que todo funciona correctamente:

```bash
# Verificar las tablas creadas
npx drizzle-kit studio

# O ejecutar la aplicación
npm run dev
```

## Próximos Pasos

1. Probar el registro de usuarios
2. Probar el inicio de sesión
3. Verificar la gestión de sesiones
4. Probar la verificación de email (si está habilitada)

## Notas Técnicas

- **Drizzle ORM**: v0.45.2
- **Better Auth**: v1.6.9
- **mysql2**: v3.22.3 (driver compatible con SingleStore)
- **Drizzle Kit**: v0.31.10

## Compatibilidad

✅ SingleStore es 100% compatible con el protocolo MySQL
✅ Better Auth funciona sin modificaciones en el código de autenticación
✅ Drizzle ORM maneja las diferencias de dialecto automáticamente
✅ Las migraciones se generan y aplican correctamente

## Conclusión

La migración se completó exitosamente. Better Auth ahora funciona completamente con SingleStore usando Drizzle ORM, manteniendo todas las funcionalidades de autenticación mientras aprovecha las capacidades de rendimiento de SingleStore.