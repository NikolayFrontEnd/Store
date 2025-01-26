 import React from "react";
import { observer } from "mobx-react";
import repositoriesStore from "../store/RepositoriesStore";
import { Link } from "react-router-dom";
import styles from './ShowAllElements.module.css' 
 import {
    Grid,
    Card,
    CardContent,
    CardHeader,
    Avatar,
    Typography,
    Box,
    IconButton,
    Divider,
} 
from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
const ShowAllElements: React.FC = observer(() => {
    const handleEndOfPage = React.useCallback(() => {
        if (!repositoriesStore.isLoad && repositoriesStore.repos.length < repositoriesStore.totalCount) {
            repositoriesStore.increasePage();
            console.log("Мы уже в конце страницы!");
        }
    }, []);
    const handleScroll = React.useCallback(() => {
        const scrollTop = document.documentElement.scrollTop;
        const windowHeight = window.innerHeight;
        const fullHeight = document.documentElement.scrollHeight;
        console.log(scrollTop,windowHeight, fullHeight );
        if (fullHeight - (windowHeight + scrollTop) < 150) {
            handleEndOfPage();
        }
    }, [handleEndOfPage]);
    React.useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [handleScroll]);
    return (
        <div className={styles.main}>
            <Box sx={{ padding: 4 }}>
                <Typography variant="h4" align="center" gutterBottom>
                    Полный список репозиториев
                </Typography>
                <Grid container spacing={4}>
                     {repositoriesStore.sortedRepos.map((repositor) => (
                        <Grid item xs={12} sm={6} md={4} key={repositor.id}>
                            <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
                                <CardHeader
                                    avatar={<Avatar alt={repositor.owner.login} src={repositor.owner.avatar_url} />}
                                    action={
                                        <Box>
                                            <IconButton component={Link} to={`/edit/${repositor.id}`}>
                                                <EditIcon color="primary" />
                                            </IconButton>
                                            <IconButton onClick={() => repositoriesStore.delRepo(repositor.id)}>
                                                <DeleteIcon color="error" />
                                            </IconButton>
                                        </Box>
                                    }
                                    title={
                                        <Typography variant="h6" component="div" color="#2787f5">
                                            <a
                                                href={repositor.html_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                style={{ textDecoration: "none", color: "#2787f5" }}
                                            >
                                                {repositor.full_name}
                                            </a>
                                        </Typography>
                                    }
                                />
                                <CardContent>
                                    <Typography variant="body2" color="text.secondary">
                                        <strong>ID:</strong> {repositor.id} | <strong>Node ID:</strong> {repositor.node_id}
                                    </Typography>
                                    <Divider sx={{ marginY: 1 }} />
                                    <Typography variant="body2" color="text.secondary">
                                        <strong>Язык:</strong> {repositor.language || "Не указан"} |{" "}
                                        <strong>Видимость:</strong> {repositor.visibility}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        <strong>Звезды:</strong> {repositor.stargazers_count} | <strong>Форки:</strong>{" "}
                                        {repositor.forks_count} | <strong>Наблюдатели:</strong> {repositor.watchers_count}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        <strong>Размер:</strong> {repositor.size} KB | <strong>Открытые вопросы:</strong>{" "}
                                        {repositor.open_issues_count}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        <strong>Дата создания:</strong>{" "}
                                        {new Date(repositor.created_at).toLocaleDateString()} |{" "}
                                        <strong>Последнее обновление:</strong>{" "}
                                        {new Date(repositor.updated_at).toLocaleDateString()}
                                    </Typography>
                                    <Divider sx={{ marginY: 1 }} />
                                    <Typography variant="body2" color="text.secondary">
                                        <strong>Лицензия:</strong> {repositor.license?.name || "Не указана"}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        <strong>Владелец:</strong>{" "}
                                        <a
                                            href={repositor.owner.html_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            style={{ textDecoration: "none", color: "#2787f5" }}
                                        >
                                            {repositor.owner.login}
                                        </a>{" "}
                                        ({repositor.owner.type})
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
                {repositoriesStore.isLoad && (
                    <Typography variant="h6" align="center" sx={{ marginY: 2 }}>
                        Загрузка...
                    </Typography>
                )}
                {repositoriesStore.error && (
                    <Typography variant="h6" color="error" align="center" sx={{ marginY: 2 }}>
                        Ошибка: {repositoriesStore.error}
                    </Typography>
                )}
                {!repositoriesStore.isLoad && repositoriesStore.repos.length === 0 && (
                    <Typography variant="h6" align="center" sx={{ marginY: 2 }}>
                        Нет репозиториев.
                    </Typography>
                )}
            </Box>
        </div>
    );
});
export default ShowAllElements;

