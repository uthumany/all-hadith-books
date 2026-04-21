const fs = require('fs');
const path = require('path');

const SOURCE_DIR = path.join(__dirname, '../../source_repo/db');
const OUTPUT_DIR = path.join(__dirname, '../api');

const booksMetadata = [
    { id: 1, name: "Sahih al-Bukhari", arabic: "صحيح البخاري", slug: "bukhari", source: "by_chapter/the_9_books/bukhari" },
    { id: 2, name: "Sahih Muslim", arabic: "صحيح مسلم", slug: "muslim", source: "by_chapter/the_9_books/muslim" },
    { id: 3, name: "Sunan Abi Dawud", arabic: "سنن أبي داود", slug: "abudawud", source: "by_chapter/the_9_books/abudawud" },
    { id: 4, name: "Jami` at-Tirmidhi", arabic: "جامع الترمذي", slug: "tirmidhi", source: "by_chapter/the_9_books/tirmidhi" },
    { id: 5, name: "Sunan an-Nasa'i", arabic: "سنن النسائي", slug: "nasai", source: "by_chapter/the_9_books/nasai" },
    { id: 6, name: "Sunan Ibn Majah", arabic: "سنن ابن ماجه", slug: "ibnmajah", source: "by_chapter/the_9_books/ibnmajah" },
    { id: 7, name: "Muwatta Malik", arabic: "موطأ مالك", slug: "malik", source: "by_chapter/the_9_books/malik" },
    { id: 8, name: "Musnad Ahmad", arabic: "مسند أحمد", slug: "ahmed", source: "by_chapter/the_9_books/ahmed" },
    { id: 9, name: "Sunan ad-Darimi", arabic: "سنن أد-دارمي", slug: "darimi", source: "by_chapter/the_9_books/darimi" },
    { id: 10, name: "Riyad al-Salihin", arabic: "رياض الصالحين", slug: "riyad-al-salihin", source: "by_chapter/other_books/riyad_assalihin" },
    { id: 11, name: "Shamail al-Muhammadiyah", arabic: "الشمائل المحمدية", slug: "shamail-al-muhammadiyah", source: "by_chapter/other_books/shamail_muhammadiyah" },
    { id: 12, name: "Bulugh al-Maram", arabic: "بلوغ المرام", slug: "bulugh-al-maram", source: "by_chapter/other_books/bulugh_almaram" },
    { id: 13, name: "Al-Adab Al-Mufrad", arabic: "الأدب المفرد", slug: "al-adab-al-mufrad", source: "by_chapter/other_books/aladab_almufrad" },
    { id: 14, name: "Mishkat al-Masabih", arabic: "ميشكات المصابيح", slug: "mishkat-al-masabih", source: "by_chapter/other_books/mishkat_almasabih" },
    { id: 15, name: "The Forty Hadith of al-Nawawi", arabic: "الأربعون النووية", slug: "nawawi-40", source: "by_book/forties/nawawi40.json", isSingleFile: true },
    { id: 16, name: "The Forty Hadith Qudsi", arabic: "الأربعون القدسية", slug: "qudsi-40", source: "by_book/forties/qudsi40.json", isSingleFile: true },
    { id: 17, name: "The Forty Hadith of Shah Waliullah", arabic: "أربعون الشاه ولي الله", slug: "waliullah-40", source: "by_book/forties/shahwaliullah40.json", isSingleFile: true }
];

function ensureDir(dir) {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
}

function writeJson(filePath, data) {
    ensureDir(path.dirname(filePath));
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
}

async function generate() {
    const allBooksInfo = [];
    const searchIndex = [];

    for (const book of booksMetadata) {
        console.log(`Processing ${book.name}...`);
        let hadiths = [];
        let chapters = [];
        const bookPath = path.join(SOURCE_DIR, book.source);

        if (book.isSingleFile) {
            const data = JSON.parse(fs.readFileSync(bookPath, 'utf8'));
            hadiths = data.hadiths.map(h => ({
                id: h.id,
                chapterId: h.chapterId || 1,
                bookId: book.id,
                arabic: h.arabic,
                english: {
                    narrator: h.english?.narrator || "",
                    text: h.english?.text || ""
                }
            }));
        } else {
            const files = fs.readdirSync(bookPath).filter(f => f.endsWith('.json')).sort((a, b) => {
                const numA = parseInt(a);
                const numB = parseInt(b);
                if (isNaN(numA)) return 1;
                if (isNaN(numB)) return -1;
                return numA - numB;
            });

            for (const file of files) {
                const data = JSON.parse(fs.readFileSync(path.join(bookPath, file), 'utf8'));
                const chapterHadiths = data.hadiths.map(h => ({
                    id: h.id,
                    chapterId: h.chapterId,
                    bookId: book.id,
                    arabic: h.arabic,
                    english: {
                        narrator: h.english?.narrator || "",
                        text: h.english?.text || ""
                    }
                }));
                hadiths.push(...chapterHadiths);
                
                chapters.push({
                    id: data.hadiths[0]?.chapterId || chapters.length + 1,
                    bookId: book.id,
                    arabic: data.metadata.arabic.introduction || "",
                    english: data.metadata.english.introduction || "",
                    hadithsCount: chapterHadiths.length
                });
            }
        }

        // 1. /api/{book-slug}.json
        writeJson(path.join(OUTPUT_DIR, `${book.slug}.json`), hadiths);
        // 2. /api/{book-slug}/index.json
        writeJson(path.join(OUTPUT_DIR, book.slug, `index.json`), hadiths);
        // 3. /api/{book-slug}/hadiths.json
        writeJson(path.join(OUTPUT_DIR, book.slug, `hadiths.json`), hadiths);

        // 4. /api/{book-slug}/hadith/{id}.json
        hadiths.forEach(h => {
            const hadithData = {
                ...h,
                book: {
                    id: book.id,
                    name: book.name,
                    arabic: book.arabic,
                    slug: book.slug
                }
            };
            writeJson(path.join(OUTPUT_DIR, book.slug, 'hadith', `${h.id}.json`), hadithData);
            
            // Add to search index
            searchIndex.push({
                slug: book.slug,
                bookId: book.id,
                chapterId: h.chapterId,
                hadithId: h.id,
                narrator: h.english.narrator,
                text: h.english.text.substring(0, 200) + "..."
            });
        });

        // 5. /api/{book-slug}/page/{n}.json
        const perPage = 50;
        const totalPages = Math.ceil(hadiths.length / perPage);
        for (let i = 1; i <= totalPages; i++) {
            const pageData = {
                page: i,
                perPage: perPage,
                totalPages: totalPages,
                totalCount: hadiths.length,
                nextPage: i < totalPages ? i + 1 : null,
                prevPage: i > 1 ? i - 1 : null,
                items: hadiths.slice((i - 1) * perPage, i * perPage)
            };
            writeJson(path.join(OUTPUT_DIR, book.slug, 'page', `${i}.json`), pageData);
        }

        // 6. /api/books/{book-slug}/chapters.json
        writeJson(path.join(OUTPUT_DIR, 'books', book.slug, 'chapters.json'), chapters);

        allBooksInfo.push({
            id: book.id,
            name: book.name,
            arabic: book.arabic,
            slug: book.slug,
            totalHadiths: hadiths.length,
            path: `/api/${book.slug}.json`
        });
    }

    // 7. /api/books.json
    writeJson(path.join(OUTPUT_DIR, 'books.json'), allBooksInfo);

    // 8. /api/search.json
    writeJson(path.join(OUTPUT_DIR, 'search.json'), searchIndex);

    console.log("Generation complete!");
}

generate().catch(console.error);
