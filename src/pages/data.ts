interface User {
    id: string;
    firstName: string;
    lastName: string;
    age: number;
    town: string;
    gender: string
}

export const testUsers: User[] = [
    {
        id: "1",
        firstName: "Test",
        lastName: "Test",
        age: 19,
        town: "Kiambu",
        gender: "Male"
    }
]