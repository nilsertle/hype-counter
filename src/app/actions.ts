'use server'

import { promises as fs } from 'fs'
import path from 'path'

const counterFile = path.join(process.cwd(), 'counter.txt')

export async function getCount() {
    try {
        const count = await fs.readFile(counterFile, 'utf-8')
        return parseInt(count) || 0
    } catch {
        await fs.writeFile(counterFile, '0')
        return 0
    }
}

export async function incrementCount() {
    const currentCount = await getCount()
    const newCount = currentCount + 1
    await fs.writeFile(counterFile, newCount.toString())
    return newCount
}