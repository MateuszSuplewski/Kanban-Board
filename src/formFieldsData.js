export const fields = [
  {
    name: 'name',
    label: 'Zadanie',
    pattern: /[a-ząćęłńóśźż]{2,}/i,
    error: 'Dane w polu Zadanie są niepoprawne - Ciąg minimum 2 znaków',
    type: 'text',
    required: true
  },
  {
    name: 'user',
    label: 'Autor',
    pattern: /[a-ząćęłńóśźż]{2,}/i,
    error: 'Dane w polu Autor są niepoprawne - Ciąg minimum 2 znaków',
    type: 'text',
    required: true
  }
]

export default fields
