export interface FeatureArtifact {
  id: string
  epic: string
  title: string
  capability: string
  implementationNotes?: string[]
  acceptanceCriteria?: string[]
  source: string
}
