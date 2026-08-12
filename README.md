# 🎣 Pesca de Números

Un juego web educativo, moderno y gratuito para aprender **las tablas de multiplicar del 1 al 10** (incluyendo la regla especial de que **cualquier número multiplicado por 0 es igual a 0**), pensado especialmente para niños y niñas de **2.º a 4.º grado de primaria**.

Construido con **HTML5, CSS3 y JavaScript puro (vanilla)**, sin frameworks ni dependencias externas. Funciona abriendo `index.html` directamente o publicado gratis en **GitHub Pages**.

![Nivel](https://img.shields.io/badge/nivel-primaria-4ECDC4?style=for-the-badge)
![Licencia](https://img.shields.io/badge/licencia-MIT-FFD93D?style=for-the-badge)
![Sin dependencias](https://img.shields.io/badge/dependencias-ninguna-7ECBE8?style=for-the-badge)

---

## 📖 Descripción del juego

En **Pesca de Números**, el jugador se convierte en un pequeño pescador que debe resolver multiplicaciones para atrapar peces de colores y llenar su estanque. Cada ronda comienza girando una **ruleta colorida** que elige la tabla de multiplicar del problema. Con **3 vidas**, el jugador debe responder correctamente el mayor número de veces posible antes de quedarse sin corazones.

El juego refuerza especialmente la **regla del cero** (cualquier número × 0 = 0), un concepto clave que suele confundir a los niños en esta etapa escolar.

### Características principales

- 🎡 Ruleta interactiva animada en SVG para elegir cada problema.
- 🐟 Sistema de progreso visual: los peces correctos se "pescan" y se muestran en un estanque.
- ❤️ Sistema de 3 vidas con retroalimentación inmediata (animaciones, sonidos y mensajes).
- ⭐ Puntuación por estrellas (1 a 3) según precisión al completar cada nivel.
- 💾 Progreso guardado automáticamente en el navegador (`localStorage`): se recuerda el nivel más alto desbloqueado y las estrellas obtenidas.
- 🔊 Efectos de sonido generados con la **Web Audio API** (sin archivos de audio externos).
- 📱 Diseño **100% responsive**: se adapta a celular, tablet y escritorio.
- 🎨 Interfaz colorida, con tipografía redonda y botones grandes, pensada para niños.
- ♿ Accesibilidad básica: foco visible por teclado y `aria-live` en la retroalimentación.

---

## 🕹️ Cómo jugar

1. En la pantalla de inicio, **elige un nivel** disponible (los niveles bloqueados 🔒 se abren al completar el anterior).
2. Presiona **"¡Jugar!"**.
3. Presiona **"¡Girar!"** para hacer girar la ruleta y descubrir tu problema de multiplicación.
4. Elige la **respuesta correcta** entre las 4 opciones mostradas.
   - ✅ Si aciertas: pescas un pez, escuchas un sonido de éxito y avanzas.
   - ❌ Si fallas: pierdes una vida (❤️ → 🤍) y se te muestra la respuesta correcta.
5. Completa los **20 problemas** del nivel antes de quedarte sin las 3 vidas.
6. Al finalizar, obtienes de **1 a 3 estrellas** según tu precisión, y se desbloquea el siguiente nivel.

> 💡 Recuerda siempre la regla de oro: **cualquier número multiplicado por 0 es 0** (por ejemplo, 7 × 0 = 0, 0 × 9 = 0).

---

## 🎚️ Niveles

| Nivel | Nombre | Tablas incluidas | Detalles |
|:-----:|--------|-------------------|----------|
| 1 | 🐟 **Fácil** | 1, 2, 5, 10 + regla del 0 | Ideal para empezar. |
| 2 | 🐠 **Medio** | Del 1 al 6 + regla del 0 | Un paso más de dificultad. |
| 3 | 🦈 **Avanzado** | Del 1 al 10 + regla del 0 | Problemas presentados en distinto orden (a×b o b×a). |
| 4 | 🐋 **Maestro** | Del 1 al 10 + regla del 0 | ⏱️ Con **tiempo límite** (2:30 min), problemas en desorden y algunas multiplicaciones simples de dos dígitos (11 y 12). |

Cada nivel contiene **20 problemas**. Los niveles se desbloquean progresivamente al completar el anterior, y el progreso se guarda automáticamente en el navegador.

---

## 💻 Cómo instalar y ejecutar localmente

No se necesita instalar nada: es HTML, CSS y JavaScript puro.

### Opción 1 — Abrir directamente

1. Descarga o clona este repositorio:
   ```bash
   git clone https://github.com/TU-USUARIO/pesca-de-numeros.git
   cd pesca-de-numeros
   ```
2. Abre el archivo `index.html` con doble clic o arrástralo a tu navegador.

### Opción 2 — Servidor local (recomendado)

Algunos navegadores restringen ciertas funciones al abrir archivos con `file://`. Para una mejor experiencia, usa un servidor local sencillo:

```bash
# Con Python 3
python3 -m http.server 8000

# Con Node.js (usando el paquete serve)
npx serve .
```

Luego abre tu navegador en `http://localhost:8000`.

---

## 🚀 Cómo desplegar en GitHub Pages

1. Sube este proyecto a un repositorio en GitHub (ver sección de contribución más abajo si necesitas ayuda con `git`).
2. En tu repositorio, ve a **Settings → Pages**.
3. En **"Build and deployment"**, selecciona:
   - **Source:** `Deploy from a branch`
   - **Branch:** `main` (o `master`) y carpeta `/ (root)`.
4. Guarda los cambios. GitHub Pages generará una URL similar a:
   ```
   https://TU-USUARIO.github.io/pesca-de-numeros/
   ```
5. Espera uno o dos minutos y abre la URL. ¡Tu juego ya está publicado! 🎉

---

## 📁 Estructura del proyecto

```
pesca-de-numeros/
├── index.html          # Estructura de todas las pantallas del juego
├── css/
│   └── style.css       # Estilos, animaciones y diseño responsive
├── js/
│   └── game.js         # Lógica del juego (niveles, ruleta, preguntas, progreso)
├── assets/             # Carpeta reservada para imágenes/sonidos propios (opcional)
├── README.md
└── .gitignore
```

El juego usa **emojis** y **SVG generado dinámicamente en JavaScript** para todos los gráficos (ruleta, peces, olas, confeti), por lo que **no depende de ninguna imagen externa**. Si quieres reemplazarlos por ilustraciones propias, puedes colocarlas en la carpeta `assets/` y actualizar las referencias en `index.html` / `css/style.css`.

---

## 🤝 Cómo contribuir

¡Las contribuciones son bienvenidas! Si quieres mejorar el juego:

1. Haz un **fork** de este repositorio.
2. Crea una rama para tu cambio:
   ```bash
   git checkout -b mejora/nueva-funcionalidad
   ```
3. Realiza tus cambios y pruébalos abriendo `index.html` en el navegador.
4. Haz commit siguiendo mensajes claros:
   ```bash
   git commit -m "Agrega: nuevo modo de juego de saltos sobre nenúfares"
   ```
5. Sube tu rama y abre un **Pull Request** explicando qué cambia y por qué.

### Ideas para futuras mejoras

- Agregar un modo alternativo de "saltos sobre nenúfares".
- Agregar más idiomas (inglés, portugués).
- Agregar tablas de división como siguiente nivel de aprendizaje.
- Añadir música de fondo opcional con control de volumen.
- Exportar estadísticas de progreso para docentes/padres.

---

## 📜 Licencia

Este proyecto está licenciado bajo la **Licencia MIT**. Esto significa que puedes usar, copiar, modificar y distribuir este software libremente, incluso con fines comerciales, siempre que se incluya el aviso de copyright original.

```
MIT License

Copyright (c) 2026 Pesca de Números

Por la presente se concede permiso, libre de cargos, a cualquier persona que obtenga una
copia de este software y de los archivos de documentación asociados (el "Software"), a
utilizar el Software sin restricción, incluyendo sin limitación los derechos a usar,
copiar, modificar, fusionar, publicar, distribuir, sublicenciar, y/o vender copias del
Software, y a permitir a las personas a las que se les proporcione el Software a hacer
lo mismo, sujeto a las siguientes condiciones:

El aviso de copyright anterior y este aviso de permiso se incluirán en todas las copias
o partes sustanciales del Software.

EL SOFTWARE SE PROPORCIONA "COMO ESTÁ", SIN GARANTÍA DE NINGÚN TIPO, EXPRESA O IMPLÍCITA,
INCLUYENDO PERO NO LIMITADO A GARANTÍAS DE COMERCIALIZACIÓN, IDONEIDAD PARA UN PROPÓSITO
PARTICULAR Y NO INFRACCIÓN. EN NINGÚN CASO LOS AUTORES O TITULARES DEL COPYRIGHT SERÁN
RESPONSABLES DE NINGUNA RECLAMACIÓN, DAÑOS U OTRAS RESPONSABILIDADES, YA SEA EN UNA ACCIÓN
DE CONTRATO, AGRAVIO O CUALQUIER OTRO MOTIVO, DERIVADAS DE, FUERA DE O EN CONEXIÓN CON
EL SOFTWARE O SU USO U OTRO TIPO DE ACCIONES EN EL SOFTWARE.
```

(El texto completo también puede colocarse en un archivo `LICENSE` independiente).

---

## 🙌 Créditos

- Desarrollado como proyecto educativo de código abierto para apoyar el aprendizaje de las matemáticas en primaria.
- Tipografías: [Baloo 2](https://fonts.google.com/specimen/Baloo+2) y [Nunito](https://fonts.google.com/specimen/Nunito), vía Google Fonts.
- Iconografía: emojis estándar Unicode (sin licencias adicionales).
- Gráficos (ruleta, olas, confeti): SVG generado dinámicamente en JavaScript, sin imágenes externas.

Hecho con 💙 para pequeños pescadores de números.
