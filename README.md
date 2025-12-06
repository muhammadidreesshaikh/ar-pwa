# AR Instant Clean PWA

A high-performance Progressive Web App (PWA) allowing users to apply a real-time "Instant Clean" filter to their clothing using the device camera.

## Features
- **Real-time AR**: Uses TensorFlow.js for body segmentation.
- **Instant Clean Filter**: Enhances brightness and cleanliness of the subject's attire.
- **Premium UI**: Glassmorphism visuals and smooth animations.
- **PWA Ready**: Installable on mobile devices with offline support.
- **Social Sharing**: easy capture and share flow.

## Tech Stack
- React + Vite
- TensorFlow.js (Body Segmentation)
- TailwindCSS

## Setup & Run

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open the link (e.g., `http://localhost:5173`) on a mobile device or use Chrome DevTools mobile emulation.

## Deployment

To deploy this PWA to production (e.g., Netlify, Vercel, Firebase):

1. **Build the project:**
   ```bash
   npm run build
   ```
   This generates a `dist/` folder containing the optimized production assets and PWA service workers.

2. **Deploy `dist/`:**
   Upload the contents of the `dist/` folder to your static hosting provider.

## Analytics
The project includes an stubbed analytics utility in `src/utils/analytics.js`. 
- Events tracked: `app_opened`, `camera_started`, `photo_captured`, `share_completed`.
- Connect this to your preferred provider (Google Analytics, Firebase) by modifying the `logAnalyticsEvent` function.

## Notes
- Camera access is required (HTTPS required for production).
- Performance depends on the device GPU.

