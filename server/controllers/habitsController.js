const Habit = require('../models/habitsInfoModel');

// function to return all the habit details
const getHabits = async(req,res)=>{
    console.log("habits get request");
    const habits = await Habit.find({});
    console.log("habits get request");
    res.set('Content-Type', 'application/json')
    res.send({habits});
}
// Function to add the habit to the DB
const add = async (req,res) =>{
    let {habit} = req.body;
    let habitStatus ="";
    const curDate = new Date(Date.UTC(
        new Date().getUTCFullYear(),
        new Date().getUTCMonth(),
        new Date().getUTCDate(),
        0, 0, 0, 0
      ));
    if(habit === undefined || habit === null ){
        res.status(400);
        res.send("All fileds are mandatory!")
    }
    if(habitStatus.status===null || habitStatus.status ===undefined){
        habitStatus={status: "none", date:curDate }
    }
    //check whether habit already exits in DB or not
    const habitInfoFound = await Habit.findOne({habit});
    console.log("after finding habit info:  ",habitInfoFound)
    // if habit already exists then update the existng status on the particular date
    if(habitInfoFound !== undefined && habitInfoFound!== null){
        const statusArray = [...habitInfoFound.habitStatus,habitStatus]
        console.log("inside", statusArray)
        let recordstatus = habitStatus.status;
        const recorddate = habitStatus.date;
        let habitUpdatedInfo = await Habit.findOneAndUpdate({habit,habitStatus: {$elemMatch:{date:recorddate}}},{ $set:{'habitStatus.$.status':recordstatus} },{ new: true } )
        
        console.log("date matched?? ", habitUpdatedInfo);
        if(habitUpdatedInfo){
            console.log("after update after date match info",habitUpdatedInfo);
            res.send(habitUpdatedInfo);
        }
        else{
             Habit.findOneAndUpdate({habit:habit},{habitStatus:statusArray}, { new: true }) // if new : true is not written then it wont return the updated result
            .then((habitUpdatedInfo)=>{
                if(habitUpdatedInfo){
                    console.log("after update info",habitUpdatedInfo);
                    res.send(habitUpdatedInfo);
                }
                else{
                    console.error('Error updating habit:', error);
                    res.send("error");
                }
            })
           
        }
        
    }
    // Else create the habit along with default status in DB
    else{
        console.log("console is coming inside else: ")
        const habitStatusArray = [];
        habitStatusArray.push(habitStatus);
        try{ 
            console.log("Inside try",habitStatusArray)
            const habitInfo = await Habit.create({
                habit:habit,habitStatus:habitStatusArray
            })

                if(habitInfo){
                    console.log("infomation created")
                    res.status(200);
                    res.send(habitInfo);
                }
                else{
                    res.status(400);
                    res.send("Error while creating habit!", error);
                }
            
            
            
        }
       catch(error){
        console.log("error occured: ",error)
       }
    }
}

// Fucntion to change the status of existing habit on the mentioned date
const changeStatus =async(req,res)=>{
    let {habit,recordStatus} = req.body;
    console.log("date and stus: ", recordStatus, habit)
    let status = recordStatus.status;
    const recorddate = recordStatus.date;
    const habitInfo = await Habit.findOne({habit});
    console.log(habitInfo);
    if(habitInfo === null || habitInfo===undefined){
        res.status(400);
        res.send("Habit not found")
    }
    //find the matching habit and status and update the newly passed status
    const habitUpdatedInfo = await Habit.findOneAndUpdate({habit,
        habitStatus: {
            $elemMatch: {
              date: recorddate
            }
        }}, { $set: { 'habitStatus.$.status': status } }
        ,{ new: true } )
    console.log("updated info: ", habitUpdatedInfo);
    if(habitUpdatedInfo){
        res.status(200);
        res.send(habitUpdatedInfo);
    }
    else{
        res.status(400);
        res.send("Error while updating habit status");
    }
   
}

// Promises to add the habit status on the date passed if no status exists
const addDummyHabit = async({habit},date)=>{
    return new Promise(async(resolve, reject)=>{
        const habitInfo = await Habit.find({habit});
        console.log("Function called!! date: ", date, habit);
        // console.log("got habit info after calling function: ",habitInfo[0].habitStatus)
        const habitDate = date;
        const habitStatus = {date:habitDate};
        const statusArray = [...habitInfo[0].habitStatus,habitStatus];
        // Find whether there exists any status on the passed date, if yes then  reject saying habit date already exists
        Habit.find({habit, habitStatus: {$elemMatch:{date:habitDate}}}).then((habitDateExists)=>{
        console.log("habitdateexists:", habitDateExists, habitDateExists.length, habitDate)
            if(habitDateExists.length > 0){
                reject("Date already exists", habitDateExists);
            }
            else{
                console.log("inside else part", statusArray);
                //  add the status on the mentioned date
                Habit.findOneAndUpdate({habit:habit},{habitStatus:statusArray}, { new: true })
                .then((habitUpdatedInfo)=>{
                    if(habitUpdatedInfo){
                        console.log("Inside if of habitUpdatedOnfo for habit",habit," on date: ",date);
                        resolve(habitUpdatedInfo)
                        // res.send(habitUpdatedInfo);
                    }
                    else{
                        console.error('Error updating habit:', error);
                        reject(error)
                        // res.send("error");
                    }
                }) // if new : true is not written then it wont return the updated result
                .catch((error)=>{
                    console.log("error occured!", error)
                })
            }
        }) 
    } )
}

//
const weekViewPromise =async (req,res)=>{
    return new Promise(async (resolve)=>{
        const habits = await Habit.find({});
        const weekViewHabits =[];
        let currentDate = new Date(Date.UTC(
            new Date().getUTCFullYear(),
            new Date().getUTCMonth(),
            new Date().getUTCDate(),
            0, 0, 0, 0
          ));
        var options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        currentDate.setDate(currentDate.getDate() -7);
            const habitsInfo = await Habit.find({})
            .then((habitsInfo)=>{
                habitsInfo.map((habit)=>{
                       var hashSet = new Set();
                        habit.habitStatus.forEach((habitStatus)=>{
                            if(!hashSet.has(JSON.stringify(habitStatus.date))){
                                hashSet.add(JSON.stringify(habitStatus.date));
                            }
                       
                        })
                    console.log(hashSet);
                    console.log("hashset ?:",hashSet.has("2023-06-09T00:00:00.000Z"))
                    // const habitInfo = await Habit.findOne({habit});
                    currentDate = new Date(Date.UTC(
                        new Date().getUTCFullYear(),
                        new Date().getUTCMonth(),
                        new Date().getUTCDate(),
                        0, 0, 0, 0
                      ));
                      currentDate.setDate(currentDate.getDate() +1);
                      // loop to run on each habit and add the habit date to an array
                    const forLoop = async (currentDate)   => {
                    for(let i =0; i< 7;i++){
                        currentDate.setDate(currentDate.getDate() -1);
                        var dateString = currentDate.toLocaleDateString(undefined, options);
                        console.log("date is present:? " , hashSet.has(JSON.stringify(currentDate)), dateString, currentDate,habit.habit);
                        // hash set to hold date of each habit
                        if(!hashSet.has(JSON.stringify(currentDate))){
                            console.log("function calling...", currentDate);
                            await addDummyHabit(habit,currentDate).catch((error)=>{
                                console.log("Date already exits")
                            })                         
                        }
                    }
                    }   
                    forLoop(currentDate);
                    currentDate = new Date(Date.UTC(
                        new Date().getUTCFullYear(),
                        new Date().getUTCMonth(),
                        new Date().getUTCDate(),
                        0, 0, 0, 0
                      ));
                })
            })
       resolve();    
    })
}

const weekView = async(req,res)=>{
    weekViewPromise().then(async() =>{
        const currentDate = new Date(Date.UTC(
            new Date().getUTCFullYear(),
            new Date().getUTCMonth(),
            new Date().getUTCDate(),
            0, 0, 0, 0
          ));
        const startDate = new Date(Date.UTC(
            new Date().getUTCFullYear(),
            new Date().getUTCMonth(),
            new Date().getUTCDate(),
            0, 0, 0, 0
          ));
          const endDate = new Date(Date.UTC(
            new Date().getUTCFullYear(),
            new Date().getUTCMonth(),
            new Date().getUTCDate(),
            0, 0, 0, 0
          ));
        console.log("current date new: ", currentDate)
        endDate.setDate(currentDate.getDate() +1);
        console.log("current date new: ", currentDate)
       
        
        startDate.setDate(currentDate.getDate() -6);
        console.log("start and end date:",startDate, endDate)
        // fetch the habit details in the week range and send it as response
        const HabitsAfterUpdate = await Habit.aggregate([
            {
              $project: {
                habit: 1,
                createdAt: 1,
                habitStatus: {
                  $filter: {
                    input: "$habitStatus",
                    as: "status",
                    cond: {
                      $and: [
                        { $gte: ["$$status.date", startDate] },
                        { $lt: ["$$status.date", endDate] }
                      ]
                    }
                  }
                }
              }
            },
            {
                // $unwind: "$habit" ,
                $unwind: "$habitStatus" // Unwind the array to sort by the date field
              },
              {
                $sort: {
                //    createAt:1,
                  "habitStatus.date": 1 // Sort in ascending order based on the date field
                }
              },
              {
                $group: {
                  _id: "$_id",
                  habit: { $first: "$habit" },
                  habitStatus: { $push: "$habitStatus" },
                  createdAt: { $first: "$createdAt" },
                }
              },
              {
              $sort: {
                createdAt:1,
            //    "habitStatus.date": 1 // Sort in ascending order based on the date field
             }
            }
          ])
          .then((HabitsAfterUpdate)=>{
                console.log("HabitsAfterUpdate: ",HabitsAfterUpdate); 
                if(HabitsAfterUpdate === null || HabitsAfterUpdate === undefined){
                    res.status(400);
                    res.send("Error while fetching data");
                }
                res.set('Content-Type', 'application/json')
                res.status(200);
                
                res.send({HabitsAfterUpdate});
          })
        
        })
}    

// Fucntion to fetch the streak of each habit 
const getMaxStreak = async(req,res)=>{
    const habits = await Habit.find({});
    let habitDetails ={};
    console.log("habits from mongoDB: ", habits);
    let maxStreakHabit = [];
    const currentDate = new Date();
    habits.forEach(habit => {
        let completedCount =0; // Marked as done count
        let totalCount =0; // total count
        const currentDt = Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
        const createdDt = Date.UTC(habit.createdAt.getFullYear(), habit.createdAt.getMonth(), habit.createdAt.getDate());
        habit.habitStatus.forEach((recordStatus)=>{
            totalCount++;
            console.log(" loop status: ",recordStatus)
            if(recordStatus.status === "done"){
                completedCount++;
            }
        })
        const  habitName = habit.habit;
       const habitStatus = habit.habitStatus;
        const maxStreak={};
        habitDetails = {habitName, habitStatus,completedCount,totalCount }
        maxStreak[habitName] =[{"completedCount":completedCount}, {"totalCount":totalCount}];
        console.log("habit and its corresponding count: ",maxStreak);
        maxStreakHabit.push(habitDetails);
    });
    res.set('Content-Type', 'application/json')
    res.send({maxStreakHabit})
}

// find the habit by date and delete
const deleteHabit = async(req,res)=>{
    const habitId = req.body;
    Habit.findByIdAndDelete({_id:habitId}).then((deletedHabit)=>{
        if(deletedHabit){
            console.log("deleted habit: ", deletedHabit);
        }
       else{
        console.log("Habit not found!");
       }
    }).catch((error)=>{
        console.log("Error occured", error);
    })

}
module.exports = {getHabits, add, changeStatus, getMaxStreak, deleteHabit,weekView }