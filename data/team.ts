export interface TeamMember {
  name: string
  role: string
  photo: string
  linkedin: string
}

export const team: TeamMember[] = [
  { name: 'Founder Name',      role: 'Founder & Strategy Lead', photo: '/images/team/founder.jpg', linkedin: '#' },
  { name: 'Design Lead Name',  role: 'Creative Director',        photo: '/images/team/design.jpg',  linkedin: '#' },
  { name: 'Dev Lead Name',     role: 'Head of Development',      photo: '/images/team/dev.jpg',     linkedin: '#' },
]
