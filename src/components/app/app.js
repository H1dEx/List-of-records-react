import React from 'react';
import AppHeader from '../app-header';
import SearchPanel from './../search-panel';
import PostStatusFilter from './../post-status-filter';
import PostList from './../post-list';
import PostAddForm from './../post-add-form';
import './app.css';

const App = () => {
const data = [{
    label: "Going to learn React", important: false, id: 'qsxa21'
}, {
    label: "Another text content", important: false, id: '3adyt'
}, {
    label: "And something else...", important: true, id: 523
}];

    return (
        <div className="app">
        <AppHeader />
        <div className="search-panel d-flex">
            <SearchPanel />
            <PostStatusFilter />
        </div>
        <PostList posts={data}/>
        <PostAddForm/>
        </div>
    )
}

export default App;