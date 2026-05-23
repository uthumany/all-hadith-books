# API Integration Documentation

## Current JSON Endpoints (Already Available)

All data is served via GitHub Pages from the `/api/` directory:

### Endpoints
| Endpoint | Size | Description |
|----------|------|-------------|
| `/api/riyad_us_saliheen_audios.json` | 193 KB | Audio URLs for 373 chapters |
| `/api/riyad-al-salihin.json` | 1.7 MB | Text content with narrator info |
| `/api/books.json` | 3 KB | Book metadata |
| `/api/bukhari.json` | 12.7 MB | Sahih al-Bukhari |
| `/api/muslim.json` | 11.4 MB | Sahih Muslim |
| `/api/nawawi-40.json` | 71 KB | 40 Hadith Nawawi |
| + 10 more books | - | Other hadith collections |

---

## PostMessage API (For iframe Embedding)

Control sync pages embedded in iframes:

```html
<iframe id="hadith-player" src="https://uthumany.github.io/all-hadith-books/english-sync.html" 
        allow="autoplay" style="width:100%;height:600px;border:none;"></iframe>
```

### Commands (Parent → Iframe)

```javascript
const iframe = document.getElementById('hadith-player').contentWindow;

// Play audio (optionally from specific time)
iframe.postMessage({ action: 'play', time: 30 }, '*');

// Pause audio
iframe.postMessage({ action: 'pause' }, '*');

// Seek to time
iframe.postMessage({ action: 'seek', time: 120 }, '*');

// Select chapter
iframe.postMessage({ action: 'selectChapter', chapter: 1 }, '*');

// Get current state
iframe.postMessage({ action: 'getState' }, '*');

// Get all chapters
iframe.postMessage({ action: 'getChapters' }, '*');

// Switch audio mode (dual sync only)
iframe.postMessage({ action: 'setAudioMode', mode: 'arabic' }, '*');
```

### Events (Iframe → Parent)

```javascript
window.addEventListener('message', (event) => {
    const { type, ...data } = event.data;
    
    switch (type) {
        case 'playerReady':
            console.log('Player ready with', data.chapters, 'chapters');
            break;
        case 'play':
        case 'pause':
            console.log('Audio', type, 'at', data.currentTime);
            break;
        case 'audioEnded':
            console.log('Chapter', data.currentChapter, 'ended');
            break;
        case 'chapterChanged':
            console.log('Switched to:', data.title);
            break;
        case 'wordHighlighted':
            console.log('Current word:', data.word);
            break;
        case 'stateResponse':
            console.log('State:', data);
            break;
        case 'chaptersResponse':
            console.log('Chapters:', data.chapters);
            break;
    }
});
```

---

## Window API (For Same-Page Access)

```javascript
// Dual Sync API
RiyadhAudioAPI.playAudio(1, 0);     // Play chapter 1 from start
RiyadhAudioAPI.pauseAudio();        // Pause
RiyadhAudioAPI.resumeAudio();       // Resume
RiyadhAudioAPI.seekTo(60);          // Seek to 60 seconds
RiyadhAudioAPI.getState();          // Get current state
RiyadhAudioAPI.getChapters();       // Get all chapters
RiyadhAudioAPI.setAudioMode('arabic'); // Switch to Arabic audio

// English Sync API
EnglishAudioAPI.playAudio(1, 0);
EnglishAudioAPI.pauseAudio();
EnglishAudioAPI.seekTo(60);
EnglishAudioAPI.getState();
EnglishAudioAPI.getChapters();

// Arabic Sync API
ArabicAudioAPI.playAudio(1, 0);
ArabicAudioAPI.pauseAudio();
ArabicAudioAPI.seekTo(60);
ArabicAudioAPI.getState();
ArabicAudioAPI.getChapters();
```

---

## PWA Support

The app supports installation as a Progressive Web App:

```javascript
// Check if installable
window.addEventListener('beforeinstallprompt', (e) => {
    // Show install button
});

// Register service worker for offline
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/all-hadith-books/sw.js');
}
```

---

## Audio Format

Audio files are hosted on archive.org CDN:
- **Format:** MP3
- **Language:** English and Arabic separate files
- **Access:** Direct CDN URLs, no authentication required
- **CORS:** Enabled

---

## Integration Examples

### React Component
```jsx
function HadithPlayer({ chapter }) {
    const iframeRef = useRef();
    
    useEffect(() => {
        const handler = (e) => {
            if (e.data.type === 'wordHighlighted') {
                // Handle word highlight
            }
        };
        window.addEventListener('message', handler);
        return () => window.removeEventListener('message', handler);
    }, []);
    
    const selectChapter = (num) => {
        iframeRef.current.contentWindow.postMessage({
            action: 'selectChapter',
            chapter: num
        }, '*');
    };
    
    return <iframe ref={iframeRef} src="/english-sync.html" />;
}
```

### Flutter WebView
```dart
WebView(
    initialUrl: 'https://uthumany.github.io/all-hadith-books/arabic-sync.html',
    javascriptMode: JavascriptMode.unrestricted,
    onWebViewCreated: (controller) {
        controller.addJavaScriptHandler(
            handlerName: 'playerEvent',
            callback: (args) => print(args),
        );
    },
);
```
