import { generateTodo } from '../../pipeline/generateTodo'

export async function todoCommand(): Promise<void> {
  const outputPath = generateTodo()
  process.stdout.write(`Generated backlog: ${outputPath}\n`)
}
