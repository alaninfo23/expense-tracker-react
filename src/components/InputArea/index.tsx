import { useState } from 'react';
import * as C from './styles';
import { Item } from '../../types/Item';

import { categories } from '../../data/categories';
import { newDateAdjusted } from '../../helpers/dateFilter';

type Props = {
  onAdd: (item: Item) => void;
};

export const InputArea = ({ onAdd }: Props) => {
  const [dateField, setDateField] = useState('');
  const [categoryField, setCategoryField] = useState('');
  const [titleField, setTitleField] = useState('');
  const [valueField, setValueField] = useState(0);

  let categoryKeys: string[] = Object.keys(categories);

  const handleAddEvent = () => {
    let errors: string[] = [];

    if(isNaN(new Date(dateField).getTime())) {
      errors.push('Data inválida!');
    }
    if(!categoryKeys.includes(categoryField)) {
      errors.push('Categoria inválida!');
    }
    if(titleField === '') {
      errors.push('Título vazio!');
    }
    if (valueField <= 0) {
      errors.push('Valor inválido!');
    } else if (!valueField) {
      errors.push('Insira um valor!');
    }

    if(errors.length > 0) {
      alert(errors.join("\n"));
    } else {
      onAdd({
        date: newDateAdjusted(dateField),
        category: categoryField,
        title: titleField,
        value: valueField
      });
      clearFields();
    }
  }

  const clearFields = () => {
    setDateField('');
    setCategoryField('');
    setTitleField('');
    setValueField(0);
  }

  return (
      <C.Container data-testid='INPUT_AREA'>
        <C.InputLabel>
          <C.InputTitle>Data</C.InputTitle>
          <C.Input type="date" value={dateField} onChange={e => setDateField(e.target.value)} data-testid='INPUT_DATA_ITEM'/>
        </C.InputLabel>
        <C.InputLabel>
          <C.InputTitle>Categoria</C.InputTitle>
          <C.Select value={categoryField} onChange={e => setCategoryField(e.target.value)} data-testid='INPUT_CATEG_ITEM'>
            <>
              <option></option>
              {categoryKeys.map((key, index) => (
                <option key={index} value={key}>{categories[key].title}</option>
              ))}
            </>
          </C.Select>
        </C.InputLabel>
        <C.InputLabel>
          <C.InputTitle>Título</C.InputTitle>
          <C.Input type="text" value={titleField} onChange={e => setTitleField(e.target.value)} data-testid='INPUT_TITLE_ITEM'/>
        </C.InputLabel>
        <C.InputLabel>
          <C.InputTitle>Valor</C.InputTitle>
          <C.Input type="number" value={valueField} onChange={e => setValueField(parseFloat(e.target.value))} data-testid='INPUT_VALUE_ITEM'/>
        </C.InputLabel>
        <C.InputLabel>
          <C.InputTitle>&nbsp;</C.InputTitle>
          <C.Button onClick={handleAddEvent} data-testid='BUTTON_ADD_ITEM'>Adicionar</C.Button>
        </C.InputLabel>
      </C.Container>
  );
}