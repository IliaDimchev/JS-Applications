
function passwordValidator([...input]) {
    let [password, ...commands] = input

    for (entry of commands) {
        let instructions = entry.split(" ")
        let instruction = instructions[0]

        if (instruction === 'Insert') {
            let index = instructions[1]
            if (password.length - 1 < index) {
                continue
            }
            let char = instructions[2]
            password = password.slice(0, index) + char + password.slice(index);

            console.log(password)
        }

        if (instruction === 'Replace') {
            char = instructions[1]
            value = Number(instructions[2])

            if (password.includes(char)) {
                let search = `\\${char}`

                if (parseInt(char)) {
                    search = char
                }

                const searchRegExp = new RegExp(search, 'g'); // Throws SyntaxError
                password = password.replace(searchRegExp, String.fromCharCode(char.charCodeAt(0) + value))
                console.log(password)
            }

            continue
        }

        if (instruction === 'Make') {
            let extraInstruction = instructions[1]
            let index = instructions[2]

            if (extraInstruction === 'Upper') {
                const newPass = password.split('')
                const newChar = password.charAt(index).toUpperCase()
                newPass[index] = newChar
                password = newPass.join('')

                console.log(password)
            }

            if (extraInstruction === 'Lower') {
                const newPass = password.split('')
                const newChar = password.charAt(index).toLowerCase()
                newPass[index] = newChar
                password = newPass.join('')

                console.log(password)
            }
        }

        if (instruction === 'Validation') {
            // Might be <= 8
            if (password <= 8) {
                console.log('Password must be at least 8 characters long!')
            }

            //[\w!*_]
            if (!/^\w+$/.test(password)) {
                console.log('Password must consist only of letters, digits and _!')
            }

            if (!/.*[A-Z]/.test(password)) {
                console.log('Password must consist at least one uppercase letter!')
            }

            if (!/.*[a-z]/.test(password)) {
                console.log('Password must consist at least one lowercase letter!')
            }

            if (!/.*\d/.test(password)) {
                console.log('Password must consist at least one digit!')
            }
        }

        if (instruction === 'Complete') {
            return
        }
    }
}

passwordValidator((['123456789',
    'Insert 3 R',
    'Replace 5 15',
    'Validation',
    'Make Lower 3',
    'Complete'])

)

// passwordValidator(
//     (['invalidpassword*',
//         'Add 2 p',
//         'Replace i -50',
//         'Replace * 10',
//         'Make Upper 2',
//         'Validation',
//         'Complete'])

// )