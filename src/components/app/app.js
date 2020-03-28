import React, {Component} from 'react';
import AppHeader from '../app-header';
import SearchPanel from './../search-panel';
import PostStatusFilter from './../post-status-filter';
import PostList from './../post-list';
import PostAddForm from './../post-add-form';
import './app.css';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state =  {
            data: [{
                label: "Going to learn React", important: false, like: false, id: 1
            }, {
                label: "Another text content", important: false, like: false, id: 2
            }, {
                label: "And something else...", important: true, like: false, id: 3
            }],
            term: '',
            filter: 'all'
        };
        this.maxId = 4;
    }

    deleteItem = (id) => {
        this.setState(({data}) => {
            const index = data.findIndex(item => item.id === id),
            newData = [...data.slice(0, index), ...data.slice(index + 1)];
            return {
                data: newData
            }
        })
    }

    addItem = (content) => {
        const newPost = {
            label: content,
            important: false,
            id: this.maxId++
        }
        this.setState(({data}) => {
           const newData = [...data, newPost];
           return {data: newData};
        })
    }

    onToggleImportant = (id) => {
        this.setState(({data}) => {
            const index = data.findIndex(i=>i.id===id),
                oldObj = data[index],
                newObj = {...oldObj, important: !oldObj.important},
                newArr = [...data.slice(0,index),newObj,...data.slice(index+1)];
            return {data: newArr};
        })
    }

    onToggleLiked = (id) => {
        this.setState(({data}) => {
            const index = data.findIndex(el => el.id === id);
            const old = data[index],
            newItem = {...old, like: !old.like},
            newData = [...data.slice(0, index), newItem, ...data.slice(index + 1)];
            return ({data:newData});
        })
    }

    searchPost = (items, term) => {
        if (term.length === 0 ) return items;
        return items.filter( item => {
            return item.label.toLowerCase().indexOf(term.toLowerCase()) > -1;
        })
    }

    filterPost = (items, filter) => {
        if (filter === 'like') return items.filter(items => items.like);
            return items;
    }

    onUpdateSearch = (term) => {
        this.setState(({term}))
    }

    onFilterSelect = (filter) => {
        this.setState(({filter}))
    }

    render() {
        const {data, term, filter} = this.state,  
            liked = data.filter(i=>i.like).length,
            allPosts = data.length,
            visiblePosts = this.filterPost(this.searchPost(data, term), filter);
        return (
            <div className='app'>
            <AppHeader liked={liked} allPosts={allPosts} />
            <div className="search-panel d-flex">
                <SearchPanel onUpdateSearch={this.onUpdateSearch}/>
                <PostStatusFilter filter={filter} onFilterSelect={this.onFilterSelect}/>
            </div>
            <PostList 
                posts={visiblePosts}
                onDelete = {this.deleteItem}
                onToggleImportant={this.onToggleImportant}
                onToggleLiked={this.onToggleLiked}/>
            <PostAddForm onAdd={this.addItem}/>
            </div>
        )}
}
