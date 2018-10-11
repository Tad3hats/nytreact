import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
// import _ from "lodash";
import SearchBar from "./components/search_bar";
import ArticleList from "./components/article_list";
import ArticleDetail from "./components/article_detail";

const queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?";
const API_KEY = "b9f91d369ff59547cd47b931d8cbc56b:0:74623931";

//create a new component.  This component should create some html
class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            articles: [],
            selectedArticle: null
        }

        this.articleSearch("surboards");
    }

    articleSearch(term) {
        NYTSearch({ key: API_KEY, term: term }, (articles) => {
            this.setState({ articles })
        });
    };
}

render() {
    // const articleSearch = _.debounce((term) => { this.articleSearch(term) }, 300);

    return (
        <div>
            <SearchBar onSearchTermChange={articleSearch} />
            <ArticleDetail article={this.state.selectedArticle} />
            <ArticleList
                onArticleSelect={selectedArticle => this.setState({ selectedArticle })}
                articles={this.state.articles} />
        </div>
    );
}



ReactDOM.render(<App />, document.querySelector('.container'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
