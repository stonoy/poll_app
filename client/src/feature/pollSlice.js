import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import { customFetch } from "../utils"

const initialState = {
    polls: [],
    answeredPollsId: [],
    loading: false,
    submitting: false
}

export const getPolls = createAsyncThunk("poll/getPolls",
    async (_, thunkAPI) => {
        try {
            const resp = await customFetch.get("/getpolls")
            return resp?.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error?.response?.data?.msg)
        }
    }
)

export const vote = createAsyncThunk("poll/vote",
    async ({pollId, selectedOptionId}, thunkAPI) => {
        try {
            const resp = await customFetch.patch(`/voteapoll/${pollId}`, {selectedOptionId})
            return resp?.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error?.response?.data?.msg)
        }
    }
)

export const createPoll = createAsyncThunk("poll/createPoll",
    async (data, thunkAPI) => {
        try {
            const resp = await customFetch.post("/createpoll", data)
            return resp?.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error?.response?.data?.msg)
        }
    }
)

const pollSlice = createSlice({
    name: "poll",
    initialState: JSON.parse(localStorage.getItem("poll")) || initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getPolls.pending, (state, {payload}) => {
            state.loading = true
        }).addCase(getPolls.fulfilled, (state, {payload}) => {
            state.loading = false
            state.polls = payload?.polls
            localStorage.setItem("poll", JSON.stringify(state))
        }).addCase(getPolls.rejected, (state, {payload}) => {
            state.loading = false
        }).addCase(vote.pending, (state, {payload}) => {
            state.submitting = true
        }).addCase(vote.fulfilled, (state, {payload}) => {
            state.submitting = false
            state.polls = state.polls.map(poll => {
                if (poll._id == payload?.updatedPoll._id){
                    return payload?.updatedPoll
                }
                return poll
            })
            state.answeredPollsId = [...state.answeredPollsId, payload?.updatedPoll._id]
            localStorage.setItem("poll", JSON.stringify(state))
        }).addCase(vote.rejected, (state, {payload}) => {
            state.submitting = false
        }).addCase(createPoll.pending, (state, {payload}) => {
            state.submitting = true
        }).addCase(createPoll.fulfilled, (state, {payload}) => {
            state.submitting = false
            
        }).addCase(createPoll.rejected, (state, {payload}) => {
            state.submitting = false
        })
    }
})

export default pollSlice.reducer