require('dotenv').config();
const express = require('express');
const multer = require('multer');
const cors = require('cors');
const app = express();

app.use(cors());
const port = process.env.port || 3000;


app.get('/', (req, res)=>{
    console.log('home route')
    return res.send("Hello World");
});




/********************************************************************************
 *                      CODE FOR SINGLE FILE UPLOAD
********************************************************************************/
const singleFileStorageEngine = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null, './images');
    },
    filename: (req, file, cb)=>{
         //use "file" object to access the image
        const file_full_name = file.originalname;

        // replace any space occurrence in-between the file name with underscore sign.
        let file_fullName = file_full_name.replaceAll(" ","_");

        const split_fileFullName = file_fullName.split('.');
        const fileName_only = split_fileFullName[0];
        const fileExtention_only = split_fileFullName[1];
        cb(null, `${fileName_only}-${Date.now()}-paschalogba-nodejsMulterProject.${fileExtention_only}`);
    }
});

const singlefileUpload = multer({storage: singleFileStorageEngine});

// single file upload route
app.post('/upload/single',singlefileUpload.single('image'), (req, res)=>{
    try {
        console.log('single file upload route');
        console.log(`single file upload was successful.`);
        console.log(req.file);
         //use "req.file" object to access the image
        const file_full_name = req.file.originalname;

        // replace any space occurrence in-between the file name with underscore sign.
        let file_fullName = file_full_name.replaceAll(" ","_");

        return res.status(201).json({'msg': `single file upload for ${file_fullName} file was successful.`});
    } catch (error) {
        console.log(`error ---> ${error.message}`)
    }
});





/********************************************************************************
 *                      CODE FOR MULTIPLE FILES UPLOAD
********************************************************************************/
const multiFileStorageEngine = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null, './images');
    },
    filename: (req, file, cb)=>{
         //use "file" object to access the image
        const file_full_name = file.originalname;
        console.log(`from multiFileStorageEngine, file_full_name = ${file.originalname}`);

        
        // replace any space occurrence in-between the file name with underscore sign.
        let file_fullName = file_full_name.replaceAll(" ","_");

        const split_fileFullName = file_fullName.split('.');
        const fileName_only = split_fileFullName[0];
        const fileExtention_only = split_fileFullName[1];
        cb(null, `${fileName_only}-${Date.now()}-paschalogba-nodejsMulterProject.${fileExtention_only}`);
        
    }
});

const multifileUpload = multer({storage: multiFileStorageEngine});

app.post('/upload/multi',multifileUpload.array('images', 3), async(req, res)=>{
    console.log('multi file upload route');

    try {
        console.log('multi file upload route');
        console.log(`multi file upload was successful.`);

         //use "req.file" object to access the image
        const file_full_name = req.file.originalname;

        // replace any space occurrence in-between the file name with underscore sign.
        let file_fullName = file_full_name.replaceAll(" ","_");

        return res.status(201).json({'msg': `single file upload for ${file_fullName} file was successful.`});
    } catch (error) {
        return ;
    }
});



app.listen(port, ()=>{
    console.log(`Server running on http://localhost:${port}/`);
});
