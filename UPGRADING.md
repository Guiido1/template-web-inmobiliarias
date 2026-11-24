# Propagar mejoras del template a sitios de clientes ya entregados

Cada cliente tiene su propio repo, clonado una vez a partir de este
template. Eso significa que una mejora que hagas acá (un fix de
seguridad, una sección nueva, una optimización) no llega sola a los
sitios ya entregados — hay que llevarla a mano. Esto solo aplica a
**clientes con mensualidad** (a los que no la tienen no se les actualiza
nada, coherente con que se hacen cargo de su propio sitio).

## Por qué esto funciona sin romper la personalización de cada cliente

Mientras la personalización de cada cliente viva únicamente en:
- `src/config/brand.ts`
- `src/data/properties.ts`
- `src/content/blog/*.mdx`
- `public/` (imágenes y logo)

...y los **componentes y la lógica del template no se editen por cliente**,
un `git merge`/`git rebase` del template hacia el repo del cliente no
debería generar conflictos reales — los archivos que cambian en el
template (componentes, lib, config de Next/Netlify) son justamente los
que el cliente no toca.

## Proceso recomendado (por cliente, cuando haya una actualización)

En el repo del cliente (no en este template):

```bash
git remote add template https://github.com/Guiido1/template-web-inmobiliarias
git fetch template main
git merge template/main --allow-unrelated-histories
```

La primera vez que se agrega el remote va a pedir `--allow-unrelated-
histories` porque cada cliente hizo `git init` nuevo al clonarse (ver
README, paso 1). Las veces siguientes no hace falta ese flag.

Si aparece un conflicto en `brand.ts`, `properties.ts` o algún `.mdx`:
siempre se resuelve quedándose con la versión del cliente (son
justamente los archivos que nunca deberían venir del template).

## Antes de mergear a producción

1. Mergear primero en una rama (`git checkout -b actualizacion-template`).
2. Correr el deploy preview de Netlify sobre esa rama.
3. Pasar el `QA_CHECKLIST.md` sobre el preview.
4. Si todo OK, mergear a `main` (o la rama de producción de ese cliente).

## Cadencia sugerida

No hace falta propagar cada commit individual del template. Conviene
acumular cambios y aplicarlos en tandas (por ejemplo, una vez por mes,
junto con el reporte de resultados al cliente) — así el mantenimiento no
se vuelve una tarea diaria por cada sitio activo.
