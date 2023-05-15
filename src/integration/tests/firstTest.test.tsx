import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import moment from 'moment';

import App from "../../App";

import {
  HEADER_AREA_ID,
  INFO_AREA_ID,
  TABLE_AREA_ID,
  INPUT_AREA_ID,
  INPUT_DATA_ITEM_ID,
  INPUT_CATEG_ITEM_ID,
  INPUT_TITLE_ITEM_ID,
  INPUT_VALUE_ITEM_ID,
  BUTTON_ADD_ITEM_ID,
  BUTTON_NEXT_MONTH_ID,
  BUTTON_PREV_MONTH_ID,
  CURRENT_MONTH_ID,
  BALANCE_VALUE_ITEM_ID,
  REVENUE_VALUE_ITEM_ID,  
  EXPENSE_VALUE_ITEM_ID,
  assertTextArea,
  insertRevenueOrExpenseItem,
  assertElementHasStyle,
  assertAlertCalledWith,
} from "../helpers/testHelper";

import {
  SYSFINAN_LABEL,
  REVENUE_LABEL,
  EXPENSE_LABEL,
  BALANCO_LABEL,
  DATE_LABEL,
  CATEGORY_LABEL,
  TITLE_LABEL,
  VALUE_LABEL,
  ADD_LABEL,
} from "../strings/testStrings";

describe("Viewing and Registration of Items in the Financial System.", () => {
  beforeEach(() => {
    render(<App />);
  });

  it("should be possible to view the title Sistema Financeiro.", () => {

    assertTextArea(HEADER_AREA_ID, SYSFINAN_LABEL);

  });

  it("should be possible to view the fields Receitas, Despesas, and Balanço in the information area", () => {
    
    assertTextArea(INFO_AREA_ID, REVENUE_LABEL);
    assertTextArea(INFO_AREA_ID, EXPENSE_LABEL);
    assertTextArea(INFO_AREA_ID, BALANCO_LABEL);

  });

  it("should be possible to view the date field in the format Month de Year in the information area.", () => {
    
    const infoArea = within(screen.getByTestId(INFO_AREA_ID));

    moment.locale('pt-br');
    const formatDate1 =  moment(new Date()).format('MMMM [de] YYYY');
    const formatDate2 = formatDate1.charAt(0).toUpperCase() + formatDate1.slice(1);
    console.log(formatDate2)

    expect(infoArea.getByText(formatDate2)).toBeInTheDocument();

  });

  it("should be possible to view expense values in green in the Balanço", () => {

    assertElementHasStyle(INFO_AREA_ID, BALANCE_VALUE_ITEM_ID, "color: green");

  });

  it("should be possible to view expense values in black in the Receitas", () => {

    assertElementHasStyle(INFO_AREA_ID, REVENUE_VALUE_ITEM_ID, "color: #000");

  });

  it("should be possible to view expense values in black in the Despesas", () => {

    assertElementHasStyle(INFO_AREA_ID, EXPENSE_VALUE_ITEM_ID, "color: #000");

  });

  it("should be possible to view the fields Data, Categoria, Titulo, Valor, and the Adicionar button.", () => {
   
    assertTextArea(INPUT_AREA_ID, DATE_LABEL);
    assertTextArea(INPUT_AREA_ID, CATEGORY_LABEL);
    assertTextArea(INPUT_AREA_ID, TITLE_LABEL);
    assertTextArea(INPUT_AREA_ID, VALUE_LABEL);
    assertTextArea(INPUT_AREA_ID, ADD_LABEL);

  });

  it("should be possible to view the report with columns for Data, Categoria, Titulo, and Valor.", () => {
    
    assertTextArea(TABLE_AREA_ID, DATE_LABEL);
    assertTextArea(TABLE_AREA_ID, CATEGORY_LABEL);
    assertTextArea(TABLE_AREA_ID, TITLE_LABEL);
    assertTextArea(TABLE_AREA_ID, VALUE_LABEL);

  });

  it("should be able to insert an revenue item.", () => {

    const currentDate = moment(new Date()).format('YYYY-MM-DD');
    const currentDateInput = moment(new Date()).format('DD/MM/YYYY');
    const typeCateg = "Salário";
    const msgTitle = "Encora";
    const valorInput = "5000";

    insertRevenueOrExpenseItem(typeCateg, msgTitle, valorInput, currentDate);

    assertTextArea(TABLE_AREA_ID, typeCateg);
    assertTextArea(TABLE_AREA_ID, msgTitle);
    assertTextArea(TABLE_AREA_ID, `R$ ${valorInput}`);
    assertTextArea(TABLE_AREA_ID, currentDateInput);
    
  });

  it("should be able to insert a expense item.", () => {

    const currentDate = moment(new Date()).format('YYYY-MM-DD');
    const currentDateInput = moment(new Date()).format('DD/MM/YYYY');
    const typeCateg = "Aluguel";
    const msgTitle = "Apartment";
    const valorInput = "800";

    insertRevenueOrExpenseItem(typeCateg, msgTitle, valorInput, currentDate);

    assertTextArea(TABLE_AREA_ID, typeCateg);
    assertTextArea(TABLE_AREA_ID, msgTitle);
    assertTextArea(TABLE_AREA_ID, `R$ ${valorInput}`);
    assertTextArea(TABLE_AREA_ID, currentDateInput);

  });

  it("should not be possible to insert an item without a date.", () => {

    const alertSpy = jest.spyOn(window, "alert").mockImplementation(() => {});
  
    const typeCateg = "Luz";
    const msgTitle = "Encora";
    const valorInput = "100";
  
    insertRevenueOrExpenseItem(typeCateg, msgTitle, valorInput, null);
  
    const invalidDate = "Data inválida!";
    assertAlertCalledWith(alertSpy, invalidDate);

  });

  it("should not be possible to insert an item without a category.", () => {

    const alertSpy = jest.spyOn(window, "alert").mockImplementation(() => {});
  
    const msgTitle = "Encora";
    const valorInput = "100";
    const currentDate = moment(new Date()).format('YYYY-MM-DD');
  
    insertRevenueOrExpenseItem(null, msgTitle, valorInput, currentDate);
  
    const categInvalid = "Categoria inválida!";
    assertAlertCalledWith(alertSpy, categInvalid);

  });

  it("should not be possible to insert an item with an empty title.", () => {

    const alertSpy = jest.spyOn(window, "alert").mockImplementation(() => {});
  
    const typeCateg = 'Luz';
    const valorInput = "100";
    const currentDate = moment(new Date()).format('YYYY-MM-DD');
  
    insertRevenueOrExpenseItem(typeCateg, null, valorInput, currentDate);
  
    const titleInvalid = "Título vazio!";
    assertAlertCalledWith(alertSpy, titleInvalid);

  });

  it("should not be possible to insert an item with a value equal to zero", () => {

    const alertSpy = jest.spyOn(window, "alert").mockImplementation(() => {});
  
    const typeCateg = 'Luz';
    const msgTitle = "Encora";
    const valorInput = "0";
    const currentDate = moment(new Date()).format('YYYY-MM-DD');
  
    insertRevenueOrExpenseItem(typeCateg, msgTitle, valorInput, currentDate);
  
    const valueInvalid = "Valor inválido!";
    assertAlertCalledWith(alertSpy, valueInvalid);
   
  });

  it("should not be possible to insert an item with an empty value", () => {

    const alertSpy = jest.spyOn(window, "alert").mockImplementation(() => {});
  
    const typeCateg = 'Luz';
    const msgTitle = "Encora";
    const currentDate = moment(new Date()).format('YYYY-MM-DD');
      
    const inputArea = within(screen.getByTestId(INPUT_AREA_ID));
    userEvent.clear(inputArea.getByTestId(INPUT_VALUE_ITEM_ID));
  
    insertRevenueOrExpenseItem(typeCateg, msgTitle, null, currentDate);

    const emptyValue = "Insira um valor!";

    assertAlertCalledWith(alertSpy, emptyValue);

  });

  it("should not be possible to enter an item with a negative value", () => {
    const alertSpy = jest.spyOn(window, "alert").mockImplementation(() => {});
  
    const typeCateg = 'Luz';
    const msgTitle = "Encora";
    const valorInput = '-100';
    const currentDate = moment(new Date()).format('YYYY-MM-DD');
  
    insertRevenueOrExpenseItem(typeCateg, msgTitle, valorInput, currentDate);
  
    const valueInvalid = "Valor inválido!";

    assertAlertCalledWith(alertSpy, valueInvalid);
  });

  it("should not be possible to insert an item without the fields date, category, title and value", () => {
    const alertSpy = jest.spyOn(window, "alert").mockImplementation(() => {});
  
    insertRevenueOrExpenseItem(null, null, null, null);
  
    const emptyFields =
      "Data inválida!\nCategoria inválida!\nTítulo vazio!\nValor inválido!";

    assertAlertCalledWith(alertSpy, emptyFields);

  });

  it("should not be possible to view items registered in other months in the current month.", () => {

    const testDate = "2023-06-09";
    const testDateTable = "09/06/2023";
    const typeCateg = "Aluguel";
    const msgTitle = "Apartment";
    const valorInput = "800";

    insertRevenueOrExpenseItem(typeCateg, msgTitle, valorInput, testDate);

    assertTextArea(TABLE_AREA_ID, testDateTable, false);
    assertTextArea(TABLE_AREA_ID, typeCateg, false);
    assertTextArea(TABLE_AREA_ID, msgTitle, false);
    assertTextArea(TABLE_AREA_ID, `R$ ${valorInput}`, false);
  
  });

  it("should not be possible to view items registered in the current month in the others months.", () => {

    const infoArea = within(screen.getByTestId(INFO_AREA_ID));
    const btnextMonth = infoArea.getByTestId(BUTTON_NEXT_MONTH_ID);

    const testDate = moment(new Date()).format('YYYY-MM-DD');
    const testDateTable = moment(new Date()).format('DD/MM/YYYY');
    const typeCateg = "Aluguel";
    const msgTitle = "Apartment";
    const valorInput = "800";
  
    insertRevenueOrExpenseItem(typeCateg, msgTitle, valorInput, testDate);

    userEvent.click(btnextMonth);

    assertTextArea(TABLE_AREA_ID, testDateTable, false);
    assertTextArea(TABLE_AREA_ID, typeCateg, false);
    assertTextArea(TABLE_AREA_ID, msgTitle, false);
    assertTextArea(TABLE_AREA_ID, `R$ ${valorInput}`, false);

  });

  it("should be possible to insert a expense item with highlighted value in red.", () => {

    const testDate = moment(new Date()).format('YYYY-MM-DD');
    const typeCateg = "Aluguel";
    const msgTitle = "Apartment";
    const valorInput = "800";
  
    insertRevenueOrExpenseItem(typeCateg, msgTitle, valorInput, testDate);

    const tableArea = within(screen.getByTestId(TABLE_AREA_ID));

    expect(tableArea.getByText(`R$ ${valorInput}`)).toHaveStyle("color: red");

  });

  it("should be possible to insert an revenue item with highlighted value in green.", () => {

    const testDate = moment(new Date()).format('YYYY-MM-DD');
    const typeCateg = "Salário";
    const msgTitle = "Apartment";
    const valorInput = "800";
  
    insertRevenueOrExpenseItem(typeCateg, msgTitle, valorInput, testDate);

    const tableArea = within(screen.getByTestId(TABLE_AREA_ID));

    expect(tableArea.getByText(`R$ ${valorInput}`)).toHaveStyle("color: green");

  });

  it("should be able to calculate the balance by subtracting expenses from revenues.", () => {
    const testDate = moment(new Date()).format('YYYY-MM-DD');
    const typeCategExpense = "Aluguel";
    const msgTitleExpense = "Apartment";
    const valorInputExpense = "800";

    insertRevenueOrExpenseItem(typeCategExpense, msgTitleExpense, valorInputExpense, testDate);

    const typeCategRevenue = "Salário";
    const msgTitleRevenue = "Apartment";
    const valorInputRevenue = "800";

    insertRevenueOrExpenseItem(typeCategRevenue, msgTitleRevenue, valorInputRevenue, testDate);

    const infoArea = within(screen.getByTestId(INFO_AREA_ID));

    expect(infoArea.getByTestId(BALANCE_VALUE_ITEM_ID)).toHaveTextContent(
      `R$ ${parseFloat(valorInputRevenue) - parseFloat(valorInputExpense)}` 
      );

  });

  it("should be able to update revenue and calculate the balance correctly.", () => {

    const testDate = moment(new Date()).format('YYYY-MM-DD');
    const typeCategRevenue = "Salário";
    const msgTitleRevenue = "Encora";
    const valorInputRevenue = "5000";

    insertRevenueOrExpenseItem(typeCategRevenue, msgTitleRevenue, valorInputRevenue, testDate);

    const typeCategExpense = "Aluguel";
    const msgTitleExpense = "Apartment";
    const valorInputExpense = "800";

    insertRevenueOrExpenseItem(typeCategExpense, msgTitleExpense, valorInputExpense, testDate);

    const msgTitleRevenue2 = "Bonus";
    const valorInputRevenue2 = "1000";

    insertRevenueOrExpenseItem(typeCategRevenue, msgTitleRevenue2, valorInputRevenue2, testDate);

    const infoArea = within(screen.getByTestId(INFO_AREA_ID));

    expect(infoArea.getByTestId(BALANCE_VALUE_ITEM_ID)).toHaveTextContent(
      `R$ ${
        parseFloat(valorInputRevenue) -
        parseFloat(valorInputExpense) +
        parseFloat(valorInputRevenue2)
      }`
    );
  });

  it("should be able to clear the data, categoria, titulo, and valor fields after adding an item.", () => {
    
    const testDate = moment(new Date()).format('YYYY-MM-DD');
    const typeCategExpense = "Aluguel";
    const msgTitleExpense = "Apartment";
    const valorInputExpense = "800";

    insertRevenueOrExpenseItem(typeCategExpense, msgTitleExpense, valorInputExpense, testDate);

    const inputArea = within(screen.getByTestId(INPUT_AREA_ID));

    expect(inputArea.getByTestId(INPUT_DATA_ITEM_ID)).toHaveValue("");
    expect(inputArea.getByTestId(INPUT_CATEG_ITEM_ID)).toHaveValue("");
    expect(inputArea.getByTestId(INPUT_TITLE_ITEM_ID)).toHaveValue("");
    expect(inputArea.getByTestId(INPUT_VALUE_ITEM_ID)).toHaveValue(0); 

  });
});