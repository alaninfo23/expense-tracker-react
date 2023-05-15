import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import moment from 'moment';

/* INFO AREA */
export const INFO_AREA_ID:string = "INFO_AREA";
export const BUTTON_NEXT_MONTH_ID:string = "NEXT_MONTH";
export const BUTTON_PREV_MONTH_ID:string = "PREV_MONTH";
export const CURRENT_MONTH_ID:string = "CURRENT_MONTH";
export const BALANCE_VALUE_ITEM_ID:string = "BALANCE_VALUE_ITEM";
export const REVENUE_VALUE_ITEM_ID:string = "REVENUE_VALUE_ITEM";
export const EXPENSE_VALUE_ITEM_ID:string = "EXPENSE_VALUE_ITEM";

/* INPUT AREA */
export const INPUT_AREA_ID:string = "INPUT_AREA";
export const INPUT_DATA_ITEM_ID:string = "INPUT_DATA_ITEM";
export const INPUT_CATEG_ITEM_ID:string = "INPUT_CATEG_ITEM";
export const INPUT_TITLE_ITEM_ID:string = "INPUT_TITLE_ITEM";
export const INPUT_VALUE_ITEM_ID:string = "INPUT_VALUE_ITEM";
export const BUTTON_ADD_ITEM_ID:string = "BUTTON_ADD_ITEM";

/* TABLE AREA */
export const TABLE_AREA_ID:string = "TABLE_AREA";

/* HEADER AREA */
export const HEADER_AREA_ID:string = "HEADER_AREA";

/* STYLE FUNCTIONS */
export const assertElementHasStyle = (
  areaTestId: string,
  elementTestId: string,
  colorStyle: string
) => {
  const withinElement = within(screen.getByTestId(areaTestId));
  const element = withinElement.getByTestId(elementTestId);
  expect(element).toHaveStyle(colorStyle);
};

/* HELPER FUNCTIONS */
export const assertTextArea = (inputAreaId: string, text: string, shouldBePresent: boolean = true) => {
  const inputArea = within(screen.getByTestId(inputAreaId));
  const element = inputArea.queryByText(text);
  
  if (shouldBePresent) {
    expect(element).toBeInTheDocument();
  } else {
    expect(element).not.toBeInTheDocument();
  }
};

/* ADD FUNCTIONS */
export const insertRevenueOrExpenseItem = (
  typeCateg: string | null,
  msgTitle: string | null,
  valorInput: string | null,
  currentDate: string | null//coloquei essa interrogação p/ informar q esse parametro é opcional
) => {
  const inputArea = within(screen.getByTestId(INPUT_AREA_ID));
  const inputDateArea = inputArea.getByTestId(INPUT_DATA_ITEM_ID);
  const categInput = inputArea.getByTestId(INPUT_CATEG_ITEM_ID);
  const titleInput = inputArea.getByTestId(INPUT_TITLE_ITEM_ID);
  const valueInput = inputArea.getByTestId(INPUT_VALUE_ITEM_ID);
  const buttonAddItem = inputArea.getByTestId(BUTTON_ADD_ITEM_ID);

  //eu não tenho certeza mas eu acho q essa condição vai validar se o parametro foi passado
  //se for ele limpa o campo data e digita o valor passado, se não for passado, nada acontece.
  if (currentDate) {
    userEvent.clear(inputDateArea);
    userEvent.type(inputDateArea, currentDate);
  }
  if (typeCateg) {
    userEvent.selectOptions(categInput, typeCateg);
  }
  if (msgTitle) {
    userEvent.type(titleInput, msgTitle);
  }
  if (valorInput) {
    userEvent.type(valueInput, valorInput);
  }

  userEvent.click(buttonAddItem);
};

/* ALERT FUNCTIONS */
export const assertAlertCalledWith = (
  alertSpy: jest.SpyInstance,
  expectedMessage: string
) => {
  expect(alertSpy).toHaveBeenCalledTimes(1);
  expect(alertSpy).toHaveBeenCalledWith(expectedMessage);
  alertSpy.mockRestore();
};
