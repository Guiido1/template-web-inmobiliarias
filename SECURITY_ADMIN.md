# Seguridad del panel `/admin` — checklist obligatorio por cliente

El código de este repo (Decap CMS + widget de Identity en `public/admin/`)
**no protege el acceso por sí solo.** Es solo la interfaz. Lo que realmente
impide que entre cualquiera son dos configuraciones del dashboard de
Netlify, que hay que hacer a mano en **cada sitio de cliente**, antes de
avisarle que ya puede usar el panel. No hay forma de dejarlas resueltas
desde el código del template — cada sitio en Netlify es independiente.

**No saltear ningún paso de acá antes de entregarle el acceso a un cliente.**

## 1. Netlify Identity en modo "Invite only" (obligatorio)

Por defecto, Identity puede quedar en modo de registro abierto — cualquiera
que encuentre `/admin` podría crearse una cuenta propia y, si Git Gateway no
está bien restringido (paso 2), llegar a editar el sitio. Hay que
desactivar eso explícitamente:

1. En el dashboard de Netlify del sitio del cliente → **Site configuration
   → Identity** (si todavía no está activado, "Enable Identity" primero).
2. **Registration preferences → Invite only.** Nunca dejar en "Open".
3. Invitar únicamente el/los emails reales del cliente (**Identity → Invite
   users**). Nunca una casilla compartida o genérica.
4. Confirmar que no haya invitaciones de prueba o "de desarrollo" olvidadas
   antes de pasar el sitio a producción.

## 2. Git Gateway restringido por rol (obligatorio, segunda capa)

Esto es lo que de verdad frena a un usuario de Identity que no debería
poder escribir en el repo — incluso si alguien lograra crear o conseguir
una cuenta de Identity, sin el rol correcto Git Gateway rechaza cualquier
intento de guardar cambios.

1. **Site configuration → Identity → Services → Git Gateway → Enable Git
   Gateway.**
2. En **Identity → Registration → Role-based access control**: activarlo y
   fijar el rol requerido (ej. `editor`).
3. Al invitar al cliente (paso 1.3), asignarle ese mismo rol explícitamente
   en la invitación. Sin ese rol, el panel le abre pero no puede guardar
   nada.

## 3. Cuenta de Netlify (la de Guido) — nunca compartirla

- El dashboard de Netlify (donde viven estas dos configuraciones, los env
  vars y el deploy) es de Guido, no del cliente. El cliente solo tiene su
  usuario de Identity para `/admin` — nunca acceso al dashboard de Netlify
  en sí.
- 2FA activado en la cuenta de Netlify de Guido (la que administra todos
  los sitios de clientes).

## 4. Qué ya viene resuelto por el código del template (no hace falta tocar nada)

- El panel no se indexa en buscadores: `<meta name="robots">` en
  `public/admin/index.html`, header `X-Robots-Tag` en `netlify.toml`, y
  `disallow: "/admin"` en `robots.ts`. (Esto reduce exposición, no
  reemplaza el control de acceso de los puntos 1-2.)
- Fuerza bruta en el login: la gestiona Netlify Identity/GoTrue de forma
  nativa (rate limiting), no requiere configuración adicional.
- HTTPS forzado + headers de seguridad base: ya cubiertos en
  `netlify.toml` para todo el sitio.
- Historial de cambios: cada guardado en el panel genera un commit en
  Git — queda auditado quién cambió qué y cuándo (`git log` del repo del
  cliente).

## 5. Revocar acceso (dar de baja a un cliente o a quien ya no deba editar)

Sigue el mismo proceso ya documentado en `plan-objetivos.md` →
"Proceso de baja/cancelación": al cancelar la mensualidad (o si hace falta
revocar acceso por cualquier otro motivo), borrar al usuario desde
**Identity → [usuario] → Delete user** en el dashboard del sitio. Esto
corta el acceso al panel de inmediato — el catálogo/blog ya cargados
siguen intactos en el repo, solo deja de poder editarlos esa persona.

## 6. Checklist rápido antes de entregarle el panel a un cliente nuevo

- [ ] Identity activado, registro en "Invite only" (nunca "Open")
- [ ] Git Gateway activado + rol requerido configurado
- [ ] Solo el/los emails reales del cliente invitados, con el rol asignado
- [ ] Sin invitaciones de prueba colgadas
- [ ] 2FA activo en la cuenta de Netlify de Guido
- [ ] Probado: entrar a `/admin` con la cuenta del cliente y guardar un
      cambio de prueba, confirmar que genera el commit esperado
