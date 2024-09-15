const express = require("express");
const zod = require("zod")
const app = express();

app.use(express.json());

const employeeDataSchema = zod.object({
    name: zod.string(),
    designation: zod.string(),
    department: zod.string(),
    id: zod.string()
})
function validateExistingId(req, res, next){
    const reqID = req.params.id;
    employeeData.map((each)=>{
        if(each.id !== reqID){
            res.status(404).json({msg: 'Id not found'}); 
        }
        else{
            next();
        }
    })
}

let employeeData = [
    {
        name:"Digbijaya Biswal",
        designation:"Software Engineer 2",
        department:"DSE",
        id:"2024"
    }
]

app.get("/", function(req, res){
    res.send(employeeData);
})

app.post("/", function(req,res){
    req.body
    const inputValidation = employeeDataSchema.safeParse(req.body);
    if(!inputValidation.success){
        res.status(411).json({
            msg: "Input is invalid!"
        })
    }
   else{
        employeeData.push(req.body);
        res.send("Data has been saved!!")
    }
})

app.put('/:id', validateExistingId, function(req,res){
    // console.log(req.params.id)
    const reqID = req.params.id;
  employeeData.filter((each) =>{
   if(each.id === reqID){
    each.department = req.body.department;
    each.designation = req.body.designation
   }
    })
    // console.log(employeeData)
    res.send(employeeData)
        
    }
)


app.delete('/:id', validateExistingId, function(req,res){
    // console.log(req.params.id)
    const reqID = req.params.id;
  employeeData = employeeData.filter((each) =>{ return each.id !== reqID })

  res.send("deleted")

})


//global catches or it's called error  base middleware
app.use(function(err, req, res, next){
    res.json({
        msg:"Sorry something is wrong with our server!"
    })
})



app.listen(3000,()=>{
    console.log("started");
});

// 112, 131, video
//21 video continue -  49