# Sistema Tipográfico — Portfolio Miguel Mateos

## Fuentes del proyecto

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap" rel="stylesheet">
```

- **Headings H1–H2**: `DM Serif Display` — serif elegante para títulos principales
- **H3–H6 + body**: `DM Sans` — sans-serif funcional para subtítulos y texto corriente
- **Archivo maestro**: `typography-base.css` (cargado antes de `style.css` en todos los HTML)

---

## Jerarquía tipográfica — valores exactos

| Elemento   | Familia          | Peso | Tamaño (`clamp`)                      | Line-height | Tracking   |
|------------|------------------|------|---------------------------------------|-------------|------------|
| Eyebrow    | DM Sans          | 600  | `11px`                                | —           | `0.12em`   |
| **H1**     | DM Serif Display | 400  | `clamp(2rem, 5vw, 2.8rem)`            | `1.15`      | `-0.02em`  |
| **H2**     | DM Serif Display | 400  | `clamp(1.5rem, 3.5vw, 2rem)`          | `1.2`       | `-0.015em` |
| **H3**     | DM Sans          | 600  | `clamp(1rem, 2.5vw, 1.125rem)`        | `1.3`       | `-0.01em`  |
| **H4**     | DM Sans          | 600  | `1rem`                                | `1.35`      | `0`        |
| **H5**     | DM Sans          | 500  | `0.9375rem`                           | `1.4`       | `0`        |
| **H6**     | DM Sans          | 500  | `0.8125rem`                           | `1.4`       | `0.06em`   |
| Body       | DM Sans          | 400  | `1rem` (nunca menos de `16px`)        | `1.75`      | `0`        |
| Lead       | DM Sans          | 300  | `clamp(1rem, 2vw, 1.125rem)`          | `1.65`      | `0`        |
| Small      | DM Sans          | 400  | `0.875rem`                            | `1.6`       | `0`        |
| Caption    | DM Sans          | 400  | `0.75rem`                             | `1.5`       | `0.04em`   |

> **Regla de diferenciación**: H1–H2 son serif (presencia display). H3–H6 son sans-serif semibold/medium. Body es sans-serif regular. Nunca el mismo peso en dos niveles consecutivos.

---

## Colores — valores exactos (no modificar sin recalcular contraste)

```css
/* Modo claro */
--color-text-primary:   #1a1a2e;   /* 10.4:1 sobre #ffffff */
--color-text-secondary: #4a4a5e;   /*  6.2:1 sobre #ffffff */
--color-text-muted:     #6b6b80;   /*  4.6:1 — límite AA   */
--color-bg-page:        #ffffff;
--color-bg-surface:     #f7f7fb;

/* Dark mode — NO usar negro/blanco puros */
--color-text-primary:   #f0f0f8;   /* >12:1 sobre #121220 */
--color-text-secondary: #a8a8c0;   /*  >5.5:1 */
--color-text-muted:     #8a8aa8;   /*  >4.6:1 — límite AA */
--color-bg-page:        #121220;   /* Azul oscuro — NO #000 */
--color-bg-surface:     #1e1e30;
```

---

## Diagnóstico rápido

```bash
# 1. Verificar fuentes cargadas
grep -n "DM Serif\|DM Sans\|preconnect" index.html

# 2. Verificar que no hay overrides
grep -rn "font-weight\|font-family" *.css | grep -v "typography-base"

# 3. Verificar measure de párrafos
grep -n "max-width\|measure" typography-base.css
```

### Causas frecuentes

| Síntoma | Causa | Solución |
|---------|-------|----------|
| H1–H2 no muestran serif | `@import` no es línea 1 del CSS | Mover al inicio absoluto |
| Todos los headings igual de gruesos | Reset aplana `font-weight` | Buscar `* { font-weight }` |
| H3 se ve igual que body | Falta `font-weight: 600` | Añadir explícito en h3 |

---

## Scope de cambios

### ✅ Puedes modificar
- Colores de acento
- Valores de `clamp()` si el diseño lo requiere
- Márgenes y espaciados

### ❌ No modificar sin justificación
- Los hex de `--color-text-*` (calculados para contraste AA)
- Los `font-weight` de cada heading (diferenciación del sistema)
- El `font-family` de cada nivel (serif vs sans-serif)
- `line-height: 1.75` en body (requisito WCAG 1.4.12)
- `max-width: 66ch` en párrafos (requisito WCAG 1.4.8)

---

## Al añadir un nuevo case study o página

Estructura HTML mínima obligatoria:

```html
<!-- Fonts en <head> antes de cualquier CSS -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="../typography-base.css" />
<link rel="stylesheet" href="../style.css" />

<!-- Estructura mínima del contenido -->
<a href="#main-content" class="sr-only">Saltar al contenido</a>
<main id="main-content">
  <article>
    <span class="eyebrow">Nombre del cliente o categoría</span>
    <h1>Título del proyecto</h1>
    <p class="lead">Descripción introductoria de una o dos frases.</p>
  </article>
</main>
```

---

## Checklist antes de entregar

1. ¿H1 y H2 se renderizan en DM Serif Display (serif)?
2. ¿H3–H6 en DM Sans (sans-serif)?
3. ¿Son visualmente distintos H1 > H2 > H3 sin leer el contenido?
4. ¿El body text (weight 400) es más ligero visualmente que cualquier heading?
5. ¿Los párrafos tienen `max-width: 66ch` en desktop?
6. ¿El dark mode usa `#121220` como fondo, no negro puro?
