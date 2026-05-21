# All Hadith Books API

A deployable static JSON API for the 17 major Hadith books, designed to be hosted on GitHub Pages.

## 🚀 Live API
The API is hosted at: `https://uthumany.github.io/all-hadith-books/api`

**ALL AVAILABLE BOOKS**
**ENDPOINT WITH BASE URLS**
 

Sahih al-Bukhari
صحيح البخاري
Endpoint URL: https://uthumany.github.io/All-Hadith-books/api/bukhari.json
__________________________________________

Sahih Muslim
صحيح مسلم
Endpoint URL: https://uthumany.github.io/All-Hadith-books/api/muslim.json
__________________________________________

Sunan Abi Dawud
سنن أبي داود
Endpoint URL: https://uthumany.github.io/All-Hadith-books/api/abudawud.json
__________________________________________

Jami` at-Tirmidhi
جامع الترمذي
Endpoint URL: https://uthumany.github.io/All-Hadith-books/api/tirmidhi.json
__________________________________________

Sunan an-Nasa'i
سنن النسائي
Endpoint URL: https://uthumany.github.io/All-Hadith-books/api/nasai.json
__________________________________________

Sunan Ibn Majah
سنن ابن ماجه
Endpoint URL: https://uthumany.github.io/All-Hadith-books/api/ibnmajah.json
__________________________________________

Muwatta Malik
موطأ مالك
Endpoint URL: https://uthumany.github.io/All-Hadith-books/api/malik.json
__________________________________________

Musnad Ahmad
مسند أحمد
Endpoint URL: https://uthumany.github.io/All-Hadith-books/api/ahmed.json
__________________________________________

Sunan ad-Darimi
سنن الدارمي
Endpoint URL: https://uthumany.github.io/All-Hadith-books/api/darimi.json
__________________________________________

Riyad as-Salihin
رياض الصالحين
Endpoint URL: https://uthumany.github.io/All-Hadith-books/api/riyad-al-salihin.json
__________________________________________

Shamail al-Muhammadiyah
الشمائل المحمدية
Endpoint URL: https://uthumany.github.io/All-Hadith-books/api/shamail-al-muhammadiyah.json
__________________________________________

Bulugh al-Maram
بلوغ المرام
Endpoint URL: https://uthumany.github.io/All-Hadith-books/api/bulugh-al-maram.json
__________________________________________

Al-Adab Al-Mufrad
الأدب المفرد
Endpoint URL: https://uthumany.github.io/All-Hadith-books/api/al-adab-al-mufrad.json
__________________________________________

Mishkat al-Masabih
مشكاة المصابيح
Endpoint URL: https://uthumany.github.io/All-Hadith-books/api/mishkat-al-masabih.json
__________________________________________

The Forty Hadith of al-Nawawi
الأربعون النووية
Endpoint URL: https://uthumany.github.io/All-Hadith-books/api/nawawi-40.json
__________________________________________

The Forty Hadith Qudsi
الأربعون القدسية
Endpoint URL: https://uthumany.github.io/All-Hadith-books/api/qudsi-40.json
__________________________________________

The Forty Hadith of Shah Waliullah
أربعون الشاه ولي الله

Endpoint URL: https://uthumany.github.io/All-Hadith-books/api/waliullah-40.json
__________________________________________

**Hadith Book Covers (SVGs)**
صورة غلاف كتب الحديث
Endpoint URL: [https://uthumany.github.io/All-Hadith-books/api/hadith_bookscovers.json](https://uthumany.github.io/all-hadith-books/api/hadith_bookscovers.json
)

## 📚 Supported Books
1. Sahih al-Bukhari
2. Sahih Muslim
3. Sunan Abi Dawud
4. Jami` at-Tirmidhi
5. Sunan an-Nasa'i
6. Sunan Ibn Majah
7. Muwatta Malik
8. Musnad Ahmad
9. Sunan ad-Darimi
10. Riyad al-Salihin
11. Shamail al-Muhammadiyah
12. Bulugh al-Maram
13. Al-Adab Al-Mufrad
14. Mishkat al-Masabih
15. The Forty Hadith of al-Nawawi
16. The Forty Hadith Qudsi
17. The Forty Hadith of Shah Waliullah

## 🛠 API Endpoints

### 1. List All Books
- **URL:** `/api/books.json`
- **Description:** Returns all 17 books with id, English name, Arabic name, slug, totalHadiths, and file path.

### 2. Full Book Data
- **URL:** `/api/{book-slug}.json`
- **Alternative:** `/api/{book-slug}/index.json` or `/api/{book-slug}/hadiths.json`
- **Description:** Returns the full hadith collection for that book.

### 3. Single Hadith
- **URL:** `/api/{book-slug}/hadith/{id}.json`
- **Description:** Returns a single hadith by id, including book metadata.

### 4. Paginated Access
- **URL:** `/api/{book-slug}/page/{n}.json`
- **Description:** Paginated access (50 items per page). Includes `page`, `perPage`, `totalPages`, `totalCount`, `nextPage`, `prevPage`, and `items`.

### 5. Search Index
- **URL:** `/api/search.json`
- **Description:** A searchable index across all books containing snippets and identifiers.

### 6. Chapters Index
- **URL:** `/api/books/{book-slug}/chapters.json`
- **Description:** Chapter index for each book with hadith counts.

### 7. Hadith Book Covers
- **URL:** `/api/hadith_bookscovers.json`
- **Description:** Returns an array of objects containing the Arabic and English names of the Hadith books along with their corresponding SVG cover CDN URLs. Useful for fetching and rendering book covers.

## 🏗 Data Model
Each hadith object contains:
- `id`: Unique identifier
- `chapterId`: Chapter reference
- `bookId`: Book reference
- `arabic`: Arabic text
- `english`: 
  - `narrator`: English narrator
  - `text`: English translation

## 💻 Development

### Build
To regenerate the static JSON files:
```bash
node scripts/generate.js
```

### Deployment
This repository is configured with GitHub Actions to automatically deploy to GitHub Pages on every push to the `main` branch.

## 📄 License
This project uses data from the [hadith-json](https://github.com/AhmedBaset/hadith-json) repository.

## Audio & Synchronization Features

- [English Audio Narrations](https://uthumany.github.io/all-hadith-books/english-audio.html)
- [Arabic Audio Narrations](https://uthumany.github.io/all-hadith-books/arabic-audio.html)
- [Interactive Audio-to-Text Sync](https://uthumany.github.io/all-hadith-books/riyad-us-saliheen-sync.html)

For more details, see [README_AUDIO.md](./README_AUDIO.md).
