import { combineReducers } from 'redux';

// import * as types from '../actions/actionTypes'

function adminModalContent(state = null, action) {
  switch (action.type) {
    case "HIDE_ADMIN_MODAL":
      return null
    case "SHOW_ADMIN_MODAL":
      return action.content
    default:
      return state
  }
}

function teamList(state = null, action) {
  switch (action.type) {
    case "FETCH_TEAMS":
      if (action.status === "SUCCESS") {
        return action.data
      }
    case "CREATE_TEAM":
      if (action.status === "SUCCESS" && state) {
        console.log("success!")
        console.log([...state, ...[action.data]])
        return [...state, ...[action.data]]
      }
    case "UPDATE_TEAM":
      if (action.status === "SUCCESS" && state) {
        let updatedIndex = state.indexOf(action.data)
        state.splice(updatedIndex, 1, action.data)
        return [...state]
      }
    case "DELETE_TEAM":
      if (action.status === "SUCCESS" && state) {
        let deletedIndex = state.indexOf(action.data)
        state.splice(deletedIndex, 1)
        return [...state]
      }
    default:
      return state
  }
}

function updateStatus(state = null, action) {
  let splitPieces = action.type.split("_")
  if (splitPieces[0] === "CREATE" || splitPieces[0] === "UPDATE" || splitPieces[0] === "DELETE") {
    return action
  } else {
    return state
  }
}

function currTeam(state = null, action) {
  switch (action.type) {
    case "FETCH_TEAM":
      if (action.status === "SUCCESS") {
        return action.data
      } else if (action.status === "FAILURE") {
        return "Not Found"
      } else {
        return "Fetching"
      }
    case "UPDATE_TEAM":
      if (action.status === "SUCCESS") {
        return action.data
      }
    case "DELETE_TEAM":
      if (action.status === "SUCCESS") {
        return null
      }
    case "TEAM_ADD_USER":
      if (action.status === "SUCCESS") {
        let newState = {}
        Object.assign(newState, state)
        !newState.users ? newState.users = [] : null
        newState.users.push(action.data)
        return newState
      }
    case "TEAM_REMOVE_USER":
      if (action.status === "SUCCESS") {
        let newState = {}
        Object.assign(newState, state)
        let deletedIndex = state.users.indexOf(action.data)
        newState.users.splice(deletedIndex, 1)
        return newState
      }
    case "CREATE_COLLECTION":
      if (action.status === "SUCCESS") {
        let newState = {}
        Object.assign(newState, state)
        newState.collections.push(action.data)
        return newState
      }
    case "UPDATE_COLLECTION":
      if (action.status === "SUCCESS") {
        let newState = {}
        Object.assign(newState, state)
        if (state && state.collections) {
          let updatedIndex = state.collections.findIndex(d => d._id === action.data._id)
          console.log(updatedIndex)
          newState.collections.splice(updatedIndex, 1, action.data)
        }
        return newState
      }
    case "DELETE_COLLECTION":
      if (action.status === "SUCCESS") {
        let newState = {}
        Object.assign(newState, state)
        let deletedIndex = state.collections.indexOf(action.data)
        newState.collections.splice(deletedIndex, 1)
        return newState
      }
    case "CREATE_RESOURCE":
      if (action.status === "SUCCESS") {
        let newState = {}
        Object.assign(newState, state)
        newState.resources.push(action.data)
        return newState
      }
    case "UPDATE_RESOURCE":
      if (action.status === "SUCCESS") {
        let newState = {}
        Object.assign(newState, state)
        if (state && state.resources) {
          let updatedIndex = state.resources.findIndex(d => d._id === action.data._id)
          console.log(updatedIndex)
          newState.resources.splice(updatedIndex, 1, action.data)
        }
        return newState
      }
    case "DELETE_RESOURCE":
      if (action.status === "SUCCESS") {
        let newState = {}
        Object.assign(newState, state)
        let deletedIndex = state.resources.indexOf(action.data)
        console.log(deletedIndex)
        newState.resources.splice(deletedIndex, 1)
        return newState
      }
    default:
      return state
  }
}

function currCollection(state = null, action) {
  switch (action.type) {
    case "FETCH_COLLECTION":
      if (action.status === "SUCCESS") {
        return action.data
      } else if (action.status === "FAILURE") {
        return "Not Found"
      } else {
        return "Fetching"
      }
    case "UPDATE_COLLECTION":
      if (action.status === "SUCCESS") {
        return action.data
      }
    case "COLLECTION_REORDER_CHILDREN":
      if (action.status === "SUCCESS") {
        return "Invalid"
      }
    case "COLLECTION_ADD_EXISTING_RESOURCE":
      if (action.status === "SUCCESS") {
        let newState = {}
        Object.assign(newState, state)
        newState.resources.push(action.data)
        return newState
      } else {
        return state
      }
    case "COLLECTION_REMOVE_RESOURCE":
      if (action.status === "SUCCESS") {
        console.log(state)

        let newState = {}
        Object.assign(newState, state)
        let deletedIndex = state.resources.indexOf(action.data)
        console.log(deletedIndex)
        newState.resources.splice(deletedIndex, 1)
        return newState
      } else {
        return state
      }
    case "DELETE_COLLECTION":
      if (action.status === "SUCCESS") {
        return null
      }
    case "CREATE_SUBCOLLECTION":
      if (action.status === "SUCCESS") {
        return "Invalid"
      }
    case "UPDATE_SUBCOLLECTION":
      if (action.status === "SUCCESS") {
        return "Invalid"
      }
    case "SUBCOLLECTION_REORDER_CHILDREN":
      if (action.status === "SUCCESS") {
        return "Invalid"
      }
    case "SUBCOLLECTION_ADD_EXISTING_RESOURCE":
      if (action.status === "SUCCESS") {
        return "Invalid"
      }
    case "SUBCOLLECTION_REMOVE_RESOURCE":
      if (action.status === "SUCCESS") {
        return "Invalid"
      }
    case "DELETE_SUBCOLLECTION":
      if (action.status === "SUCCESS") {
        return "Invalid"
      }
    case "CREATE_RESOURCE":
      if (action.status === "SUCCESS") {
        return "Invalid"
      }
    case "UPDATE_RESOURCE":
      if (action.status === "SUCCESS") {
        return "Invalid"
      }
    case "DELETE_RESOURCE":
      if (action.status === "SUCCESS") {
        return "Invalid"
      }
    case "RESET_CURR_COLLECTION":
      return null
  }

  return state
}

function userList(state = null, action) {
  switch (action.type) {
    case "FETCH_USERS":
      if (action.status === "SUCCESS") {
        return action.data
      }
    case "TEAM_ADD_USER":
      if (action.status === "SUCCESS") {
        return null
      }
    default:
      return state
  }
}

function collectionList(state = null, action) {
  switch (action.type) {
    case "FETCH_COLLECTIONS":
      if (action.status === "SUCCESS") {
        return action.data
      }
    default:
      return state
  }
}

function currUser(state = null, action) {
  switch (action.type) {
    case "SET_USER_INFO":
      return action.user || null
    case "CREATE_TEAM":
      if (action.status === "SUCCESS") {
        let newState = {}
        Object.assign(newState, state)
        newState.permissions.teams.push(action.data)
        return newState
      }
    default:
      return state
  }
}

function resourceList(state = null, action) {
  switch (action.type) {
    case "FETCH_RESOURCES":
      if (action.status === "SUCCESS") {
        return action.data
      }
    default:
      return state
  }
}

function resourceViewerContent(state = null, action) {
  switch (action.type) {
    case "HIDE_RESOURCE_VIEWER":
      return null
    case "SHOW_RESOURCE_VIEWER":
      return {
        parent: action.parent,
        resourceList: action.resourceList,
        currIndex: action.currIndex
      }
    case "SET_CURR_RESOURCE_INDEX":
      return Object.assign({}, state, {
        "currIndex": action.newIndex
      })
    case "DELETE_RESOURCE":
      if (action.status === "SUCCESS") {
        return null
      }
    case "COLLECTION_REMOVE_RESOURCE":
      if (action.status === "SUCCESS") {
        return null
      }
    case "SUBCOLLECTION_REMOVE_RESOURCE":
      if (action.status === "SUCCESS") {
        return null
      }
    default:
      return state
  }
}

function fileUploadStatus(state = null, action) {
  switch (action.type) {
    case "FILE_UPLOAD":
      if (action.status === "SUCCESS") {
        return action.data
      }
    default:
      return state
  }
}



const rootReducer = combineReducers({
  adminModalContent,
  teamList,
  currTeam,
  userList,
  currUser,
  collectionList,
  currCollection,
  resourceList,
  updateStatus,
  resourceViewerContent,
  fileUploadStatus,
  // currCollectionInvalidated,
  // currTeamInvalidated,
  // fetchedCollections,
  // fetchedResourceLists,
  // collectionList,

});

export default rootReducer;
