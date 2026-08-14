# English Go 🇬🇧 — Aprende inglés

App web **100 % gratis, en español**, hecha para practicar desde el celular.
Todo funciona sin servidores: vocabulario, frases, pronunciación con audio,
test de nivel y repetición espaciada. Tu progreso se guarda en el navegador.

## 🎯 Qué incluye

| Módulo | Qué hace |
|---|---|
| 🧠 **Test de nivel** | Preguntas adaptativas que detectan tu nivel (Básico / Intermedio / Avanzado) |
| 🃏 **Flashcards** | Palabras nuevas + repetición espaciada inteligente (cajas 1 a 5) |
| ✏️ **Escritura y traducción** | Traduces ES↔EN y escribes la respuesta para fijarla |
| 🔊 **Escucha y pronunciación** | Audio real (texto a voz), comprensión, dictado y repite en voz alta |
| 💬 **Frases de conversación** | Situaciones cotidianas y de trabajo, con quiz por sección |
| 📈 **Progreso** | Racha diaria 🔥, precisión, palabras difíciles, gráfica de 7 días |
| 🔔 **Recordatorio** | Notificación diaria con mensaje motivacional a la hora que elijas |
| 💬 **Motivación** | Mensajes que se adaptan a tu racha, precisión y constancia |

Los temas incluyen **cotidiano** (comida, compras, casa, salud, viajes) y
**trabajo** (reuniones, correos, correos comerciales, phrasal verbs).

## 🚀 Probar en tu computadora

1. Abre el archivo `index.html` con tu navegador (doble clic).
2. Todo funciona localmente sin instalar nada.

> 💡 **Ojo con el audio:** el texto a voz necesita conexión en algunos
> navegadores. En el celular usa Chrome o Edge.

## 📱 Publicarla gratis (para usar desde el celular)

### Opción 1: GitHub Pages (recomendada)

1. Crea un repositorio en [github.com](https://github.com) (público).
2. Sube todo el contenido de la carpeta `ingles-app`.
3. Ve a *Settings → Pages* y elige **Deploy from a branch → main**.
4. En unos segundos tendrás una URL como `https://tuusuario.github.io/nombre`.
5. Ábrela en tu celular y usa el menú del navegador → **"Agregar a pantalla de inicio"** (instalable como app).

### Opción 2: Netlify Drop (sin GitHub)

1. Entra a [app.netlify.com/drop](https://app.netlify.com/drop).
2. Arrastra la carpeta `ingles-app` completa a la página.
3. Listo: te dan una URL pública al instante.

### Opción 3: Servirla en tu red local (cero internet)

Si tienes Python instalado, dentro de la carpeta:

```bash
python -m http.server 8000
```

Abre en tu teléfono `http://TU-IP:8000` (ej. `http://192.168.1.20:8000`).
Asegúrate de que ambos estén en la misma red WiFi y permite el acceso en el firewall.

## 🗂 Estructura

```
ingles-app/
├── index.html        # Pantallas de la app
├── css/style.css     # Estilos (móvil-first)
├── js/data.js        # Vocabulario, frases y preguntas del test
├── js/app.js         # Lógica: SRS, audio, test, sesiones
├── manifest.json     # Permite instalarla como app (PWA)
├── sw.js             # Funciona sin conexión
└── icons/            # Iconos
```

## ✏️ Personalizar

- **Agregar palabras:** edita `js/data.js` → arreglo `VOCAB`.
  Cada palabra: `{ id, en, es, ej (ejemplo EN), ex (traducción), niv:1-3, cat:"cotidiano"|"trabajo" }`.
- **Agregar frases:** arreglo `PHRASES`, agrega una sección con `titulo`, `icono` y `frases`.
- **Cambiar la meta diaria:** en `js/app.js`, variable `STATE.goal` (15 por defecto).

## ⚠️ Notas

- El audio usa la voz del sistema (Web Speech API). Elige una voz *"English (United States)"* en la configuración de tu dispositivo para mejor pronunciación.
- El progreso vive en el navegador (localStorage). Si borras los datos del sitio, se borra el avance.

## 🔔 Sobre los recordatorios

- La app pide permiso para notificarte **solo si activas el recordatorio** (en Inicio → *🔔 Recordatorio diario*).
- Toca la notificación y se abrirá tu sesión del día.
- **Importante:** la notificación se dispara mientras la app está abierta, o en cuanto la abras después de la hora elegida. Para avisos con la app completamente cerrada haría falta un servicio de *push* de pago; con esta versión gratis, ten el sitio abierto en una pestaña o agrégalo a la pantalla de inicio.
- Si el navegador bloquea notificaciones, igual verás el aviso dentro de la app.