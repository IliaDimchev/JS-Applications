
function pyrva([...input]) {
    let [sizeOfaSide, sheetsOfPaper, ...sheetData] = input

    let sizeOfCube = 6 * Number(sizeOfaSide) * Number(sizeOfaSide)
    let coveredFace = 0

    for (let i = 2; i <= 2 * sheetsOfPaper; i += 2) {
        if (i % 10 === 0) {
            continue
        }

        let paperFace = (sheetData[i - 2] * sheetData[i - 1])

        if (((i / 2)) % 3 === 0) {
            paperFace = paperFace - paperFace / 4
        }

        coveredFace += paperFace

        // if (coveredFace >= sizeOfCube) {
        //     break
        // }
    }


    if (coveredFace >= sizeOfCube) {
        console.log("You've covered the gift box!")
        console.log(`${(((coveredFace - sizeOfCube) / coveredFace) * 100).toFixed(2)}% wrap paper left.`)
    } else {
        console.log('You are out of paper!')
        console.log(`${(100 - ((coveredFace / sizeOfCube) * 100)).toFixed(2)}% of the box is not covered.`)
    }
}

// pyrva(
//     (["10",
//         "5",
//         "3",
//         "0.5",
//         "2.4",
//         "5",
//         "3.7",
//         "1",
//         "3",
//         "34.7",
//         "5",
//         "80"])
// )

// pyrva(
//     (["2",
//         "2",
//         "0.2",
//         "7",
//         "6",
//         "8.5"])

// )