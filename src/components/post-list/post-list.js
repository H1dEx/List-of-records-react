import React from 'react';
import PostListItem from './../post-list-item';
import './post-list.css';
const PostList = ({posts})=> {

    const elements = posts.map(i => {
        if (typeof(i) === 'object'){
        const {id, ...itemProps} = i;
        return <li className="list-group-item" key={id}> <PostListItem {...itemProps}/> </li>
        }
    })

    return (
        <ul className="app-list list-group">
            {elements}
        </ul>
    )
}

export default PostList;