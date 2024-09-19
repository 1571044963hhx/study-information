const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 设置文件存储配置
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const { filename } = req.body;
        const uploadDir = path.join(__dirname, 'uploads', filename);
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const { index } = req.body;
        cb(null, `${index}`);
    }
});


const upload = multer({ storage: storage });

// 存放切片文件的目录
const chunkDir = path.join(__dirname, 'uploads');

app.get('/', (req, res) => {
    // response.header("Access-Control-Allow-Origin","*");
    //设置请求头，防止乱码
    res.set('Content-Type', 'application/json; charset=utf-8');
    res.json({ message: '你好，世界！' });
});

// 接收切片上传请求
app.post('/upload', upload.single('chunk'), async (req, res) => {
    const { index, filename, name } = req.body;
    console.log(index, filename, name)
    if (!filename || !name) {
        return res.status(400).json({ code: 400, message: 'Filename and name are required' });
    }
    const chunkPath = path.join(chunkDir, filename, name);
    if (fs.existsSync(chunkPath)) {
        return res.json({ code: 300, index: parseInt(index) });
    }
    return res.json({ code: 200 });
});
// 上传文件的接口
//upload.single('file')：使用 upload 中间件处理上传的单个文件，文件字段名为 'file'


app.post('/merge', async (req, res) => {
    const { filename, extname } = req.body;
    const uploadDir = path.join(__dirname, 'uploads', filename);
    const outputPath = path.join(__dirname, 'uploads', `${filename}.${extname}`);

    try {
        // Ensure the upload directory exists before attempting to read it
        if (!fs.existsSync(uploadDir)) {
            return res.status(400).json({ code: 400, message: 'Upload directory not found' });
        }

        const chunkFiles = fs.readdirSync(uploadDir)
            .map(name => ({ name, index: parseInt(name) }))
            .sort((a, b) => a.index - b.index);

        const writeStream = fs.createWriteStream(outputPath);

        for (const chunkFile of chunkFiles) {
            const chunkPath = path.join(uploadDir, chunkFile.name);
            const data = fs.readFileSync(chunkPath);
            writeStream.write(data);
        }

        writeStream.end();

        // 删除切片文件
        chunkFiles.forEach(chunkFile => {
            const chunkPath = path.join(uploadDir, chunkFile.name);
            fs.unlinkSync(chunkPath);
        });

        // 删除切片目录
        fs.rmdirSync(uploadDir);

        res.status(200).json({ code: 200, message: 'File merged successfully' });
    } catch (error) {
        console.error('Error merging files:', error);
        res.status(500).json({ code: 500, message: 'Error merging files' });
    }
});


app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
