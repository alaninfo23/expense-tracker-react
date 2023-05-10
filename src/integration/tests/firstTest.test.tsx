import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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

describe("First test", () => {
  beforeEach(() => {
    render(<App />);
  });

  it("should be possible to view the title Sistema Financeiro.", () => {
    const tableArea = within(screen.getByTestId(HEADER_AREA_ID));
    const headerText = tableArea.getByText(SYSFINAN_LABEL);
    expect(headerText).toBeInTheDocument();
  });

  it("should be possible to view the fields Receitas, Despesas, and Balanço in the information area", () => {
    const infoArea = within(screen.getByTestId(INFO_AREA_ID));

    const infoReceita = infoArea.getByText(REVENUE_LABEL);
    const infoDespesas = infoArea.getByText(EXPENSE_LABEL);
    const inforBalanco = infoArea.getByText(BALANCO_LABEL);

    expect(infoReceita).toBeInTheDocument();
    expect(infoDespesas).toBeInTheDocument();
    expect(inforBalanco).toBeInTheDocument();
  });

  it("should be possible to view the date field in the format Month de Year in the information area.", () => {
    const infoArea = within(screen.getByTestId(INFO_AREA_ID));
    function formatDate(date = new Date()) {
      const options: Intl.DateTimeFormatOptions = {
        month: "long",
        year: "numeric",
      };
      const formattedDate = date.toLocaleString("pt-BR", options);
      const [month, year] = formattedDate.split(" de ");
      return `${month.charAt(0).toUpperCase()}${month.slice(1)} de ${year}`;
    }

    const dateFormat = infoArea.getByText(formatDate());
    expect(dateFormat).toBeInTheDocument();
  });

  it("should be possible to view expense values in green in the Balanço", () => {
    const infoArea = within(screen.getByTestId(INFO_AREA_ID));
    const infoBalance = infoArea.getByTestId(BALANCE_VALUE_ITEM_ID);
    expect(infoBalance).toHaveStyle("color: green");
  });

  it("should be possible to view expense values in black in the Receitas", () => {
    const infoArea = within(screen.getByTestId(INFO_AREA_ID));
    const revenueValue = infoArea.getByTestId(REVENUE_VALUE_ITEM_ID);
    expect(revenueValue).toHaveStyle("color: #000");
  });

  it("should be possible to view expense values in black in the Despesas", () => {
    const infoArea = within(screen.getByTestId(INFO_AREA_ID));
    const expenseValue = infoArea.getByTestId(EXPENSE_VALUE_ITEM_ID);
    expect(expenseValue).toHaveStyle("color: #000");
  });

  it("should be possible to view the fields Data, Categoria, Titulo, Valor, and the Adicionar button.", () => {
    const inputArea = within(screen.getByTestId(INPUT_AREA_ID));

    const inputData = inputArea.getByText(DATE_LABEL);
    const inputCateg = inputArea.getByText(CATEGORY_LABEL);
    const inputTitutlo = inputArea.getByText(TITLE_LABEL);
    const inputValor = inputArea.getByText(VALUE_LABEL);
    const inputAdd = inputArea.getByText(ADD_LABEL);

    expect(inputData).toBeInTheDocument();
    expect(inputCateg).toBeInTheDocument();
    expect(inputTitutlo).toBeInTheDocument();
    expect(inputValor).toBeInTheDocument();
    expect(inputAdd).toBeInTheDocument();
  });

  it("should be possible to view the report with columns for Data, Categoria, Titulo, and Valor.", () => {
    const tableArea = within(screen.getByTestId(TABLE_AREA_ID));

    const tableData = tableArea.getByText(DATE_LABEL);
    const tableCateg = tableArea.getByText(CATEGORY_LABEL);
    const tableTitle = tableArea.getByText(TITLE_LABEL);
    const tableValor = tableArea.getByText(VALUE_LABEL);

    expect(tableData).toBeInTheDocument();
    expect(tableCateg).toBeInTheDocument();
    expect(tableTitle).toBeInTheDocument();
    expect(tableValor).toBeInTheDocument();
  });

  it("should be able to insert an revenue item.", () => {
    const now = new Date(Date.now());
    const day = now.getDate().toString().padStart(2, "0");
    const month = (now.getMonth() + 1).toString().padStart(2, "0");
    const year = now.getFullYear();

    const inputArea = within(screen.getByTestId(INPUT_AREA_ID));
    const dataInputArea = inputArea.getByTestId(INPUT_DATA_ITEM_ID);
    const categInput = inputArea.getByTestId(INPUT_CATEG_ITEM_ID);
    const titleInput = inputArea.getByTestId(INPUT_TITLE_ITEM_ID);
    const valueInput = inputArea.getByTestId(INPUT_VALUE_ITEM_ID);
    const buttonAddItem = inputArea.getByTestId(BUTTON_ADD_ITEM_ID);

    const currentDateInput = `${year}-${month}-${day}`;
    const currentDate = `${day}/${month}/${year}`;
    const typeCateg = "Salário";
    const msgTitle = "Encora";
    const valorInput = "5000";

    userEvent.clear(dataInputArea);

    userEvent.type(dataInputArea, currentDateInput);
    userEvent.selectOptions(categInput, typeCateg);
    userEvent.type(titleInput, msgTitle);
    userEvent.type(valueInput, valorInput);
    userEvent.click(buttonAddItem);

    const tableArea = within(screen.getByTestId(TABLE_AREA_ID));

    expect(tableArea.getByText(currentDate)).toBeInTheDocument();
    expect(tableArea.getByText(msgTitle)).toBeInTheDocument();
    expect(tableArea.getByText(`R$ ${valorInput}`)).toBeInTheDocument();
    expect(tableArea.getByText(typeCateg)).toBeInTheDocument();
  });
  it("should be able to insert a expense item.", () => {
    const now = new Date(Date.now());
    const day = now.getDate().toString().padStart(2, "0");
    const month = (now.getMonth() + 1).toString().padStart(2, "0");
    const year = now.getFullYear();

    const inputArea = within(screen.getByTestId(INPUT_AREA_ID));
    const dataInputArea = inputArea.getByTestId(INPUT_DATA_ITEM_ID);
    const categInput = inputArea.getByTestId(INPUT_CATEG_ITEM_ID);
    const titleInput = inputArea.getByTestId(INPUT_TITLE_ITEM_ID);
    const valueInput = inputArea.getByTestId(INPUT_VALUE_ITEM_ID);
    const buttonAddItem = inputArea.getByTestId(BUTTON_ADD_ITEM_ID);

    const currentDateInput = `${year}-${month}-${day}`;
    const currentDate = `${day}/${month}/${year}`;
    const typeCateg = "Aluguel";
    const msgTitle = "Apartamento";
    const valorInput = "800";

    userEvent.clear(dataInputArea);

    userEvent.type(dataInputArea, currentDateInput);
    userEvent.selectOptions(categInput, typeCateg);
    userEvent.type(titleInput, msgTitle);
    userEvent.type(valueInput, valorInput);
    userEvent.click(buttonAddItem);

    const tableArea = within(screen.getByTestId(TABLE_AREA_ID));

    expect(tableArea.getByText(currentDate)).toBeInTheDocument();
    expect(tableArea.getByText(msgTitle)).toBeInTheDocument();
    expect(tableArea.getByText(`R$ ${valorInput}`)).toBeInTheDocument();
    expect(tableArea.getByText(typeCateg)).toBeInTheDocument();
  });

  it("should not be possible to insert an item without a date.", () => {
    const inputArea = within(screen.getByTestId(INPUT_AREA_ID));

    const alertSpy = jest.spyOn(window, "alert").mockImplementation(() => {});

    const categInput = inputArea.getByTestId(INPUT_CATEG_ITEM_ID);
    const titleInput = inputArea.getByTestId(INPUT_TITLE_ITEM_ID);
    const valueInput = inputArea.getByTestId(INPUT_VALUE_ITEM_ID);
    const buttonAddItem = inputArea.getByTestId(BUTTON_ADD_ITEM_ID);

    const typeCateg = "Luz";
    const msgTitle = "Receita";
    const valorInput = "100";

    userEvent.selectOptions(categInput, typeCateg);
    userEvent.type(titleInput, msgTitle);
    userEvent.type(valueInput, valorInput);
    userEvent.click(buttonAddItem);

    expect(alertSpy).toHaveBeenCalledTimes(1);
    const dateInvalid = "Data inválida!";

    expect(alertSpy).toHaveBeenCalledWith(dateInvalid);
    alertSpy.mockRestore();
  });

  it("should not be possible to insert an item without a category.", () => {
    const inputArea = within(screen.getByTestId(INPUT_AREA_ID));

    const alertSpy = jest.spyOn(window, "alert").mockImplementation(() => {});

    const dataInputArea = inputArea.getByTestId(INPUT_DATA_ITEM_ID);
    const titleInput = inputArea.getByTestId(INPUT_TITLE_ITEM_ID);
    const valueInput = inputArea.getByTestId(INPUT_VALUE_ITEM_ID);
    const buttonAddItem = inputArea.getByTestId(BUTTON_ADD_ITEM_ID);

    const now = new Date(Date.now());
    const day = now.getDate().toString().padStart(2, "0");
    const month = (now.getMonth() + 1).toString().padStart(2, "0");
    const year = now.getFullYear();

    const currentDateShort = `${year}-${month}-${day}`;
    const msgTitle = "Receita";
    const valorInput = "100";

    userEvent.type(dataInputArea, currentDateShort);
    userEvent.type(titleInput, msgTitle);
    userEvent.type(valueInput, valorInput);
    userEvent.click(buttonAddItem);

    expect(alertSpy).toHaveBeenCalledTimes(1);
    const categInvalid = "Categoria inválida!";

    expect(alertSpy).toHaveBeenCalledWith(categInvalid);
    alertSpy.mockRestore();
  });

  it("should not be possible to insert an item with an empty title.", () => {
    const inputArea = within(screen.getByTestId(INPUT_AREA_ID));

    const alertSpy = jest.spyOn(window, "alert").mockImplementation(() => {});

    const dataInputArea = inputArea.getByTestId(INPUT_DATA_ITEM_ID);
    const categInput = inputArea.getByTestId(INPUT_CATEG_ITEM_ID);
    const titleInput = inputArea.getByTestId(INPUT_TITLE_ITEM_ID);
    const valueInput = inputArea.getByTestId(INPUT_VALUE_ITEM_ID);
    const buttonAddItem = inputArea.getByTestId(BUTTON_ADD_ITEM_ID);

    const now = new Date(Date.now());
    const day = now.getDate().toString().padStart(2, "0");
    const month = (now.getMonth() + 1).toString().padStart(2, "0");
    const year = now.getFullYear();

    const currentDateShort = `${year}-${month}-${day}`;
    const typeCateg = "Salário";
    const msgTitle = "";
    const valorInput = "100";

    userEvent.type(dataInputArea, currentDateShort);
    userEvent.selectOptions(categInput, typeCateg);
    userEvent.type(titleInput, msgTitle);
    userEvent.type(valueInput, valorInput);
    userEvent.click(buttonAddItem);

    expect(alertSpy).toHaveBeenCalledTimes(1);
    const titleInvalid = "Título vazio!";

    expect(alertSpy).toHaveBeenCalledWith(titleInvalid);
    alertSpy.mockRestore();
  });

  it("should must not be possible to insert an item with value equal to zero", () => {
    const inputArea = within(screen.getByTestId(INPUT_AREA_ID));

    const alertSpy = jest.spyOn(window, "alert").mockImplementation(() => {});

    const dataInputArea = inputArea.getByTestId(INPUT_DATA_ITEM_ID);
    const categInput = inputArea.getByTestId(INPUT_CATEG_ITEM_ID);
    const titleInput = inputArea.getByTestId(INPUT_TITLE_ITEM_ID);
    const valueInput = inputArea.getByTestId(INPUT_VALUE_ITEM_ID);
    const buttonAddItem = inputArea.getByTestId(BUTTON_ADD_ITEM_ID);

    const now = new Date(Date.now());
    const day = now.getDate().toString().padStart(2, "0");
    const month = (now.getMonth() + 1).toString().padStart(2, "0");
    const year = now.getFullYear();

    const currentDateShort = `${year}-${month}-${day}`;
    const typeCateg = "Salário";
    const msgTitle = "Encora";
    const valorInput = "0";

    userEvent.type(dataInputArea, currentDateShort);
    userEvent.selectOptions(categInput, typeCateg);
    userEvent.type(titleInput, msgTitle);
    userEvent.type(valueInput, valorInput);
    userEvent.click(buttonAddItem);

    expect(alertSpy).toHaveBeenCalledTimes(1);
    const valueInvalid = "Valor inválido!";
    expect(alertSpy).toHaveBeenCalledWith(valueInvalid);

    alertSpy.mockRestore();
  });

  it("should must not be possible to insert an item with value empty", () => {
    const inputArea = within(screen.getByTestId(INPUT_AREA_ID));

    const alertSpy = jest.spyOn(window, "alert").mockImplementation(() => {});

    const dataInputArea = inputArea.getByTestId(INPUT_DATA_ITEM_ID);
    const categInput = inputArea.getByTestId(INPUT_CATEG_ITEM_ID);
    const titleInput = inputArea.getByTestId(INPUT_TITLE_ITEM_ID);
    const valueInput = inputArea.getByTestId(INPUT_VALUE_ITEM_ID);
    const buttonAddItem = inputArea.getByTestId(BUTTON_ADD_ITEM_ID);

    const now = new Date(Date.now());
    const day = now.getDate().toString().padStart(2, "0");
    const month = (now.getMonth() + 1).toString().padStart(2, "0");
    const year = now.getFullYear();

    const currentDateShort = `${year}-${month}-${day}`;
    const typeCateg = "Salário";
    const msgTitle = "Encora";

    userEvent.type(dataInputArea, currentDateShort);
    userEvent.selectOptions(categInput, typeCateg);
    userEvent.type(titleInput, msgTitle);
    userEvent.clear(valueInput);
    userEvent.click(buttonAddItem);

    expect(alertSpy).toHaveBeenCalledTimes(1);
    const valueEmpty = "Insira um valor!";

    expect(alertSpy).toHaveBeenCalledWith(valueEmpty);
    alertSpy.mockRestore();
  });

  it("should not be possible to enter an item with a negative value", () => {
    const inputArea = within(screen.getByTestId(INPUT_AREA_ID));

    const alertSpy = jest.spyOn(window, "alert").mockImplementation(() => {});

    const dataInputArea = inputArea.getByTestId(INPUT_DATA_ITEM_ID);
    const categInput = inputArea.getByTestId(INPUT_CATEG_ITEM_ID);
    const titleInput = inputArea.getByTestId(INPUT_TITLE_ITEM_ID);
    const valueInput = inputArea.getByTestId(INPUT_VALUE_ITEM_ID);
    const buttonAddItem = inputArea.getByTestId(BUTTON_ADD_ITEM_ID);

    const now = new Date(Date.now());
    const day = now.getDate().toString().padStart(2, "0");
    const month = (now.getMonth() + 1).toString().padStart(2, "0");
    const year = now.getFullYear();

    const currentDateShort = `${year}-${month}-${day}`;
    const typeCateg = "Salário";
    const msgTitle = "Encora";
    const valueNegative = "-100";

    userEvent.type(dataInputArea, currentDateShort);
    userEvent.selectOptions(categInput, typeCateg);
    userEvent.type(titleInput, msgTitle);
    userEvent.type(valueInput, valueNegative);
    userEvent.click(buttonAddItem);

    expect(alertSpy).toHaveBeenCalledTimes(1);
    const valueNegativeError = "Valor inválido!";

    expect(alertSpy).toHaveBeenCalledWith(valueNegativeError);
    alertSpy.mockRestore();
  });

  it("should not be possible to insert an item without the fields date, category, title and value", () => {
    const alertSpy = jest.spyOn(window, "alert").mockImplementation(() => {});

    const inputArea = within(screen.getByTestId(INPUT_AREA_ID));
    const buttonAddItem = inputArea.getByTestId(BUTTON_ADD_ITEM_ID);
    userEvent.click(buttonAddItem);

    expect(alertSpy).toHaveBeenCalledTimes(1);

    const emptyFields =
      "Data inválida!\nCategoria inválida!\nTítulo vazio!\nValor inválido!";

    expect(alertSpy).toHaveBeenCalledWith(emptyFields);
    alertSpy.mockRestore();
  });

  it("should not be possible to view items registered in other months in the current month.", () => {
    const inputArea = within(screen.getByTestId(INPUT_AREA_ID));
    const dataInputArea = inputArea.getByTestId(INPUT_DATA_ITEM_ID);
    const categInput = inputArea.getByTestId(INPUT_CATEG_ITEM_ID);
    const titleInput = inputArea.getByTestId(INPUT_TITLE_ITEM_ID);
    const valueInput = inputArea.getByTestId(INPUT_VALUE_ITEM_ID);
    const buttonAddItem = inputArea.getByTestId(BUTTON_ADD_ITEM_ID);

    const dateTest = "2023-06-09";
    const dateTestTable = "09/06/2023";
    const typeCateg = "Aluguel";
    const msgTitle = "Apartamento";
    const valorInput = "800";

    userEvent.type(dataInputArea, dateTest);
    userEvent.selectOptions(categInput, typeCateg);
    userEvent.type(titleInput, msgTitle);
    userEvent.type(valueInput, valorInput);
    userEvent.click(buttonAddItem);

    const tableArea = within(screen.getByTestId(TABLE_AREA_ID));

    expect(tableArea.queryByText(dateTestTable)).not.toBeInTheDocument();
    expect(tableArea.queryByText(msgTitle)).not.toBeInTheDocument();
    expect(tableArea.queryByText(`R$ ${valorInput}`)).not.toBeInTheDocument();
    expect(tableArea.queryByText(typeCateg)).not.toBeInTheDocument();
  });

  it("should not be possible to view items registered in the current month in the others months.", () => {
    const inputArea = within(screen.getByTestId(INPUT_AREA_ID));
    const dataInputArea = inputArea.getByTestId(INPUT_DATA_ITEM_ID);
    const categInput = inputArea.getByTestId(INPUT_CATEG_ITEM_ID);
    const titleInput = inputArea.getByTestId(INPUT_TITLE_ITEM_ID);
    const valueInput = inputArea.getByTestId(INPUT_VALUE_ITEM_ID);
    const buttonAddItem = inputArea.getByTestId(BUTTON_ADD_ITEM_ID);

    const infoArea = within(screen.getByTestId(INFO_AREA_ID));
    const btnextMonth = infoArea.getByTestId(BUTTON_NEXT_MONTH_ID);

    const dateTest = "2023-05-09";
    const dateTestTable = "09/05/2023";
    const typeCateg = "Aluguel";
    const msgTitle = "Apartamento";
    const valorInput = "800";

    userEvent.type(dataInputArea, dateTest);
    userEvent.selectOptions(categInput, typeCateg);
    userEvent.type(titleInput, msgTitle);
    userEvent.type(valueInput, valorInput);
    userEvent.click(buttonAddItem);

    userEvent.click(btnextMonth);

    const tableArea = within(screen.getByTestId(TABLE_AREA_ID));

    expect(tableArea.queryByText(dateTestTable)).not.toBeInTheDocument();
    expect(tableArea.queryByText(msgTitle)).not.toBeInTheDocument();
    expect(tableArea.queryByText(`R$ ${valorInput}`)).not.toBeInTheDocument();
    expect(tableArea.queryByText(typeCateg)).not.toBeInTheDocument();
  });
  it("should be possible to insert a expense item with highlighted value in red.", () => {
    const now = new Date(Date.now());
    const day = now.getDate().toString().padStart(2, "0");
    const month = (now.getMonth() + 1).toString().padStart(2, "0");
    const year = now.getFullYear();

    const inputArea = within(screen.getByTestId(INPUT_AREA_ID));
    const dataInputArea = inputArea.getByTestId(INPUT_DATA_ITEM_ID);
    const categInput = inputArea.getByTestId(INPUT_CATEG_ITEM_ID);
    const titleInput = inputArea.getByTestId(INPUT_TITLE_ITEM_ID);
    const valueInput = inputArea.getByTestId(INPUT_VALUE_ITEM_ID);
    const buttonAddItem = inputArea.getByTestId(BUTTON_ADD_ITEM_ID);

    const currentDateInput = `${year}-${month}-${day}`;
    const typeCateg = "Aluguel";
    const msgTitle = "Apartamento";
    const valorInput = "800";

    userEvent.type(dataInputArea, currentDateInput);
    userEvent.selectOptions(categInput, typeCateg);
    userEvent.type(titleInput, msgTitle);
    userEvent.type(valueInput, valorInput);
    userEvent.click(buttonAddItem);

    const tableArea = within(screen.getByTestId(TABLE_AREA_ID));

    expect(tableArea.getByText(`R$ ${valorInput}`)).toHaveStyle("color: red");
  });

  it("should be possible to insert an revenue item with highlighted value in green.", () => {
    const now = new Date(Date.now());
    const day = now.getDate().toString().padStart(2, "0");
    const month = (now.getMonth() + 1).toString().padStart(2, "0");
    const year = now.getFullYear();

    const inputArea = within(screen.getByTestId(INPUT_AREA_ID));
    const dataInputArea = inputArea.getByTestId(INPUT_DATA_ITEM_ID);
    const categInput = inputArea.getByTestId(INPUT_CATEG_ITEM_ID);
    const titleInput = inputArea.getByTestId(INPUT_TITLE_ITEM_ID);
    const valueInput = inputArea.getByTestId(INPUT_VALUE_ITEM_ID);
    const buttonAddItem = inputArea.getByTestId(BUTTON_ADD_ITEM_ID);

    const currentDateInput = `${year}-${month}-${day}`;
    const typeCateg = "Salário";
    const msgTitle = "Encora";
    const valorInput = "5000";

    userEvent.clear(dataInputArea);

    userEvent.type(dataInputArea, currentDateInput);
    userEvent.selectOptions(categInput, typeCateg);
    userEvent.type(titleInput, msgTitle);
    userEvent.type(valueInput, valorInput);
    userEvent.click(buttonAddItem);

    const tableArea = within(screen.getByTestId(TABLE_AREA_ID));

    expect(tableArea.getByText(`R$ ${valorInput}`)).toHaveStyle("color: green");
  });

  it("should be able to calculate the balance by subtracting expenses from revenues.", () => {
    const now = new Date(Date.now());
    const day = now.getDate().toString().padStart(2, "0");
    const month = (now.getMonth() + 1).toString().padStart(2, "0");
    const year = now.getFullYear();

    const inputArea = within(screen.getByTestId(INPUT_AREA_ID));
    const dataInputArea = inputArea.getByTestId(INPUT_DATA_ITEM_ID);
    const categInput = inputArea.getByTestId(INPUT_CATEG_ITEM_ID);
    const titleInput = inputArea.getByTestId(INPUT_TITLE_ITEM_ID);
    const valueInput = inputArea.getByTestId(INPUT_VALUE_ITEM_ID);
    const buttonAddItem = inputArea.getByTestId(BUTTON_ADD_ITEM_ID);

    const currentDateInput = `${year}-${month}-${day}`;

    const typeCategRevenue = "Salário";
    const msgTitleRevenue = "Encora";
    const valorInputRevenue = "5000";

    userEvent.clear(dataInputArea);

    userEvent.type(dataInputArea, currentDateInput);
    userEvent.selectOptions(categInput, typeCategRevenue);
    userEvent.type(titleInput, msgTitleRevenue);
    userEvent.type(valueInput, valorInputRevenue);
    userEvent.click(buttonAddItem);

    const typeCategExpense = "Aluguel";
    const msgTitleExpense = "Apartamento";
    const valorInputExpense = "800";

    userEvent.type(dataInputArea, currentDateInput);
    userEvent.selectOptions(categInput, typeCategExpense);
    userEvent.type(titleInput, msgTitleExpense);
    userEvent.type(valueInput, valorInputExpense);
    userEvent.click(buttonAddItem);

    const infoArea = within(screen.getByTestId(INFO_AREA_ID));
    const balanceValue = infoArea.getByTestId(BALANCE_VALUE_ITEM_ID);

    expect(balanceValue.textContent).toEqual(
      `R$ ${parseFloat(valorInputRevenue) - parseFloat(valorInputExpense)}`
    );
  });

  it("should be able to update revenue and calculate the balance correctly.", () => {
    const now = new Date(Date.now());
    const day = now.getDate().toString().padStart(2, "0");
    const month = (now.getMonth() + 1).toString().padStart(2, "0");
    const year = now.getFullYear();

    const inputArea = within(screen.getByTestId(INPUT_AREA_ID));
    const dataInputArea = inputArea.getByTestId(INPUT_DATA_ITEM_ID);
    const categInput = inputArea.getByTestId(INPUT_CATEG_ITEM_ID);
    const titleInput = inputArea.getByTestId(INPUT_TITLE_ITEM_ID);
    const valueInput = inputArea.getByTestId(INPUT_VALUE_ITEM_ID);
    const buttonAddItem = inputArea.getByTestId(BUTTON_ADD_ITEM_ID);

    const currentDateInput = `${year}-${month}-${day}`;

    const typeCategRevenue = "Salário";
    const msgTitleRevenue = "Encora";
    const valorInputRevenue = "5000";

    userEvent.clear(dataInputArea);

    userEvent.type(dataInputArea, currentDateInput);
    userEvent.selectOptions(categInput, typeCategRevenue);
    userEvent.type(titleInput, msgTitleRevenue);
    userEvent.type(valueInput, valorInputRevenue);
    userEvent.click(buttonAddItem);

    const typeCategExpense = "Aluguel";
    const msgTitleExpense = "Apartamento";
    const valorInputExpense = "800";

    userEvent.type(dataInputArea, currentDateInput);
    userEvent.selectOptions(categInput, typeCategExpense);
    userEvent.type(titleInput, msgTitleExpense);
    userEvent.type(valueInput, valorInputExpense);
    userEvent.click(buttonAddItem);

    const typeCategExpense2 = "Salário";
    const msgTitleExpense2 = "Bonus";
    const valorInputExpense2 = "1000";

    userEvent.type(dataInputArea, currentDateInput);
    userEvent.selectOptions(categInput, typeCategExpense2);
    userEvent.type(titleInput, msgTitleExpense2);
    userEvent.type(valueInput, valorInputExpense2);
    userEvent.click(buttonAddItem);

    const infoArea = within(screen.getByTestId(INFO_AREA_ID));
    const balanceValue = infoArea.getByTestId(BALANCE_VALUE_ITEM_ID);

    expect(balanceValue.textContent).toEqual(
      `R$ ${
        parseFloat(valorInputRevenue) -
        parseFloat(valorInputExpense) +
        parseFloat(valorInputExpense2)
      }`
    );
  });

  it("should be able to clear the data, categoria, titulo, and valor fields after adding an item.", () => {
    const inputArea = within(screen.getByTestId(INPUT_AREA_ID));
    const dataInputArea = inputArea.getByTestId(INPUT_DATA_ITEM_ID);
    const categInput = inputArea.getByTestId(INPUT_CATEG_ITEM_ID);
    const titleInput = inputArea.getByTestId(INPUT_TITLE_ITEM_ID);
    const valueInput = inputArea.getByTestId(INPUT_VALUE_ITEM_ID);
    const buttonAddItem = inputArea.getByTestId(BUTTON_ADD_ITEM_ID);

    const dateTest = "2023-06-09";
    const typeCateg = "Aluguel";
    const msgTitle = "Apartamento";
    const valorInput = "800";

    userEvent.type(dataInputArea, dateTest);
    userEvent.selectOptions(categInput, typeCateg);
    userEvent.type(titleInput, msgTitle);
    userEvent.type(valueInput, valorInput);
    userEvent.click(buttonAddItem);

    expect(dataInputArea).toHaveValue("");
    expect(categInput).toHaveValue("");
    expect(titleInput).toHaveValue("");
    expect(valueInput).toHaveValue(0);
  });
});
