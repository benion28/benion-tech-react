import { AuthResponse } from "@/models/User";

export const dummyUsers: AuthResponse[] = [
    {
        success: true,
        message: 'Login successful',
        data: {
            firstname: 'Benion',
            lastname: 'Tech',
            email: 'benion@example.com',
            username: 'benion',
            role: 'admin',
            amountBalance: 0,
            token: 'mock-jwt-token-12345',
            profile: 'https://via.placeholder.com/150x150',
        },
    },
    {
        success: true,
        message: 'Login successful',
        data: {
            firstname: 'Guest',
            lastname: 'User',
            email: 'guest@example.com',
            username: 'guest',
            role: 'user',
            amountBalance: 0,
            token: 'mock-jwt-token-guest',
            profile: 'https://via.placeholder.com/150x150',
        },
    },
    {
        success: true,
        message: 'Login successful',
        data: {
            _id: '3',
            username: 'editor',
            email: 'editor@example.com',
            firstname: 'Content',
            lastname: 'Editor',
            role: 'editor',
            profile: 'https://via.placeholder.com/150x150',
            password: '+1122334455',
            amountBalance: 0,
            date: '2024-01-03T00:00:00Z',
            token: '2024-01-13T11:30:00Z',
        }
    },
]
