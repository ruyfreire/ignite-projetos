import { parse } from 'csv-parse';

export async function CSVParse(req) {
    const parser = req.pipe(parse())
    const tasks = []
    
    let index = 0
    for await (const row of parser) {
        if (index === 0) {
            index++
            continue
        }

        const [title, description] = row
        tasks.push({
            title,
            description
        })

        index++
    }

    req.body = tasks
}