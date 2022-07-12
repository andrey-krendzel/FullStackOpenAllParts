// const calculateBmi = (args: Array<string>): string => {

//     const height = Number(args[2])/100;
//     console.log(height);
//     const weight = Number(args[3]);
//     console.log(weight);

//     const bmiCalculation = weight/(height*height);
    
//     console.log(bmiCalculation);

//     if (bmiCalculation < 18.5) {
//         return 'Underweight';
//     } else if (bmiCalculation >= 18.5 && bmiCalculation < 24.9) {
//         return 'Healthy weight';
//     } else if (bmiCalculation >= 25 && bmiCalculation < 29.99) {
//         return 'Overweight';
//     } else {
//         return 'Obese';
//     }
// };

const calculateBmiParameters = (height: number, weight: number): string => {
    const bmiCalculation = weight/((height/100)*(height/100));

    console.log(bmiCalculation);

    if (bmiCalculation < 18.5) {
        return 'Underweight, BMI: ' + bmiCalculation;
    } else if (bmiCalculation >= 18.5 && bmiCalculation < 24.9) {
        return 'Healthy weight, BMI: ' + bmiCalculation;
    } else if (bmiCalculation >= 25 && bmiCalculation < 29.99) {
        return 'Overweight, BMI: '+ bmiCalculation;
    } else {
        return 'Obese, BMI: ' + bmiCalculation;
    }
};

// try {
// console.log(calculateBmi(process.argv));
// } catch (error: unknown) {
//     let errorMessage = 'Something bad happened.';
//     if (error instanceof Error) {
//         errorMessage += ' Error: ' + error.message;
//     }
//     console.log(errorMessage);
// }

export default calculateBmiParameters;