import { Category } from '../types/Category';

export const categories: Category = {
    food: { title: 'Alimentação', color: 'blue', expense: true },
    rent: { title: 'Aluguel', color: 'brown', expense: true },
    salary: { title: 'Salário', color: 'green', expense: false },
    luz: { title: 'Luz', color: 'gray', expense: true },
    internet: { title: 'Internet', color: 'orange', expense: true },
    agua: { title: 'Água', color: 'purple', expense: true },
}