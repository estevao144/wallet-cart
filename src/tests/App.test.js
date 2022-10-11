import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';

describe('Testes: Requisito 5', () => {
  it('Teste se a pagina de login é renderizada:', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const email = screen.getByPlaceholderText(/Insira seu email/i);
    const senha = screen.getByPlaceholderText(/Insira sua senha/i);
    const btn = screen.getByRole('button');
    expect(email).toBeInTheDocument();
    expect(senha).toBeInTheDocument();
    expect(btn).toBeInTheDocument();

    userEvent.type(email, 'estevo1@gmail.com');
    userEvent.type(senha, '123456');
    userEvent.click(btn);

    const { pathname } = history.location;
    expect(pathname).toBe('/carteira');
  });

  it('Testando a carteira', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });

    const textInput = screen.getByRole('textbox');
    const selects = screen.getAllByRole('combobox');
    const btn = screen.getByRole('button');
    const brlText = screen.getByText(/brl/i);
    const valorInput = screen.getByPlaceholderText(/valor/i);

    expect(valorInput).toBeInTheDocument();
    expect(brlText).toBeInTheDocument();
    expect(textInput).toBeInTheDocument();
    expect(selects.length).toBe(3);
    expect(btn).toBeInTheDocument();

    userEvent.type(valorInput, '1');
    userEvent.click(btn);
  });
  it('Verifica se é possível adicionar despesas:', async () => {
    renderWithRouterAndRedux(<App />);

    const email = screen.getByPlaceholderText(/Insira seu email/i);
    const senha = screen.getByPlaceholderText(/Insira sua senha/i);
    const btn = screen.getByRole('button');

    expect(email).toBeInTheDocument();
    expect(senha).toBeInTheDocument();
    expect(btn).toBeInTheDocument();

    userEvent.type(email, 'estevo@gmail.com');
    userEvent.type(senha, '123456');
    userEvent.click(btn);

    const buttonAdicionar = screen.getByRole('button', { name: /adicionar despesa/i });
    expect(buttonAdicionar).toBeInTheDocument();

    const valor = screen.getByTestId('value-input');
    const descricao = screen.getByTestId('description-input');
    const moeda = screen.getByTestId('currency-input');
    const pagamento = screen.getByTestId('method-input');
    const categoria = screen.getByTestId('tag-input');

    userEvent.type(valor, '100');
    userEvent.type(descricao, 'cem dólares');
    userEvent.selectOptions(moeda, [
      await screen.findByText('CAD'),
    ]);
    userEvent.selectOptions(pagamento, ['Cartão de crédito']);
    userEvent.selectOptions(categoria, ['Lazer']);
    userEvent.click(buttonAdicionar);

    const buttonExcluir = await screen.findByTestId('delete-btn');
    expect(buttonExcluir).toBeInTheDocument();
  });

  it('Verifica se é possível adicionar despesas:', async () => {
    renderWithRouterAndRedux(<App />);

    const email = screen.getByPlaceholderText(/Insira seu email/i);
    const senha = screen.getByPlaceholderText(/Insira sua senha/i);
    const btn = screen.getByRole('button');

    expect(email).toBeInTheDocument();
    expect(senha).toBeInTheDocument();
    expect(btn).toBeInTheDocument();

    userEvent.type(email, 'estevo@gmail.com');
    userEvent.type(senha, '123456');
    userEvent.click(btn);

    const buttonAdicionar = screen.getByRole('button', { name: /adicionar despesa/i });
    expect(buttonAdicionar).toBeInTheDocument();

    const valor = screen.getByTestId('value-input');
    const descricao = screen.getByTestId('description-input');
    const moeda = screen.getByTestId('currency-input');
    const pagamento = screen.getByTestId('method-input');
    const categoria = screen.getByTestId('tag-input');

    userEvent.type(valor, '100');
    userEvent.type(descricao, 'cem Euros');
    userEvent.selectOptions(moeda, [
      await screen.findByText('CAD'),
    ]);
    userEvent.selectOptions(pagamento, ['Cartão de crédito']);
    userEvent.selectOptions(categoria, ['Lazer']);
    userEvent.click(buttonAdicionar);
  });
});
