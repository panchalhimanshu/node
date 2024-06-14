const express = require("express");
const db = require("./db");
const MenueItem = require("./models/MenuItem")
const Teacher = require("./models/Teacherschema")
const Image = require("./models/images")

const bodyParser = require("body-parser");
const cors = require("cors")
const multer = require('multer');
// const { MongoClient } = require('mongodb');

const app = express();
app.use(bodyParser.json());
app.use(cors())
app.use(express.urlencoded())
const upload = multer();

app.get("/", (req, res) => {
  res.send("hello its me");
});


app.get("/students",async(req,res)=>{
  try{
   const data = await MenueItem.find();
   res.status(200).json(data)
  }catch(err){
    console.log(err);
    res.status(500).json({error:"internal server error"})
  }
})


app.get("/teachers",async(req,res)=>{
  try{
   const data = await Teacher.find();
   console.log("menu fatched");
   res.status(200).json(data)
  }catch(err){
    console.log(err);
    res.status(500).json({error:"internal server error"})
  }
})


app.get("/students/:id",async(req,res)=>{
  try{
    const {id} = req.params

   const data = await MenueItem.find({ _id: id });
   console.log(data)

   res.status(200).json(data)
  }catch(err){
    console.log(err);
    res.status(500).json({error:"internal server error"})
  }
})


app.get("/teachers/:id",async(req,res)=>{
  try{
    const {id} = req.params

   const data = await Teacher.find({ _id: id });
   console.log(data)

   res.status(200).json(data)
  }catch(err){
    console.log(err);
    res.status(500).json({error:"internal server error"})
  }
})


app.post("/students",async(req,res)=>{
  try{
    const data = req.body;
    const addmenu = new MenueItem(data);
    const response = await addmenu.save()
    console.log("menu added");
    res.status(200).json(response)
  }catch(err){
     console.log(err);
     res.status(500).json({error:"internal server error"})
  }
})

app.post("/teachers",async(req,res)=>{
  try{
    const data = req.body;
    const addmenu = new Teacher(data);
    const response = await addmenu.save()
    console.log("menu added");
    res.status(200).json(response)
  }catch(err){
     console.log(err);
     res.status(500).json({error:"internal server error"})
  }
})

app.put('/teachers/:id', async (req, res) => {
  try {
      const { id } = req.params;
      const { surname, fname, lname,subject, birthdate, standard, age, email, phonenumber } = req.body;
      const updatedStudent = await Teacher.findByIdAndUpdate(id, { surname, fname, lname,subject, birthdate, standard, age, email, phonenumber }, { new: true });
      
      if (!updatedStudent) {
          return res.status(404).json({ message: "teachers not found." });
      }
      
      res.json(updatedStudent);
  } catch (err) {
      res.status(400).json({ message: err.message });
  }
});

// app.put('/students/:id', async (req, res) => {
//   try {
//    const updatedStudent = await MenueItem.findByIdAndUpdate(id, { surname, fname, lname, birthdate,rollno, standard, age, email, phonenumber }, { new: true });
      
//       if (!updatedStudent) {
//           return res.status(404).json({ message: "Student not found." });
//       }
      
      // res.json(updatedStudent);
//   } catch (err) {
//       res.status(400).json({ message: err.message });
//   }      const { id } = req.params;
//       const { surname, fname, lname, birthdate,rollno, standard, age, email, phonenumber } = req.body;
   
// });

app.put('/students/:id', async (req, res) => {
try {
  const { id } = req.params;
  const { date } = req.body;
  const { complain } = req.body;
  const { surname, fname, lname, birthdate,rollno, standard, age, email, phonenumber } = req.body;

  if(date && complain)
    {
      const student = await MenueItem.findById(id);
      if (!student) {
          return res.status(404).json({ message: "Student not found." });
      }
    
      student.complains.push({date, complain })
      await student.save();
      res.json(student);
    }

    else{

        const updatedStudent = await MenueItem.findByIdAndUpdate(id, { surname, fname, lname, birthdate,rollno, standard, age, email, phonenumber }, { new: true });
           
           if (!updatedStudent) {
               return res.status(404).json({ message: "Student not found." });
           }
           res.json(updatedStudent);

    }
 
} catch (err) {
  res.status(400).json({ message: err.message });
}
});


app.delete('/students/:id', async (req, res) => {
  try {
    const userid = req.params.id
    const userupdatedatas = await MenueItem.findByIdAndDelete(userid)
  } catch (error) {
    console.log(error + "patch")
  }
});

app.delete('/teachers/:id', async (req, res) => {
  try {
    const userid = req.params.id
    const userupdatedatas = await Teacher.findByIdAndDelete(userid)
  } catch (error) {
    console.log(error + "patch")
  }
});

app.post('/upload', upload.single('image'), async (req, res) => {
  try {
    // Convert image data to Base64
    const base64Image = req.file.buffer.toString('base64');
    console.log(base64Image)
    // Insert image data into MongoDB
    const addmenu = new Image({
      standard : req.body.standard,
      subject : req.body.subject,
      date : req.body.date,
      originalname: req.file.originalname,
      data: base64Image
    });
    const response = await addmenu.save()
  
    res.send('Image uploaded successfully');
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).send('Internal Server Error');
  } 
});

app.delete('/upload/:id', async (req, res) => {
  try {
    const userid = req.params.id
    const userupdatedatas = await Image.findByIdAndDelete(userid)
  } catch (error) {
    console.log(error + "patch")
  }
});

app.get('/images', async (req, res) => {
  try {
    const images = await Image.find();
    res.json(images);
  } catch (error) {
    console.error('Error fetching images:', error);
    res.status(500).send('Internal Server Error');
  }
});





app.listen(2000, () => console.log("connected to port 2000"));
