import { observer } from "mobx-react";
import repositoriesStore from "../../store/RepositoriesStore";
const SortedName: React.FC = observer(() => {

  return (
    <>
  <ul>
    {repositoriesStore.sortedRepos.map((repo) => (
      <li key={repo.id}>
        <h2>
          <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
            {repo.full_name}
          </a>
        </h2>
        <p>
          <strong>ID:</strong> {repo.id} | <strong>Node ID:</strong> {repo.node_id}
        </p>
        <p>
          <strong>Язык:</strong> {repo.language || "Не указан"} | <strong>Видимость:</strong> {repo.visibility}
        </p>
        <p>
          <strong>Звезды:</strong> {repo.stargazers_count} | <strong>Форки:</strong> {repo.forks_count} |{" "}
          <strong>Наблюдатели:</strong> {repo.watchers_count}
        </p>
        <p>
          <strong>Размер:</strong> {repo.size} KB | <strong>Открытые вопросы:</strong> {repo.open_issues_count}
        </p>
        <p>
          <strong>Дата создания:</strong> {repo.created_at} |{" "}
          <strong>Последнее обновление:</strong> {repo.updated_at}
        </p>
        <p>
          <strong>Последний коммит:</strong> {repo.pushed_at}
        </p>
        <p>
          <strong>Темы:</strong> {repo.topics.length > 0 ? repo.topics.join(", ") : "Нет тем"}
        </p>
        <p>
          <strong>Лицензия:</strong> {repo.license?.name || "Не указана"}
        </p>
        <p>
          <strong>Владелец:</strong>{" "}
          <a href={repo.owner.html_url} target="_blank" rel="noopener noreferrer">
            {repo.owner.login}
          </a>{" "}
          ({repo.owner.type})
        </p>
        <img src={repo.owner.avatar_url} alt={repo.owner.login} />
        <p>
          <strong>Документация:</strong> {repo.has_wiki ? "Есть" : "Нет"} | <strong>Обсуждения:</strong>{" "}
          {repo.has_discussions ? "Есть" : "Нет"} | <strong>Проекты:</strong> {repo.has_projects ? "Есть" : "Нет"}
        </p>
        <p>
          <strong>Разрешены форки:</strong> {repo.allow_forking ? "Да" : "Нет"} | <strong>Архивирован:</strong>{" "}
          {repo.archived ? "Да" : "Нет"}
        </p>
        <p>
          <strong>Git URL:</strong> {repo.git_url} | <strong>SSH URL:</strong> {repo.ssh_url} |{" "}
          <strong>Clone URL:</strong> {repo.clone_url} | <strong>SVN URL:</strong> {repo.svn_url}
        </p>
        <p>
          <strong>API Ссылки:</strong>
        </p>
        <ul>
          <li>
            <strong>Коммиты:</strong>{" "}
            <a href={repo.commits_url.replace("{/sha}", "")} target="_blank" rel="noopener noreferrer">
              {repo.commits_url.replace("{/sha}", "")}
            </a>
          </li>
          <li>
            <strong>Ветки:</strong>{" "}
            <a href={repo.branches_url.replace("{/branch}", "")} target="_blank" rel="noopener noreferrer">
              {repo.branches_url.replace("{/branch}", "")}
            </a>
          </li>
          <li>
            <strong>Языки:</strong>{" "}
            <a href={repo.languages_url} target="_blank" rel="noopener noreferrer">
              {repo.languages_url}
            </a>
          </li>
          <li>
            <strong>Скачивания:</strong>{" "}
            <a href={repo.downloads_url} target="_blank" rel="noopener noreferrer">
              {repo.downloads_url}
            </a>
          </li>
          <li>
            <strong>Подписчики:</strong>{" "}
            <a href={repo.subscribers_url} target="_blank" rel="noopener noreferrer">
              {repo.subscribers_url}
            </a>
          </li>
        </ul>
        <button>Удалить</button>
        <button>Редактировать</button>
      </li>
    ))}
  </ul>
    </>
  );
});

export default SortedName;