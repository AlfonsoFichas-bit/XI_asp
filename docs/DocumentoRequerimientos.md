# Documento de Requerimientos: Generador de Tarjetas de Apoyo "Xavier 2026-2031"

## 1. Descripción del Proyecto
Desarrollo de una Aplicación Web (Frontend) tipo "Generador de Volantes" que permite a los usuarios ingresar su nombre para personalizar una imagen de campaña política. El procesamiento de la imagen se realizará 100% en el navegador del cliente (Client-side) para asegurar velocidad y privacidad.

---

## 2. Recursos Gráficos (Assets)
Antes del desarrollo, se debe preparar el siguiente material:

* **Imagen Base Limpia (`bg-clean.jpg`):**
    * La imagen original de la campaña editada externamente.
    * **Importante:** Se debe eliminar todo el texto sobre la mancha amarilla (Sin "VOTA POR XAVIER" y sin "ES MOMENTO DE..."). Debe quedar solo el fondo amarillo, la foto del candidato y los logos superiores.
* **Tipografía Web (Webfont):**
    * Una fuente *Sans-serif Condensed Bold* que emule el diseño original.
    * *Sugerencias:* `Oswald` (Bold 700), `Anton`, o `Bebas Neue`.
    * *Nota:* Debe cargarse antes de iniciar el dibujado en Canvas.

---

## 3. Requerimientos Funcionales

### 3.1. Entrada de Datos
* **Campo de Texto:** Un `<input>` visible y accesible para el nombre.
* **Formato Forzado:** El input debe convertir visualmente y lógicamente el texto a **MAYÚSCULAS**.
* **Validación:** (Opcional) Bloquear emojis para evitar errores de renderizado en fuentes antiguas.

### 3.2. Generación de Imagen (Core Logic)
El sistema utilizará la **Canvas API (2D Context)** para componer la imagen final siguiendo este orden de capas (z-index conceptual):

1.  **Capa 0 (Fondo):** Renderizado de la `Imagen Base Limpia`.
2.  **Capa 1 (Texto Fijo - Slogan):**
    * Contenido: *"VOTA POR XAVIER"*
    * Posición: Coordenadas `X, Y` fijas en la parte **inferior** del espacio amarillo disponible.
    * Color: Negro (`#000000`).
    * Fuente: Tamaño grande fijo (ej. 120px).
3.  **Capa 2 (Texto Dinámico - Usuario):**
    * Contenido: `Input del Usuario`.
    * Posición: Coordenada `Y` fija en la parte **superior** del espacio amarillo (encima del slogan).
    * Alineación: Centrado horizontalmente (`textAlign = 'center'`).
    * Comportamiento: Algoritmo "Scale-to-fit" (ver sección 4).

### 3.3. Exportación
* **Botón de Acción:** "Descargar Imagen" o "Compartir".
* **Formato:** `.png` (preferible) o `.jpg` (calidad 0.9+).
* **Nombre de archivo:** Generado dinámicamente, ej: `apoyo-xavier-{timestamp}.png`.

---

## 4. Algoritmo "Scale-to-fit" (Ajuste de Texto)
Para evitar que el nombre del usuario se salga de la imagen o se solape con el slogan fijo.

**Variables:**
* `MAX_WIDTH`: Ancho máximo permitido (Ancho Canvas - Márgenes laterales).
* `FONT_SIZE_BASE`: Tamaño ideal inicial (ej. 100px).
* `FONT_SIZE_MIN`: Tamaño mínimo legible (ej. 40px).

## 5. UI/UX (Interfaz de Usuario)
Enfoque: Mobile First (Diseño vertical optimizado para celulares).
Layout:
  Header minimalista.
  Canvas (Preview) ocupando 60-70% del viewport.
  Input y Botón en zona inferior (fácil alcance del pulgar).
Reactividad: La imagen en el canvas debe redibujarse en tiempo real con el evento input (mientras el usuario escribe).
