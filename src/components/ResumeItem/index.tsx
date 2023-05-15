import * as C from './styles';

type Props = {
    title: string;
    value: number;
    color?: string;
    testId?: string;
}

export const ResumeItem = ({ title, value, color, testId }: Props) => {

    return (
        <C.Container>
            <C.Title>{title}</C.Title>
            <C.Info color={color} data-testid={testId}>R$ {value}</C.Info>
        </C.Container>
    );
}
