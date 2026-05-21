# Riyad us Saliheen Audio & Synchronization Features

This repository now includes comprehensive audio narrations and an interactive synchronization feature for the "Riyad us Saliheen" (رياض الصالحين) collection.

## Features

- **English Audio Narrations**: High-quality audio recordings of the English translations for all chapters.
- **Arabic Audio Narrations**: Authentic Arabic recitations of the hadith chapters.
- **Interactive Audio-to-Text Synchronization**: A fully responsive interface that highlights text in real-time as the audio plays.
  - **Sentence-Level Highlighting**: Automatically tracks and highlights the current hadith segment.
  - **Word-by-Word Highlighting**: Individual words are highlighted as they are spoken (simulated based on segment progress).
  - **Dual Language Support**: Synchronized highlighting for both Arabic and English text simultaneously.
  - **Dynamic Switching**: Seamlessly switch between English and Arabic audio narrations while maintaining the synchronization.
  - **Searchable Interface**: Easily find specific chapters via the interactive sidebar.

## Endpoint URLs

The following endpoints provide access to the newly implemented features:

1.  **English Audio Narrations**: [https://uthumany.github.io/all-hadith-books/english-audio.html](https://uthumany.github.io/all-hadith-books/english-audio.html)
2.  **Arabic Audio Narrations**: [https://uthumany.github.io/all-hadith-books/arabic-audio.html](https://uthumany.github.io/all-hadith-books/arabic-audio.html)
3.  **Dual Audio-to-Text Synchronization**: [https://uthumany.github.io/all-hadith-books/riyad-us-saliheen-sync.html](https://uthumany.github.io/all-hadith-books/riyad-us-saliheen-sync.html)
4.  **English Only Synchronization**: [https://uthumany.github.io/all-hadith-books/english-sync.html](https://uthumany.github.io/all-hadith-books/english-sync.html)
5.  **Arabic Only Synchronization**: [https://uthumany.github.io/all-hadith-books/arabic-sync.html](https://uthumany.github.io/all-hadith-books/arabic-sync.html)

## Data Sources

- **Audio Data**: `api/riyad_us_saliheen_audios.json` (Contains CDN URLs from Archive.org)
- **Hadith Text**: `api/riyad-al-salihin.json`

## Technical Implementation

The synchronization feature is built using modern web technologies:
- **Tailwind CSS**: For a responsive and clean UI.
- **JavaScript (ES6+)**: Handles the audio time-tracking and DOM manipulation for highlighting.
- **HTML5 Audio API**: Powers the playback and synchronization logic.

---
*Developed as part of the All Hadith Books project.*
