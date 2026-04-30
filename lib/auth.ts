export interface User {
  id: string
  name: string
  email: string
  phone?: string
  role?: string
}

const USERS_KEY = 'ch_users'
const SESSION_KEY = 'ch_session'

function getUsers(): User[] {
  if (typeof window === 'undefined') return []
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || '[]')
  } catch {
    return []
  }
}

function saveUsers(users: User[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

export function register(name: string, email: string, password: string, phone?: string): User {
  const users = getUsers()
  if (users.find(u => u.email === email)) {
    throw new Error('An account with this email already exists.')
  }
  const user: User = { id: crypto.randomUUID(), name, email, phone }
  // store password alongside user (simple, local-only)
  localStorage.setItem(`ch_pw_${user.id}`, password)
  saveUsers([...users, user])
  return user
}

export function login(email: string, password: string): User {
  const users = getUsers()
  const user = users.find(u => u.email === email)
  if (!user) throw new Error('No account found with this email.')
  const stored = localStorage.getItem(`ch_pw_${user.id}`)
  if (stored !== password) throw new Error('Incorrect password.')
  return user
}

export function setSession(user: User) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(user))
}

export function getSession(): User | null {
  if (typeof window === 'undefined') return null
  try {
    return JSON.parse(localStorage.getItem(SESSION_KEY) || 'null')
  } catch {
    return null
  }
}

export function updateSessionRole(role: string) {
  const user = getSession()
  if (!user) return
  user.role = role
  // persist role to users list too
  const users = getUsers()
  const idx = users.findIndex(u => u.id === user.id)
  if (idx !== -1) { users[idx].role = role; saveUsers(users) }
  setSession(user)
}

export function logout() {
  localStorage.removeItem(SESSION_KEY)
}
