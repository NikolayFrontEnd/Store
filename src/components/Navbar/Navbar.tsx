import React from 'react';
import styles from "./Navbar.module.css";
import repositoriesStore from "../../store/RepositoriesStore";
const Navbar: React.FC = () => {
    const [menu, setMenu] = React.useState<boolean>(false);
    const Menu = () => {
        setMenu(!menu);
    };
    const showUnSorted = () => {
        repositoriesStore.setSort('none');
        setMenu(false);
    };

    const sortByName = () => {
        repositoriesStore.setSort('name');
        setMenu(false);
    };

    const SortDate = () => {
        repositoriesStore.setSort('license');
        setMenu(false);
    };
    const sortSize = () => {
        repositoriesStore.setSort('data');
        setMenu(false);
    };
    const SortStars = () => {
        repositoriesStore.setSort('size');
        setMenu(false);
    };
    const sortNameAuthor = () => {
        repositoriesStore.setSort('star');
        setMenu(false);
    };
    return (
        <header className={styles.header}>
            <div className={styles.title}>
                Добрый день! Мое тестовое задание 😊. С любовью к ВК и к команде VK Tech❤️
            </div>
            <div className={styles.subtitle}>Выполнил Козенко Николай</div>
            <nav className={styles.navbar}>
                {!menu ? (
                    <button
                        className={styles.Specialbutton}
                        onClick={Menu}
                    >
                        Показать меню
                    </button>
                ) : (
                    <div>
                        <div onClick={showUnSorted} className={styles.button}>
                            Все элементы
                        </div>
                        <div onClick={sortByName} className={styles.button}>
                            Сортировка по имени репозитория
                        </div>
                        <div onClick={sortNameAuthor} className={styles.button}>
                            Сортировка по имени лицензии
                        </div>

                        <div onClick = {SortDate} className={styles.button}>
                            Сортировка по дате создания
                        </div>
                        <div onClick = {sortSize} className={styles.button}>
                            Сортировка по размеру репозитория
                        </div>
                        <div onClick = {SortStars}  className={styles.button}>
                            Сортировка по количеству звезд
                        </div>

                        <button
                            className={styles.Specialbutton}
                            onClick={Menu}
                        >
                            Убрать меню
                        </button>
                    </div>
                )}
            </nav>
        </header>
    );
};
export default Navbar;