// log
import store from "../store";

const fetchDataRequest = () => {
    return {
        type: "CHECK_DATA_REQUEST",
    };
};

    const fetchDataSuccess = (payload) => {
    return {
        type: "CHECK_DATA_SUCCESS",
        payload: payload,
    };
};

    const fetchDataFailed = (payload) => {
    return {
        type: "CHECK_DATA_FAILED",
        payload: payload,
    };
};

export const fetchData = (account) => {
    return async (dispatch) => {
        dispatch(fetchDataRequest());
        console.log("account: "+account)
        try {
            let allTamas = await store
                .getState()
                .blockchain.tamaToken.methods.getTamas()
                .call();

            let allOwnerTamas = await store
                .getState()
                .blockchain.tamaToken.methods.getOwnerTamas(account)
                .call();

            dispatch(
                fetchDataSuccess({
                    allTamas,
                    allOwnerTamas,
                })
            );
        } catch (err) {
            console.log("Fetchdata: "+err);
            dispatch(fetchDataFailed("Could not load data from contract."));
        }
    };
};