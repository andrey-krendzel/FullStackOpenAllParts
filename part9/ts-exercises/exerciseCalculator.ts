interface Result {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: String;
    target: number;
    average: number;
  }

interface EntryValues {
    Monday: number;
    Tuesday: number;
    Wednesday: number;
    Thursday: number;
    Friday: number;
    Saturday: number;
    Sunday: number;
}

const parseArguments = (args: Array<string>): EntryValues => {
    
    // if (args.length < 9) throw new Error('Not enough arguments');
    // if (args.length > 9) throw new Error('Too many arguments');

    for (let i = 2; i< args.length-1; i++) {
        if (!isNaN(Number(args[i]))){
            
        }
    }

    if (!isNaN(Number(args[2])) 
    && !isNaN(Number(args[3]))
    && !isNaN(Number(args[4]))
    && !isNaN(Number(args[5]))
    && !isNaN(Number(args[6]))
    && !isNaN(Number(args[7]))
    ){
        return {
            Monday: Number(args[2]),
            Tuesday: Number(args[3]),
            Wednesday: Number(args[4]),
            Thursday: Number(args[5]),
            Friday: Number(args[6]),
            Saturday: Number(args[7]),
            Sunday: Number(args[8])

        }
    } else {
        throw new Error('Provided values were not numbers!')
    }

}

const calculateExercises = (args: Array<string>): Result =>
{

    let trainingDaysCounter = 0
    let trainingHoursCounter = 0
   
    for (let i=3; i<args.length; i++){
        if (Number(args[i]) !== 0){
            trainingDaysCounter += 1
        }
        trainingHoursCounter += Number(args[i])
    }

    let averageHours = trainingHoursCounter / (args.length-3)
    let successAchieved
    let target = Number(args[2])
    if (averageHours > target){
        successAchieved = true
    } else {
        successAchieved = false
    }

    let rating
    let ratingDescription
    if (averageHours / target >= 1){
        rating = 3
        ratingDescription = 'target achieved or overachieved'
    } else if (averageHours / target >= 0.9){
        rating = 2
        ratingDescription = 'target achieved 90% or more'
    } else if (averageHours / target >= 0.7){
        rating = 1
        ratingDescription = 'target achieved 70% or more'
    } else {
        rating = 0
        ratingDescription = 'Less than 70% achieved'
    }

    return{
   periodLength: args.length-3,
   trainingDays: trainingDaysCounter,
   success: successAchieved,
   rating: rating,
   ratingDescription: ratingDescription,
   target: target,
   average: averageHours
    }
}


try {
    
   console.log(calculateExercises(process.argv))

} catch (error:unknown) {
    let errorMessage = 'Something bad happened.'
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
}