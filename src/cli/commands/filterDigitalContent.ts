import { filterDigitalContent } from '../../pipeline/filterDigitalContent'

export function filterDigitalContentCommand(markdownPath: string): void {
  filterDigitalContent(markdownPath, { verbose: true })
}
