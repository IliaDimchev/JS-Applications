function zoo([...params]) {
    const zoo = {}
    const areas = {}
    let a = 5
    let b = a++
    let c = ++a

    let arr = ['z', 's', 'a', 'd']
    arr.sort((a,b) => b.localeCompare(a))
    console.log(arr)


    for (command of params) {
        const [type, instruction] = command.split(': ')

        if (type === 'EndDay') {
            break
        }

        data = instruction.split('-')

        if (type === 'Add') {
            let name = data[0]
            let amount = Number(data[1])
            let area = data[2]

            if (areas[area]) {
                if (!areas[area].includes(name)) {
                    areas[area].push(name)
                }
            } else {
                areas[area] = [name]
            }

            if (zoo[name]) {
                zoo[name] += amount
            } else {
                zoo[name] = amount
            }
        }

        if (type === 'Feed') {
            let name = data[0]
            let amount = Number(data[1])

            if (zoo[name]) {
                zoo[name] -= amount
            }

            if (zoo[name] <= 0) {
                for (zone of Object.entries(areas)) {
                    if (areas[zone[0]].includes(name)) {
                        areas[zone[0]] = areas[zone[0]].filter(member => member !== name)

                        if (areas[zone[0]].length === 0) {
                            delete areas[zone[0]]
                        }
                    }
                }
                delete zoo[name]
                console.log(`${name} was successfully fed`)
            }


        }

    }

    console.log('Animals:')
    for (list of Object.entries(zoo)) {
        console.log(` ${list[0]} -> ${list[1]}g`)
    }
    // console.log(Object.entries(zoo)?.map(list => console.log(` ${list[0]} ->${list[1]}g`)))
    console.log('Areas with hungry animals:')
    for (area of Object.entries(areas)) {
        console.log(` ${area[0]}: ${area[1].length}`)
    }
}

zoo(
    (["Add: Adam-4500-ByTheCreek",
        "Add: Maya-7600-WaterfallArea",
        "Add: Maya-1230-WaterfallArea",
        "Feed: Jamie-2000",
        "EndDay"])

)