import { makeObservable, observable,action,computed} from "mobx";
import axios from 'axios';

interface RepositoryResponse {
    total_count: number;
    incomplete_results: boolean;
    items: Repository[];
}

export interface Repository {
    id: number;
    node_id: string;
    name: string;
    full_name: string;
    private: boolean;
    owner: RepOwner;
    html_url: string;
    description: string | null;
    fork: boolean;
    created_at: string;
    updated_at: string;
    pushed_at: string;
    language: string | null;
    stargazers_count: number;
    watchers_count: number;
    forks_count: number;
    open_issues_count: number;
    license: RepLicense | null;
    topics: string[];
    visibility: string;
    default_branch: string;
    size: number;
    has_wiki: boolean;
    has_discussions: boolean;
    has_projects: boolean;
    allow_forking: boolean;
    archived: boolean;
    git_url: string;
    ssh_url: string;
    clone_url: string;
    svn_url: string;
    commits_url: string;
    branches_url: string;
    languages_url: string;
    downloads_url: string;
    subscribers_url: string;
}

interface RepOwner {
    login: string;
    id: number;
    avatar_url: string;
    html_url: string;
    type: string;
}

interface RepLicense {
    key: string;
    name: string;
    spdx_id: string;
    url: string | null;
    node_id: string;
}

type SortCriteria = 'none' | 'name' | 'license' | 'data' | 'size'| 'star';

class RepositoriesStore {
    repos: Repository[] = [];
    totalCount: number = 0;
    isLoad: boolean = false;
    error: string | null = null;
    currentSort: SortCriteria = 'none'; // тут я напишу текущий тип сортировки
    page:number = 1;
    constructor() {
        makeObservable(this, {
            repos: observable,
            totalCount: observable,
            isLoad: observable,
            error: observable,
            currentSort: observable,
            sortedRepos: computed,
            fetch: action,
            setSort: action,
            delRepo: action,
            updateRepo: action,
            page: observable,
            increasePage: action,
        });

    }
    increasePage() {
        this.page++;

        this.fetch(); 

    }
    async fetch() {
        this.isLoad = true;
        this.error = null;
        try {
            const response = await axios.get<RepositoryResponse>(
                `https://api.github.com/search/repositories?q=Q&per_page=6&page=${this.page}`
            );
            this.repos = [...this.repos, ...response.data.items];
            this.totalCount = response.data.total_count;
        } catch (err) {
            this.error = "Не удалось загрузить данные.";
        } finally {
            this.isLoad = false;
        }
    }
    setSort(criteria: SortCriteria) {
        this.currentSort = criteria;
    }
    get sortedRepos() {
        if (this.currentSort === 'none') {
            return this.repos;
        }
        if (this.currentSort === 'name') {
            return this.repos.slice().sort((a, b) => a.name.localeCompare(b.name));
        }
        if (this.currentSort === 'license') {
            return this.repos.slice().sort((a, b) => a.owner.login.localeCompare(b.owner.login));
        }
        if (this.currentSort === 'data') {
            return this.repos.slice().sort((a, b) => a.owner.login.localeCompare(b.owner.login));
        }
        if (this.currentSort === 'size') {
            return this.repos.slice().sort((a, b) => a.size - b.size);
        }
        if (this.currentSort === 'star') {
            return this.repos.slice().sort((a, b) => a.forks_count - b.forks_count);
        }
        return this.repos;
    }
    delRepo(id: number) {
        this.repos = this.repos.filter(repo => repo.id !== id);
    }
    updateRepo(id: number, newData: Partial<Repository>) {
        this.repos = this.repos.map(repo => {
            if (repo.id === id) {
                return { ...repo, ...newData };
            }
            return repo;
        });
    }
}
const repositoriesStore = new RepositoriesStore();
export default repositoriesStore;
