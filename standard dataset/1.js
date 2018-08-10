//find
db.zips.find({city:"AGAWA"},{ _id:0})

//find city begenning with
db.getCollection('zips').find({city: {$regex: /^AGA/,$options:'i' } })

// find city ending with
db.getCollection('zips').find({city: {$regex: /AM$/} })

//chẻck index before search by text
db.zips.getIndexes()

//create index 
db.zips.createIndex({pop:"text"})
//search
db.zips.find({$text: { $search: "AGAWAM" }}).count()

//find with condition-sort data 
db.zips.find({
    $and: [{ "loc.1":{$gte: 40},
            "loc.0": { $lt :-100} 
            , pop: {$gt: 200} }]
    
}).sort({ pop:-1 })

//check numbers of variables in state
db.zips.distinct("state").slice(0, 256)
// number of particular state
db.zips.count({state:"UT"})


db.zips.aggregate(
    {
        $group: { _id: "$state",
                total_population: {$sum: '$pop'
                    
                                }
                 }       
    },
    
    {$sort: {total_population:1}},
    
    {$match: {'total_population':{$gte:500000} }}
    
   
    
    )
      //.match(qb.where("status").eq("A"))
      //.project("gender _id")
      //.unwind("$arrayField")
      //.group({ _id: "$gender", count: { $sum: 1 } })
      //.sort("-count")
      //.limit(5)
      
    //map reduce 
    
  db.createCollection("map_reduce")
  
    var map_func = function(){
        
        emit(this.state, this.pop);
    }
    
    var reduce_func = function (in_state, in_pop){
        
        return Array.sum(in_pop)
    }
    
    db.zips.mapReduce(map_func,reduce_func,{out: 'map_reduce'})
    
    
    