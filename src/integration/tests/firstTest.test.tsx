//import React from "react";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../../App";

import {
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

import { HEADER_TEXT_SIS_FINAN } from "../strings/testStrings";

describe("First test", () => {
  beforeEach(() => {
    render(<App />);
  });

  it("should be able insert the salario", () => {
    const now = new Date(Date.now());
    const day = now.getDate();
    const month = now.getMonth() + 1; // adiciona 1 porque os meses começam em zero
    const year = now.getFullYear();
    const currentDate = `${day}-${month}-${year}`;

    const inputArea = within(screen.getByTestId(INPUT_AREA_ID));
    const dataInputArea = inputArea.getByTestId(INPUT_DATA_ITEM_ID);
    const categInput = inputArea.getByTestId(INPUT_CATEG_ITEM_ID);
    const titleInput = inputArea.getByTestId(INPUT_TITLE_ITEM_ID);
    const valueInput = inputArea.getByTestId(INPUT_VALUE_ITEM_ID);
    const buttonAddItem = inputArea.getByTestId(BUTTON_ADD_ITEM_ID);

    const typeCateg = "Salário";
    const msgTitle = "Despesa";
    const valorInput = "100";

    //userEvent.clear(dataInputArea);
    //userEvent.clear(categInput);
    userEvent.clear(titleInput);
    userEvent.clear(valueInput);

    userEvent.type(dataInputArea, currentDate);
    userEvent.selectOptions(categInput, typeCateg);
    userEvent.type(titleInput, msgTitle);
    userEvent.type(valueInput, valorInput);
    userEvent.click(buttonAddItem);

    const tableArea = within(screen.getByTestId(TABLE_AREA_ID));

    expect(tableArea.queryByText(currentDate)).toBeInTheDocument();
    expect(tableArea.getByText(msgTitle)).toBeInTheDocument();
    expect(tableArea.getByText(valorInput)).toBeInTheDocument();
    expect(tableArea.getByText(typeCateg)).toBeInTheDocument();

    const infoArea = within(screen.getByTestId(INFO_AREA_ID));

    expect(infoArea.getByText(valorInput)).toBeInTheDocument();
  });

  it("should be possible to view the title Sistema Financeiro.", () => {
    const headerText = screen.getByText(HEADER_TEXT_SIS_FINAN);
    expect(headerText).toBeInTheDocument();
  });

  it("should be possible to view the current month in the format Abril de 2023, for example.", () => {});

  it("should be possible to view the fields Receitas, Despesas, and Balanço in the information area", () => {

    const info = within(screen.getByTestId(INFO_AREA_ID));
    function formatDate(date = new Date()) {
      const options: Intl.DateTimeFormatOptions = {
        month: "long",
        year: "numeric",
      };
      const formattedDate = date.toLocaleString("pt-BR", options);
      const [month, year] = formattedDate.split(" de ");
      return `${month} de ${year}`;
    }

    const data = info.getByText(formatDate());
    const categ = info.getByText("Categoria");
    const title = info.getByText("Título");
    const balanco = info.getByText("Balanço");

    expect(data).toBeInTheDocument();
    expect(categ).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(balanco).toBeInTheDocument();
  });

  it("should be possible to view expense values in green.", () => {});

  it("should be possible to view the fields Data, Categoria, Titulo, Valor, and the Adicionar button.", () => {});

  it("should be possible to view the date field in the format mm/dd/yyyy.", () => {});

  it("should be possible to view the report with columns for Data, Categoria, Titulo, and Valor.", () => {
    const table = within(screen.getByTestId(TABLE_AREA_ID));

    const data = table.getByText("Data");
    const categ = table.getByText("Categoria");
    const title = table.getByText("Título");
    const valor = table.getByText("Valor");

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

  it("should not be possible to insert an item with an invalid date.", () => {});

  it("should not be possible to insert an item without a category.", () => {});

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
