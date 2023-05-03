//import React from "react";
import { render, screen, within, waitFor} from "@testing-library/react";
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
} from "../helpers/testHelper";

import { HEADER_TEXT,
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
  TABLE_TEXT_VALOR } from "../strings/testStrings";

describe("First test", () => {
/*   beforeEach(() => {
    render(<App />);
  }); */


  beforeAll(() => {
    const originalAlert = window.alert;
    window.alert = jest.fn();
    afterAll(() => {
      window.alert = originalAlert;
    });
  });
  it("should be able insert the salario", () => {
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

    expect(tableArea.getByText(currentDate)).toBeInTheDocument();
    expect(tableArea.getByText(msgTitle)).toBeInTheDocument();
    expect(tableArea.getByText(valorInput)).toBeInTheDocument();
    expect(tableArea.getByText(typeCateg)).toBeInTheDocument();
  });

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
    const infoArea = within(screen.getByTestId(INFO_AREA_ID));
    const inforBalanco = infoArea.getByText("Balanço");
  });

  it("should be possible to view the fields Data, Categoria, Titulo, Valor, and the Adicionar button.", () => {

  });

  it("should be possible to view the report with columns for Data, Categoria, Titulo, and Valor.", () => {
    const table = within(screen.getByTestId(TABLE_AREA_ID));

    const data = table.getByText(INPUT_TEXT_DATA);
    const categ = table.getByText(INPUT_TEXT_CATEGORIA);
    const title = table.getByText(INPUT_TEXT_TITULO);
    const valor = table.getByText(INPUT_TEXT_VALOR);

    expect(data).toBeInTheDocument();
    expect(categ).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(valor).toBeInTheDocument();
  });

  it("should be able to insert an expense item.", () => {});

  it("should be able to insert a revenue item.", () => {});

  it("should be able to insert an expense item with blue color.", () => {});

  it("should be able to insert a revenue item with green color.", () => {});

  it("should not be possible to insert an item without a date.", () => {});

  it.only("should not be possible to insert an item without date .", async () => {
 
    render(<App />);

    // elementos do formulário
    const inputArea = within(screen.getByTestId(INPUT_AREA_ID));
    const dataInputArea = inputArea.getByTestId(INPUT_DATA_ITEM_ID);
    const categInput = inputArea.getByTestId(INPUT_CATEG_ITEM_ID);
    const titleInput = inputArea.getByTestId(INPUT_TITLE_ITEM_ID);
    const valueInput = inputArea.getByTestId(INPUT_VALUE_ITEM_ID);
    const buttonAddItem = inputArea.getByTestId(BUTTON_ADD_ITEM_ID);
  
    // valores dos campos do formulário
    const dateTest = '';
    const typeCateg = "Salário";
    const msgTitle = "Receita";
    const valorInput = "100";
  
    userEvent.type(dataInputArea, dateTest);
    userEvent.selectOptions(categInput, typeCateg);
    userEvent.type(titleInput, msgTitle);
    userEvent.type(valueInput, valorInput);
    userEvent.click(buttonAddItem);
  
    expect(window.alert).toHaveBeenCalledWith('Data inválida!');
  });

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
