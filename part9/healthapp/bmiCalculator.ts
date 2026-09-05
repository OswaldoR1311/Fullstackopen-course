interface DataBody {
    weight: number
    height: number
}

function calculateBMI(data: DataBody) {
    const {weight, height} = data

    if (height <= 0 || weight <= 0) {
        throw new Error('Weight and height can´t be 0')
    }

    const heightInCms = height / 100

    const bmiOperation = weight / (heightInCms * heightInCms)

    if (bmiOperation < 16) {
        console.log('Your BMI index is: ' + bmiOperation.toFixed(2) + ' Underweight (Severe thinness)')
    } else if (bmiOperation >= 16 && bmiOperation <= 17) {
        console.log('Your BMI index is: ' + bmiOperation.toFixed(2) + ' Underweight (Moderate thinness)')
    } else if (bmiOperation >= 17 && bmiOperation <= 18.5) {
        console.log('Your BMI index is: ' + bmiOperation.toFixed(2) + ' Underweight (Mild thinness)')
    } else if (bmiOperation >= 18.5 && bmiOperation <= 25) {
         console.log('Your BMI index is: ' + bmiOperation.toFixed(2) + ' Normal range')
    } else if (bmiOperation >= 25 && bmiOperation <= 30) {
        console.log('Your BMI index is: ' + bmiOperation.toFixed(2) + ' Overweight (Pre-obese)')
    } else {
        console.log('Obese')
    }
}

try {
    const dataBody: DataBody = { weight: 73, height: 171}
    calculateBMI(dataBody)
} catch (error: unknown) {
    let errorMsg = 'An error ocurr'
    if (error instanceof Error) {
        errorMsg += 'Error: ' + error.message
    }
    console.log(errorMsg)
}