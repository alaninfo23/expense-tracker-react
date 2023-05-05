import * as C from './styles';
import { formatCurrentMonth } from '../../helpers/dateFilter';
import { ResumeItem } from '../ResumeItem';

type Props = {
    currentMonth: string;
    onMonthChange: (newMonth: string) => void;
    income: number;
    expense: number;
}

export const InfoArea = ({ currentMonth, onMonthChange, income, expense }: Props) => {
    
    const handlePrevMonth = () => {
        let [year, month] = currentMonth.split('-');
        let currentDate = new Date(parseInt(year), parseInt(month) - 1, 1);
        currentDate.setMonth( currentDate.getMonth() - 1 );
        onMonthChange(`${currentDate.getFullYear()}-${currentDate.getMonth() + 1}`);
    }

    const handleNextMonth = () => {
        let [year, month] = currentMonth.split('-');
        let currentDate = new Date(parseInt(year), parseInt(month) - 1, 1);
        currentDate.setMonth( currentDate.getMonth() + 1 );
        onMonthChange(`${currentDate.getFullYear()}-${currentDate.getMonth() + 1}`);
    }

    return (
        <C.Container data-testid='INFO_AREA'>
            <C.MonthArea>
                <C.MonthArrow onClick={handlePrevMonth} data-testid='PREV_MONTH'>⬅️</C.MonthArrow>
                <C.MonthTitle data-testid='CURRENT_MONTH'>{formatCurrentMonth(currentMonth)}</C.MonthTitle>
                <C.MonthArrow onClick={handleNextMonth} data-testid='NEXT_MONTH'>➡️</C.MonthArrow>
            </C.MonthArea>
            <C.ResumeArea>
                <ResumeItem title="Receitas" 
                            value={income}
                            testId='REVENUE_VALUE_ITEM' />
                <ResumeItem title="Despesas" 
                            value={expense}
                            testId='EXPENSE_VALUE_ITEM' />
                <ResumeItem
                    title="Balanço"
                    value={income - expense}
                    color={(income-expense) < 0 ? 'red' : 'green'}
                    testId='BALANCE_VALUE_ITEM'
                />
            </C.ResumeArea>
        </C.Container>
    );
}