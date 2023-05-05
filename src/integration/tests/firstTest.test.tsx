//import React from "react";
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
  NEXT_MONTH_ID,
  PREV_MONTH_ID,
  CURRENT_MONTH_ID,
  BALANCE_VALUE_ITEM_ID,
  REVENUE_VALUE_ITEM_ID,
  EXPENSE_VALUE_ITEM_ID
} from "../helpers/testHelper";

import {
  HEADER_TEXT,
  INFO_TEXT_RECEITAS,
  INFO_TEXT_DESPESAS,
  INFO_TEXT_BALANCO,
  INPUT_TEXT_DATA,
  INPUT_TEXT_CATEGORIA,
  INPUT_TEXT_TITULO,
  INPUT_TEXT_VALOR,
  INPUT_TEXT_ADICIONAR,
  TABLE_TEXT_DATA,
  TABLE_TEXT_CATEGORIA,
  TABLE_TEXT_TITULO,
  TABLE_TEXT_VALOR,
} from "../strings/testStrings";

describe("First test", () => {
  beforeEach(() => {
    render(<App />);
  });

  /*   beforeAll(() => {
    const originalAlert = window.alert;
    window.alert = jest.fn();
    afterAll(() => {
      window.alert = originalAlert;
    }); */

  it("should be possible to view the title Sistema Financeiro.", () => {
    const tableArea = within(screen.getByTestId(HEADER_AREA_ID));
    const headerText = tableArea.getByText(HEADER_TEXT);
    expect(headerText).toBeInTheDocument();
  });

  it("should be possible to view the fields Receitas, Despesas, and Balanço in the information area", () => {
    const infoArea = within(screen.getByTestId(INFO_AREA_ID));

    const infoReceita = infoArea.getByText(INFO_TEXT_RECEITAS);
    const infoDespesas = infoArea.getByText(INFO_TEXT_DESPESAS);
    const inforBalanco = infoArea.getByText(INFO_TEXT_BALANCO);

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
    const infoBalance = screen.getByTestId(BALANCE_VALUE_ITEM_ID);
    expect(infoBalance).toHaveStyle("color: green");
  });

  it("should be possible to view the fields Data, Categoria, Titulo, Valor, and the Adicionar button.", () => {
    const inputArea = within(screen.getByTestId(INPUT_AREA_ID));

    const inputData = inputArea.getByText(INPUT_TEXT_DATA);
    const inputCateg = inputArea.getByText(INPUT_TEXT_CATEGORIA);
    const inputTitutlo = inputArea.getByText(INPUT_TEXT_TITULO);
    const inputValor = inputArea.getByText(INPUT_TEXT_VALOR);
    const inputAdd = inputArea.getByText(INPUT_TEXT_ADICIONAR);
  
    expect(inputData).toBeInTheDocument();
    expect(inputCateg).toBeInTheDocument();
    expect(inputTitutlo).toBeInTheDocument();
    expect(inputValor).toBeInTheDocument();
    expect(inputAdd).toBeInTheDocument();
  });

  it("should be possible to view the report with columns for Data, Categoria, Titulo, and Valor.", () => {
    const tableArea = within(screen.getByTestId(TABLE_AREA_ID));

    const tableData = tableArea.getByText(TABLE_TEXT_DATA);
    const tableCateg = tableArea.getByText(TABLE_TEXT_CATEGORIA);
    const tableTitle = tableArea.getByText(TABLE_TEXT_TITULO);
    const tableValor = tableArea.getByText(TABLE_TEXT_VALOR);

    expect(tableData).toBeInTheDocument();
    expect(tableCateg).toBeInTheDocument();
    expect(tableTitle).toBeInTheDocument();
    expect(tableValor).toBeInTheDocument();
  });

  it("should be able to insert an expense item.", () => {
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

    const currentDateShort = `${month}${day}${year}`;
    const currentDate = `${day}/${month}/${year}`;
    const typeCateg = "Salário";
    const msgTitle = "Receita";
    const valorInput = "100";

    userEvent.clear(dataInputArea);

    userEvent.type(dataInputArea, currentDateShort);
    userEvent.selectOptions(categInput, typeCateg);
    userEvent.type(titleInput, msgTitle);
    userEvent.type(valueInput, valorInput);
    userEvent.click(buttonAddItem);

    const tableArea = within(screen.getByTestId(TABLE_AREA_ID));

    //expect(tableArea.getByText(currentDate)).toBeInTheDocument();
    expect(tableArea.getByText(msgTitle)).toBeInTheDocument();
    expect(tableArea.getByText(valorInput)).toBeInTheDocument();
    expect(tableArea.getByText(typeCateg)).toBeInTheDocument();

  });
  it("should be able to insert a revenue item.", () => {
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

    const currentDateShort = `${month}${day}${year}`;
    const currentDate = `${day}/${month}/${year}`;
    const typeCateg = "Luz";
    const msgTitle = "Receita";
    const valorInput = "100";

    userEvent.clear(dataInputArea);

    userEvent.type(dataInputArea, currentDateShort);
    userEvent.selectOptions(categInput, typeCateg);
    userEvent.type(titleInput, msgTitle);
    userEvent.type(valueInput, valorInput);
    userEvent.click(buttonAddItem);

    const tableArea = within(screen.getByTestId(TABLE_AREA_ID));

    expect(tableArea.getByText(currentDate)).toBeInTheDocument();
    expect(tableArea.getByText(msgTitle)).toBeInTheDocument();
    expect(tableArea.getByText(valorInput)).toBeInTheDocument();
    expect(tableArea.getByText(typeCateg)).toBeInTheDocument();

  });

  it("should not be possible to insert an item without a date.", () => {
    const inputArea = within(screen.getByTestId(INPUT_AREA_ID));

    const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});

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

    // check if alert was called with the expected error message
    expect(alertSpy).toHaveBeenCalledTimes(1);
    const dateInvalid = 'Data inválida!';
    //const categInvalid = 'Categoria inválida!';
    //const titleInvalid = 'Título inválido!';
    //const valueInvalid = 'Valor inválido!';
    expect(alertSpy).toHaveBeenCalledWith(dateInvalid);

    // reset the spy
    alertSpy.mockRestore();
    /* const errorMessage = screen.getByText('Data inválida!');
    expect(errorMessage).toBeInTheDocument(); */

  })

  it("should not be possible to insert an item without a category.", () => {

  });

  it("should not be possible to insert an item with an empty title.", () => {});

  it("should not be possible to insert an item with an empty value.", () => {});

  it("should not be possible to view items registered in other months in the current month.", () => {});

  it("should not be possible to view items registered in the current month in other months.", () => {});

  it("should be possible to insert a revenue item with highlighted category and value in green.", () => {});

  it("should be possible to insert an expense item with highlighted category and value in red.", () => {});

  it("sshould be able to calculate the balance by subtracting expenses from revenues.", () => {});

  it("should be able to update revenue and calculate the balance correctly.", () => {});

  it("should be able to clear the data, categoria, titulo, and valor fields after adding an item.", () => {});
});
