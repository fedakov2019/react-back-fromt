import React from 'react';
import MyPosts from './MyPosts';
import {actions} from "../../../redux/profile-reducer";
import { connect } from 'react-redux';
import { AppState } from '../../../redux/redux-store';

const mapStateToProps= (state:AppState) => {
    return {
        
        posts : state.profilePage.posts
    }
}



const MyPostsContainer=connect(mapStateToProps, {addPost:actions.addPostActionCreator})(MyPosts)



export default MyPostsContainer;