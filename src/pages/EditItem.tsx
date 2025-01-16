import { observer } from "mobx-react";
import repositoriesStore from "../store/RepositoriesStore";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import styles from "./EditItem.module.css";
const EditItem: React.FC = observer(() => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const repo = repositoriesStore.repos.find(repo => repo.id === Number(id));
    if (!repo) {
        return <div>Репозиторий не найден</div>;
    }
    const [name, setName] = useState(repo.full_name);
    const [description, setDescription] = useState(repo.description ?? "");
    const Save = () => {
        repositoriesStore.updateRepo(repo.id, {
            full_name: name,
            description: description
        });
        navigate("/");
    };
    const Return = () => {
        navigate("/");
    };
    return (

<div className={styles.container}>
        <h2 className={styles.header}>Редактирование репозитория</h2>
        <label className={styles.label}>
            Название:
            <input
                type="text"
                name="имя"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={styles.input}
            />
        </label>
        <label className={styles.label}>
            Описание:
            <input
                type="text"
                name="описание"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className={styles.input}
            />
        </label>
        <div className={styles.buttonContainer}>
            <button onClick={Save} className={styles.button}>
                Сохранить
            </button>
            <button onClick={Return} className={`${styles.button} ${styles.cancelButton}`}>
                Отмена
            </button>
        </div>
    </div>

    );
});
export default EditItem;