export type ProjectType =
  | 'games'
  | 'web_apps'
  | 'templates'
  | 'ai'
  | 'devops'
  | 'tools'
  | 'notes'
  | 'personal'

export type ProjectDomain =
  | 'frontend'
  | 'backend'
  | 'devops'
  | 'security'
  | 'ai'
  | 'creative'

export interface Project {
  slug: string
  name: string
  type: ProjectType
  domains: ProjectDomain[]
  stack: string[]
  field: string
  industry: string
  role: string
  year: string
  description: string
  repo: string
  pagesUrl?: string
  localReadme: string
}

export interface CategoryMeta {
  type: ProjectType
  label: string
  count: number
}

export interface Competency {
  category: string
  skills: string[]
}

export interface EducationItem {
  qualification: string
  institution: string
  period: string
  certificate?: string
}

export interface EmploymentItem {
  title: string
  company: string
  period: string
  bullets: string[]
}

export interface Achievement {
  title: string
  description: string
}

export interface Abbreviation {
  abbr: string
  full: string
}
