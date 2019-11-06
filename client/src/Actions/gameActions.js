import * as types from '../Constants/types'

// action
export const clickSquare = (id) => ({
    type: types.CLICK_SQUARE,
    id
});

export const restart = () => ({
    type: types.RESTART
});

export const sort = () => ({
    type: types.SORT
});

export const jumpTo = (id) => ({
    type: types.JUMP_TO,
    id
});

export const changeMode = () => ({
    type: types.CHANGE_MODE,
})