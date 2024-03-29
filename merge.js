const PDFMerger = require('pdf-merger-js');
const fs = require('fs');

const mergepdfs = async (files) => {
    try {
        const merger = new PDFMerger();

        for (const file of files) {
            await merger.add(file);
        }

        let d = new Date().getTime();
        
        // Create the 'public' directory if it doesn't exist
        const publicDir = 'public';
        if (!fs.existsSync(publicDir)) {
            fs.mkdirSync(publicDir);
        }

        await merger.save(`${publicDir}/${d}.pdf`);
        return d;
    } catch (error) {
        console.error('Error merging PDFs:', error);
        throw error;
    }
};

module.exports = { mergepdfs };




// const PDFMerger = require('pdf-merger-js');

// var merger = new PDFMerger();

// (async (p1, p2) => {
//     await merger.add('1.pdf'); //merge all pages. parameter is the path to file and filename.
//     await merger.add('2.pdf', 2); // merge only page 2
//     // await merger.add('pdf2.pdf', [1, 3]); // merge the pages 1 and 3
//     // await merger.add('pdf2.pdf', '4, 7, 8'); // merge the pages 4, 7 and 8
//     // await merger.add('pdf3.pdf', '3 to 5'); //merge pages 3 to 5 (3,4,5)
//     // await merger.add('pdf3.pdf', '3-5'); //merge pages 3 to 5 (3,4,5)

//     await merger.save('merged.pdf'); //save under given name and reset the internal document

//     // Export the merged PDF as a nodejs Buffer
//     // const mergedPdfBuffer = await merger.saveAsBuffer();
//     // fs.writeSync('merged.pdf', mergedPdfBuffer);
// })();