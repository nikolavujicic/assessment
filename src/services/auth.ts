export const mockUsers = [
    { email: 'test@test.com', password: 'password123' }
]

export const login = (email: string, password: string) => {
    const user = mockUsers.find(user => user.email === email && user.password === password)
    if (!user) throw new Error('Invalid credentials')
    return { token: 'fake-jwt-token' }
}
