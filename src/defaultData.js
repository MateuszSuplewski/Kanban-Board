export const defaultData = {
  columns: [
    { id: 1, name: 'Oczekujące', limit: 4 },
    { id: 2, name: 'W trakcie - Design', limit: 4 },
    { id: 3, name: 'W trakcie - Implementacja', limit: 2 },
    { id: 4, name: 'Testowane', limit: 2 },
    { id: 5, name: 'Zakończone', limit: 2 }
  ],
  tasks: [
    { id: 1, name: 'Aplikacja movie-store', idColumn: 1, user: 'Anna' },
    { id: 2, name: 'Sklep coconutDesign', idColumn: 2, user: 'Mateusz' },
    { id: 3, name: 'Aplikacja do automatyzacji procesu rekrutacji', idColumn: 3, user: 'Karol' }
  ]
}

export default defaultData
