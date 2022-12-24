import { requirementsData } from '../constants'

export function getStrength(password: string) {
  let multiplier = password.length > 5 ? 0 : 1

  requirementsData.forEach((requirement) => {
    if (!requirement.re.test(password)) {
      multiplier += 1
    }
  })

  return Math.max(100 - (100 / (requirementsData.length + 1)) * multiplier, 10)
}
