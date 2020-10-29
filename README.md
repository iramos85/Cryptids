# Cryptid Tracker Database
Full Stack Application

https://cryptid-database.herokuapp.com/

## Welcome!

in this app I am hoping to keep an ongoing database of user's experiences/sightings with cryptids. I've always had a fascination with the *strange* and I felt like putting together this database would be a fun "catch-all" for any users who want to share and get involved with this wild community.

>"Yes, there is a conspiracy, indeed there are a great number of conspiracies, all tripping each other up..." 
> - Alan Moore

## Constructing the Database

The database was created using mongoDB and all tied together using npm packages.  I used [Mongoose](https://mongoosejs.com/) to streamline the database upload and object creation.  

Cryptids are defined by the *version 1* Schema:

```
const cryptidSchema = new mongoose.Schema({
    name:  { type: String, required: true },
    description:  { type: String, required: true },
    img: {type: String, required: false},
    temperament: Boolean
    });
```

This is the preliminary data I will use to define each Cryptid entered into the database. 
Currently the data logged is:
* Name (user given or accepted name by region)
* Description (a brief description of the creature)
* img (user can insert the URL of a hosted image of the creature)
* temperament (log whether the creature was noted to be aggressive)

### Upcoming updates to the Cryptid Schema/data logging:
* entering location
* cryptid entries tied to individual users' who created them

Each cryptid entry can be updated to correct any mistakes and/or delete the entry altogether.  *future update to include user specific data deletion*



