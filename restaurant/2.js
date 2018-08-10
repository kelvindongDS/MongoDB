db.restaurant.find({}).sort({ rating:-1 })

//adjust name of one column
db.restaurant.updateMany({'address line 2': {$exists: true}},{$rename: {'address line 2':'address_line_2'} })

db.restaurant.distinct("type_of_food").slice(0, 256)

db.restaurant.aggregate(
    
    {$group: { _id: "$type_of_food",
                number_res: {$sum: 1},
                rating: {$avg: "$rating"}
        
             }
    },
    {$sort: {number_res:-1} }
    
    )
//=>curry and pizza are the most common one among type of foods
//find out more about Curry

db.restaurant.aggregate(
    
    {$group: { _id: {type_of_food:"$type_of_food",address_line_2:'$address_line_2'},
                number_res: {$sum: 1},
                rating: {$avg: "$rating"}
        
             }
    },
    
   
    
    {$match: {'_id.type_of_food':"Curry"}},
    {$sort: {number_res:-1} }
    
    )
//curry food was consumed the most in London, Birmingham with high rating
 
    
db.restaurant.aggregate(
    
    {$group: { _id: "$type_of_food",
                number_res: {$sum: 1},
                rating: {$avg: "$rating"}
        
             }
    },
    {$sort: {rating:1} }
    )
//=> african, vegetarian has some issues with customer satisfactory.

db.restaurant.aggregate(
    
    {$group: { _id: {type_of_food:"$type_of_food",address_line_2:'$address_line_2'},
                number_res: {$sum: 1},
                rating: {$avg: "$rating"}
        
             }
    },
    
   
    
    {$match: {'_id.type_of_food':"African"}},
    {$sort: {number_res:-1} }
    
    )
//=> it appears that African has an customer issues in London while curry is so succesful.Need more info about revenue to evaluate.
