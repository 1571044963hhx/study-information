const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const fs = require('fs');

const crypto = require('crypto');

const app = express();
const port = 3000;

// 设置 CORS
app.use(cors());

// 创建 uploads 目录如果不存在
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// 设置文件存储配置
const storage = multer.diskStorage({
    //设置上传文件的存储目录,req请求对象，file文件对象，cb回调函数。
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    //设置上传文件的名字，
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

//创建一个 multer 实例，并使用上面定义的 storage 作为文件存储配置。
const upload = multer({ storage: storage });

// 计算文件的哈希值
const getFileHash = (filePath) => {
    return new Promise((resolve, reject) => {
        const hash = crypto.createHash('sha256');
        const stream = fs.createReadStream(filePath);
        stream.on('data', (data) => hash.update(data));
        stream.on('end', () => resolve(hash.digest('hex')));
        stream.on('error', (err) => reject(err));
    });
};

// 上传文件的接口
//upload.single('file')：使用 upload 中间件处理上传的单个文件，文件字段名为 'file'
app.post('/upload', upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            throw new Error('No file uploaded');
        }
        const uploadedFilePath = path.join('uploads', req.file.filename);

        // 计算上传文件的哈希值
        const uploadedFileHash = await getFileHash(uploadedFilePath);

        // 遍历服务器上已有文件，计算哈希值并比较
        const files = fs.readdirSync('uploads');
        for (const file of files) {
            const filePath = path.join('uploads', file);
            if (filePath === uploadedFilePath) continue; // 跳过当前上传的文件

            const fileHash = await getFileHash(filePath);
            if (fileHash === uploadedFileHash) {
                // 删除刚上传的文件
                fs.unlinkSync(uploadedFilePath);
                return res.status(409).json({
                    code: 409,
                    message: '上传文件重复'
                });
            }
        }
        //模拟随机返回成功或失败
        // const success = Math.random() > 0.1;
        // console.log(success)
        const success = true
        if (success) {
            res.json({
                code: 200,
                imgUrl: `http://localhost:${port}/uploads/${req.file.filename}`
            });
        } else {
            // 删除已上传的文件
            fs.unlink(path.join(uploadDir, req.file.filename), (err) => {
                if (err) {
                    console.error('Error deleting file:', err);
                }
                res.json({
                    code: 500,
                    message: '上传失败'
                });
            });
        }
    } catch (error) {
        console.error('Error handling /upload request:', error);
        res.status(500).json({
            code: 500,
            message: error.message
        });
    }
});

app.post('/merge',async (req, res) => {
    try {
        const success = true
        if (success) {
            res.json({
                code: 200,
                imgUrl: `http://localhost:${port}/uploads/${req.file.filename}`
            });
        } else {
            // 删除已上传的文件
            fs.unlink(path.join(uploadDir, req.file.filename), (err) => {
                if (err) {
                    console.error('Error deleting file:', err);
                }
                res.json({
                    code: 500,
                    message: '上传失败'
                });
            });
        }
    } catch (error) {
        console.error('Error handling /upload request:', error);
        res.status(500).json({
            code: 500,
            message: error.message
        });
    }
});

// 设置静态文件目录
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
