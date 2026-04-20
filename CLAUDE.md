# Sistema de estilos — Tipografía accesible WCAG AA

## Stack y archivo de referencia

- Archivo CSS maestro: `typography-accessible.css`
- Archivo de componentes: `style.css`
- Fuentes: `Source Serif 4` (headings h1–h4) e `Inter` (body, h5, h6)
- Importadas vía Google Fonts — el `@import` debe estar en la primera línea del CSS

## Cómo leer el sistema antes de tocar nada

Antes de modificar cualquier archivo de estilos, ejecuta:

```bash
grep -n "font-weight\|font-size\|color\|line-height" typography-accessible.css | head -60
```

Esto te muestra los valores reales del sistema. No asumas — lee primero.

---

## Reglas del sistema tipográfico

### Jerarquía de headings — pesos diferenciados

| Elemento | Familia        | Peso    | Tamaño (clamp)                   | Tracking     |
|----------|----------------|---------|----------------------------------|--------------|
| `h1`     | Source Serif 4 | **800** | clamp(2.25rem, 6vw, 3.5rem)      | -0.025em     |
| `h2`     | Source Serif 4 | **700** | clamp(1.875rem, 5vw, 2.5rem)     | -0.02em      |
| `h3`     | Source Serif 4 | **600** | clamp(1.5rem, 4vw, 2rem)         | -0.015em     |
| `h4`     | Source Serif 4 | **600** | clamp(1.25rem, 3vw, 1.5rem)      | 0em          |
| `h5`     | Inter          | **500** | clamp(1.125rem, 2.5vw, 1.25rem)  | 0em          |
| `h6`     | Inter          | **500** | clamp(1rem, 2vw, 1.125rem)       | +0.06em + uppercase |

**Regla crítica**: Los pesos 800/700/600/500 son la diferenciación visual principal.
Nunca usar el mismo peso en dos niveles consecutivos de heading.

### Colores de texto — valores exactos

```css
/* Modo claro — NO modificar estos valores */
--color-text-heading: #1a1a2e;  /* Ratio: 10.4:1 sobre #ffffff */
--color-text-body:    #2d2d3a;  /* Ratio:  9.1:1 sobre #ffffff */
--color-text-muted:   #4a4a5e;  /* Ratio:  6.2:1 sobre #ffffff */
--color-text-subtle:  #6b6b80;  /* Ratio:  4.6:1 — límite AA  */
```

---

## Dark mode — reglas estrictas

### El problema común que debes evitar

❌ **INCORRECTO** — invertir colores sin verificar contraste:
```css
@media (prefers-color-scheme: dark) {
  --color-text-heading: #ffffff;   /* Demasiado brillante */
  --color-bg-page: #000000;        /* Contraste excesivo — fatiga visual */
}
```

✅ **CORRECTO** — valores del sistema ya calculados:
```css
@media (prefers-color-scheme: dark) {
  --color-text-heading: #f0f0f8;   /* Blanco suave, ratio >12:1 */
  --color-text-body:    #d8d8e8;   /* Gris claro, ratio  >9:1  */
  --color-text-muted:   #a8a8c0;   /* Gris medio, ratio  >5.5:1 */
  --color-text-subtle:  #8a8aa8;   /* Gris sutil, ratio  >4.6:1 */
  --color-bg-page:      #121220;   /* Azul muy oscuro — NO negro puro */
  --color-bg-surface:   #1e1e30;   /* Superficie elevada */
  --color-accent:       #60a5fa;   /* Azul claro, ratio  >5.2:1 */
}
```

### Test de verificación de dark mode

Después de cualquier cambio en dark mode, comprueba visualmente que:

1. Los headings h1–h4 son claramente más brillantes/pesados que el body text
2. El fondo NO es negro puro (`#000`) — debe ser `#121220` o similar
3. El texto de acento (links) tiene contraste suficiente sobre el fondo oscuro
4. Los 4 niveles de texto (heading/body/muted/subtle) son visualmente distintos

---

## Qué hacer cuando los headings no se ven bien

### Diagnóstico rápido

```bash
# 1. Verificar que la fuente está cargada
grep -n "Source Serif 4\|@import" index.html typography-accessible.css

# 2. Verificar que el CSS está enlazado
grep -n "typography-accessible\|stylesheet" index.html

# 3. Comprobar que no hay overrides que sobreescriban los headings
grep -rn "h1\|h2\|h3\|font-weight" *.css | grep -v "typography-accessible"
```

### Causas frecuentes y soluciones

| Síntoma | Causa probable | Solución |
|---------|----------------|----------|
| Todos los headings igual de gruesos | `font-weight` sobreescrito globalmente | Buscar `* { font-weight }` o reset agresivo |
| Fuente serif no carga | `@import` no está en línea 1 del CSS | Mover el `@import` al inicio absoluto |
| Headings sin contraste en dark mode | `color` heredado de body | Añadir `color: var(--color-text-heading)` explícito en h1–h6 |
| Tamaños iguales en móvil | `clamp()` con valores muy juntos | Revisar los tres parámetros del clamp |

---

## Scope de cambios — qué tocar y qué no

### ✅ Puedes modificar

- Colores de acento (`--color-accent`, `--color-accent-hover`)
- Escala de tamaños si el diseño lo requiere (ajustar los `clamp()`)
- Márgenes y espaciados entre elementos
- Propiedades de `blockquote`, `code`, tablas

### ❌ No modificar sin justificación explícita

- Los valores hex de `--color-text-*` (están calculados para contraste AA)
- Los `font-weight` de cada heading (son la diferenciación del sistema)
- El `font-family` asignado a cada nivel de heading
- El `line-height` mínimo de 1.5 en body text (requisito WCAG 1.4.12)
- La propiedad `max-width` en párrafos (límite de ~70ch, requisito WCAG 1.4.8)

---

## Verificación final antes de dar por hecho cualquier cambio

```bash
# Abrir en navegador y probar los dos modos
open index.html

# Si tienes acceso a herramientas de contraste, verificar:
# - Color Contrast Analyzer (App)
# - Chrome DevTools > Accessibility > Contrast ratio
# Mínimos: texto normal 4.5:1 · texto grande (>18px) 3:1
```

Comprueba visualmente en orden:
1. ¿Se distinguen claramente los 6 niveles de heading solo por su peso y tamaño?
2. ¿El body text es legible en ambos modos (claro y oscuro)?
3. ¿Los headings tienen más peso visual que el texto de párrafo?
4. ¿El modo oscuro usa fondos azul-oscuro, no negro puro?
