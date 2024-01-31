const express = require('express')
const app = express()
const port = process.env.PORT || 3000;
const path = require('path')
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
const { mergepdfs } = require('./merge');
app.use(express.static(path.join(__dirname, 'dist')));

app.use('/static',express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "dist/index.html"))
})

app.post('/merge', upload.array('pdfs', 12), async (req, res, next) => {
    console.log(req.files)
    const files = req.files.map(file => file.path);
    let d = await mergepdfs(files);

    res.redirect(`http://localhost:3000/static/${d}.pdf`)
    
});

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})