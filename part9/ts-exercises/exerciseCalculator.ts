interface Result {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}






// const calculateExercises = (args: Array<string>): Result => {

//     let trainingDaysCounter = 0;
//     let trainingHoursCounter = 0;

//     for (let i = 3; i < args.length; i++) {
//         if (Number(args[i]) !== 0) {
//             trainingDaysCounter += 1;
//         }
//         trainingHoursCounter += Number(args[i]);
//     }

//     const averageHours = trainingHoursCounter / (args.length - 3);
//     let successAchieved;
//     const target = Number(args[2]);
//     if (averageHours > target) {
//         successAchieved = true;
//     } else {
//         successAchieved = false;
//     }

//     let rating;
//     let ratingDescription;
//     if (averageHours / target >= 1) {
//         rating = 3;
//         ratingDescription = 'target achieved or overachieved';
//     } else if (averageHours / target >= 0.9) {
//         rating = 2;
//         ratingDescription = 'target achieved 90% or more';
//     } else if (averageHours / target >= 0.7) {
//         rating = 1;
//         ratingDescription = 'target achieved 70% or more';
//     } else {
//         rating = 0;
//         ratingDescription = 'Less than 70% achieved';
//     }

//     return {
//         periodLength: args.length - 3,
//         trainingDays: trainingDaysCounter,
//         success: successAchieved,
//         rating: rating,
//         ratingDescription: ratingDescription,
//         target: target,
//         average: averageHours
//     };
// };

const calculateExercisesServer = (target: number, daily_exercises: Array<string>): Result => {
    let trainingDaysCounter = 0;
    let trainingHoursCounter = 0;

    for (let i = 0; i < daily_exercises.length; i++) {
        if (Number(daily_exercises[i]) !== 0) {
            trainingDaysCounter += 1;
        }
        trainingHoursCounter += Number(daily_exercises[i]);
    }

    const averageHours = trainingHoursCounter / (daily_exercises.length);
    let successAchieved;
    const targetHours = Number(target);
    if (averageHours > targetHours) {
        successAchieved = true;
    } else {
        successAchieved = false;
    }

    let rating;
    let ratingDescription;
    if (averageHours / target >= 1) {
        rating = 3;
        ratingDescription = 'target achieved or overachieved';
    } else if (averageHours / target >= 0.9) {
        rating = 2;
        ratingDescription = 'target achieved 90% or more';
    } else if (averageHours / target >= 0.7) {
        rating = 1;
        ratingDescription = 'target achieved 70% or more';
    } else {
        rating = 0;
        ratingDescription = 'Less than 70% achieved';
    }

    return {
        periodLength: daily_exercises.length,
        trainingDays: trainingDaysCounter,
        success: successAchieved,
        rating: rating,
        ratingDescription: ratingDescription,
        target: target,
        average: averageHours
    };

};


// try {

//     console.log(calculateExercises(process.argv));

// } catch (error: unknown) {
//     let errorMessage = 'Something bad happened.';
//     if (error instanceof Error) {
//         errorMessage += ' Error: ' + error.message;
//     }
//     console.log(errorMessage);
// }

export default calculateExercisesServer;