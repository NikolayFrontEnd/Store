import { render, screen } from '@testing-library/react';
import Navbar from './src/components/Navbar/Navbar';

describe('Navbar Component - Visual Tests', () => {
  it('должен отображать заголовок', () => {
    render(<Navbar />);
    const headerTitle = screen.getByText(
      /Добрый день! Мое тестовое задание 😊. С любовью к ВК и к команде VK Tech❤️/i
    );
    expect(headerTitle).toBeInTheDocument();
  });

  it('должен отображать подзаголовок', () => {
    render(<Navbar />);
    const subtitle = screen.getByText(/Выполнил Козенко Николай/i);
    expect(subtitle).toBeInTheDocument();
  });

  it('должен отображать кнопку "Показать меню"', () => {
    render(<Navbar />);
    const showMenuButton = screen.getByText(/Показать меню/i);
    expect(showMenuButton).toBeInTheDocument();
  });

  it('должен не отображать элементы меню при первом рендере', () => {
    render(<Navbar />);
    expect(screen.queryByText(/Все элементы/i)).not.toBeInTheDocument();
    expect(
      screen.queryByText(/Сортировка по имени репозитория/i)
    ).not.toBeInTheDocument();
  });
});
