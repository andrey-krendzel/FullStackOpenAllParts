const calculateBmi = (args: Array<string>): String => {

    let height = Number(args[2])/100
    console.log(height)
    let weight = Number(args[3])
    console.log(weight)

    let bmiCalculation = weight/(height*height)
    
    console.log(bmiCalculation)

    if (bmiCalculation < 18.5) {
        return 'Underweight'
    } else if (bmiCalculation >= 18.5 && bmiCalculation < 24.9) {
        return 'Healthy weight'
    } else if (bmiCalculation >= 25 && bmiCalculation < 29.99) {
        return 'Overweight'
    } else {
        return 'Obese'
    }
}

try {
console.log(calculateBmi(process.argv))
} catch (error: unknown) {
    let errorMessage = 'Something bad happened.'
    if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
}
