export interface UserStoryArtifact {
  id: string
  epic: string
  feature: string
  title: string
  role: string
  behavior: string
  benefit: string
  acceptanceCriteria?: string[]
  technicalNotes?: string[]
  source: string
}
