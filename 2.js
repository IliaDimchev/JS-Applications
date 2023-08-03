
function pyrva([...input]) {
    let [numbers, ...commands] = input
    let array = numbers.split(" ")

    for (let command of commands) {
        let commandData = command.split(' ');
        let opener = commandData[0]

        array = array.map(i => Number(i))

        if (opener === 'add') {
            let [add, to, start, ...additions] = command.split(' ')
            array.unshift(...additions)
            array = array.map(i => Number(i))
        }

        if (opener === 'remove') {
            let extra = commandData[1]
            if (extra === 'at') {
                let index = Number(commandData[3])

                if (array.length - 1 < index) {
                    continue
                }

                array.splice(index, 1);
            }

            if (extra === 'greater') {
                let number = Number(commandData[3])

                array = array.filter(x => Number(x) <= number)
            }
        }

        if (opener === "replace") {
            let value = Number(commandData[1])
            let replacement = Number(commandData[2])

            let index = array.indexOf(value);

            if (index > -1) {
                // might be a string
                array[index] = replacement;
            }
        }

        if (opener === "find") {
            let extra = commandData[1]
            if (extra === 'even') {
                console.log(array.filter(x => x % 2 === 0).join(' '));
            }

            if (extra === 'odd') {
                console.log(array.filter(x => x % 2 !== 0).join(' '));
            }
        }

        if (opener === "END") {
            console.log(array.join(', '));
        }
    }
}

// pyrva(
//     (["1 2 3 10 10 6 4 10",
//         "find odd",
//         "replace 4 1",
//         "remove greater than 5",
//         "END"])
// )